// Easter egg: clicar na foto.
// 1 clique  → pulo, "+1 XP" e conquista "Curioso"
// 5 cliques → barra de XP e conquista "Persistente"
// 10 cliques → foto troca pela versão pixel art (assets/img/pfp-pixel.jpeg) e conquista "Modder"; cada clique seguinte alterna normal/8-bit.
(function () {
  var btn = document.getElementById("avatar-btn");
  var img = document.getElementById("avatar");
  var xp = document.getElementById("xp");
  var fill = document.getElementById("xp-fill");
  var toast = document.getElementById("toast");
  if (!btn || !img) return;

  var TEXT = {
    pt: {
      unlocked: "Conquista desbloqueada",
      1: ["Curioso", "Clicou na foto."],
      5: ["Persistente", "Ainda clicando."],
      10: ["Modder", "Desbloqueou o modo 8-bit."],
      aero: ["Nostalgia 2007", "Ativou o modo Frutiger Aero."]
    },
    en: {
      unlocked: "Achievement unlocked",
      1: ["Curious", "Clicked the photo."],
      5: ["Persistent", "Still clicking."],
      10: ["Modder", "Unlocked 8-bit mode."],
      aero: ["Nostalgia 2007", "Activated Frutiger Aero mode."]
    }
  };
  var GOAL = 10;
  var clicks = 0;
  var originalSrc = img.getAttribute("src");
  var PIXEL_SRC = "assets/img/pfp-pixel.jpeg";
  var AERO_SRC = "assets/img/pfp-frutiger.jpeg";
  new Image().src = PIXEL_SRC; // pré-carrega para a troca ser instantânea
  new Image().src = AERO_SRC;
  var pixelOn = false;
  var toastTimer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function lang() {
    return (document.documentElement.lang || "pt").indexOf("en") === 0 ? "en" : "pt";
  }

  function trophySvg() {
    // troféu em pixels (grade 10x10)
    var px = [
      "0111111110", "1111111111", "1011111101", "1011111101", "0111111110",
      "0011111100", "0001111000", "0000110000", "0011111100", "0111111110"
    ];
    var rects = "";
    px.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] === "1") rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
      }
    });
    return '<svg class="toast__icon" viewBox="0 0 10 10" aria-hidden="true" shape-rendering="crispEdges">' + rects + "</svg>";
  }

  function showAchievement(n) {
    var t = TEXT[lang()];
    var a = t[n];
    toast.innerHTML =
      trophySvg() +
      '<div class="toast__body"><p class="toast__kicker">' + t.unlocked + "</p>" +
      '<p class="toast__title">' + a[0] + "</p>" +
      '<p class="toast__desc">' + a[1] + "</p></div>";
    toast.hidden = false;
    toast.classList.remove("toast--in");
    void toast.offsetWidth; // reinicia a animação
    toast.classList.add("toast--in");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4200);
  }

  function floatXp() {
    var el = document.createElement("span");
    el.className = "xp-float";
    el.textContent = "+1 XP";
    el.setAttribute("aria-hidden", "true");
    el.style.left = (35 + Math.random() * 30) + "%";
    btn.appendChild(el);
    setTimeout(function () { el.remove(); }, 900);
  }

  function hop() {
    if (reduceMotion) return;
    btn.classList.remove("hop");
    void btn.offsetWidth;
    btn.classList.add("hop");
  }

  // a foto do modo Aero tem prioridade; fora dele vale o estado normal/8-bit
  function updatePhoto() {
    var aero = document.documentElement.classList.contains("aero");
    img.setAttribute("src", aero ? AERO_SRC : (pixelOn ? PIXEL_SRC : originalSrc));
  }

  function setPixel(on) {
    pixelOn = on;
    updatePhoto();
    btn.classList.toggle("is-pixel", on);
  }

  btn.addEventListener("click", function () {
    clicks++;
    hop();
    floatXp();

    if (clicks >= 5 && clicks <= GOAL) {
      xp.hidden = false;
      fill.style.width = (clicks / GOAL) * 100 + "%";
      xp.classList.toggle("xp--full", clicks === GOAL);
    }
    // barra completa: some com fade depois de um tempo e não volta mais
    if (clicks === GOAL) {
      setTimeout(function () { xp.classList.add("xp--out"); }, 2500);
      setTimeout(function () { xp.hidden = true; }, 3100);
    }

    if (clicks === 1 || clicks === 5) showAchievement(clicks);
    if (clicks === GOAL) { setPixel(true); showAchievement(GOAL); }
    else if (clicks > GOAL) setPixel(!pixelOn);
  });

  // ---------- modo Frutiger Aero ----------
  // Ativa clicando em "Frutiger" no rodapé ou digitando "aero". Ativar de novo desliga.
  var aeroBtn = document.getElementById("aero-btn");
  var aeroUnlocked = false;
  var bubbles = null;

  function makeBubbles() {
    var layer = document.createElement("div");
    layer.className = "aero-bubbles";
    layer.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 18; i++) {
      var b = document.createElement("span");
      var size = 18 + Math.random() * 70;
      b.style.width = b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = 9 + Math.random() * 14 + "s";
      b.style.animationDelay = -Math.random() * 20 + "s";
      b.style.setProperty("--y", Math.round(Math.random() * 90)); // posição fixa sem animação
      layer.appendChild(b);
    }
    return layer;
  }

  function toggleAero() {
    var on = !document.documentElement.classList.contains("aero");
    document.documentElement.classList.toggle("aero", on);
    updatePhoto();
    if (on) {
      if (!bubbles) bubbles = makeBubbles();
      document.body.prepend(bubbles);
      if (!aeroUnlocked) { aeroUnlocked = true; showAchievement("aero"); }
    } else if (bubbles) {
      bubbles.remove();
    }
  }

  if (aeroBtn) aeroBtn.addEventListener("click", toggleAero);

  var typed = "";
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === "aero") { typed = ""; toggleAero(); }
  });
})();
