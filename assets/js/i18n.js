// Troca de idioma PT/EN.
// O português fica no próprio HTML; aqui ficam só as traduções em inglês,
// indexadas pelo atributo data-i18n de cada elemento.
(function () {
  var EN = {
    role: "AI &amp; Data Engineer",
    bio1: "Software engineer (R&amp;D) at SPEED Lab (DCC/UFMG). Belo Horizonte, Brazil.",
    bio2: "Computer Science at UFMG. Computer technician degree from CEFET-MG.",
    bio3: "Experience with AI agents, LLM-based solutions and machine learning.",
    bio4: "In my spare time, I make game mods.",

    edu: "Education",
    ongoing: "in progress",
    done: "completed",
    bsc: "B.Sc. in Computer Science",
    d_ufmg: "Mar 2025 – 2029 (expected)",
    dcc: "Department of Computer Science (DCC) · Belo Horizonte",
    core: "Core courses",
    chips: "<li>Data Structures</li><li>Algorithms</li><li>Databases</li><li>Discrete Mathematics</li><li>Probability</li>",
    tec: "Computer Technician, integrated with high school",
    d_cefet: "Mar 2022 – Dec 2024",
    cap: "Capstone project",
    tcc: "<strong>FruitAdvisor</strong>: Flutter app that recognizes fruits from a photo using a convolutional neural network and shows their nutritional information.",
    rep_h: "Student representation",
    rep: "Class representative in 2022.",
    c1: "Advanced English · 181/190",
    gold: "Gold",
    onc: "Brazilian National Science Olympiad",
    medal: "Gold medal · 2022",
    ml_org: "DeepLearning.AI &amp; Stanford Online · online program (Coursera)",
    d_ml: "Oct 2026 – present",

    exp: "Experience",
    cv: "Full résumé (PT)",
    speed_d: "Research and development, Embrapii grant",
    speed_r: "Software Engineer (R&amp;D)",
    d_speed: "Nov 2026 – present",
    reh_d: "Generative AI, agents and data pipelines for internal teams",
    reh_r1: "AI &amp; Data Engineering Intern",
    d_reh1: "Oct 2025 – Oct 2026",
    reh_r2: "Software Engineering Trainee",
    d_reh2: "Jun 2025 – Sep 2025",
    points:
      "<li>Transcription and classification pipeline for 1,000+ educational videos with Whisper, Airflow and PostgreSQL.</li>" +
      "<li>Monitoring for about 80 Azure VMs with Grafana and Prometheus.</li>" +
      "<li>LLM agent with tool calling to query VM, cost and network data in natural language.</li>" +
      "<li>Metadata catalog for the company's main databases in React and FastAPI, integrated with an AI agent.</li>" +
      "<li>Solutions with RAG, MCP and model evaluation, from requirements gathering with business teams to validation.</li>",
    res_d: "Published paper on drug seizures in Divinópolis, with UFSJ and the Minas Gerais Military Police",
    res_r: "Junior Researcher",
    d_res: "Jan 2023 – Dec 2024",
    ufsj: "UFSJ · Dept. of Toxicology",
    ufsj_d: "IT infrastructure for researchers and laboratories",
    ufsj_r: "IT Support Technician",
    d_ufsj: "Oct 2023 – Sep 2024",

    skills: "Skills",
    s_ai: "AI &amp; data",
    s_ai_d: "LLMs, RAG, MCP, tool calling, model evaluation, machine learning, OpenAI API, Whisper, Airflow, PostgreSQL, MySQL, data analysis",
    s_web: "Backend &amp; web",
    s_inf: "Infrastructure",
    s_prog: "Programming",
    s_eng: "Engineering",
    s_eng_d: "Software development, architecture, secure coding, requirements gathering, prototyping",
    s_res: "Research",
    s_res_d: "Scientific writing, geospatial data analysis",
    s_lang: "Languages",
    s_lang_d: "Portuguese (native), English (C1, full professional)",

    alt: "Photo of Thales Amaral",
    contact: "Contact",
    cv_pdf: "Résumé (PDF, Portuguese)"
  };
  var META_EN = "Thales Amaral, AI and data engineer. R&D at SPEED Lab (DCC/UFMG) and Computer Science student at UFMG.";

  var root = document.documentElement;
  var meta = document.querySelector('meta[name="description"]');
  var nodes = document.querySelectorAll("[data-i18n]");
  var labels = document.querySelectorAll("[data-i18n-label]");
  var alts = document.querySelectorAll("[data-i18n-alt]");
  var buttons = document.querySelectorAll(".lang button");

  // guarda o português original de cada elemento
  nodes.forEach(function (el) { el._pt = el.innerHTML; });
  labels.forEach(function (el) { el._pt = [el.getAttribute("aria-label"), el.getAttribute("title")]; });
  alts.forEach(function (el) { el._pt = el.getAttribute("alt"); });
  var metaPt = meta ? meta.getAttribute("content") : "";

  function apply(lang) {
    var en = lang === "en";
    nodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.innerHTML = en && EN[k] ? EN[k] : el._pt;
    });
    labels.forEach(function (el) {
      var k = el.getAttribute("data-i18n-label");
      el.setAttribute("aria-label", en ? EN[k] : el._pt[0]);
      if (el._pt[1] !== null) el.setAttribute("title", en ? EN[k] : el._pt[1]);
    });
    alts.forEach(function (el) {
      el.setAttribute("alt", en ? EN[el.getAttribute("data-i18n-alt")] : el._pt);
    });
    if (meta) meta.setAttribute("content", en ? META_EN : metaPt);
    root.setAttribute("lang", en ? "en" : "pt-BR");
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function initial() {
    var h = (location.hash || "").slice(1).toLowerCase();
    if (h === "en" || h === "pt") return h;
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) {}
    var nav = (navigator.language || "pt").toLowerCase();
    return nav.indexOf("pt") === 0 ? "pt" : "en";
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-lang");
      apply(lang);
      try { localStorage.setItem("lang", lang); } catch (e) {}
    });
  });

  apply(initial());
})();
