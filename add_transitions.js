const fs = require('fs');

const transitionHtml = `
<!-- Smooth Switcher Transition -->
<style>
#page-transition {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: #1e293b;
  z-index: 999999;
  transform: translateY(100%);
  pointer-events: none;
}
</style>
<div id="page-transition"></div>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const pt = document.getElementById('page-transition');
    
    // Animate OUT (Reveal new page)
    pt.style.transition = 'none';
    pt.style.transform = 'translateY(0)'; 
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pt.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
        pt.style.transform = 'translateY(100%)';
      });
    });

    // Intercept switcher clicks
    document.querySelectorAll('.switch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!btn.classList.contains('active')) {
          e.preventDefault();
          const target = btn.href;
          
          pt.style.transition = 'none';
          pt.style.transform = 'translateY(-100%)';
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              pt.style.transition = 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)';
              pt.style.transform = 'translateY(0)';
              
              setTimeout(() => {
                window.location.href = target;
              }, 400);
            });
          });
        }
      });
    });
  });
</script>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove existing transition block if any
  content = content.replace(/<!-- Smooth Switcher Transition -->.*?<\/script>\n?/s, '');
  
  // Insert before </body>
  content = content.replace('</body>', `${transitionHtml}\n</body>`);
  
  fs.writeFileSync(file, content);
}
console.log("Added smooth transition to all HTML files.");
