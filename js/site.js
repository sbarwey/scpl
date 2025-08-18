/* Theme toggle + common helpers + LAB NAME injection */
(function(){
  const root = document.documentElement;
  const KEY = "site-theme";
  function applyTheme(t){ root.setAttribute("data-theme", t); }
  function prefersDark(){ return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }
  const saved = localStorage.getItem(KEY);
  applyTheme(saved || (prefersDark() ? "dark" : "light"));

  function setBtnLabel(btn){
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀︎ Light" : "☾ Dark";
    btn.setAttribute("aria-pressed", String(isDark));
  }

  /* ===========================
     Single source of truth
     =========================== */
  const LAB_NAME = "Scientific Computing and Propulsion Lab"; // <— change once here

  document.addEventListener("DOMContentLoaded", ()=>{
    // Theme button + year
    const btn = document.getElementById("theme-toggle");
    if(btn){
      setBtnLabel(btn);
      btn.addEventListener("click", ()=>{
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(KEY, next);
        setBtnLabel(btn);
      });
    }
    const year = document.getElementById("year");
    if(year) year.textContent = new Date().getFullYear();

    // Inject lab name wherever .lab-name appears
    document.querySelectorAll(".lab-name").forEach(el => { el.textContent = LAB_NAME; });

    // Replace {{LAB_NAME}} in <title> and meta[name=description]
    const titleEl = document.querySelector("title");
    if(titleEl && titleEl.textContent.includes("{{LAB_NAME}}")){
      titleEl.textContent = titleEl.textContent.replaceAll("{{LAB_NAME}}", LAB_NAME);
    }
    const metaDesc = document.querySelector("meta[name='description']");
    if(metaDesc && (metaDesc.content||"").includes("{{LAB_NAME}}")){
      metaDesc.content = metaDesc.content.replaceAll("{{LAB_NAME}}", LAB_NAME);
    }
  });
})();