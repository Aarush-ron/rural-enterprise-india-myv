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

document.addEventListener("DOMContentLoaded", ()=>{
  reiInitHeader();
  reiInitTextSize();

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
