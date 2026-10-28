# MNG.DRONE · web

Web para clientes de MNG.DRONE (grabación aérea de bodas y eventos en Andalucía).
HTML + CSS + JS sin dependencias, y una función serverless (`api/whatsapp.js`) que abre el chat de WhatsApp contigo.

```
index.html        página
styles.css        estilos
main.js           envío del formulario
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

## Contacto por WhatsApp

El formulario no envía nada al servidor: al pulsar **Enviar por WhatsApp** se abre un chat contigo con los datos ya escritos. El nombre es obligatorio.

El enlace pasa por `api/whatsapp.js`, que redirige a `wa.me` con tu número, así el número no está en el código de la página (el cliente lo verá al abrir el chat).

Variable de entorno en Vercel (**Settings → Environment Variables**, entorno Production):
- `WHATSAPP_PHONE` → tu número con prefijo y sin "+", p. ej. `34600111222`

## Probar en local

```bash
npm i -g vercel
vercel dev
```
Crea un `.env.local` con `WHATSAPP_PHONE` para probar el botón.

## Dominio propio

Vercel → **Settings → Domains** → añade tu dominio y sigue las instrucciones DNS.
