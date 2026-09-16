# Insti Proxy con contraseña

Proxy simple para saltarse bloqueos del insti hosteado en Render.

## Deploy en Render
1. Conecta este repo en Render -> New Web Service
2. Build Command: `npm install`
3. Start Command: `node server.js` (o `npm start`)
4. Environment -> Add Variable: `PROXY_PASSWORD` = tu clave

Uso: `https://tu-app.onrender.com/p/https://web-bloqueada.com`
