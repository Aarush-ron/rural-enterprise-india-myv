/* =====================================================================
   Gramventure — buffer (mock) data
   All figures are illustrative sample data for demo purposes only.
===================================================================== */

const REI_DATA = {

  stats: {
    beneficiaries: "12,45,820",
    businesses: "8,42,190",
    loans: "₹18,760 Cr",
    districts: "540",
    jobs: "1,25,000+"
  },

  stories: [
    { name:"Sushila Devi", place:"Madhya Pradesh", initials:"SD",
      quote:"With the support I received, I started my dairy business and now support my family proudly." },
    { name:"Ramesh Kumar", place:"Bihar", initials:"RK",
      quote:"The loan facility helped me expand my food processing unit in my village." },
    { name:"Laxmi Bai", place:"Rajasthan", initials:"LB",
      quote:"Government schemes made it possible for me to start my goat rearing business." },
    { name:"Anitha Reddy", place:"Telangana", initials:"AR",
      quote:"Financial literacy lessons helped me plan my tailoring unit's budget with confidence." }
  ],

  literacyModules: [
    { title:"Understanding Savings & Interest", mins:2, level:"Beginner", tag:"Basics" },
    { title:"Reading a Loan Agreement", mins:3, level:"Beginner", tag:"Loans" },
    { title:"What is EMI & How It's Calculated", mins:2, level:"Beginner", tag:"Loans" },
    { title:"Budgeting for a Small Business", mins:3, level:"Intermediate", tag:"Budgeting" },
    { title:"Credit Score Basics", mins:2, level:"Intermediate", tag:"Credit" },
    { title:"Digital Payments & UPI Safety", mins:2, level:"Beginner", tag:"Digital" },
    { title:"Understanding Moratorium Periods", mins:3, level:"Intermediate", tag:"Loans" },
    { title:"Insurance for Rural Enterprises", mins:3, level:"Advanced", tag:"Risk" }
  ],

  schemes: [
    { name:"PM Vishwakarma Yojana", ministry:"MSME", benefit:"Up to ₹3,00,000 collateral-free loan", tag:"Loan Support", eligibility:["Minimum age of 18 years on the date of registration", "Should be engaged in traditional trades", "Not availed loans under similar schemes"] },
    { name:"PMEGP (Prime Minister's Employment Generation Programme)", ministry:"MSME", benefit:"15%–35% subsidy on project cost", tag:"Subsidy", eligibility:["Individuals above 18 years of age", "Passed at least VIII standard (for projects above ₹10L)", "Only new projects are considered for sanction"] },
    { name:"Deendayal Antyodaya Yojana – NRLM", ministry:"Rural Development", benefit:"Interest subvention for women SHGs", tag:"Women & SHG", eligibility:["Must be a Women Self-Help Group (WSHG)", "Functional for at least 6 months", "Registered under the respective state societies act"] },
    { name:"Stand-Up India", ministry:"DFS", benefit:"₹10 lakh – ₹1 crore loans for SC/ST & women", tag:"Loan Support", eligibility:["SC/ST and/or woman entrepreneur, above 18 years of age", "Loans available for greenfield projects", "Borrower should not be in default to any bank"] },
    { name:"Mudra Yojana (Shishu/Kishor/Tarun)", ministry:"MSME", benefit:"Collateral-free loans up to ₹10 lakh", tag:"Loan Support", eligibility:["Non-Corporate Small Business Segment (NCSBS)", "Income-generating activity in manufacturing, trading or services", "Applicant should not be a defaulter"] },
    { name:"Rural Godown Scheme", ministry:"Agriculture", benefit:"Capital subsidy on storage infrastructure", tag:"Infrastructure", eligibility:["Farmers, agricultural graduates, cooperatives", "Godown should be structurally sound", "Must obtain a license under the State Warehousing Act"] }
  ],

  loanProducts: [
    { name:"Micro Finance Scheme", range:"≤ ₹1.40 Lakh", rate:"6.5% p.a.", tenure:"3 years", collateral:"Not required", rateVal: 6.5, tenureVal: 36, moratoriumVal: 3 },
    { name:"Term Loan Scheme", range:"> ₹1.40 Lakh to ₹50.00 Lakh", rate:"8.0% p.a.", tenure:"7 years", collateral:"Required", rateVal: 8.0, tenureVal: 84, moratoriumVal: 6 }
  ],

  initiatives: [
    { title:"Digital Village Programme", desc:"Bringing broadband & digital literacy to 2,50,000+ villages.", year:"2024–26" },
    { title:"Skill India Rural Mission", desc:"Vocational training aligned to local business opportunities.", year:"2023–26" },
    { title:"One District One Product (ODOP)", desc:"Promoting district-specific rural products in national markets.", year:"Ongoing" },
    { title:"Rural Infrastructure Development Fund", desc:"Roads, storage and market-linkage infrastructure for enterprises.", year:"Ongoing" }
  ],

  impact: {
    yearly: [
      { year:2021, businesses: 410000, loans: 6200 },
      { year:2022, businesses: 528000, loans: 9100 },
      { year:2023, businesses: 641000, loans: 12800 },
      { year:2024, businesses: 742000, loans: 15600 },
      { year:2025, businesses: 812000, loans: 17900 },
      { year:2026, businesses: 842190, loans: 18760 }
    ],
    topStates: [
      { state:"Uttar Pradesh", businesses:"1,12,340" },
      { state:"Madhya Pradesh", businesses:"96,210" },
      { state:"Bihar", businesses:"88,470" },
      { state:"Rajasthan", businesses:"81,050" },
      { state:"Maharashtra", businesses:"77,930" }
    ]
  },

  locations: [
    "Andhra Pradesh","Bihar","Chhattisgarh","Gujarat","Haryana","Karnataka",
    "Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu",
    "Telangana","Uttar Pradesh","West Bengal"
  ],

  businessScales: [
    { id:"micro", label:"Micro", desc:"Solo or family-run, home-based operation", example:"e.g. tailoring, snack stall" },
    { id:"small", label:"Small", desc:"2–10 workers, a dedicated shop or unit", example:"e.g. flour mill, dairy unit" },
    { id:"medium", label:"Medium", desc:"10–25 workers, growing local demand", example:"e.g. food processing plant" }
  ],

  budgets: [
    { id:"b1", label:"Up to ₹50,000", max:50000 },
    { id:"b2", label:"₹50,001 – ₹1,40,000", max:140000 },
    { id:"b3", label:"₹1,40,001 – ₹5,00,000", max:500000 },
    { id:"b4", label:"₹5,00,001 – ₹15,00,000", max:1500000 },
    { id:"b5", label:"Above ₹15,00,000", max:5000000 }
  ],

  sectors: [
    { id:"agri", label:"Agri-processing", icon:"🌾" },
    { id:"dairy", label:"Dairy & Livestock", icon:"🐄" },
    { id:"textile", label:"Textiles & Handicrafts", icon:"🧵" },
    { id:"retail", label:"Retail & Trade", icon:"🛒" },
    { id:"food", label:"Food & Beverage", icon:"🍱" },
    { id:"services", label:"Local Services", icon:"🛠️" }
  ],

  // business catalog keyed by sector id
  businesses: {
    agri: [
      { name:"Custom Flour Mill (Atta Chakki)", cost:180000, desc:"Grinding service for local grain farmers.", demand:"High" },
      { name:"Cold-Press Oil Extraction Unit", cost:420000, desc:"Mustard/groundnut oil extraction & packaging.", demand:"Medium" },
      { name:"Spice Grinding & Packaging Unit", cost:260000, desc:"Processing and branding local spices.", demand:"High" }
    ],
    dairy: [
      { name:"Small Dairy Farming Unit (5 cattle)", cost:350000, desc:"Milk production & local supply chain.", demand:"High" },
      { name:"Goat Rearing Unit", cost:120000, desc:"Meat & dairy goat rearing for local markets.", demand:"Medium" },
      { name:"Milk Chilling & Collection Centre", cost:900000, desc:"Aggregation point for nearby dairy farmers.", demand:"High" }
    ],
    textile: [
      { name:"Tailoring & Stitching Unit", cost:90000, desc:"Custom stitching for local households & shops.", demand:"High" },
      { name:"Handloom Weaving Unit", cost:150000, desc:"Traditional textile weaving for regional markets.", demand:"Medium" },
      { name:"Bamboo & Cane Handicrafts Unit", cost:110000, desc:"Handicrafts for local and export markets.", demand:"Medium" }
    ],
    retail: [
      { name:"Village Kirana (Grocery) Store", cost:200000, desc:"Daily essentials retail outlet.", demand:"High" },
      { name:"Agri-input Retail Shop", cost:280000, desc:"Seeds, fertilizer & tools for farmers.", demand:"High" },
      { name:"Mobile & Electronics Repair Shop", cost:130000, desc:"Repair services for rural households.", demand:"Medium" }
    ],
    food: [
      { name:"Snack & Namkeen Manufacturing Unit", cost:240000, desc:"Local snacks packaged for regional distribution.", demand:"High" },
      { name:"Papad & Pickle Making Unit", cost:95000, desc:"Home-scale food production for retail.", demand:"Medium" },
      { name:"Tea Stall & Quick Bites Corner", cost:60000, desc:"Roadside food & beverage outlet.", demand:"High" }
    ],
    services: [
      { name:"Rural Beauty & Grooming Salon", cost:140000, desc:"Salon services for local community.", demand:"Medium" },
      { name:"Two-Wheeler Repair Garage", cost:170000, desc:"Repair & maintenance services.", demand:"High" },
      { name:"Common Service Centre (CSC)", cost:210000, desc:"Digital government & banking services access point.", demand:"High" }
    ]
  },

  existingLoanSample: [
    { lender:"Village Cooperative Bank", outstanding:35000, emi:2100, tenureLeft:"18 months" }
  ]
};

// ---- small shared helpers ----
function reiFormatINR(n){
  return "₹" + Number(n).toLocaleString("en-IN");
}
function reiEMI(principal, annualRatePct, months){
  const r = (annualRatePct/12)/100;
  if(r === 0) return principal/months;
  const emi = principal * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1);
  return emi;
}
function reiEQI(principal, annualRatePct, months){
  const r = (annualRatePct/4)/100;
  const quarters = Math.floor(months / 3);
  if(r === 0) return principal/quarters;
  const eqi = principal * r * Math.pow(1+r, quarters) / (Math.pow(1+r, quarters) - 1);
  return eqi;
}

/* =====================================================================
   Gramventure — State Manager
===================================================================== */

function saveGramVentureState(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getGramVentureState(key) {
  const data = sessionStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing state data for', key, e);
    return null;
  }
}

function initializeWizardState() {
  const state = getGramVentureState('gramVentureSetup');
  if (!state) {
    saveGramVentureState('gramVentureSetup', {
      location: '',
      capital: 50000,
      sector: 'agriculture'
    });
  }
}
