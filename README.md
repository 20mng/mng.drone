# MNG.DRONE · web

Web para clientes de MNG.DRONE (grabación aérea de bodas y eventos en Andalucía).
HTML + CSS + JS sin dependencias, y dos funciones serverless: `api/contact.js` te avisa por WhatsApp del formulario y `api/whatsapp.js` abre el chat contigo.

```
index.html        página
styles.css        estilos
main.js           envío del formulario
api/contact.js    aviso por WhatsApp del formulario (CallMeBot)
api/whatsapp.js   redirección al chat de WhatsApp
assets/           imagen del dron, imagen para redes (og.jpg) y favicon
vercel.json       URLs limpias y caché de assets
```

## Subirla a Vercel

1. Crea un repo en GitHub (por ejemplo `20mng/mng-drone-web`) y sube esta carpeta:
   ```bash
   git init && git add . && git commit -m "Web MNG.DRONE"
   git branch -M main
   git remote add origin git@github.com:20mng/mng-drone-web.git
   git push -u origin main
   ```
2. En Vercel: **Add New → Project**, importa el repo. Framework preset: **Other**. No hace falta build command.
3. Configura el formulario (abajo) y haz **Redeploy**.

## Formulario por WhatsApp (CallMeBot)

Cuando un cliente envía el formulario, te llega un WhatsApp con sus datos. Tu número nunca aparece en la web.

1. Guarda en tus contactos el número del bot de CallMeBot (lo tienes en https://www.callmebot.com/blog/free-api-whatsapp-messages/).
2. Mándale por WhatsApp: `I allow callmebot to send me messages`
3. Te responde con tu API key.
4. En Vercel → **Settings → Environment Variables** añade:
   - `WHATSAPP_PHONE` → tu número con prefijo y sin "+", p. ej. `34600111222`
   - `CALLMEBOT_APIKEY` → la clave que te ha mandado el bot
5. Redeploy (o haz un `git push`).

El botón **"Prefiero escribir por WhatsApp"** pasa por `/api/whatsapp`, que redirige a `wa.me` con tu número. Así el número no está en el código de la página (el cliente lo verá al abrir el chat contigo).

## Probar en local

```bash
npm i -g vercel
vercel dev
```
Crea un `.env.local` con las mismas variables para probar el envío.

## Dominio propio

Vercel → **Settings → Domains** → añade tu dominio y sigue las instrucciones DNS.
