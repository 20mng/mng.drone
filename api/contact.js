// Función serverless de Vercel: recibe el formulario y te avisa por WhatsApp con CallMeBot.
// Variables de entorno (Vercel → Settings → Environment Variables):
//   WHATSAPP_PHONE    → tu número con prefijo y sin "+", p. ej. 34600111222
//   CALLMEBOT_APIKEY  → la clave que te manda CallMeBot por WhatsApp

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body || "{}"); } catch { body = {}; }
  }
  const { nombre = "", email = "", telefono = "", tipo = "", fecha = "", lugar = "", mensaje = "", web = "" } = body;

  // Campo trampa: si un bot lo rellena, fingimos éxito y no enviamos nada.
  if (web) return res.status(200).json({ ok: true });

  if (!String(nombre).trim()) return res.status(400).json({ error: "Falta el nombre." });
  if (String(telefono).replace(/\D/g, "").length < 9) return res.status(400).json({ error: "Falta un teléfono válido." });
  if (email && !EMAIL_RE.test(String(email).trim())) return res.status(400).json({ error: "El email no es válido." });
  if ([nombre, email, telefono, tipo, fecha, lugar].some((v) => String(v).length > 200) || String(mensaje).length > 1500) {
    return res.status(400).json({ error: "El mensaje es demasiado largo." });
  }

  const { WHATSAPP_PHONE, CALLMEBOT_APIKEY } = process.env;
  if (!WHATSAPP_PHONE || !CALLMEBOT_APIKEY) {
    return res.status(500).json({ error: "El formulario no está configurado todavía." });
  }

  const fechaTxt = fecha ? String(fecha).split("-").reverse().join("/") : "Sin fecha";
  const telLimpio = String(telefono).replace(/[^\d+]/g, "");
  const telWa = telLimpio.replace(/^\+/, "").replace(/^(?=[6-9]\d{8}$)/, "34");

  const texto = [
    "*Nueva solicitud · MNG.DRONE*",
    "",
    `*Nombre:* ${nombre}`,
    `*Teléfono:* ${telefono}`,
    `*Email:* ${email || "—"}`,
    `*Evento:* ${tipo}`,
    `*Fecha:* ${fechaTxt}`,
    `*Lugar:* ${lugar || "—"}`,
    "",
    mensaje ? `*Mensaje:*\n${mensaje}` : "_Sin mensaje_",
    "",
    `Responder: https://wa.me/${telWa}`
  ].join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(WHATSAPP_PHONE) +
    "&text=" + encodeURIComponent(texto) +
    "&apikey=" + encodeURIComponent(CALLMEBOT_APIKEY);

  try {
    const r = await fetch(url);
    const out = await r.text();
    // CallMeBot responde 200 incluso con algunos errores; los detectamos por el texto.
    if (!r.ok || /error|invalid|apikey is not/i.test(out)) {
      console.error("CallMeBot:", r.status, out.slice(0, 500));
      return res.status(502).json({ error: "No se pudo enviar el mensaje." });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: "No se pudo enviar el mensaje." });
  }
}
