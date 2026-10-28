// Redirige al chat de WhatsApp sin que tu número aparezca en el código de la web.
// Usa la misma variable WHATSAPP_PHONE que el formulario.
// Uso: /api/whatsapp?text=Mensaje%20inicial

export default function handler(req, res) {
  const phone = String(process.env.WHATSAPP_PHONE || "").replace(/\D/g, "");
  if (!phone) return res.status(500).send("WhatsApp no está configurado todavía.");

  const text = String(req.query.text || "Hola MNG.DRONE, me gustaría pedir presupuesto para un evento.").slice(0, 1500);
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, `https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
}
