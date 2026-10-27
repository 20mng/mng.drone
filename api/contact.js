// Función serverless de Vercel: recibe el formulario y te lo manda por email con Resend.
// Variables de entorno necesarias (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  → clave de https://resend.com
//   CONTACT_EMAIL   → email donde quieres recibir las solicitudes
//   CONTACT_FROM    → (opcional) remitente verificado, p. ej. "MNG.DRONE <web@tudominio.com>"

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const { nombre = "", email = "", telefono = "", tipo = "", fecha = "", lugar = "", mensaje = "", web = "" } = body;

  // Campo trampa: si un bot lo rellena, fingimos éxito y no enviamos nada.
  if (web) return res.status(200).json({ ok: true });

  if (!nombre.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "Faltan el nombre o un email válido." });
  }
  if ([nombre, email, telefono, tipo, fecha, lugar].some((v) => String(v).length > 200) || mensaje.length > 5000) {
    return res.status(400).json({ error: "El mensaje es demasiado largo." });
  }

  const { RESEND_API_KEY, CONTACT_EMAIL, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    return res.status(500).json({ error: "El formulario no está configurado todavía." });
  }

  const fechaTxt = fecha ? fecha.split("-").reverse().join("/") : "Sin fecha";
  const filas = [
    ["Nombre", nombre], ["Email", email], ["Teléfono", telefono || "—"],
    ["Evento", tipo], ["Fecha", fechaTxt], ["Lugar", lugar || "—"]
  ];

  const html = `
    <h2 style="font-family:Arial,sans-serif">Nueva solicitud de presupuesto</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      ${filas.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${esc(mensaje) || "<i>Sin mensaje</i>"}</p>`;

  const text = filas.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${mensaje}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM || "MNG.DRONE <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Presupuesto: ${tipo} · ${nombre} · ${fechaTxt}`,
        html,
        text
      })
    });
    if (!r.ok) {
      console.error("Resend:", r.status, await r.text());
      return res.status(502).json({ error: "No se pudo enviar el mensaje." });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ error: "No se pudo enviar el mensaje." });
  }
}
