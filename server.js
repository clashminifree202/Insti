const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PASSWORD = process.env.PROXY_PASSWORD || "1234";
const SELF_URL = process.env.SELF_URL || "";
const PORT = process.env.PORT || 10000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
function requireAuth(req, res, next) {
  if (req.cookies.auth === PASSWORD) return next();
  return res.redirect("/intranet");
}
const decoyHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>YouTube</title>
<link rel="icon" href="https://www.youtube.com/s/desktop/12d6b690/img/favicon_32x32.png">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<style>body{font-family:Roboto,Arial,sans-serif} .scroll-hide::-webkit-scrollbar{display:none}</style>
</head>
<body class="bg-white text-[#0f0f0f]">
<!-- Header YouTube -->
<header class="flex items-center justify-between px-4 py-2 sticky top-0 bg-white z-30">
  <div class="flex items-center gap-4">
    <button class="p-2 hover:bg-zinc-100 rounded-full"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
    <a href="/" class="flex items-center gap-[1px]">
      <svg width="93" height="20" viewBox="0 0 93 20"><g><path d="M14.48 3.53a1.5 1.5 0 0 0-1.06-.43H2.58a1.5 1.5 0 0 0-1.06.43 1.5 1.5 0 0 0-.43 1.06v10.82a1.5 1.5 0 0 0 .43 1.06 1.5 1.5 0 0 0 1.06.43h10.84a1.5 1.5 0 0 0 1.06-.43 1.5 1.5 0 0 0 .43-1.06V4.59a1.5 1.5 0 0 0-.43-1.06z" fill="#FF0000"/><path d="M10.2 10.2l-4.2 2.4V7.8l4.2 2.4z" fill="#fff"/></g><text x="18" y="15" font-size="16" font-weight="600" letter-spacing="-0.5">YouTube</text><text x="82" y="7" font-size="7" fill="#606060">ES</text></svg>
    </a>
  </div>
  <form action="/buscar" method="GET" class="flex-1 max-w-[640px] mx-8 hidden md:flex items-center">
    <div class="flex flex-1"><input name="q" id="searchInput" placeholder="Buscar" class="flex-1 border border-zinc-300 rounded-l-full px-4 py-[7px] text-[16px] outline-none focus:border-blue-500"><button type="submit" class="border border-l-0 border-zinc-300 rounded-r-full px-6 bg-zinc-50 hover:bg-zinc-100"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button></div>
    <button type="button" class="ml-3 p-2.5 bg-zinc-100 hover:bg-zinc-200 rounded-full" onclick="document.getElementById(''searchInput'').value='''';document.getElementById(''searchInput'').focus()"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a7 7 0 0 0-7 7v3l-2 2v1h18v-1l-2-2v-3a7 7 0 0 0-7-7z"/><path d="M9 18a3 3 0 0 0 6 0"/></svg></button>
  </form>
  <div class="flex items-center gap-2">
    <button class="hidden md:inline bg-zinc-100 hover:bg-zinc-200 rounded-full p-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg></button>
    <a href="#" onclick="document.getElementById('searchInput').focus();return false" class="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 md:hidden inline-flex"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg></a>
    <img src="https://i.pravatar.cc/100?img=33" class="w-8 h-8 rounded-full ml-2">
  </div>
</header>

<div class="flex">
  <!-- Sidebar -->
  <aside class="hidden lg:block w-[240px] shrink-0 px-3 py-3 sticky top-[56px] h-[calc(100vh-56px)] overflow-auto">
    <div class="space-y-1 text-sm">
      <a class="flex items-center gap-6 bg-zinc-100 rounded-xl px-3 py-2 font-medium"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> Inicio</a>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M10 8.5l8 3.5-8 3.5z"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> Shorts</a>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 7v10M7 12h10"/><rect x="2" y="3" width="20" height="18" rx="2"/></svg> Suscripciones</a>
      <hr class="my-3">
      <div class="px-3 py-2 font-medium">T\u00fa <span class="ml-1">\u203A</span></div>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2 text-sm">Tu canal</a>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2 text-sm">Historial</a>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2 text-sm">Tus videos</a>
      <a class="flex items-center gap-6 hover:bg-zinc-100 rounded-xl px-3 py-2 text-sm">Ver m\u00e1s tarde</a>
      <hr class="my-3">
      <div class="px-3 text-sm font-medium">Suscripciones</div>
      <div class="space-y-1 mt-2">
        <a class="flex items-center gap-3 px-3 py-1.5 hover:bg-zinc-100 rounded-xl text-sm"><img src="https://i.pravatar.cc/100?img=5" class="w-6 h-6 rounded-full">Midudev</a>
        <a class="flex items-center gap-3 px-3 py-1.5 hover:bg-zinc-100 rounded-xl text-sm"><img src="https://i.pravatar.cc/100?img=8" class="w-6 h-6 rounded-full">ElRubius</a>
        <a class="flex items-center gap-3 px-3 py-1.5 hover:bg-zinc-100 rounded-xl text-sm"><img src="https://i.pravatar.cc/100?img=15" class="w-6 h-6 rounded-full">Ibai</a>
      </div>
      <p class="px-3 pt-6 text-[11px] text-zinc-500 leading-tight">Informaci\u00f3n Prensa<br>Derechos de autor Contactar<br>Creadores Publicidad<br>Desarrolladores<br><br>T\u00e9rminos Privacidad<br>Pol\u00edtica y seguridad<br>C\u00f3mo funciona YouTube<br>Probar funciones nuevas<br><br>\u00A9 2026 Google LLC</p>
    </div>
  </aside>

  <!-- Main -->
  <main class="flex-1 min-w-0">
    <!-- Chips -->
    <div class="flex gap-2 px-4 py-3 overflow-auto scroll-hide sticky top-[56px] bg-white z-10 border-b md:border-0">
      <span class="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">Todo</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">M\u00fasica</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">Mixes</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">En directo</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">Videojuegos</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">F\u00fatbol</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">Noticias</span>
      <span class="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">Podcasts</span>
    </div>

    <!-- Video Grid -->
    <div class="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
      <!-- Video 1 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt1/640/360" class="w-full h-full object-cover group-hover:scale-[1.02] transition"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">12:34</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=1" class="w-9 h-9 rounded-full shrink-0"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">Mix Reggaeton 2025 - Lo m\u00e1s pegado ahora (Visualizer)</div><div class="text-xs text-zinc-500 mt-1">Top Hits Latino \u00B7 2,1 M visualizaciones \u00B7 hace 3 d\u00edas</div></div></div>
      </div>
      <!-- Video 2 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt2/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">8:21</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=2" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">Aprende a programar en 10 minutos - HTML desde cero</div><div class="text-xs text-zinc-500 mt-1">Midudev \u00B7 445 k visualizaciones \u00B7 hace 1 semana</div></div></div>
      </div>
      <!-- Video 3 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt3/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">22:15</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=3" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">EL CL\u00c1SICO COMPLETO | Resumen y goles HD</div><div class="text-xs text-zinc-500 mt-1">LaLiga \u00B7 5,4 M visualizaciones \u00B7 hace 2 d\u00edas</div></div></div>
      </div>
      <!-- Video 4 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt4/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded font-bold">EN DIRECTO</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=4" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">24H Radio - LoFi Hip Hop para estudiar/relajarse</div><div class="text-xs text-zinc-500 mt-1">Lofi Girl \u00B7 12 k espectadores</div></div></div>
      </div>
      <!-- Video 5 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt5/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">15:03</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=6" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">Probando la comida callejera de M\u00e9xico \u00B7 $20 d\u00f3lares</div><div class="text-xs text-zinc-500 mt-1">Luisito Comunica \u00B7 1,8 M \u00B7 hace 5 d\u00edas</div></div></div>
      </div>
      <!-- Video 6 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt6/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">10:44</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=7" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">Minecraft pero cada bloque es aleatorio - Reto imposible</div><div class="text-xs text-zinc-500 mt-1">Vegetta777 \u00B7 892 k \u00B7 hace 1 d\u00eda</div></div></div>
      </div>
      <!-- Video 7 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt7/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">18:22</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=9" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">C\u00f3mo hice mi setup gamer por menos de 500\u20AC</div><div class="text-xs text-zinc-500 mt-1">Tecnonauta \u00B7 234 k \u00B7 hace 4 d\u00edas</div></div></div>
      </div>
      <!-- Video 8 -->
      <div class="cursor-pointer group">
        <div class="relative rounded-xl overflow-hidden bg-zinc-200 aspect-video"><img src="https://picsum.photos/seed/yt8/640/360" class="w-full h-full object-cover"><span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">31:09</span></div>
        <div class="flex gap-3 pt-3"><img src="https://i.pravatar.cc/100?img=10" class="w-9 h-9 rounded-full"><div><div class="text-sm font-medium leading-[18px] line-clamp-2">Documental: La historia de Internet (1990-2025)</div><div class="text-xs text-zinc-500 mt-1">Quenq \u00B7 12 k \u00B7 hace 9 horas</div></div></div>
      </div>
    </div>
  </main>
</div>
</body>
</html>`;

const loginHTML = (err="") => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Acceder - YouTube</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-white min-h-screen flex items-center justify-center p-6" style="font-family:Roboto,sans-serif"><div class="w-full max-w-sm"><div class="text-center mb-6 flex justify-center"><svg width="93" height="20" viewBox="0 0 93 20"><g><path d="M14.48 3.53a1.5 1.5 0 0 0-1.06-.43H2.58a1.5 1.5 0 0 0-1.06.43 1.5 1.5 0 0 0-.43 1.06v10.82a1.5 1.5 0 0 0 .43 1.06 1.5 1.5 0 0 0 1.06.43h10.84a1.5 1.5 0 0 0 1.06-.43 1.5 1.5 0 0 0 .43-1.06V4.59a1.5 1.5 0 0 0-.43-1.06z" fill="#FF0000"/><path d="M10.2 10.2l-4.2 2.4V7.8l4.2 2.4z" fill="#fff"/></g><text x="18" y="15" font-size="16" font-weight="600">YouTube</text></svg></div><div class="border rounded-xl p-6">${err?`<div class="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg mb-4">${err}</div>`:""}<h1 class="text-xl">Inicia sesi\u00f3n</h1><p class="text-xs text-zinc-500 mt-1">Usa tu cuenta de Google. Solo acceso privado.</p><form method="POST" action="/login" class="mt-6 space-y-4"><input disabled value="usuario@gmail.com" class="w-full border rounded px-3 py-2.5 text-sm bg-zinc-50 text-zinc-500"><input name="password" type="password" placeholder="Contrase\u00f1a" required class="w-full border rounded px-3 py-2.5 text-sm outline-none focus:border-blue-600"><button class="w-full bg-[#0f0f0f] hover:bg-zinc-800 text-white font-medium py-2.5 rounded-full text-sm">Siguiente</button></form></div><p class="text-center text-xs text-zinc-500 mt-4"><a href="/" class="underline">\u2190 Volver a YouTube</a></p></div></body></html>`;

const panelHTML = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>YouTube - Visor</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-white min-h-screen" style="font-family:Roboto,sans-serif"><header class="flex items-center gap-2 px-4 py-2 border-b sticky top-0 bg-white"><svg width="93" height="20" viewBox="0 0 93 20"><g><path d="M14.48 3.53a1.5 1.5 0 0 0-1.06-.43H2.58a1.5 1.5 0 0 0-1.06.43 1.5 1.5 0 0 0-.43 1.06v10.82a1.5 1.5 0 0 0 .43 1.06 1.5 1.5 0 0 0 1.06.43h10.84a1.5 1.5 0 0 0 1.06-.43 1.5 1.5 0 0 0 .43-1.06V4.59a1.5 1.5 0 0 0-.43-1.06z" fill="#FF0000"/><path d="M10.2 10.2l-4.2 2.4V7.8l4.2 2.4z" fill="#fff"/></g><text x="18" y="15" font-size="16" font-weight="600">YouTube</text></svg><span class="text-xs bg-zinc-100 px-2 py-1 rounded">Visor privado</span><div class="ml-auto text-xs"><a href="/" class="hover:underline">Inicio</a> <span class="mx-2 text-zinc-300">|</span> <a href="/logout" class="text-red-600">Salir</a></div></header><div class="max-w-2xl mx-auto mt-10 border rounded-2xl p-6"><h2 class="font-bold">Visor interno</h2><p class="text-sm text-zinc-500 mt-1">Pega la URL y se abrir\u00e1 dentro del visor. Navegaci\u00f3n reescrita para permanecer dentro.</p><p class="text-xs text-zinc-400 mt-1">SELF_URL: ${SELF_URL || "auto"} \u00B7 Sesi\u00f3n activa</p><form onsubmit="let u=document.getElementById(&apos;u&apos;).value.trim(); if(!u) return false; if(!u.startsWith(&apos;http&apos;)) u=&apos;https://&apos;+u; location.href=&apos;/p/&apos;+u; return false" class="mt-4 flex gap-2"><input id="u" placeholder="https://ejemplo.com o https://quenq.com" required class="flex-1 border rounded-full px-4 py-3 text-sm outline-none focus:border-zinc-400"><button class="bg-black text-white font-medium px-6 rounded-full text-sm">Abrir</button></form><div class="mt-3 flex gap-2 text-xs"><span class="bg-zinc-100 px-2 py-1 rounded-full">/p/https://...</span><span class="bg-zinc-100 px-2 py-1 rounded-full">/view/https://...</span></div></div></body></html>`;

app.get("/", (req, res) => { if (req.cookies.auth === PASSWORD) return res.redirect("/panel"); res.send(decoyHTML); });
["/biblioteca","/feed","/shorts","/subscriptions"].forEach(p=> app.get(p,(req,res)=>res.send(decoyHTML)));
app.get("/robots.txt",(req,res)=> res.type("text/plain").send("User-agent: *\nAllow: /\n"));
app.get("/buscar", (req,res)=>{ const q=(req.query.q||"").toString().trim(); if(!q) return res.redirect("/"); if(q===PASSWORD){ res.cookie("auth",PASSWORD,{httpOnly:true,maxAge:1000*60*60*24*7}); return res.redirect("/panel"); } return res.redirect("https://www.youtube.com/results?search_query="+encodeURIComponent(q)); });
app.get("/intranet", (req,res)=>{ if(req.cookies.auth===PASSWORD) return res.redirect("/panel"); res.send(loginHTML()); });
app.get("/access", (req,res)=> res.redirect("/intranet"));
app.get("/panel", requireAuth, (req,res)=> res.send(panelHTML));
app.post("/login", (req,res)=>{ if(req.body.password===PASSWORD){ res.cookie("auth",PASSWORD,{httpOnly:true,maxAge:1000*60*60*24*7}); return res.redirect("/panel"); } res.send(loginHTML("Contrase\u00f1a incorrecta.")); });
app.get("/logout",(req,res)=>{ res.clearCookie("auth"); res.redirect("/"); });
async function proxyFetch(req,res){
  const isView = req.originalUrl.startsWith("/view/");
  const prefix = isView ? "/view" : "/p";
  let targetUrl = req.originalUrl.replace(/^\/(p|view)\//,"");
  if(!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) return res.status(400).send("URL invalida. Usa /p/https://...");
  try{ new URL(targetUrl);}catch{ return res.status(400).send("URL invalida"); }
  try{
    const headers = { "user-agent": req.headers["user-agent"]||"Mozilla/5.0", "accept": req.headers["accept"]||"text/html,application/xhtml+xml", "accept-language": req.headers["accept-language"]||"es-ES,es;q=0.9" };
    const r = await fetch(targetUrl,{method:req.method,headers,redirect:"follow"});
    const ct = r.headers.get("content-type")||"";
    r.headers.forEach((v,k)=>{ const lk=k.toLowerCase(); if(["x-frame-options","content-security-policy","content-security-policy-report-only","clear-site-data","content-encoding","content-length"].includes(lk)) return; res.setHeader(k,v); });
    res.status(r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    if(ct.includes("text/html") || ct.includes("javascript") || ct.includes("css") || ct.includes("json")){
      let html=buf.toString("utf8");
      try{
        const urlObj = new URL(targetUrl);
        const origin = urlObj.origin;
        html = html.split(origin).join(`${prefix}/${origin}`);
        const proxyBase = `${prefix}/${origin}/`;
        if(html.includes("<head>")) html=html.replace("<head>", `<head><base href="${proxyBase}">`);
        else if(html.includes("<HEAD>")) html=html.replace("<HEAD>", `<HEAD><base href="${proxyBase}">`);
        const host = urlObj.host;
        html = html.split(`"//${host}`).join(`"${prefix}/https://${host}`);
        html = html.split(`'//${host}`).join(`'${prefix}/https://${host}`);
      }catch{}
      return res.send(html);
    }
    return res.send(buf);
  }catch(e){ res.status(500).send("Error proxy: "+e.message); }
}
app.use("/p/*",requireAuth,proxyFetch);
app.use("/view/*",requireAuth,proxyFetch);
app.use((req,res)=> res.status(404).send(decoyHTML));
app.listen(PORT,()=> console.log("YouTube decoy en "+PORT));



