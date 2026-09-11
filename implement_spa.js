const fs = require('fs');

const spaScript = `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    function setupSwitcher() {
      const switcher = document.getElementById('mainSwitcher');
      if (!switcher) return;
      const bg = switcher.querySelector('.switcher-bg');
      const btns = switcher.querySelectorAll('.switch-btn');
      
      btns.forEach((btn, index) => {
        // Remove old listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', async (e) => {
          if (newBtn.classList.contains('active-target')) return;
          e.preventDefault();
          
          btns.forEach(b => b.classList.add('active-target')); // Prevent double clicks
          
          const targetUrl = newBtn.href;
          
          // Slide the background immediately
          bg.style.transform = index === 0 ? 'translateX(0)' : 'translateX(94px)';
          
          // Fetch new page in background
          try {
            const response = await fetch(targetUrl);
            const html = await response.text();
            
            // Wait for slide animation to finish (300ms) before DOM swap
            setTimeout(() => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              
              // Swap body
              document.body.innerHTML = doc.body.innerHTML;
              
              // Push history state
              window.history.pushState({}, '', targetUrl);
              
              // Re-initialize scripts/events on new DOM
              setupSwitcher();
              if (window.reiInitHeader) window.reiInitHeader();
            }, 300);
            
          } catch (err) {
            console.error("SPA routing failed, falling back to standard navigation.", err);
            window.location.href = targetUrl;
          }
        });
      });
    }
    setupSwitcher();
  });
</script>
`;

const businessSwitcherHtml = `
      <div class="app-switcher" id="mainSwitcher" style="position:absolute; left:50%; transform:translateX(-50%); display:flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center; z-index:50;">
        <div class="switcher-bg" style="position:absolute; top:4px; left:4px; bottom:4px; width:94px; background:#fff; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform:translateX(0);"></div>
        <a href="index.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:700; color:#0f172a; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:600; color:#64748b; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Academy</a>
      </div>
`;

const academySwitcherHtml = `
      <div class="app-switcher" id="mainSwitcher" style="position:absolute; left:50%; transform:translateX(-50%); display:flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center; z-index:50;">
        <div class="switcher-bg" style="position:absolute; top:4px; left:4px; bottom:4px; width:94px; background:#fff; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform:translateX(94px);"></div>
        <a href="index.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:600; color:#64748b; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:700; color:#6d28d9; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Academy</a>
      </div>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the old simple switcher logic completely
  content = content.replace(/<div class="app-switcher" id="mainSwitcher".*?<\/div>\s*<\/div>/s, '');
  
  // Remove old JS logic
  content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const switcher = document\.getElementById\('mainSwitcher'\);.*?<\/script>/s, '');
  
  // Choose which HTML to inject based on the file
  const isAcademy = file === 'financial-literacy.html';
  const htmlToInject = isAcademy ? academySwitcherHtml : businessSwitcherHtml;
  
  if (isAcademy) {
    // Make sure academy-header-row is position: relative
    if(!content.includes('class="academy-header-row" style="position:relative;"')) {
       content = content.replace('class="academy-header-row"', 'class="academy-header-row" style="position:relative;"');
    }
    // Inject switcher as direct child of academy-header-row
    content = content.replace(/<a href="index.html" class="academy-brand">/, `${htmlToInject}\n    <a href="index.html" class="academy-brand">`);
  } else {
    // Inject switcher as direct child of header-row
    if(!content.includes('class="header-row" style="position:relative;"')) {
       content = content.replace('class="header-row"', 'class="header-row" style="position:relative;"');
    }
    content = content.replace(/<a class="brand"/, `${htmlToInject}\n    <a class="brand"`);
  }
  
  // Insert new SPA script before </body>
  content = content.replace('</body>', `${spaScript}\n</body>`);
  
  fs.writeFileSync(file, content);
}
console.log("Injected SPA logic and absolute positioning.");
