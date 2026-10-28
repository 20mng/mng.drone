# MNG.DRONE · web

Web para clientes de MNG.DRONE (grabación aérea de bodas y eventos en Andalucía).
HTML + CSS + JS sin dependencias, y una función serverless (`api/whatsapp.js`) que abre el chat de WhatsApp contigo.

```
index.html        página
styles.css        estilos
main.js           formulario (abre WhatsApp con el mensaje escrito)
api/whatsapp.js   redirección al chat de WhatsApp
assets/           imagen del dron, imagen para redes (og.jpg) y favicon
vercel.json       URLs limpias y caché de assets
.env.example      plantilla de variables de entorno
```

## Probar en local

```bash
npm i -g vercel        # solo la primera vez
cp .env.example .env.local   # en Windows: copy .env.example .env.local
vercel dev
```
Abre http://localhost:3000. Si cambias `.env.local`, para `vercel dev` (Ctrl+C) y vuelve a arrancarlo.


## Dominio propio

https://mngdrone.vercel.app/

Vercel → **Settings → Domains** → añade tu dominio y sigue las instrucciones DNS.
