/* MNG.DRONE · capa de efectos (todo opcional: si falla, la web sigue igual) */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var nav = document.querySelector("nav");

  /* ── Grano de película: textura de ruido generada una vez ── */
  if (!reduce) {
    try {
      var c = document.createElement("canvas");
      c.width = c.height = 180;
      var ctx = c.getContext("2d");
      var img = ctx.createImageData(180, 180);
      for (var i = 0; i < img.data.length; i += 4) {
        var v = Math.random() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      var g = document.createElement("div");
      g.className = "grain";
      g.setAttribute("aria-hidden", "true");
      g.style.backgroundImage = "url(" + c.toDataURL("image/png") + ")";
      document.body.appendChild(g);
    } catch (e) {}
  }

  /* ── Scroll: nav compacta, barra de progreso, altímetro y botón RTH ── */
  var altBox = document.querySelector(".alt");
  var altNum = document.getElementById("alt");
  var rth = document.querySelector(".rth");
  var ticking = false;

  /* ── Brújula de la telemetría: marcas cada 10°, rótulos cada 30° ── */
  var tape = document.querySelector(".compass-tape");
  var hdg = document.getElementById("hdg");
  if (tape) {
    var names = { 0: "N", 45: "NE", 90: "E", 135: "SE", 180: "S", 225: "SO", 270: "O", 315: "NO" };
    var html = "";
    for (var d = -360; d <= 720; d += 15) {
      var dd = ((d % 360) + 360) % 360;
      var lab = names[dd] || (dd % 30 === 0 ? String(dd) : "");
      if (lab) html += '<span' + (names[dd] ? ' class="card"' : "") + ' style="left:' + ((d + 360) * 10) + 'px">' + lab + "</span>";
    }
    tape.innerHTML = html;
  }

  /* ── Frase destacada: se parte en palabras que se iluminan con el scroll ── */
  var words = [];
  var big = document.querySelector("[data-words]");
  var hlWords = { "arriba,": 1, "movimiento": 1, "prisas.": 1 };
  if (big) {
    var parts = big.textContent.trim().split(/\s+/);
    big.setAttribute("aria-label", big.textContent.trim());
    big.innerHTML = parts.map(function (w) {
      return '<span class="w' + (hlWords[w.toLowerCase()] ? " hl" : "") + '" aria-hidden="true">' + w + "</span>";
    }).join(" ");
    words = Array.prototype.slice.call(big.querySelectorAll(".w"));
    if (reduce) { words.forEach(function (w) { w.classList.add("on"); }); words = []; }
  }
  function paintWords() {
    var r = big.getBoundingClientRect();
    var vh = window.innerHeight;
    // empieza cuando la frase asoma por abajo (90 % de la pantalla)
    // y termina cuando su última línea llega al 70 %, con la frase entera a la vista
    var t = (vh * 0.9 - r.top) / (r.height + vh * 0.2);
    var lit = Math.round(Math.min(1, Math.max(0, t)) * words.length);
    for (var i = 0; i < words.length; i++) words[i].classList.toggle("on", i < lit);
  }

  function onScroll() {
    var y = window.scrollY;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, y / max));
    nav.classList.toggle("scrolled", y > 30);
    nav.style.setProperty("--p", p.toFixed(4));
    if (altBox) {
      altBox.style.setProperty("--p", p.toFixed(4));
      altBox.classList.toggle("show", y > 200);
      // 120 m es la altura máxima permitida en la categoría abierta
      altNum.textContent = String(Math.round(p * 120)).padStart(3, "0");
    }
    if (rth) rth.classList.toggle("show", y > window.innerHeight * 0.9);
    if (tape) {
      var h = (215 + p * 360) % 360; // rumbo inicial SO, gira al bajar
      tape.style.setProperty("--h", (h * 10).toFixed(1));
      hdg.textContent = String(Math.round(h) % 360).padStart(3, "0");
    }
    if (words.length) paintWords();
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (rth) rth.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ── Sección activa en el menú ── */
  var links = Array.prototype.slice.call(document.querySelectorAll("nav ul a"));
  if ("IntersectionObserver" in window && links.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s) spy.observe(s);
    });
    var hero = document.getElementById("inicio");
    if (hero) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) links.forEach(function (a) { a.classList.remove("active"); });
      }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
    }
  }

  /* ── Menú móvil ── */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    var closeTimer;
    function setMenu(open) {
      clearTimeout(closeTimer);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("menu-open", open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("open"); }); });
      } else {
        menu.classList.remove("open");
        closeTimer = setTimeout(function () { menu.hidden = true; }, reduce ? 0 : 650);
      }
    }
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setMenu(false); burger.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 760 && !menu.hidden) setMenu(false); });
  }

  /* ── Código de tiempo en directo en el visor (HH:MM:SS:FF a 30 fps) ── */
  var tc = document.getElementById("tc");
  if (tc) {
    var t0 = performance.now();
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var lastTxt = "";
    (function tick(now) {
      var ms = now - t0;
      var f = Math.floor(ms / (1000 / 30)) % 30;
      var s = Math.floor(ms / 1000);
      var txt = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60) + ":" + pad(reduce ? 0 : f);
      if (txt !== lastTxt) { tc.textContent = txt; lastTxt = txt; }
      if (reduce) setTimeout(function () { tick(performance.now()); }, 1000);
      else requestAnimationFrame(tick);
    })(t0);
  }

  /* ── Visor: la imagen y la mira siguen al ratón ── */
  var vf = document.querySelector(".viewfinder");
  if (vf && finePointer && !reduce) {
    var heroEl = document.querySelector(".hero");
    heroEl.addEventListener("pointermove", function (e) {
      var r = vf.getBoundingClientRect();
      var mx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
      var my = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      vf.style.setProperty("--mx", Math.max(-1, Math.min(1, mx)).toFixed(3));
      vf.style.setProperty("--my", Math.max(-1, Math.min(1, my)).toFixed(3));
    });
    heroEl.addEventListener("pointerleave", function () {
      vf.style.setProperty("--mx", 0);
      vf.style.setProperty("--my", 0);
    });
  }

  /* ── Botones magnéticos ── */
  if (finePointer && !reduce) {
    document.querySelectorAll("[data-magnetic]").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        var y = (e.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ── Aparición al hacer scroll ──
     Solo se ocultan los elementos que empiezan fuera de pantalla,
     así nada parpadea al cargar y todo lo visible se ve desde el principio. */
  if (!reduce && "IntersectionObserver" in window) {
    var groups = [
      [".head .eyebrow, .head h2, .head > p", 0.08],
      [".tele-top, .stat, .compass", 0.1],
      [".statement .eyebrow", 0],
      [".event", 0.09],
      [".svc", 0.1],
      [".steps li", 0.12],
      [".price .eyebrow, .quote, .price > div > p, .conds", 0.08],
      [".factors li", 0.07],
      [".contact .eyebrow, .contact h2, .contact-grid > div > p, .direct, .contact form", 0.08]
    ];
    var targets = [];
    groups.forEach(function (g) {
      var els = document.querySelectorAll(g[0]);
      var idx = new Map();
      els.forEach(function (el) {
        var parent = el.parentElement;
        var n = idx.get(parent) || 0;
        idx.set(parent, n + 1);
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
        el.style.setProperty("--d", (n * g[1]).toFixed(2) + "s");
        el.classList.add("rv");
        targets.push(el);
      });
    });
    // Los títulos se ocultan con clip-path, y un elemento recortado no "entra" en pantalla
    // para el observador: por eso de ellos se vigila el contenedor.
    var watched = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        (watched.get(en.target) || []).forEach(function (el) { el.classList.add("in"); });
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) {
      var key = el.tagName === "H2" ? el.parentElement : el;
      if (!watched.has(key)) { watched.set(key, []); io.observe(key); }
      watched.get(key).push(el);
    });
    // Los pasos que ya están en pantalla al cargar también se rellenan
    document.querySelectorAll(".steps li:not(.rv)").forEach(function (li) { li.classList.add("in"); });
  } else {
    document.querySelectorAll(".steps li").forEach(function (li) { li.classList.add("in"); });
  }

  /* ── Cifras que cuentan hacia arriba al aparecer ── */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduce && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, end = +el.getAttribute("data-count"), t0 = null, dur = end > 20 ? 1600 : 900;
        (function step(ts) {
          if (t0 === null) t0 = ts;
          var k = Math.min(1, (ts - t0) / dur);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        })(performance.now());
        el.textContent = "0";
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ── Modo claro / oscuro ── */
  var toggle = document.querySelector(".theme-toggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function isLight() { return doc.getAttribute("data-theme") === "light"; }
  function syncToggle() {
    var label = isLight() ? "Cambiar a modo oscuro" : "Cambiar a modo claro";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    if (metaTheme) metaTheme.setAttribute("content", isLight() ? "#f4f8fc" : "#141414");
  }
  function applyTheme(light) {
    if (light) doc.setAttribute("data-theme", "light"); else doc.removeAttribute("data-theme");
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) {}
    syncToggle();
  }
  if (toggle) {
    syncToggle();
    toggle.addEventListener("click", function () {
      var next = !isLight();
      if (document.startViewTransition && !reduce) {
        // Círculo que se abre desde el botón hasta cubrir toda la pantalla
        var r = toggle.getBoundingClientRect();
        var x = r.left + r.width / 2, y = r.top + r.height / 2;
        var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        var t = document.startViewTransition(function () { applyTheme(next); });
        t.ready.then(function () {
          doc.animate(
            { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
            { duration: 750, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }
          );
        }).catch(function () {});
      } else {
        if (!reduce) {
          doc.classList.add("theme-fade");
          setTimeout(function () { doc.classList.remove("theme-fade"); }, 600);
        }
        applyTheme(next);
      }
    });
  }

  /* ── Botón del formulario: aviso mientras se abre WhatsApp ── */
  var form = document.getElementById("f");
  var send = document.getElementById("send");
  if (form && send) {
    form.addEventListener("submit", function () {
      if (!document.getElementById("nombre").value.trim()) return;
      var label = send.textContent;
      send.textContent = "Abriendo WhatsApp…";
      send.classList.add("sending");
      setTimeout(function () { send.textContent = label; send.classList.remove("sending"); }, 2200);
    });
  }
})();
