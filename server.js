const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PASSWORD = process.env.PROXY_PASSWORD || "1234";
const SELF_URL = process.env.SELF_URL || "";
const PORT = process.env.PORT || 10000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Oculta fingerprint
app.disable("x-powered-by");
function requireAuth(req, res, next) {
  if (req.cookies.auth === PASSWORD) return next();
  return res.redirect("/intranet");
}

// --- DECOY ULTRA PROFESIONAL - PASA DESAPERCIBIDA 100% ---
const decoyHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AulaDigital 360 | Plataforma de Recursos Educativos - ESO y Bachillerato</title>
<meta name="description" content="Plataforma oficial de recursos digitales para ESO y Bachillerato. Apuntes, ejercicios, videotutoriales y biblioteca virtual.">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Merriweather:wght@700&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}</style>
</head>
<body class="bg-[#f8fafc] text-slate-800">
<!-- Top bar -->
<div class="bg-[#0f172a] text-slate-300 text-xs py-1.5 px-6 flex justify-between">
  <span>.\u00A0 Consejer\u00eda de Educaci\u00f3n \u00B7 Recursos Digitales 2025/26</span><span>soporte@auladigital360.es \u00B7 900 123 456</span>
</div>
<!-- Header -->
<header class="bg-white border-b sticky top-0 z-20">
  <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold">A</div>
      <div><div class="font-extrabold leading-none text-slate-900">AulaDigital<span class="text-blue-600">360</span></div><div class="text-[11px] tracking-widest text-slate-500 font-semibold">RECURSOS \u00B7 ESO \u00B7 BACH</div></div>
      <span class="ml-4 hidden md:inline text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">\u25CF Curso activo</span>
    </div>
    <nav class="hidden md:flex gap-6 text-sm font-medium text-slate-600">
      <a class="text-blue-600 border-b-2 border-blue-600 pb-1" href="/">Inicio</a><a href="/biblioteca" class="hover:text-slate-900">Biblioteca</a><a href="/asignaturas" class="hover:text-slate-900">Asignaturas</a><a href="/calendario" class="hover:text-slate-900">Calendario</a><a href="/contacto" class="hover:text-slate-900">Contacto</a>
    </nav>
    <a href="/intranet" class="hidden md:inline text-xs font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-black">Acceso docente</a>
  </div>
</header>

<!-- Hero -->
<section class="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-5 gap-6">
  <div class="lg:col-span-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
    <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
    <p class="text-blue-100 text-xs font-bold tracking-widest">NUEVO \u00B7 CURSO 2025/2026</p>
    <h1 class="text-3xl font-extrabold leading-tight mt-2" style="font-family:Merriweather,serif">Todo tu material de clase,<br>organizado y siempre a mano.</h1>
    <p class="text-blue-100 mt-3 text-sm leading-relaxed">Biblioteca con +2.400 recursos verificados por docentes. PDFs, presentaciones y videos ordenados por curso y trimestre.</p>
    <div class="mt-5 flex gap-2">
      <div class="flex-1 bg-white rounded-xl flex items-center px-3 py-2.5 text-slate-500 text-sm"><span class="mr-2">\uD83D\uDD0D</span><input placeholder="Buscar: &apos;Funciones 4\u00BA&apos;, &apos;C\u00e9lula&apos;..." class="w-full outline-none text-slate-700 placeholder:text-slate-400"></div>
      <button class="bg-slate-900 text-white px-5 rounded-xl text-sm font-semibold">Buscar</button>
    </div>
    <div class="flex gap-4 mt-4 text-xs text-blue-100"><span>\u2714 1.247 alumnos</span><span>\u2714 38 docentes</span><span>\u2714 Actualizado hoy 09:41</span></div>
  </div>
  <div class="lg:col-span-2 space-y-4">
    <div class="bg-white rounded-2xl border p-5">
      <div class="flex justify-between items-center mb-3"><h3 class="font-bold text-sm">Estado del curso</h3><span class="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border">2\u00BA Trimestre</span></div>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between bg-slate-50 p-3 rounded-xl"><span>Matem\u00e1ticas 4\u00BA</span><span class="font-bold text-blue-600">78% completado</span></div>
        <div class="flex justify-between bg-slate-50 p-3 rounded-xl"><span>Lengua y Literatura</span><span class="font-bold">64% completado</span></div>
        <div class="flex justify-between bg-slate-50 p-3 rounded-xl"><span>Biolog\u00eda y Geolog\u00eda</span><span class="font-bold">91% completado</span></div>
      </div>
    </div>
    <div class="bg-white rounded-2xl border p-5 flex items-center gap-4">
      <img src="https://i.pravatar.cc/100?img=12" class="w-10 h-10 rounded-full">
      <div class="text-sm"><div class="font-semibold">Prof. M. Rodr\u00edguez</div><div class="text-slate-500 text-xs">Coordinaci\u00f3n Acad\u00e9mica \u00B7 Tutor 4\u00BAB</div></div>
      <span class="ml-auto text-xs bg-emerald-500 w-2 h-2 rounded-full"></span>
    </div>
  </div>
</section>

<!-- Features -->
<section class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4">
  <div class="bg-white border rounded-2xl p-5"><div class="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">\uD83D\uDCC4</div><h3 class="font-bold mt-3 text-sm">Apuntes verificados</h3><p class="text-xs text-slate-500 mt-1">Revisados por departamento. Sin errores ni publicidad.</p></div>
  <div class="bg-white border rounded-2xl p-5"><div class="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">\uD83C\uDFA5</div><h3 class="font-bold mt-3 text-sm">Videotutoriales</h3><p class="text-xs text-slate-500 mt-1">Clases grabadas de 10-15 min por tema.</p></div>
  <div class="bg-white border rounded-2xl p-5"><div class="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">\uD83D\uDCC5</div><h3 class="font-bold mt-3 text-sm">Calendario oficial</h3><p class="text-xs text-slate-500 mt-1">Ex\u00e1menes, entregas y tutor\u00edas sincronizadas.</p></div>
</section>

<!-- Biblioteca -->
<section class="max-w-6xl mx-auto px-6 mt-6 bg-white border rounded-2xl">
  <div class="p-5 border-b flex justify-between items-center"><h2 class="font-bold">Biblioteca \u00B7 \u00daltimos recursos</h2><span class="text-xs text-slate-500">Actualizado: hoy 08:20 \u00B7 Mostrando 6 de 2.412</span></div>
  <div class="overflow-auto">
  <table class="w-full text-sm">
    <thead class="text-xs text-slate-500 bg-slate-50"><tr><th class="text-left p-3 font-semibold">Recurso</th><th class="text-left p-3">Curso</th><th class="text-left p-3">Fecha</th><th class="text-right p-3"></th></tr></thead>
    <tbody class="divide-y">
      <tr><td class="p-3"><div class="font-medium">Matem\u00e1ticas - Funciones y gr\u00e1ficas (UD 6) \u00B7 PDF</div><div class="text-xs text-slate-500">Dpto. Matem\u00e1ticas \u00B7 34 p\u00e1g.</div></td><td class="p-3 text-xs">4\u00BA ESO</td><td class="p-3 text-xs">12/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Descargar</a></td></tr>
      <tr><td class="p-3"><div class="font-medium">Historia - La Revoluci\u00f3n Industrial \u00B7 Presentaci\u00f3n</div><div class="text-xs text-slate-500">Dpto. Historia \u00B7 42 diapos.</div></td><td class="p-3 text-xs">4\u00BA ESO</td><td class="p-3 text-xs">10/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Ver</a></td></tr>
      <tr><td class="p-3"><div class="font-medium">Biolog\u00eda - La c\u00e9lula eucariota \u00B7 Apuntes + test</div><div class="text-xs text-slate-500">Dpto. Biolog\u00eda \u00B7 18 p\u00e1g. + 20 preg.</div></td><td class="p-3 text-xs">1\u00BA Bach</td><td class="p-3 text-xs">09/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Abrir</a></td></tr>
      <tr><td class="p-3"><div class="font-medium">Lengua - Comentario de texto resuelto \u00B7 Modelo EVAU</div><div class="text-xs text-slate-500">Dpto. Lengua \u00B7 Plantilla</div></td><td class="p-3 text-xs">2\u00BA Bach</td><td class="p-3 text-xs">08/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Descargar</a></td></tr>
      <tr><td class="p-3"><div class="font-medium">F\u00edsica y Qu\u00edmica - Formulaci\u00f3n inorg\u00e1nica</div><div class="text-xs text-slate-500">Tabla resumen \u00B7 2 p\u00e1g.</div></td><td class="p-3 text-xs">3\u00BA ESO</td><td class="p-3 text-xs">05/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Descargar</a></td></tr>
      <tr><td class="p-3"><div class="font-medium">Ingl\u00e9s - Past Simple vs Present Perfect \u00B7 Ejercicios</div><div class="text-xs text-slate-500">Con solucionario</div></td><td class="p-3 text-xs">4\u00BA ESO</td><td class="p-3 text-xs">02/09/2025</td><td class="p-3 text-right"><a class="text-blue-600 font-semibold text-xs border border-blue-200 px-3 py-1.5 rounded-lg">Practicar</a></td></tr>
    </tbody>
  </table>
  </div>
  <div class="p-3 text-center text-xs text-slate-400">Mostrando recursos p\u00fablicos. Inicia sesi\u00f3n como docente para ver el archivo completo.</div>
</section>

<footer class="max-w-6xl mx-auto px-6 py-8 text-xs text-slate-400 text-center">
  \u00A9 2026 AulaDigital360 \u00B7 Proyecto colaborativo de centros p\u00fablicos \u00B7 <a href="#" class="underline">Privacidad</a> \u00B7 <a href="#" class="underline">Aviso legal</a> \u00B7 <a href="#" class="underline">Contacto</a><br>
  <span class="opacity-60">v2.4.1 \u00B7 Build 20250912 \u00B7 Conforme RGPD</span>
</footer>
</body>
</html>`;

const loginHTML = (err="") => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Intranet Docente - AulaDigital360</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head><body class="bg-slate-100 min-h-screen flex items-center justify-center p-6" style="font-family:Inter,sans-serif">
<div class="w-full max-w-sm">
  <div class="text-center mb-6"><div class="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold mx-auto">A</div><h1 class="font-bold mt-3">Intranet docente</h1><p class="text-xs text-slate-500">Acceso restringido a profesorado autorizado</p></div>
  <div class="bg-white rounded-2xl border shadow-sm p-6">
    ${err?`<div class="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4">${err}</div>`:""}
    <form method="POST" action="/login" class="space-y-3">
      <div><label class="text-xs font-semibold text-slate-600">Usuario</label><input value="docente" disabled class="w-full mt-1 bg-slate-50 border rounded-xl px-3 py-2.5 text-sm text-slate-500"></div>
      <div><label class="text-xs font-semibold text-slate-600">Contrase\u00f1a</label><input name="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required class="w-full mt-1 border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></div>
      <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Acceder</button>
    </form>
    <p class="text-[11px] text-slate-400 text-center mt-4">\u00BFProblemas de acceso? Contacta con coordinaci\u00f3n TIC</p>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4"><a href="/" class="underline">\u2190 Volver a AulaDigital360</a></p>
</div>
</body></html>`;

const panelHTML = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Panel - Importar recurso externo</title>
<script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-slate-50 min-h-screen" style="font-family:Inter,sans-serif">
<header class="bg-white border-b px-6 py-3 flex justify-between items-center"><div class="font-bold text-sm">AulaDigital360 <span class="font-normal text-slate-500">/ Panel docente</span></div><div class="text-xs"><a href="/" class="text-slate-500 hover:text-slate-900">Ver web</a> <span class="mx-2 text-slate-300">|</span> <a href="/logout" class="text-red-600">Salir</a></div></header>
<div class="max-w-2xl mx-auto mt-8 bg-white border rounded-2xl p-6">
  <h2 class="font-bold">Importar recurso externo</h2>
  <p class="text-sm text-slate-500 mt-1">Pega la URL del recurso (web, PDF, visor) y se abrir\u00e1 en el visor interno del centro. Compatible con cualquier web externa.</p>
  <p class="text-xs text-slate-400 mt-1">SELF_URL: ${SELF_URL || "auto-detect"} \u00B7 Sesion activa</p>
  <form onsubmit="let u=document.getElementById(&apos;u&apos;).value.trim(); if(!u) return false; if(!u.startsWith(&apos;http&apos;)) u=&apos;https://&apos;+u; location.href=&apos;/p/&apos;+u; return false" class="mt-4 flex gap-2">
    <input id="u" placeholder="https://ejemplo.com o https://quenq.com" required class="flex-1 border rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl text-sm">Abrir</button>
  </form>
  <div class="mt-3 flex gap-2 text-xs"><span class="bg-slate-100 px-2 py-1 rounded-lg">Tip: /p/https://...</span><span class="bg-slate-100 px-2 py-1 rounded-lg">Alias: /view/https://...</span></div>
  <div class="mt-6 pt-4 border-t text-xs text-slate-400">El visor respeta X-Frame y reescribe rutas relativas con &lt;base&gt; para compatibilidad.</div>
</div>
</body></html>`;

app.get("/", (req, res) => {
  if (req.cookies.auth === PASSWORD) return res.redirect("/panel");
  res.send(decoyHTML);
});
["/biblioteca","/asignaturas","/calendario","/contacto","/privacidad"].forEach(p=> app.get(p,(req,res)=>res.send(decoyHTML)));
app.get("/robots.txt",(req,res)=> res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: /sitemap.xml"));
app.get("/sitemap.xml",(req,res)=> res.type("text/xml").send(`<?xml version="1.0"?><urlset><url><loc>/</loc></url><url><loc>/biblioteca</loc></url></urlset>`));
app.get("/favicon.ico",(req,res)=> res.redirect("https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4da.png"));

// Login oculto - NO hay link visible a menos que inspecciones, solo quien sepa /intranet entra
app.get("/intranet", (req,res)=>{
  if(req.cookies.auth===PASSWORD) return res.redirect("/panel");
  res.send(loginHTML());
});
app.get("/access", (req,res)=> res.redirect("/intranet"));
app.get("/panel", requireAuth, (req,res)=> res.send(panelHTML));
app.post("/login", (req,res)=>{
  if(req.body.password===PASSWORD){ res.cookie("auth",PASSWORD,{httpOnly:true,maxAge:1000*60*60*24*7}); return res.redirect("/panel"); }
  res.send(loginHTML("Contrase\u00f1a incorrecta. Contacta con TIC si no la recuerdas."));
});
app.get("/logout",(req,res)=>{ res.clearCookie("auth"); res.redirect("/"); });

async function proxyFetch(req,res){
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
    if(ct.includes("text/html")){
      let html=buf.toString("utf8");
      try{ const origin=new URL(targetUrl).origin; if(html.includes("<head>")) html=html.replace("<head>",`<head><base href="${origin}/">`); else if(html.includes("<HEAD>")) html=html.replace("<HEAD>",`<HEAD><base href="${origin}/">`);}catch{}
      return res.send(html);
    }
    return res.send(buf);
  }catch(e){ res.status(500).send("Error proxy: "+e.message); }
}
app.use("/p/*",requireAuth,proxyFetch);
app.use("/view/*",requireAuth,proxyFetch);
app.use((req,res)=> res.status(404).send(decoyHTML));

app.listen(PORT,()=> console.log("AulaDigital360 decoy en "+PORT+" SELF_URL="+(SELF_URL||"auto")));
