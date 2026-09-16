const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PASSWORD = process.env.PROXY_PASSWORD || "1234";
const SELF_URL = process.env.SELF_URL || "";
const PORT = process.env.PORT || 10000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

function requireAuth(req, res, next) {
  if (req.cookies.auth === PASSWORD) return next();
  return res.redirect("/access");
}

const decoyHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>StudyHub - Gestor de Apuntes y Recursos ESO/Bach</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,Segoe UI,Arial,sans-serif}
body{color:#1e293b;background:#f8fafc}
header{background:#fff;border-bottom:1px solid #e2e8f0;padding:14px 40px;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:800;font-size:20px;color:#0f172a} .logo span{color:#2563eb}
nav a{margin-left:20px;text-decoration:none;color:#475569;font-size:14px}
.hero{max-width:1000px;margin:60px auto;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.hero h1{font-size:36px;line-height:1.1;color:#0f172a} .hero h1 span{color:#2563eb}
.hero p{margin:14px 0 22px;color:#64748b}
.btn{background:#2563eb;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:600}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:22px}
.grid{max-width:1000px;margin:30px auto;padding:0 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card h3{font-size:16px;margin-bottom:6px} .card p{font-size:13px;color:#64748b}
footer{text-align:center;padding:30px;color:#94a3b8;font-size:12px}
@media(max-width:800px){.hero{grid-template-columns:1fr}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header><div class="logo">Study<span>Hub</span> <small style="font-weight:400;color:#64748b;font-size:11px">v2.4</small></div><nav><a href="#">Inicio</a><a href="#">Asignaturas</a><a href="#">Recursos</a><a href="#">Contacto</a></nav></header>
<div class="hero">
  <div>
    <h1>Organiza tus <span>apuntes</span> y recursos de clase</h1>
    <p>Plataforma gratuita para estudiantes de ESO y Bachillerato. Guarda PDFs, organiza temas y comparte materiales con tu clase. Sin registro.</p>
    <a class="btn" href="#">Empezar ahora</a>
    <p style="font-size:12px;margin-top:10px;color:#94a3b8">+1200 estudiantes activos  •  100% gratuito</p>
  </div>
  <div class="card">
    <div style="background:#eff6ff;border-radius:10px;padding:14px;margin-bottom:12px;color:#1d4ed8;font-size:13px">\uD83D\uDCCB \u00daltimos recursos subidos</div>
    <div style="font-size:13px;line-height:1.8;color:#334155">
      \u2022 Matem\u00e1ticas 4\u00ba ESO - Funciones<br>
      \u2022 Historia - Tema 5. Revoluci\u00f3n Industrial<br>
      \u2022 Biolog\u00eda - Apuntes c\u00e9lula<br>
      \u2022 Lengua - Comentario de texto resuelto
    </div>
  </div>
</div>
<div class="grid">
  <div class="card"><h3>\uD83D\uDCC4 Sube PDFs</h3><p>Arrastra tus apuntes y tenlos siempre disponibles en la nube.</p></div>
  <div class="card"><h3>\uD83D\uDDC2\uFE0F Organiza por curso</h3><p>Filtra por asignatura, trimestre y profesor.</p></div>
  <div class="card"><h3>\uD83D\uDD17 Comparte</h3><p>Genera enlaces privados para compartir con compa\u00f1eros.</p></div>
</div>
<footer>\u00a9 2026 StudyHub - Proyecto educativo sin \u00e1nimo de lucro &middot; <a href="/access" style="color:#cbd5e1;text-decoration:none">admin</a></footer>
</body>
</html>`;

const loginHTML = (err="") => `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Admin - StudyHub</title>
<style>body{font-family:sans-serif;background:#f1f5f9;display:flex;justify-content:center;align-items:center;height:100vh;margin:0} .box{background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.08);width:340px;text-align:center} input{width:100%;padding:10px;margin:10px 0;border:1px solid #e2e8f0;border-radius:8px} button{width:100%;padding:10px;background:#2563eb;color:#fff;border:0;border-radius:8px;cursor:pointer;font-weight:600} .err{color:#dc2626;font-size:13px}</style>
</head><body><div class="box"><h3>Acceso privado</h3><p style="font-size:12px;color:#64748b">Solo personal autorizado</p>${err?`<p class="err">${err}</p>`:""}<form method="POST" action="/login"><input name="password" type="password" placeholder="Contrase\u00f1a" required><button>Entrar</button></form></div></body></html>`;

const panelHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Panel - StudyHub</title>
<style>body{font-family:sans-serif;background:#f8fafc;margin:0} header{background:#0f172a;color:#fff;padding:12px 20px;display:flex;justify-content:space-between} a{color:#93c5fd;text-decoration:none} .wrap{max-width:700px;margin:40px auto;background:#fff;padding:24px;border-radius:12px;border:1px solid #e2e8f0} input{width:70%;padding:12px;border:1px solid #e2e8f0;border-radius:8px} button{padding:12px 18px;background:#2563eb;color:#fff;border:0;border-radius:8px;cursor:pointer}</style>
</head><body><header><b>StudyHub / Panel</b><span><a href="/">Ver web</a> &middot; <a href="/logout">Salir</a></span></header>
<div class="wrap"><h3>Navegador interno</h3><p style="color:#64748b;font-size:13px">Introduce la URL y se abrir\u00e1 via proxy. SELF_URL: ${SELF_URL || "auto"}</p>
<form onsubmit="let u=document.getElementById('u').value.trim(); if(!u.startsWith('http')) u='https://'+u; location.href='/p/'+u; return false"><input id="u" placeholder="https://ejemplo.com" required><button>Ir</button></form>
<p style="font-size:12px;color:#94a3b8;margin-top:14px">Tip: tambi\u00e9n puedes entrar directo con /p/https://... o /view/https://...</p></div></body></html>`;

app.get("/", (req, res) => {
  if (req.cookies.auth === PASSWORD) return res.redirect("/panel");
  res.send(decoyHTML);
});
app.get("/access", (req, res) => {
  if (req.cookies.auth === PASSWORD) return res.redirect("/panel");
  res.send(loginHTML());
});
app.get("/panel", requireAuth, (req, res) => res.send(panelHTML));
app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    res.cookie("auth", PASSWORD, { httpOnly: true, maxAge: 1000*60*60*24*7 });
    return res.redirect("/panel");
  }
  res.send(loginHTML("Contrase\u00f1a incorrecta"));
});
app.get("/logout", (req, res) => { res.clearCookie("auth"); res.redirect("/"); });

// Proxy con fetch nativo - mucho mas fiable que http-proxy-middleware
async function proxyFetch(req, res) {
  // req.originalUrl = /p/https://quenq.com/ruta?x=1  -> target = https://quenq.com/ruta?x=1
  let targetUrl = req.originalUrl.replace(/^\/(p|view)\//, "");
  // Si la URL viene sin protocolo por el navegador, corrige
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    return res.status(400).send("URL invalida. Usa /p/https://...");
  }
  try { new URL(targetUrl); } catch { return res.status(400).send("URL invalida"); }

  try {
    const headers = {
      "user-agent": req.headers["user-agent"] || "Mozilla/5.0",
      "accept": req.headers["accept"] || "text/html,application/xhtml+xml",
      "accept-language": req.headers["accept-language"] || "es-ES,es;q=0.9",
    };
    // Reenvia body si es POST/PUT
    const fetchOpts = { method: req.method, headers, redirect: "follow" };
    if (req.method !== "GET" && req.method !== "HEAD") {
      // para simplificar no reenviamos body binario, solo para GET que es el caso del insti
    }

    const r = await fetch(targetUrl, fetchOpts);
    const contentType = r.headers.get("content-type") || "";

    // Copia headers utiles excepto los que bloquean iframe
    r.headers.forEach((v, k) => {
      const lk = k.toLowerCase();
      if (["x-frame-options","content-security-policy","content-security-policy-report-only","clear-site-data","content-encoding","content-length"].includes(lk)) return;
      res.setHeader(k, v);
    });
    res.status(r.status);

    const buf = Buffer.from(await r.arrayBuffer());

    if (contentType.includes("text/html")) {
      let html = buf.toString("utf8");
      // Inyecta <base> para que rutas relativas /assets/... funcionen
      try {
        const origin = new URL(targetUrl).origin;
        if (html.includes("<head>")) html = html.replace("<head>", `<head><base href="${origin}/">`);
        else if (html.includes("<HEAD>")) html = html.replace("<HEAD>", `<HEAD><base href="${origin}/">`);
      } catch {}
      return res.send(html);
    }
    return res.send(buf);
  } catch (e) {
    res.status(500).send("Error proxy: " + e.message + " - target: " + targetUrl);
  }
}
app.use("/p/*", requireAuth, proxyFetch);
app.use("/view/*", requireAuth, proxyFetch);

app.listen(PORT, () => console.log("StudyHub decoy en puerto " + PORT + " SELF_URL=" + (SELF_URL || "auto")));
