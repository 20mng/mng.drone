(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("f");
  var nombre = document.getElementById("nombre");
  var status = document.getElementById("status");

  function val(id) { return document.getElementById(id).value.trim(); }

  function error(msg) {
    status.textContent = msg;
    status.className = "status full err";
    status.hidden = false;
    nombre.setAttribute("aria-invalid", "true");
    nombre.focus();
  }

  nombre.addEventListener("input", function () {
    if (nombre.value.trim()) { status.hidden = true; nombre.removeAttribute("aria-invalid"); }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!val("nombre")) return error("Escribe tu nombre para poder enviarme el mensaje.");

    var t = "Hola MNG.DRONE, soy " + val("nombre") + ". Me gustaría información para un evento.\n\nEvento: " + val("tipo");
    if (val("fecha")) t += "\nFecha: " + val("fecha").split("-").reverse().join("/");
    if (val("lugar")) t += "\nLugar: " + val("lugar");
    if (val("mensaje")) t += "\n\n" + val("mensaje");

    var url = "/api/whatsapp?text=" + encodeURIComponent(t);
    var w = window.open(url, "_blank");
    if (w) w.opener = null; else window.location.href = url;
  });
})();
