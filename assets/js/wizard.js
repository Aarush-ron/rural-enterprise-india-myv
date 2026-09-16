/* =====================================================================
   Gramventure — Business & Financing Wizard
   Implements: Location -> Business Scale -> Budget -> Sectors -> Business
   List -> Choose Business -> AI Analysis -> Project Cost -> Financing
   Router -> Existing Loans -> EMI Engine -> Moratorium Analysis ->
   Financial Position -> Repayment Capacity -> Financing Summary ->
   Confirm -> Loan Application -> Document Submission -> Loan Processing
   -> Loan Granted -> Profile Sync -> Dashboard -> Upcoming EMI
===================================================================== */

const STEP_ORDER = [
  "location","scale","sector","list","analysis","cost","router",
  "emiEngine","summary","application","documents","processing","activation","granted"
];

const STAGE_LABELS = ["Profile","Choose Business","Project Cost","Financing Check","Summary"];
const STEP_TO_STAGE = {
  location:0, scale:0, sector:0,
  list:1, analysis:1,
  cost:2, router:2,
  emiEngine:3,
  summary:4
};

let wiz = {
  step: "location",
  location: null,
  scale: null,
  budgetId: null,
  budgetMax: 0,
  sector: null,
  businessName: null,
  businessCost: null,
  businessDesc: null,
  projectCost: null,
  ownContribution: null,
  loanAmount: null,
  bucket: null,
  hasExistingLoan: null,
  existingEmi: 0,
  tenure: 36,
  rate: 8.5,
  emi: 0,
  moratoriumMonths: 0,
  income: 0,
  expenses: 0,
  foir: null,
  applicant: { name:"", mobile:"", aadhaar:"" },
  docs: { idProof:false, addressProof:false, photo:false, bankStatement:false }
};

function wizGoto(step){
  const panel = document.getElementById("wizardCard");
  if(panel.innerHTML.trim() !== "") {
    panel.style.transition = "opacity 150ms ease-out, transform 150ms ease-out";
    panel.style.opacity = 0;
    panel.style.transform = "translateX(15px)";
  }
  
  setTimeout(() => {
    wiz.step = step;
    renderProgress();
    renderStep();
    window.scrollTo({top: document.getElementById("wizardTop").offsetTop - 20, behavior:"smooth"});
    
    panel.style.transition = "none";
    panel.style.opacity = 0;
    panel.style.transform = "translateX(-15px)";
    
    void panel.offsetWidth; // Trigger reflow
    
    panel.style.transition = "opacity 150ms ease-out, transform 150ms ease-out";
    panel.style.opacity = 1;
    panel.style.transform = "translateX(0)";
  }, panel.innerHTML.trim() !== "" ? 150 : 0);
}

function renderProgress(){
  const stage = STEP_TO_STAGE[wiz.step];
  document.getElementById("wizProgress").innerHTML = STAGE_LABELS.map((label,i)=>{
    let cls = "";
    if(i < stage) cls = "done"; else if(i === stage) cls = "active";
    return `<li class="${cls}" data-n="${i+1}">${label}</li>`;
  }).join("");
}

function cardShell(inner){
  return `<div class="wizard-card">${inner}</div>`;
}

/* ---------------- STEP BUILDERS ---------------- */

function stepLocation(){
  const opts = REI_DATA.locations.map(l=>`
    <button type="button" class="choice-card ${wiz.location===l?'selected':''}" data-loc="${l}">
      <b>${l}</b><span>Tap to select</span>
    </button>`).join("");
  return cardShell(`
    <h3 style="margin-top:0;">Where is your business located?</h3>
    <p class="muted">This helps us surface schemes and lenders active in your state.</p>
    <div class="choice-grid" id="locGrid">${opts}</div>
    <div class="wizard-actions">
      <span></span>
      <button class="btn btn-primary" id="nextBtn" ${wiz.location?"":"disabled"}>Continue →</button>
    </div>
  `);
}

function stepScale(){
  const opts = REI_DATA.businessScales.map(s=>`
    <button type="button" class="choice-card ${wiz.scale===s.id?'selected':''}" data-scale="${s.id}">
      <b>${s.label}</b><span>${s.desc}</span><span style="display:block;margin-top:4px;color:var(--grey-500);">${s.example}</span>
    </button>`).join("");
  return cardShell(`
    <h3 style="margin-top:0;">What scale of business are you planning?</h3>
    <p class="muted">Location: <strong>${wiz.location}</strong></p>
    <div class="choice-grid">${opts}</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn" ${wiz.scale?"":"disabled"}>Continue →</button>
    </div>
  `);
}

function stepSector(){
  const opts = REI_DATA.sectors.map(s=>`
    <button type="button" class="choice-card ${wiz.sector===s.id?'selected':''}" data-sector="${s.id}">
      <b>${s.icon} ${s.label}</b><span>Tap to explore businesses</span>
    </button>`).join("");
  return cardShell(`
    <h3 style="margin-top:0;">Which sector interests you?</h3>
    <p class="muted">Select an industry to explore business ideas.</p>
    <div class="choice-grid">${opts}</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn" ${wiz.sector?"":"disabled"}>Continue →</button>
    </div>
  `);
}

function stepList(){
  const list = REI_DATA.businesses[wiz.sector] || [];
  const rows = list.map(b=>`
    <div class="biz-list-item ${wiz.businessName===b.name?'selected':''}" data-biz="${b.name}">
      <div>
        <b>${b.name}</b>
        <div class="biz-meta">
          <span>Estimated cost: ${reiFormatINR(b.cost)}</span>
          <span>Demand: ${b.demand}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;">${b.desc}</p>
      </div>
      <button type="button" class="btn btn-outline btn-sm">Select →</button>
    </div>`).join("");
  return cardShell(`
    <h3 style="margin-top:0;">Businesses matched to your profile</h3>
    <p class="muted">${list.length} option(s) found within your selected sector.</p>
    <div>${rows}</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <span></span>
    </div>
  `);
}

function stepAnalysis(){
  return cardShell(`
    <div class="premium-ai-container">
      <div style="display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg, var(--green-dark), var(--green)); color:#fff; padding:4px 10px; font-weight:700; font-size:11px; border-radius:20px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px; box-shadow: 0 2px 6px rgba(21,128,61,0.2);">
        <span style="width:6px; height:6px; background:#fff; border-radius:50%; animation: pulseSubtle 1.5s infinite;"></span> National AI Advisory
      </div>
      <h3 class="premium-ai-header" style="background:var(--navy); -webkit-background-clip:text;">
        <span style="font-size:28px">✦</span> Hyper-Local Business Feasibility Report
      </h3>
      <p class="muted" style="margin-top:0; font-size:15px;">AI-generated localized strategy for <strong style="color:var(--navy)">${wiz.businessName}</strong> in <strong style="color:var(--navy)">${wiz.location}</strong>.</p>
      
      <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top:32px; align-items: start;">
        <!-- Text Analysis on Left -->
        <div style="flex: 1 1 500px;">
          <div class="analysis-grid" style="margin-top:0; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">
            <div class="premium-ai-card">
              <h4><span class="icon">🌍</span> Market Reach</h4>
              <p>Estimating an immediate consumer base of 5,000–8,000 households within a 5–10 km radius. Primary channels include local village haats and direct delivery.</p>
              <div class="mini-chart">
                <div class="chart-bar c-purple" style="height: 40%;"></div>
                <div class="chart-bar c-purple" style="height: 60%; animation-delay: 0.2s;"></div>
                <div class="chart-bar c-purple" style="height: 85%; animation-delay: 0.4s;"></div>
                <div class="chart-bar c-purple" style="height: 100%; animation-delay: 0.6s;"></div>
              </div>
            </div>
            <div class="premium-ai-card">
              <h4><span class="icon">🚀</span> Opportunity</h4>
              <p><span class="pulse-dot"></span>This sector is currently underserved in ${wiz.location}. A structured micro-enterprise presents a <strong>35% growth opportunity</strong> in capturing early market share.</p>
            </div>
            <div class="premium-ai-card">
              <h4><span class="icon">📊</span> SWOT</h4>
              <ul style="margin:4px 0 0; padding-left:20px;">
                <li><b>S:</b> Low overhead, high raw materials.</li>
                <li><b>W:</b> Manual labor, low marketing.</li>
                <li><b>O:</b> Untapped rural demand.</li>
                <li><b>T:</b> Weather, delayed payments.</li>
              </ul>
            </div>
            <div class="premium-ai-card">
              <h4><span class="icon">⚠️</span> Threats</h4>
              <p>Pinpointed local risks: Vulnerability to seasonal demand fluctuations, and dependency on 1-2 primary wholesale buyers creating a bottleneck.</p>
            </div>
            <div class="premium-ai-card">
              <h4><span class="icon">⚔️</span> Competitors</h4>
              <p>Demographics indicate approx 2 similar unregistered businesses nearby, leaving the immediate vicinity highly viable with low competitive density.</p>
            </div>
            <div class="premium-ai-card">
              <h4><span class="icon">💰</span> Market Value</h4>
              <p>Suggested pricing: Tiered offering from ₹50 - ₹500. Estimated local market value potential is ₹1.2L–₹1.5L monthly gross revenue.</p>
              <div class="mini-chart">
                <div class="chart-bar c-green" style="height: 30%;"></div>
                <div class="chart-bar c-green" style="height: 55%; animation-delay: 0.2s;"></div>
                <div class="chart-bar c-green" style="height: 75%; animation-delay: 0.4s;"></div>
                <div class="chart-bar c-green" style="height: 95%; animation-delay: 0.6s;"></div>
                <div class="chart-bar c-green" style="height: 100%; animation-delay: 0.8s;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map on Right -->
        <div class="premium-map-container" style="flex: 1 1 320px;">
          <h4>📍 Competitor Heatmap (10km)</h4>
          <div class="premium-map-wrap">
            <div id="competitorMap" style="height: 300px; width: 100%;"></div>
          </div>
          <p class="muted" style="margin-top:16px; font-size:13px; line-height:1.5;">Map shows estimated density of similar micro-enterprises based on localized demographic models.</p>
        </div>
      </div>
    </div>
    
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue to Project Cost →</button>
    </div>
  `);
}

let mapInstance = null;
function initCompetitorMap() {
  if (mapInstance) { mapInstance.remove(); }
  const lat = 21.1458; // Center of India (Nagpur approx) as demo base
  const lng = 79.0882;
  
  mapInstance = L.map('competitorMap', { scrollWheelZoom: false }).setView([lat, lng], 11);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  }).addTo(mapInstance);

  // 10km radius circle
  L.circle([lat, lng], {
    color: '#6b21a8',
    fillColor: '#9333ea',
    fillOpacity: 0.1,
    radius: 10000
  }).addTo(mapInstance);

  // Heatmap points
  const points = [];
  for (let i = 0; i < 15; i++) {
    const rLat = lat + (Math.random() - 0.5) * 0.15;
    const rLng = lng + (Math.random() - 0.5) * 0.15;
    const intensity = Math.random() * 0.8 + 0.2;
    points.push([rLat, rLng, intensity]);
  }
  
  if (typeof L.heatLayer !== 'undefined') {
    L.heatLayer(points, {radius: 25, blur: 15, maxZoom: 12, gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}}).addTo(mapInstance);
  } else {
    // Fallback if heat plugin fails
    points.forEach(p => {
      L.circleMarker([p[0], p[1]], { radius: 8, color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 0 }).addTo(mapInstance);
    });
  }
}

function stepCost(){
  const b = (REI_DATA.businesses[wiz.sector]||[]).find(x=>x.name===wiz.businessName);
  if(wiz.ownContribution === null) {
    if(wiz.projectCost === null) {
      wiz.ownContribution = Math.round(b.cost * 0.1);
    } else {
      wiz.ownContribution = Math.round(wiz.projectCost * 0.1);
    }
  }
  wiz.projectCost = wiz.ownContribution * 10;
  wiz.loanAmount = wiz.projectCost - wiz.ownContribution;
  return cardShell(`
    <h3 style="margin-top:0;">Financial Structuring</h3>
    <p class="muted">Enter your available margin capital (the cash you have). Under the government scheme, your capital covers 10% of the cost, and the scheme covers 90%.</p>
    <div class="form-row">
      <label for="projCost">Available Capital (10% Margin Money) (₹)</label>
      <input type="number" id="projCost" value="${wiz.ownContribution}">
      <p class="hint">The tool will automatically calculate your feasible project scale based on this.</p>
    </div>
    <div class="stats-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px;">
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Own Contribution (10%)</div>
        <div style="font-size:20px; font-weight:700; color:var(--navy);" id="cOwn">${reiFormatINR(wiz.ownContribution)}</div>
      </div>
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Loan Eligibility (90%)</div>
        <div style="font-size:20px; font-weight:700; color:var(--saffron-dark);" id="cLoan">+ ${reiFormatINR(wiz.loanAmount)}</div>
      </div>
      <div class="stat-card" style="grid-column:1 / -1; padding:20px; background:var(--blue-bg); border-radius:12px; border:2px solid rgba(37,99,235,0.3);">
        <div style="font-size:14px; color:var(--blue-dark); font-weight:700; margin-bottom:4px;">Total Feasible Project Cost</div>
        <div style="font-size:28px; font-weight:800; color:var(--navy);" id="cProj">${reiFormatINR(wiz.projectCost)}</div>
      </div>
    </div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue →</button>
    </div>
  `);
}

function stepRouter(){
  wiz.bucket = wiz.projectCost <= 140000 ? "micro" : "term";
  const product = wiz.bucket === "micro" ? REI_DATA.loanProducts[0] : REI_DATA.loanProducts[1];
  
  wiz.rate = product.rateVal;
  wiz.tenure = product.tenureVal;
  wiz.moratoriumMonths = product.moratoriumVal;

  return cardShell(`
    <h3 style="margin-top:0;">Financing Router</h3>
    <p class="muted">Based on your project cost of ${reiFormatINR(wiz.projectCost)}, here is your matched financing scheme.</p>
    <div class="alert ${wiz.bucket==='micro' ? 'alert-green':'alert-blue'}">
      Route selected: <strong>${product.name}</strong>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px;">
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Matched Product</div>
        <div style="font-size:16px; font-weight:700; color:var(--navy);">${product.name}</div>
      </div>
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Interest Rate</div>
        <div style="font-size:16px; font-weight:700; color:var(--navy);">${product.rate}</div>
      </div>
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Fixed Tenure</div>
        <div style="font-size:16px; font-weight:700; color:var(--navy);">${product.tenure}</div>
      </div>
      <div class="stat-card" style="padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Moratorium</div>
        <div style="font-size:16px; font-weight:700; color:var(--navy);">${product.moratoriumVal} months</div>
      </div>
      <div class="stat-card" style="grid-column:1 / -1; padding:16px; background:var(--grey-100); border-radius:12px; border:1px solid var(--grey-200);">
        <div style="font-size:13px; color:var(--grey-500); margin-bottom:4px; font-weight:600;">Collateral Requirement</div>
        <div style="font-size:15px; font-weight:600; color:var(--navy);">${product.collateral}</div>
      </div>
    </div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue →</button>
    </div>
  `);
}

function stepEmiEngine(){
  wiz.emi = reiEQI(wiz.loanAmount, wiz.rate, wiz.tenure);
  return cardShell(`
    <h3 style="margin-top:0;">Repayment Schedule</h3>
    <p class="muted">Based on your selected scheme, here is your calculated quarterly instalment, including moratorium benefits.</p>
    <div class="card" style="background:var(--blue-bg); border-color:var(--blue); border-width:2px; text-align:center;">
      <div style="font-size:14px; margin-bottom:4px; font-weight:600;">Your Quarterly Installment</div>
      <div style="font-size:32px; color:var(--blue-dark); font-weight:bold;" id="emiVal">${reiFormatINR(Math.round(wiz.emi))}</div>
    </div>
    
    <div style="margin-top:24px;">
      <h4 style="margin-bottom:12px; font-size:15px; color:var(--navy);">Repayment Capacity (FOIR) Check</h4>
      <div style="display:flex; gap:16px;">
        <div class="form-row" style="flex:1;">
          <label for="foirIncome">Est. Monthly Net Income (₹)</label>
          <input type="number" id="foirIncome" value="${wiz.income || 25000}">
        </div>
        <div class="form-row" style="flex:1;">
          <label for="foirExpenses">Existing Monthly Obligations (₹)</label>
          <input type="number" id="foirExpenses" value="${wiz.expenses || 5000}">
        </div>
      </div>
      <div id="foirResult" style="margin-top:16px; padding:16px; border-radius:12px; background:var(--grey-100); border:1px solid var(--grey-200);">
        <!-- populated via js -->
      </div>
    </div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue →</button>
    </div>
  `);
}


function stepSummary(){
  return cardShell(`
    <h3 style="margin-top:0;">Financing Summary</h3>
    <p class="muted">Here is your finalized business and financing plan.</p>
    <div class="card" style="background:var(--blue-bg); border-color:var(--blue); border-width:2px;">
      <h4 style="margin:0 0 12px; color:var(--blue-dark);">${wiz.businessName}</h4>
      <div class="summary-row" style="color:var(--blue-dark);"><span>Total Project Cost</span><span style="font-weight:bold;">${reiFormatINR(wiz.projectCost)}</span></div>
      <div class="summary-row" style="color:var(--blue-dark);"><span>Required Own Contribution (10%)</span><span>${reiFormatINR(wiz.ownContribution)}</span></div>
      <div class="summary-row" style="color:var(--blue-dark); border-top:1px solid rgba(37,99,235,0.2); margin-top:8px; padding-top:8px;">
        <span>Loan Amount Required (90%)</span><span style="font-weight:bold;">${reiFormatINR(wiz.loanAmount)}</span>
      </div>
    </div>
    <div class="card" style="background:var(--grey-100);">
      <div class="summary-row"><span>Scheme selected</span><span>${wiz.bucket === 'micro' ? 'Micro Finance Scheme' : 'Term Loan Scheme'}</span></div>
      <div class="summary-row"><span>Interest rate</span><span>${wiz.rate}% p.a.</span></div>
      <div class="summary-row"><span>Fixed tenure</span><span>${wiz.tenure} months</span></div>
      <div class="summary-row"><span>Quarterly Installment</span><span>${reiFormatINR(Math.round(wiz.emi))}</span></div>
    </div>
    <div class="alert alert-green" style="margin-top:14px;">Everything looks good! You can now generate a Project Report to submit to your local bank.</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="saveBtn">Save &amp; Go to Dashboard →</button>
    </div>
  `);
}

/* ---------------- RENDER + BIND ---------------- */

function renderStep(){
  const el = document.getElementById("wizardCard");
  let html = "";
  switch(wiz.step){
    case "location": html = stepLocation(); break;
    case "scale": html = stepScale(); break;
    case "sector": html = stepSector(); break;
    case "list": html = stepList(); break;
    case "analysis": html = stepAnalysis(); break;
    case "cost": html = stepCost(); break;
    case "router": html = stepRouter(); break;
    case "emiEngine": html = stepEmiEngine(); break;
    case "summary": html = stepSummary(); break;
    case "application": html = stepApplication(); break;
    case "documents": html = stepDocuments(); break;
    case "processing": html = stepProcessing(); break;
    case "activation": html = stepActivation(); break;
    case "granted": html = stepGranted(); break;
  }
  el.innerHTML = html;
  if(wiz.step === "analysis"){
    setTimeout(initCompetitorMap, 100);
  }
  bindStep();
  updateProgress();
  
  // Ensure the wizard scrolls to top on step change so content isn't cut off
  const wizTop = document.getElementById("wizardTop");
  if(wizTop) {
     // Offset by 180px to clear the large sticky .site-header
     window.scrollTo({ top: wizTop.offsetTop - 180, behavior: 'smooth' });
  }
}

function stepIndex(){ return STEP_ORDER.indexOf(wiz.step); }
function goNext(){ wizGoto(STEP_ORDER[stepIndex()+1]); }
function goBack(){ wizGoto(STEP_ORDER[stepIndex()-1]); }

function bindStep(){
  const back = document.getElementById("backBtn");
  if(back) back.addEventListener("click", goBack);
  const next = document.getElementById("nextBtn");
  if(next) next.addEventListener("click", ()=>{ collectStep(); goNext(); });

  if(wiz.step === "location"){
    document.querySelectorAll("[data-loc]").forEach(b=> b.addEventListener("click", ()=>{
      wiz.location = b.dataset.loc; renderStep();
    }));
  }
  if(wiz.step === "scale"){
    document.querySelectorAll("[data-scale]").forEach(b=> b.addEventListener("click", ()=>{
      wiz.scale = b.dataset.scale; renderStep();
    }));
  }
  if(wiz.step === "sector"){
    document.querySelectorAll("[data-sector]").forEach(b=> b.addEventListener("click", ()=>{
      wiz.sector = b.dataset.sector; goNext();
    }));
  }
  if(wiz.step === "list"){
    document.querySelectorAll("[data-biz]").forEach(b=> b.addEventListener("click", ()=>{
      wiz.businessName = b.dataset.biz; wiz.projectCost = null; goNext();
    }));
  }
  if(wiz.step === "cost"){
    const pc = document.getElementById("projCost");
    if(pc) pc.addEventListener("input", ()=>{
      const own = parseFloat(pc.value) || 0;
      wiz.ownContribution = own;
      wiz.projectCost = own * 10;
      wiz.loanAmount = own * 9;
      document.getElementById("cOwn").textContent = reiFormatINR(wiz.ownContribution);
      document.getElementById("cLoan").textContent = "+ " + reiFormatINR(wiz.loanAmount);
      document.getElementById("cProj").textContent = reiFormatINR(wiz.projectCost);
    });
  }
  if(wiz.step === "emiEngine"){
    const incInput = document.getElementById("foirIncome");
    const expInput = document.getElementById("foirExpenses");
    const res = document.getElementById("foirResult");
    
    const updateFoir = () => {
      const inc = parseFloat(incInput.value) || 0;
      const exp = parseFloat(expInput.value) || 0;
      if (inc <= 0) {
        res.innerHTML = `<span style="color:var(--red);">Please enter a valid income to calculate capacity.</span>`;
        return;
      }
      const totalObligation = exp + (wiz.emi / 3); // EMI is quarterly, so monthly obligation is /3
      const foir = (totalObligation / inc) * 100;
      
      let statusColor = "var(--emerald-dark, #059669)";
      let text = "High Capacity (Low Risk)";
      
      if (foir > 60) {
        statusColor = "var(--red, #dc2626)";
        text = "Strained Capacity (High Risk)";
      } else if (foir > 40) {
        statusColor = "var(--saffron-dark)";
        text = "Moderate Capacity";
      }
      
      res.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-weight:600; font-size:14px; color:var(--navy);">FOIR: ${foir.toFixed(1)}%</span>
          <span style="font-size:13px; font-weight:700; color:${statusColor};">${text}</span>
        </div>
        <div style="height:8px; background:var(--grey-200); border-radius:4px; overflow:hidden;">
          <div id="foirFillBar" style="height:100%; width:0%; background:${statusColor}; transition:width 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>
        <div style="margin-top:10px; font-size:13px; color:var(--grey-500);">Est. Monthly Loan Obligation: ${reiFormatINR(Math.round(wiz.emi / 3))} | Total Monthly Outflow: ${reiFormatINR(Math.round(totalObligation))}</div>
      `;
      setTimeout(()=>{
        const bar = document.getElementById("foirFillBar");
        if(bar) bar.style.width = Math.min(foir, 100) + "%";
      }, 50);
    };
    
    if (incInput && expInput) {
      incInput.addEventListener("input", updateFoir);
      expInput.addEventListener("input", updateFoir);
      updateFoir(); // trigger initial render
    }
  }
  if(wiz.step === "summary"){
    const chk = document.getElementById("confirmCheck");
    if(chk) chk.addEventListener("change", ()=>{
      const nxt = document.getElementById("nextBtn");
      if(nxt) nxt.disabled = !chk.checked;
    });
  }
  if(wiz.step === "documents"){
    document.querySelectorAll(".btn-sm[data-doc]").forEach(b=>{
      b.addEventListener("click", (e)=>{
        const key = e.target.dataset.doc;
        wiz.docs[key] = !wiz.docs[key];
        renderStep();
      });
    });
  }
}

function collectStep(){
  if(wiz.step === "cost"){
    wiz.ownContribution = parseFloat(document.getElementById("projCost").value) || wiz.ownContribution;
    wiz.projectCost = wiz.ownContribution * 10;
    wiz.loanAmount = wiz.ownContribution * 9;
  }
  if(wiz.step === "emiEngine"){
    wiz.income = parseFloat(document.getElementById("foirIncome").value) || 0;
    wiz.expenses = parseFloat(document.getElementById("foirExpenses").value) || 0;
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const user = reiGetUser();
  if(user){
    wiz.applicant.name = user.name || "";
    wiz.applicant.mobile = user.phone || "";
    wiz.location = user.state || null;
  }
  
  // Custom Initialization based on Stored State
  const state = (typeof GramVentureStore !== 'undefined' && GramVentureStore.get) 
                ? GramVentureStore.get('userContext') 
                : (typeof getGramVentureState === 'function' ? getGramVentureState('gramVentureSetup') : null);

  if (state && state.location && state.capital !== undefined) {
    // Update internal state
    wiz.location = state.location;
    wiz.budgetMax = parseFloat(state.capital) || 50000;
    
    // Map capital to budgetId roughly
    if (wiz.budgetMax > 1500000) wiz.budgetId = "b5";
    else if (wiz.budgetMax > 500000) wiz.budgetId = "b4";
    else if (wiz.budgetMax > 140000) wiz.budgetId = "b3";
    else if (wiz.budgetMax > 50000) wiz.budgetId = "b2";
    else wiz.budgetId = "b1";

    wiz.sector = state.sector === 'agriculture' ? 'agri' : (state.sector || 'agri');

    // Consume the state so it doesn't break future "New Application" flows
    if(typeof localStorage !== 'undefined') {
       localStorage.removeItem('gramVentureSetup');
       localStorage.removeItem('userContext');
       sessionStorage.removeItem('gramVentureSetup');
       sessionStorage.removeItem('userContext');
    }

    // Jump to list step directly, preserving natural renderProgress updates
    wizGoto("list");
  } else {
    renderProgress();
    renderStep();
  }
});

function stepApplication(){
  return cardShell(`
    <h3 style="margin-top:0;">Borrower Profile</h3>
    <p class="muted">Confirm your details for the official loan application.</p>
    <div class="form-row"><label for="appName">Full Name</label><input type="text" id="appName" value="${wiz.applicant.name}"></div>
    <div class="form-row"><label for="appMobile">Mobile Number</label><input type="text" id="appMobile" value="${wiz.applicant.mobile}"></div>
    <div class="form-row"><label for="appAadhaar">Aadhaar / ID number</label><input type="text" id="appAadhaar" value="${wiz.applicant.aadhaar}" placeholder="XXXX-XXXX-XXXX"></div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue to Documents →</button>
    </div>
  `);
}

function stepDocuments(){
  const items = [
    {key:"idProof", label:"Identity Proof (Aadhaar / Voter ID)"},
    {key:"addressProof", label:"Address Proof"},
    {key:"photo", label:"Passport-size Photograph"},
    {key:"bankStatement", label:"Bank Statement (last 6 months)"}
  ];
  const rows = items.map(it=>`
    <div class="doc-item ${wiz.docs[it.key] ? 'uploaded' : ''}" data-doc="${it.key}">
      <span>${wiz.docs[it.key] ? "✅" : "📄"} ${it.label}</span>
      <button type="button" class="btn btn-sm ${wiz.docs[it.key] ? 'btn-outline' : 'btn-primary'}" data-doc="${it.key}">
        ${wiz.docs[it.key] ? "Uploaded" : "Upload (Demo)"}
      </button>
    </div>`).join("");
  const allDone = items.every(it => wiz.docs[it.key]);
  return cardShell(`
    <h3 style="margin-top:0;">Document Submission</h3>
    <p class="muted">Upload the required documents to proceed with processing (demo — no real files needed).</p>
    <div>${rows}</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn" ${allDone?"":"disabled"}>Submit Application →</button>
    </div>
  `);
}

function stepProcessing(){
  setTimeout(()=>{
    if(wiz.step === "processing"){ wizGoto("activation"); }
  }, 2200);
  return cardShell(`
    <h3 style="margin-top:0;text-align:center;">Loan Processing</h3>
    <p class="muted" style="text-align:center;">Your application is being verified. This usually takes 2–3 working days — showing a demo simulation now.</p>
    <div style="padding:30px 0;"><div class="spinner"></div></div>
    <ul class="timeline" style="max-width:360px;margin:0 auto; list-style:none; padding:0;">
      <li class="done" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#10b981; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</div><div style="display:flex; flex-direction:column;"><b>Application received</b><span style="font-size:12px; color:#64748b;">Completed</span></div></li>
      <li class="done" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#10b981; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</div><div style="display:flex; flex-direction:column;"><b>Document verification</b><span style="font-size:12px; color:#64748b;">Completed</span></div></li>
      <li class="active" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#f59e0b; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">…</div><div style="display:flex; flex-direction:column;"><b>Credit &amp; eligibility check</b><span style="font-size:12px; color:#f59e0b;">In progress</span></div></li>
      <li style="display:flex; gap:12px;"><div class="dot" style="background:#e2e8f0; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;"></div><div style="display:flex; flex-direction:column;"><b>Final approval</b><span style="font-size:12px; color:#94a3b8;">Pending</span></div></li>
    </ul>
  `);
}

function stepActivation(){
  return cardShell(`
    <h3 style="margin-top:0;">Policy / Loan Activation</h3>
    <p class="muted">Your application was approved! Please enter your approved Loan Number or Policy ID to activate it on your dashboard.</p>
    <div class="form-row">
      <label for="actLoanNum">Approved Loan / Policy Number</label>
      <input type="text" id="actLoanNum" placeholder="e.g. LN-8492-XX" value="">
    </div>
    <div class="wizard-actions">
      <button class="btn btn-primary" id="nextBtn" style="width:100%;">Activate &amp; Go to Dashboard →</button>
    </div>
  `);
}

function stepGranted(){
  // Persist final application + profile sync
  const record = {
    businessName: wiz.businessName,
    location: wiz.location,
    projectCost: wiz.projectCost,
    ownContribution: wiz.ownContribution,
    loanAmount: wiz.loanAmount,
    rate: wiz.rate,
    tenure: wiz.tenure,
    emi: wiz.emi,
    moratoriumMonths: wiz.moratoriumMonths,
    status: "granted",
    grantedAt: new Date().toISOString()
  };
  localStorage.setItem("reiBusinessApp", JSON.stringify(record));
  const user = reiGetUser();
  if(user){ user.lastApplication = record.businessName; reiSetUser(user); }

  return cardShell(`
    <div style="text-align:center;">
      <div style="font-size:52px;">✅</div>
      <h3 style="margin:8px 0 4px;">Loan Granted!</h3>
      <p class="muted">Your loan for <strong>${wiz.businessName}</strong> has been approved.</p>
    </div>
    <div class="card" style="background:var(--grey-100);">
      <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Loan amount</span><span>${reiFormatINR(Math.round(wiz.loanAmount))}</span></div>
      <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Monthly EMI</span><span>${reiFormatINR(Math.round(wiz.emi))}</span></div>
      <div class="summary-row" style="display:flex; justify-content:space-between;"><span>First EMI due</span><span>5th of next month</span></div>
    </div>
    <div class="alert alert-green" style="margin-top:14px; background:#dcfce7; padding:12px; border-radius:8px; color:#166534; font-size:14px;">Your profile has been synchronised. Visit your dashboard to track upcoming EMIs and manage your application.</div>
    <div class="wizard-actions">
      <span></span>
      <a class="btn btn-primary" href="dashboard.html" style="text-decoration:none;">Go to My Dashboard →</a>
    </div>
  `);
}
