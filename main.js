(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("f");
  var btn = document.getElementById("send");
  var status = document.getElementById("status");

  function show(msg, kind) {
    status.textContent = msg;
    status.className = "status full " + kind;
    status.hidden = false;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombre.trim()) return show("Escribe tu nombre para que sepa a quién responder.", "err");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return show("Revisa el email: hace falta uno válido para enviarte el presupuesto.", "err");

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
      show("Mensaje enviado. Te escribo pronto con tu presupuesto.", "ok");
    } catch (err) {
      show(err.message + " Inténtalo de nuevo o escríbeme por Instagram (@mng.drone).", "err");
    } finally {
      btn.disabled = false;
      btn.textContent = "Pedir presupuesto";
    }
  });
})();
