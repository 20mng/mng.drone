(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("f");
  var btn = document.getElementById("send");
  var wa = document.getElementById("wa");
  var status = document.getElementById("status");

  function show(msg, kind) {
    status.textContent = msg;
    status.className = "status full " + kind;
    status.hidden = false;
  }

  function val(id) { return document.getElementById(id).value.trim(); }

  // Botón "Escribir por WhatsApp": lleva lo que el cliente haya rellenado como mensaje inicial.
  function buildWa() {
    var f = val("fecha");
    var t = "Hola MNG.DRONE" + (val("nombre") ? ", soy " + val("nombre") : "") + ". Me gustaría pedir presupuesto.\n\nEvento: " + val("tipo");
    if (f) t += "\nFecha: " + f.split("-").reverse().join("/");
    if (val("lugar")) t += "\nLugar: " + val("lugar");
    if (val("mensaje")) t += "\n\n" + val("mensaje");
    wa.href = "/api/whatsapp?text=" + encodeURIComponent(t);
  }
  ["nombre", "tipo", "fecha", "lugar", "mensaje"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", buildWa);
  });
  buildWa();

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombre.trim()) return show("Escribe tu nombre para que sepa a quién responder.", "err");
    if (data.telefono.replace(/\D/g, "").length < 9) return show("Escribe tu teléfono para que pueda contestarte por WhatsApp.", "err");
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return show("Revisa el email, parece que no es válido.", "err");

    btn.disabled = true;
    btn.textContent = "Enviando…";
    try {
      var r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      var j = await r.json().catch(function () { return {}; });
      if (!r.ok) throw new Error(j.error || "No se pudo enviar.");
      form.reset();
      buildWa();
      show("Solicitud enviada. Te escribo pronto por WhatsApp con tu presupuesto.", "ok");
    } catch (err) {
      show(err.message + " Inténtalo de nuevo o usa el botón de WhatsApp.", "err");
    } finally {
      btn.disabled = false;
      btn.textContent = "Pedir presupuesto";
    }
  });
})();
