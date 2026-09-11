// i18n.js - Handles language switching and translations natively

const translations = {
  "hi": {
  "Register | Gramventure": "पंजीकरण | ग्रामीण उद्यम भारत",
  "Loans Facility | Gramventure": "ऋण सुविधा | ग्रामीण उद्यम भारत",
  "Opportunities for Stronger Communities": "मजबूत समुदायों के लिए अवसर",
  "Schemes & Benefits": "योजनाएं और लाभ",
  "Demo mode: enter any name-like email and any password to continue.": "डेमो मोड: जारी रखने के लिए कोई भी नाम जैसा ईमेल और कोई भी पासवर्ड दर्ज करें।",
  "Applications": "आवेदन",
  "Email Address": "ईमेल पता",
  "Email or Mobile Number": "ईमेल या मोबाइल नंबर",
  "Home / Schemes & Benefits": "होम / योजनाएं और लाभ",
  "Skip to Main Content": "मुख्य सामग्री पर जाएं",
  "Available Schemes": "उपलब्ध योजनाएं",
  "Quick Links": "महत्वपूर्ण लिंक",
  "Get Started": "शुरू करें",
  "New to Gramventure?": "ग्रामीण उद्यम भारत में नए हैं?",
  "Entrepreneurs who complete financial literacy modules are 2.3× more likely to have their loan applications approved on the first attempt.": "जो उद्यमी वित्तीय साक्षरता मॉड्यूल पूरे करते हैं, उनके ऋण आवेदन पहली बार में स्वीकृत होने की संभावना 2.3 गुना अधिक होती है।",
  "9 of 20 modules completed": "20 में से 9 मॉड्यूल पूरे हुए",
  "Toll-Free: 1800-11-0001": "टोल-फ्री: 1800-11-0001",
  "View Schemes →": "योजनाएं देखें →",
  "🪙 Loans Facility": "🪙 ऋण सुविधा",
  "Interest rate (% p.a.)": "ब्याज दर (% प्रति वर्ष)",
  "Start a New Business Application →": "नया व्यवसाय आवेदन शुरू करें →",
  "Calculate EMI": "EMI की गणना करें",
  "Content owned by Empowering Local Communities (demo build)  |  Last updated: September 2026": "सामग्री ग्रामीण विकास मंत्रालय, भारत सरकार (डेमो बिल्ड) के स्वामित्व में है | अंतिम अपडेट: सितंबर 2026",
  "Success Stories": "सफलता की कहानियां",
  "About": "के बारे में",
  "Access the right support": "सही समर्थन प्राप्त करें",
  "🏪 Find / Start Business": "🏪 व्यवसाय खोजें / शुरू करें",
  "Contact": "संपर्क करें",
  "Terms of Use": "उपयोग की शर्तें",
  "Loan Products": "ऋण उत्पाद",
  "Loans Facility": "ऋण सुविधा",
  "": "",
  "RE": "RE",
  "Create Password": "पासवर्ड बनाएं",
  "Register →": "पंजीकरण करें →",
  "You're browsing in guest mode with sample data.": "आप नमूना डेटा के साथ अतिथि मोड में ब्राउज़ कर रहे हैं।",
  "Discover national initiatives to support rural businesses and local development.": "ग्रामीण व्यवसायों और स्थानीय विकास का समर्थन करने के लिए राष्ट्रीय पहलों की खोज करें।",
  "Register": "पंजीकरण",
  "Impact & Data | Gramventure": "प्रभाव और डेटा | ग्रामीण उद्यम भारत",
  "Real People. Real Progress.": "असली लोग। असली प्रगति।",
  "Build practical money knowledge in short, easy lessons — designed for busy entrepreneurs, two minutes at a time.": "छोटे, आसान पाठों में व्यावहारिक धन ज्ञान बनाएं - व्यस्त उद्यमियों के लिए डिज़ाइन किया गया, एक बार में दो मिनट।",
  "Points earned": "अर्जित अंक",
  "Already registered?": "पहले से पंजीकृत हैं?",
  "My Dashboard": "मेरा डैशबोर्ड",
  "View All Stories →": "सभी कहानियां देखें →",
  "Your Idea. Our Support.": "आपका विचार। हमारा समर्थन।",
  "A-": "A-",
  "🇮🇳": "🇮🇳",
  "Together for a": "एक साथ",
  "Prosper": "समृद्ध हों",
  "Quick EMI Calculator": "त्वरित EMI कैलकुलेटर",
  "Find / Start a Business | Gramventure": "व्यवसाय खोजें / शुरू करें | ग्रामीण उद्यम भारत",
  "Financial schemes, subsidies and incentives you may be eligible for as a rural entrepreneur.": "सरकारी योजनाएं, सब्सिडी और प्रोत्साहन जिनके लिए आप एक ग्रामीण उद्यमी के रूप में पात्र हो सकते हैं।",
  "Impact & Data": "प्रभाव और डेटा",
  "helpdesk@gramventure.com": "helpdesk@gramventure.com",
  "Learn": "सीखें",
  "Today's Modules": "आज के मॉड्यूल",
  "Register to access schemes, loans and the business finder tool.": "योजनाओं, ऋणों और व्यवसाय खोजक उपकरण तक पहुंचने के लिए पंजीकरण करें।",
  "Real-time progress across beneficiaries, businesses and loans facilitated nationwide.": "देश भर में लाभार्थियों, व्यवसायों और ऋणों में वास्तविक समय की प्रगति।",
  "Create a better future": "एक बेहतर भविष्य बनाएं",
  "Select State": "राज्य चुनें",
  "Access your dashboard, applications and documents.": "अपने डैशबोर्ड, एप्लिकेशन और दस्तावेज़ों तक पहुंचें।",
  "Home / Loans Facility": "होम / ऋण सुविधा",
  "Businesses Supported (by year)": "समर्थित व्यवसाय (वर्ष के अनुसार)",
  "Top 5 States by Businesses Supported": "समर्थित व्यवसायों द्वारा शीर्ष 5 राज्य",
  "Start a Business": "व्यवसाय शुरू करें",
  "📁 My Documents": "📁 मेरे दस्तावेज़",
  "Loan amount (₹)": "ऋण राशि (₹)",
  "Credit Score (est.)": "क्रेडिट स्कोर (अनुमानित)",
  "Remaining Tenure": "शेष अवधि",
  "Start a Loan Application →": "ऋण आवेदन शुरू करें →",
  "A+": "A+",
  "Finance": "वित्त",
  "✅ Sustainable Growth": "✅ सतत विकास",
  "Understand loan options, interest rates, EMI, moratorium and eligibility.": "ऋण विकल्प, ब्याज दरें, EMI, अधिस्थगन और पात्रता को समझें।",
  "Due Date": "नियत तारीख",
  "National programmes driving rural development and enterprise growth.": "ग्रामीण विकास और उद्यम विकास को चलाने वाले राष्ट्रीय कार्यक्रम।",
  "Learn · Choose · Finance · Grow · Prosper": "सीखें · चुनें · वित्त · विकास · समृद्ध हों",
  "Grow": "विकास",
  "Password": "पासवर्ड",
  "Create Your Account": "अपना खाता बनाएं",
  "Core Initiatives | Gramventure": "सरकारी पहल | ग्रामीण उद्यम भारत",
  "🗂️ My Dashboard": "🗂️ मेरा डैशबोर्ड",
  "Learn financial concepts in 2 minutes a day. Build your knowledge, secure your future.": "दिन में 2 मिनट में वित्तीय अवधारणाओं को सीखें। अपना ज्ञान बनाएं, अपना भविष्य सुरक्षित करें।",
  "Active Loan": "सक्रिय ऋण",
  "Logout": "लॉग आउट",
  "❓ Help & Support": "❓ सहायता और समर्थन",
  "➕ Register": "➕ पंजीकरण",
  "Self-Reliant Rural India": "आत्मनिर्भर ग्रामीण भारत",
  "Explore Loans →": "ऋण खोजें →",
  "Home / Impact & Data": "होम / प्रभाव और डेटा",
  "Search schemes, loans, businesses, terms...": "योजनाएं, ऋण, व्यवसाय, शर्तें खोजें...",
  "👤 Login": "👤 लॉगिन",
  "Full Name": "पूरा नाम",
  "₹0": "₹0",
  "10-digit number": "10-अंकीय संख्या",
  "Explore opportunities, access schemes, get financial support and build a better future for you and your community.": "अवसर तलाशें, योजनाओं तक पहुंचें, वित्तीय सहायता प्राप्त करें और अपने और अपने समुदाय के लिए बेहतर भविष्य बनाएं।",
  "Financial Literacy | Gramventure": "वित्तीय साक्षरता | ग्रामीण उद्यम भारत",
  "RTI": "आरटीआई",
  "Pay Now →": "अब भुगतान करें →",
  "Register here": "यहाँ पंजीकरण करें",
  "Home | Gramventure": "होम | ग्रामीण उद्यम भारत",
  "Schemes & Benefits | Gramventure": "योजनाएं और लाभ | ग्रामीण उद्यम भारत",
  "Home / Core Initiatives": "होम / सरकारी पहल",
  "or": "या",
  "🚪 Logout": "🚪 लॉग आउट",
  "Business": "व्यवसाय",
  "No applications yet.": "अभी तक कोई आवेदन नहीं।",
  "My Applications": "मेरे आवेदन",
  "Build your financial knowledge": "अपना वित्तीय ज्ञान बनाएं",
  "See real-time progress, beneficiaries and success stories across India.": "पूरे भारत में वास्तविक समय की प्रगति, लाभार्थियों और सफलता की कहानियां देखें।",
  "e.g. ramesh.kumar@example.com": "उदा. ramesh.kumar@example.com",
  "My Documents": "मेरे दस्तावेज़",
  "Explore financial schemes, subsidies and incentives for your business.": "अपने व्यवसाय के लिए सरकारी योजनाओं, सब्सिडी और प्रोत्साहनों का अन्वेषण करें।",
  "Login →": "लॉगिन →",
  "My Dashboard | Gramventure": "मेरा डैशबोर्ड | ग्रामीण उद्यम भारत",
  "An initiative connecting rural entrepreneurs with financial literacy, schemes, loans and market opportunities to build a self-reliant rural economy.": "ग्रामीण उद्यमियों को वित्तीय साक्षरता, योजनाओं, ऋणों और बाजार के अवसरों से जोड़कर एक आत्मनिर्भर ग्रामीण अर्थव्यवस्था बनाने की भारत सरकार की पहल।",
  "Expand your business": "अपने व्यवसाय का विस्तार करें",
  "Choose": "चुनें",
  "Compare loan products, understand interest rates, and estimate your EMI before you apply.": "ऋण उत्पादों की तुलना करें, ब्याज दरों को समझें, और आवेदन करने से पहले अपनी EMI का अनुमान लगाएं।",
  "✅ Better Livelihoods": "✅ बेहतर आजीविका",
  "State": "राज्य",
  "I agree to the Terms of Use and Privacy Policy.": "मैं उपयोग की शर्तों और गोपनीयता नीति से सहमत हूँ।",
  "Welcome": "स्वागत है",
  "Streak": "सिलसिला",
  "Tenure (months)": "अवधि (महीने)",
  "Gramventure": "ग्रामीण उद्यम भारत",
  "📘 Financial Literacy": "📘 वित्तीय साक्षरता",
  "Why it matters": "यह क्यों मायने रखता है",
  "Login here": "यहाँ लॉगिन करें",
  "Search": "खोजें",
  "Mobile Number": "मोबाइल नंबर",
  "Find the right business for you": "अपने लिए सही व्यवसाय खोजें",
  "📊 Dashboard": "📊 डैशबोर्ड",
  "View Data →": "डेटा देखें →",
  "📄 My Applications": "📄 मेरे आवेदन",
  "English": "English",
  "Mon–Sat, 9:00 AM – 6:00 PM IST": "सोम-शनि, सुबह 9:00 बजे - शाम 6:00 बजे IST",
  "to save your progress.": "अपनी प्रगति को सहेजने के लिए।",
  "Login": "लॉगिन",
  "Know More →": "और जानें →",
  "Monthly EMI": "मासिक EMI",
  "Recommended for You": "आपके लिए अनुशंसित",
  "🏛️": "🏛️",
  "Login | Gramventure": "लॉगिन | ग्रामीण उद्यम भारत",
  "Day streak": "दिन का सिलसिला",
  "Upcoming EMI": "आगामी EMI",
  "Financial Literacy": "वित्तीय साक्षरता",
  "✅ Stronger Communities": "✅ मजबूत समुदाय",
  "••••••••": "••••••••",
  "A Brighter Tomorrow.": "एक उज्जवल कल।",
  "Login to Your Account": "अपने खाते में लॉगिन करें",
  "Home / Financial Literacy": "होम / वित्तीय साक्षरता",
  "🧑‍🤝‍🧑": "🧑‍🤝‍🧑",
  "Home": "होम",
  "Your Learning Progress": "आपकी सीखने की प्रगति",
  "Core Initiatives": "सरकारी पहल",
  "Start Learning →": "सीखना शुरू करें →",
  "हिन्दी": "हिन्दी",
  "Empowering Local Communities": "ग्रामीण विकास मंत्रालय, भारत सरकार",
  "Empowering Rural Entrepreneurs": "ग्रामीण उद्यमियों को सशक्त बनाना",
  "Explore opportunities, access schemes, get financial support and build a self-reliant future for you and your community.": "अवसर तलाशें, योजनाओं तक पहुंचें, वित्तीय सहायता प्राप्त करें और अपने और अपने समुदाय के लिए एक आत्मनिर्भर भविष्य बनाएं।",
  "View Schemes": "योजनाएं देखें",
  "Learn financial concepts in 2 minutes a day.": "दिन में 2 मिनट में वित्तीय अवधारणाओं को सीखें।",
  "Explore financial schemes and subsidies.": "सरकारी योजनाओं और सब्सिडी का अन्वेषण करें।",
  "Understand loan options, EMI, and eligibility.": "ऋण विकल्प, ईएमआई और पात्रता को समझें।",
  "Initiatives": "पहल",
  "National initiatives for rural development.": "ग्रामीण विकास के लिए राष्ट्रीय पहल।",
  "Impact Data": "प्रभाव डेटा",
  "Real-time progress and success stories.": "वास्तविक समय की प्रगति और सफलता की कहानियां।",
  "Financial Support for All": "सभी के लिए वित्तीय सहायता",
  "Get access to collateral-free loans, low interest rates, and specialized financial modules to grow your rural business.": "अपने ग्रामीण व्यवसाय को बढ़ाने के लिए संपार्श्विक-मुक्त ऋण, कम ब्याज दरों और विशेष वित्तीय मॉड्यूल तक पहुंच प्राप्त करें।",
  "Explore Loans": "ऋण खोजें",
  "Nationwide Impact": "राष्ट्रव्यापी प्रभाव",
  "Join millions of beneficiaries across India. Track real-time progress and discover inspiring success stories from local entrepreneurs.": "पूरे भारत में लाखों लाभार्थियों से जुड़ें। वास्तविक समय की प्रगति को ट्रैक करें और स्थानीय उद्यमियों से प्रेरक सफलता की कहानियों की खोज करें।",
  "View Impact Data": "प्रभाव डेटा देखें"
}
};

function updatePageLanguage(lang) {
  if (lang === 'en') {
     walkDOM(document.body, 'en');
  } else {
     walkDOM(document.body, lang);
  }
}

function walkDOM(node, lang) {
  if (node.nodeType === 3) {
    const text = node.nodeValue.trim();
    if (text) {
      if (!node._origText) node._origText = node.nodeValue;
      const origText = node._origText;
      const trimOrig = origText.trim();
      
      if (lang === 'hi' && translations['hi'][trimOrig]) {
         node.nodeValue = origText.replace(trimOrig, translations['hi'][trimOrig]);
      } else if (lang === 'en') {
         node.nodeValue = origText;
      }
    }
  } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      if (node.placeholder) {
        if (!node._origPlaceholder) node._origPlaceholder = node.placeholder;
        const pt = node._origPlaceholder.trim();
        if (lang === 'hi' && translations['hi'][pt]) {
          node.placeholder = node._origPlaceholder.replace(pt, translations['hi'][pt]);
        } else if (lang === 'en') {
          node.placeholder = node._origPlaceholder;
        }
      }
    }
    if (node.tagName === 'OPTION') {
       if (!node.closest('.lang-select')) {
          node.childNodes.forEach(child => walkDOM(child, lang));
       }
    } else {
       node.childNodes.forEach(child => walkDOM(child, lang));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('reiLang') || 'en';
  
  document.querySelectorAll('.lang-select').forEach(select => {
     if (savedLang === 'hi') {
        select.value = 'हिन्दी';
     } else {
        select.value = 'English';
     }
     
     select.addEventListener('change', (e) => {
        const newLang = e.target.value === 'हिन्दी' ? 'hi' : 'en';
        localStorage.setItem('reiLang', newLang);
        updatePageLanguage(newLang);
        
        document.querySelectorAll('.lang-select').forEach(s => s.value = e.target.value);
     });
  });

  if (savedLang !== 'en') {
     updatePageLanguage(savedLang);
  }
});
