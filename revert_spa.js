const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the SPA script
  content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*function setupSwitcher.*?\n<\/script>\n/s, '');
  
  // Replace the absolute position switcher with the normal flex item switcher
  // We'll just strip the 'position:absolute; left:50%; transform:translateX(-50%); ' and 'z-index:50;' from it
  content = content.replace(/style="position:absolute; left:50%; transform:translateX\(-50%\); display:flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center; z-index:50;"/g, 'style="display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; margin-right:16px; align-items:center;"');
  
  // Make sure it has ID mainSwitcher
  // Remove position:relative from header-row and academy-header-row
  content = content.replace(/class="header-row" style="position:relative;"/, 'class="header-row"');
  content = content.replace(/class="academy-header-row" style="position:relative;"/, 'class="academy-header-row"');
  
  fs.writeFileSync(file, content);
}
console.log("Reverted SPA logic and absolute centering.");
