const express = require("express");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PASSWORD = process.env.PROXY_PASSWORD || "1234";
const PORT = process.env.PORT || 10000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

function requireAuth(req, res, next) {
  if (req.cookies.auth === PASSWORD) return next();
  return res.redirect("/");
}

app.get("/", (req, res) => {
  if (req.cookies.auth === PASSWORD) {
    return res.send(`
      <body style="font-family:sans-serif;text-align:center;margin-top:50px">
        <h2>Proxy OK - Pon la web bloqueada</h2>
        <form onsubmit="let u=document.getElementById('u').value.trim(); if(!u.startsWith('http')) u='https://'+u; location.href='/p/'+u; return false">
          <input id="u" placeholder="https://web-bloqueada.com" style="width:400px;padding:10px">
          <button style="padding:10px;cursor:pointer">Ir</button>
        </form>
        <p style="margin-top:20px"><a href="/logout">Cerrar sesion</a></p>
      </body>`);
  }
  res.send(`
    <body style="font-family:sans-serif;text-align:center;margin-top:50px">
      <h2>Login Proxy</h2>
      <form method="POST" action="/login">
        <input name="password" type="password" placeholder="Contraseña" style="padding:10px">
        <button style="padding:10px;cursor:pointer">Entrar</button>
      </form>
    </body>`);
});

app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    res.cookie("auth", PASSWORD, { httpOnly: true, maxAge: 1000*60*60*24*7 });
    return res.redirect("/");
  }
  res.send(`Contrase&ntilde;a incorrecta <a href="/">volver</a>`);
});

app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

// Proxy real: /p/https://ejemplo.com/ruta
app.use("/p/*", requireAuth, (req, res, next) => {
  const fullTarget = req.params[0];
  if (!fullTarget || !fullTarget.startsWith("http")) {
    return res.status(400).send("URL invalida. Usa /p/https://...");
  }
  try {
    const url = new URL(fullTarget);
    req.url = url.pathname + url.search;
    return createProxyMiddleware({
      target: url.origin,
      changeOrigin: true,
      cookieDomainRewrite: "",
      onProxyRes: (proxyRes) => {
        delete proxyRes.headers["x-frame-options"];
        delete proxyRes.headers["content-security-policy"];
      }
    })(req, res, next);
  } catch (e) {
    res.status(400).send("URL invalida");
  }
});

app.listen(PORT, () => console.log("Proxy en puerto " + PORT));
