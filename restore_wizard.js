const fs = require('fs');

let content = fs.readFileSync('assets/js/wizard.js', 'utf8');

// Restore the STEP_ORDER array
content = content.replace(
  'const STEP_ORDER = [\n  "location","scale","sector","list","analysis","cost","router",\n  "emiEngine","summary"\n];',
  'const STEP_ORDER = [\n  "location","scale","sector","list","analysis","cost","router",\n  "emiEngine","summary","application","documents","processing","activation","granted"\n];'
);

// Restore the switch cases
content = content.replace(
  'case "summary": html = stepSummary(); break;',
  'case "summary": html = stepSummary(); break;\n    case "application": html = stepApplication(); break;\n    case "documents": html = stepDocuments(); break;\n    case "processing": html = stepProcessing(); break;\n    case "activation": html = stepActivation(); break;\n    case "granted": html = stepGranted(); break;'
);

// Restore collectStep
content = content.replace(
  'wiz.loanAmount = wiz.projectCost - wiz.ownContribution;\n  }\n}',
  'wiz.loanAmount = wiz.projectCost - wiz.ownContribution;\n  }\n  if(wiz.step === "application"){\n    wiz.applicant.name = document.getElementById("appName").value;\n    wiz.applicant.mobile = document.getElementById("appMobile").value;\n    wiz.applicant.aadhaar = document.getElementById("appAadhaar").value;\n  }\n}'
);

// Restore step bindings
content = content.replace(
  'if(wiz.step === "summary"){\n    const sb = document.getElementById("saveBtn");\n    if(sb) sb.addEventListener("click", ()=>{\n      const record = {\n        businessName: wiz.businessName,\n        location: wiz.location,\n        projectCost: wiz.projectCost,\n        ownContribution: wiz.ownContribution,\n        loanAmount: wiz.loanAmount,\n        rate: wiz.rate,\n        tenure: wiz.tenure,\n        emi: wiz.emi,\n        moratoriumMonths: wiz.moratoriumMonths,\n        status: "pending_bank",\n        grantedAt: new Date().toISOString()\n      };\n      localStorage.setItem("reiBusinessApp", JSON.stringify(record));\n      const user = reiGetUser();\n      if(user){ user.lastApplication = record.businessName; reiSetUser(user); }\n      window.location.href = "dashboard.html";\n    });\n  }',
  'if(wiz.step === "summary"){\n    const chk = document.getElementById("confirmCheck");\n    if(chk) chk.addEventListener("change", ()=>{\n      const nxt = document.getElementById("nextBtn");\n      if(nxt) nxt.disabled = !chk.checked;\n    });\n  }\n  if(wiz.step === "documents"){\n    document.querySelectorAll(".btn-sm[data-doc]").forEach(b=>{\n      b.addEventListener("click", (e)=>{\n        const key = e.target.dataset.doc;\n        wiz.docs[key] = !wiz.docs[key];\n        renderStep();\n      });\n    });\n  }'
);

// Check if stepApplication already exists (probably not)
if (!content.includes('function stepApplication()')) {
  content += `
function stepApplication(){
  return cardShell(\`
    <h3 style="margin-top:0;">Borrower Profile</h3>
    <p class="muted">Confirm your details for the official loan application.</p>
    <div class="form-row"><label for="appName">Full Name</label><input type="text" id="appName" value="\${wiz.applicant.name}"></div>
    <div class="form-row"><label for="appMobile">Mobile Number</label><input type="text" id="appMobile" value="\${wiz.applicant.mobile}"></div>
    <div class="form-row"><label for="appAadhaar">Aadhaar / ID number</label><input type="text" id="appAadhaar" value="\${wiz.applicant.aadhaar}" placeholder="XXXX-XXXX-XXXX"></div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn">Continue to Documents →</button>
    </div>
  \`);
}

function stepDocuments(){
  const items = [
    {key:"idProof", label:"Identity Proof (Aadhaar / Voter ID)"},
    {key:"addressProof", label:"Address Proof"},
    {key:"photo", label:"Passport-size Photograph"},
    {key:"bankStatement", label:"Bank Statement (last 6 months)"}
  ];
  const rows = items.map(it=>\`
    <div class="doc-item \${wiz.docs[it.key] ? 'uploaded' : ''}" data-doc="\${it.key}">
      <span>\${wiz.docs[it.key] ? "✅" : "📄"} \${it.label}</span>
      <button type="button" class="btn btn-sm \${wiz.docs[it.key] ? 'btn-outline' : 'btn-primary'}" data-doc="\${it.key}">
        \${wiz.docs[it.key] ? "Uploaded" : "Upload (Demo)"}
      </button>
    </div>\`).join("");
  const allDone = items.every(it => wiz.docs[it.key]);
  return cardShell(\`
    <h3 style="margin-top:0;">Document Submission</h3>
    <p class="muted">Upload the required documents to proceed with processing (demo — no real files needed).</p>
    <div>\${rows}</div>
    <div class="wizard-actions">
      <button class="btn btn-outline" id="backBtn">← Back</button>
      <button class="btn btn-primary" id="nextBtn" \${allDone?"":"disabled"}>Submit Application →</button>
    </div>
  \`);
}

function stepProcessing(){
  setTimeout(()=>{
    if(wiz.step === "processing"){ wizGoto("activation"); }
  }, 2200);
  return cardShell(\`
    <h3 style="margin-top:0;text-align:center;">Loan Processing</h3>
    <p class="muted" style="text-align:center;">Your application is being verified. This usually takes 2–3 working days — showing a demo simulation now.</p>
    <div style="padding:30px 0;"><div class="spinner"></div></div>
    <ul class="timeline" style="max-width:360px;margin:0 auto; list-style:none; padding:0;">
      <li class="done" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#10b981; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</div><div style="display:flex; flex-direction:column;"><b>Application received</b><span style="font-size:12px; color:#64748b;">Completed</span></div></li>
      <li class="done" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#10b981; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">✓</div><div style="display:flex; flex-direction:column;"><b>Document verification</b><span style="font-size:12px; color:#64748b;">Completed</span></div></li>
      <li class="active" style="display:flex; gap:12px; margin-bottom:16px;"><div class="dot" style="background:#f59e0b; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;">…</div><div style="display:flex; flex-direction:column;"><b>Credit &amp; eligibility check</b><span style="font-size:12px; color:#f59e0b;">In progress</span></div></li>
      <li style="display:flex; gap:12px;"><div class="dot" style="background:#e2e8f0; color:#fff; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-size:12px;"></div><div style="display:flex; flex-direction:column;"><b>Final approval</b><span style="font-size:12px; color:#94a3b8;">Pending</span></div></li>
    </ul>
  \`);
}

function stepActivation(){
  return cardShell(\`
    <h3 style="margin-top:0;">Policy / Loan Activation</h3>
    <p class="muted">Your application was approved! Please enter your approved Loan Number or Policy ID to activate it on your dashboard.</p>
    <div class="form-row">
      <label for="actLoanNum">Approved Loan / Policy Number</label>
      <input type="text" id="actLoanNum" placeholder="e.g. LN-8492-XX" value="">
    </div>
    <div class="wizard-actions">
      <button class="btn btn-primary" id="nextBtn" style="width:100%;">Activate &amp; Go to Dashboard →</button>
    </div>
  \`);
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

  return cardShell(\`
    <div style="text-align:center;">
      <div style="font-size:52px;">✅</div>
      <h3 style="margin:8px 0 4px;">Loan Granted!</h3>
      <p class="muted">Your loan for <strong>\${wiz.businessName}</strong> has been approved.</p>
    </div>
    <div class="card" style="background:var(--grey-100);">
      <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Loan amount</span><span>\${reiFormatINR(Math.round(wiz.loanAmount))}</span></div>
      <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Monthly EMI</span><span>\${reiFormatINR(Math.round(wiz.emi))}</span></div>
      <div class="summary-row" style="display:flex; justify-content:space-between;"><span>First EMI due</span><span>5th of next month</span></div>
    </div>
    <div class="alert alert-green" style="margin-top:14px; background:#dcfce7; padding:12px; border-radius:8px; color:#166534; font-size:14px;">Your profile has been synchronised. Visit your dashboard to track upcoming EMIs and manage your application.</div>
    <div class="wizard-actions">
      <span></span>
      <a class="btn btn-primary" href="dashboard.html" style="text-decoration:none;">Go to My Dashboard →</a>
    </div>
  \`);
}
`;
}

fs.writeFileSync('assets/js/wizard.js', content);
console.log("Wizard steps restored successfully.");
