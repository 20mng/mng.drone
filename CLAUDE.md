# MNG.DRONE · web

Web para clientes de MNG.DRONE (Instagram @mng.drone): grabación aérea con dron para bodas,
celebraciones y eventos de particulares. Publicada en https://www.mngdrone.es (Vercel, desde
GitHub 20mng/mng.drone). El objetivo de la página es que el cliente vea el servicio y escriba
por WhatsApp.

Idioma: todo el contenido y la comunicación en español de España.

## Stack y despliegue
- HTML + CSS + JS sin frameworks ni build. No añadir dependencias ni bundlers.
- Cada `git push` a `main` despliega automáticamente en Vercel.
- Probar en local: `vercel dev` (necesita `WHATSAPP_PHONE` en `.env.local`).

## Archivos
- `index.html`: toda la página (una sola página con secciones).
- `styles.css`: estilos base y paleta oscura (tokens en `:root`).
- `fx.css` / `fx.js`: efectos y animaciones (decorativos; la web funciona sin ellos).
- `theme.css`: modo claro y botón de tema.
- `main.js`: formulario → abre WhatsApp con el mensaje escrito.
- `api/whatsapp.js`: función de Vercel que redirige a wa.me usando la variable `WHATSAPP_PHONE`.
- `assets/`: imágenes, logo (`logoWhite.png`), favicons, imagen para compartir (`og-mng.jpg`).
- `sitemap.xml`, `robots.txt`: SEO. Datos estructurados JSON-LD en el `<head>`.

## Reglas que hay que respetar
- El número de teléfono NUNCA aparece en el código ni en la página. Solo vive en la variable de entorno.
- Tarifas: siempre "precio a consultar". No poner precios.
- No mencionar "Andalucía" en ningún sitio. La única ubicación es Jaén, y solo en los datos estructurados.
- Contacto solo por el formulario de WhatsApp e Instagram. Sin email ni teléfono visibles.
- No cambiar textos, tipografías ni estilos que no se hayan pedido. Cambiar solo lo que se pide.
- No inventar testimonios, clientes, cifras ni trabajos.
- Mantener la etiqueta `google-site-verification` del `<head>`.
- El modo oscuro es el principal; el modo claro usa azul marino y azul celeste.
- Respetar `prefers-reduced-motion` y que todo funcione en móvil (~390 px) sin scroll horizontal.

## Lo que el dueño quiere conservar
- El visor de cámara de la portada (REC, código de tiempo que corre, línea de escaneo, esquinas).
- La cinta de características que se desplaza (Grabación HD/4K, Entrega en 3–5 días, Vuelos según normativa…).
- El altímetro lateral que sube con el scroll y la línea con punto rojo bajo el menú.
- Panel de telemetría con cifras y brújula; frase "Mi forma de trabajar" que se ilumina.

## Descartado (no volver a añadir)
- Cursor personalizado.
- Grano de película en móvil.
