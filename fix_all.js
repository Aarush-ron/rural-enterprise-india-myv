const fs = require('fs');

const businessSwitcherHtml = `
      <div class="app-switcher" id="mainSwitcher" style="display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center; justify-self:center; position:relative;">
        <div class="switcher-bg" style="position:absolute; top:4px; left:4px; bottom:4px; width:94px; background:#fff; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform:translateX(0);"></div>
        <a href="index.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:700; color:#0f172a; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:600; color:#64748b; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Academy</a>
      </div>
`;

const scriptHtml = `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('mainSwitcher');
    if (!switcher) return;
    const bg = switcher.querySelector('.switcher-bg');
    const btns = switcher.querySelectorAll('.switch-btn');
    
    btns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        // If it's already active, do nothing
        if (btn.style.color === 'rgb(15, 23, 42)' || btn.style.color === 'rgb(109, 40, 217)' || btn.style.fontWeight === '700') {
           // We are already on this page
        } else {
           e.preventDefault();
           const targetUrl = btn.href;
           
           // Slide the background
           bg.style.transform = index === 0 ? 'translateX(0)' : 'translateX(94px)';
           
           // Update colors immediately for feel
           btns[0].style.color = index === 0 ? '#0f172a' : '#64748b';
           btns[0].style.fontWeight = index === 0 ? '700' : '600';
           
           btns[1].style.color = index === 1 ? '#6d28d9' : '#64748b';
           btns[1].style.fontWeight = index === 1 ? '700' : '600';

           // Wait for slide animation (300ms) then navigate
           setTimeout(() => {
             window.location.href = targetUrl;
           }, 300);
        }
      });
    });
  });
</script>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file === 'financial-literacy.html') continue; // We will rewrite this completely
  
  // 1. Remove Financial Literacy link
  content = content.replace(/<li><a class="" href="financial-literacy\.html">Financial Literacy<\/a><\/li>/g, '');
  content = content.replace(/<li><a class="active" href="financial-literacy\.html">Financial Literacy<\/a><\/li>/g, '');
  
  // 2. Add View Transitions meta tag
  if (!content.includes('<meta name="view-transition"')) {
    content = content.replace('</head>', '  <meta name="view-transition" content="same-origin">\n</head>');
  }
  
  // 3. Inject CSS Grid Switcher between .brand and .header-actions safely!
  // Find <div class="header-actions"
  content = content.replace(/<div class="header-actions"/, businessSwitcherHtml + '\n    <div class="header-actions"');
  
  // 4. Inject sliding interceptor script before </body>
  if (!content.includes('id="mainSwitcher"')) {
     // Wait, the switcher injection already added the ID. 
  }
  content = content.replace('</body>', scriptHtml + '\n</body>');
  
  fs.writeFileSync(file, content);
}
console.log("Restored all main HTML files correctly!");
