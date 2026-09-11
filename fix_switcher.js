const fs = require('fs');

const businessSwitcherHtml = `
      <div class="app-switcher" id="mainSwitcher" style="position:relative; display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; margin-right:16px; align-items:center;">
        <div class="switcher-bg" style="position:absolute; top:4px; left:4px; bottom:4px; width:94px; background:#fff; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform:translateX(0);"></div>
        <a href="index.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:700; color:#0f172a; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:600; color:#64748b; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Academy</a>
      </div>
`;

const academySwitcherHtml = `
      <div class="app-switcher" id="mainSwitcher" style="position:relative; display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; margin-right:16px; align-items:center;">
        <div class="switcher-bg" style="position:absolute; top:4px; left:4px; bottom:4px; width:94px; background:#fff; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform:translateX(94px);"></div>
        <a href="index.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:600; color:#64748b; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="position:relative; z-index:1; padding:8px 16px; font-size:14px; font-weight:700; color:#6d28d9; text-decoration:none; width: 94px; text-align:center; display:inline-block; box-sizing:border-box;">Academy</a>
      </div>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the old simple switcher logic
  content = content.replace(/<div class="app-switcher".*?<\/div>/s, '');
  
  // Choose which HTML to inject based on the file
  const isAcademy = file === 'financial-literacy.html';
  const htmlToInject = isAcademy ? academySwitcherHtml : businessSwitcherHtml;
  
  if (isAcademy) {
    // Inject into academy header
    content = content.replace(/<div class="academy-header-right">/, `<div class="academy-header-right">\n${htmlToInject}`);
  } else {
    // Inject into main app header
    content = content.replace(/<div class="header-actions"[^>]*>/, (match) => `${match}\n${htmlToInject}`);
  }
  
  fs.writeFileSync(file, content);
}
console.log("Injected sliding background switcher.");
