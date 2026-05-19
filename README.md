# Avatar IA — Instrucciones de despliegue

## Qué necesitas
- Una cuenta gratuita en **vercel.com**
- Una cuenta gratuita en **github.com**
- Tu clave de API de Anthropic (la encuentras en console.anthropic.com)

---

## Paso 1 — Sube el proyecto a GitHub

1. Ve a **github.com** y haz login
2. Pulsa el botón verde **"New"** para crear un repositorio
3. Ponle nombre: `avatar-ia`
4. Déjalo en **Public** y pulsa **"Create repository"**
5. En la página siguiente verás instrucciones. Pulsa **"uploading an existing file"**
6. Arrastra TODOS los archivos de esta carpeta:
   - `vercel.json`
   - `README.md`
   - la carpeta `api/` con `chat.js` dentro
   - la carpeta `public/` con `index.html` dentro
7. Pulsa **"Commit changes"**

---

## Paso 2 — Despliega en Vercel

1. Ve a **vercel.com** y haz login con tu cuenta de GitHub
2. Pulsa **"Add New Project"**
3. Selecciona el repositorio `avatar-ia`
4. Pulsa **"Deploy"** (sin cambiar nada)
5. Espera ~1 minuto hasta que aparezca ✅

---

## Paso 3 — Añade tu clave de API

1. En Vercel, ve a tu proyecto → **Settings → Environment Variables**
2. Añade esta variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu clave (empieza por `sk-ant-...`)
3. Pulsa **Save**
4. Ve a **Deployments** y pulsa **Redeploy** para que se aplique

---

## Paso 4 — ¡Listo!

Vercel te da una URL del tipo `https://avatar-ia-xxxx.vercel.app`

Esa URL funciona en **móvil y PC**, y los perfiles se guardan en el navegador de cada usuario.

---

## Obtener tu clave de API de Anthropic

1. Ve a **console.anthropic.com**
2. Regístrate o haz login
3. Ve a **API Keys** → **Create Key**
4. Copia la clave y pégala en Vercel como se indica arriba

> ⚠️ El uso de la API tiene un coste pequeño por conversación. Anthropic da créditos gratuitos al registrarse.
