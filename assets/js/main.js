/* Shared behaviour across every page */

function reiGetUser(){
  try{ return JSON.parse(localStorage.getItem("reiUser") || "null"); }catch(e){ return null; }
}
function reiSetUser(u){ localStorage.setItem("reiUser", JSON.stringify(u)); }
function reiLogout(){ localStorage.removeItem("reiUser"); window.location.href="index.html"; }

function reiInitHeader(){
  const btn  = document.getElementById("loginBtn");
  const user = reiGetUser();

  if(btn && user){
    btn.href = "dashboard.html";
    const firstName = (user.name || "User").split(" ")[0];
    btn.innerHTML = `👤 ${firstName}`;
    btn.title = "Go to Dashboard";
  }
}

// text-size buttons (A- A A+)
function reiInitTextSize(){
  const root = document.documentElement;
  document.querySelectorAll("[data-fontstep]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const cur = parseFloat(getComputedStyle(root).fontSize) || 16;
      const step = parseFloat(b.dataset.fontstep);
      const next = Math.min(20, Math.max(13, cur + step));
      root.style.fontSize = next + "px";
    });
  });
}

function reiInitSettings(){
  // Load Theme
  const savedTheme = localStorage.getItem("reiTheme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Load Large Text
  const savedLargeText = localStorage.getItem("reiLargeText");
  const root = document.documentElement;
  if (savedLargeText === "true") {
    root.style.fontSize = "18px";
  }

  // Hook up settings toggles (only run if on settings.html)
  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    darkToggle.checked = (savedTheme === "dark");
    darkToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("reiTheme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("reiTheme", "light");
      }
    });
  }

  const textToggle = document.getElementById("largeTextToggle");
  if (textToggle) {
    textToggle.checked = (savedLargeText === "true");
    textToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        root.style.fontSize = "18px";
        localStorage.setItem("reiLargeText", "true");
      } else {
        root.style.fontSize = "16px";
        localStorage.setItem("reiLargeText", "false");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  reiInitHeader();
  reiInitTextSize();
  reiInitSettings();

  const homeStartBtn = document.getElementById("homeStartBtn");
  if (homeStartBtn) {
    homeStartBtn.addEventListener("click", () => {
      const locationInput = document.getElementById("homeLocationInput");
      const capitalInput = document.getElementById("homeCapitalInput");
      
      const val1 = locationInput ? locationInput.value : '';
      const val2 = capitalInput ? parseFloat(capitalInput.value) || 0 : 0;
      
      if (typeof saveGramVentureState === 'function') {
        saveGramVentureState('gramVentureSetup', { location: val1, capital: val2, sector: 'agriculture' });
      }
      
      window.location.href = "dashboard.html";
    });
  }
});
