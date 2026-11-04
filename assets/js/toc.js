// Índice: marca a seção visível (aria-current) e rola sem trocar o #hash,
// já que o hash #en/#pt é usado para escolher o idioma.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (!links.length) return;
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });

  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      if (!targets[i]) return;
      e.preventDefault();
      targets[i].scrollIntoView({ block: "start" });
    });
  });

  function update() {
    var mark = window.innerHeight * 0.35;
    var current = -1;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= mark) current = i; });
    // no fim da página, o rodapé (contato) é o atual
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = targets.length - 1;
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
