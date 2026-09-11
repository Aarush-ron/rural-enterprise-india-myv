const fs = require('fs');

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
  
  // Clean old script
  content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const switcher = document\.getElementById.*?<\/script>/s, '');
  
  // Insert before </body>
  content = content.replace('</body>', `${scriptHtml}\n</body>`);
  
  fs.writeFileSync(file, content);
}
console.log("Injected JS click interceptor for sliding switcher.");
