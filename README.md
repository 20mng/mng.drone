# MNG.DRONE · web

Web para clientes de MNG.DRONE (grabación aérea de bodas y eventos en Andalucía).
HTML + CSS + JS sin dependencias, y una función serverless (`api/contact.js`) que envía el formulario por email con Resend.

```
index.html        página
styles.css        estilos
main.js           envío del formulario
api/contact.js    función de Vercel que manda el email
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

## Formulario por email (Resend)

1. Crea una cuenta gratuita en https://resend.com y genera una API key.
2. En Vercel → tu proyecto → **Settings → Environment Variables** añade:
   - `RESEND_API_KEY` → la clave de Resend
   - `CONTACT_EMAIL` → el email donde quieres recibir las solicitudes
   - `CONTACT_FROM` → *(opcional)* remitente, solo cuando tengas un dominio verificado en Resend, p. ej. `MNG.DRONE <web@mngdrone.es>`
3. Redeploy.

Sin dominio propio, Resend envía desde `onboarding@resend.dev` y **solo puede mandar al email con el que te registraste en Resend**. Usa ese mismo email en `CONTACT_EMAIL`.

Al responder al correo, la respuesta va directamente al cliente (`reply_to`).

## Probar en local

```bash
npm i -g vercel
vercel dev
```
Crea un `.env.local` con las mismas variables para probar el envío.

## Dominio propio

Vercel → **Settings → Domains** → añade tu dominio y sigue las instrucciones DNS.
Si cambias de dominio, actualiza también el dominio verificado en Resend y `CONTACT_FROM`.
