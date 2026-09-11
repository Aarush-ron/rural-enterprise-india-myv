const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the buggy inline styles that break absolute positioning
  content = content.replace(
    /justify-self:center; position:relative;/g,
    ''
  );
  
  // In financial-literacy.html, we don't include style.css, so we MUST manually add the absolute centering!
  if (file === 'financial-literacy.html') {
     content = content.replace(
       /id="mainSwitcher" style="display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center;  "/g,
       'id="mainSwitcher" style="display:inline-flex; background:#f1f5f9; border-radius:24px; padding:4px; align-items:center; position:absolute; left:50%; transform:translateX(-50%); z-index:10;"'
     );
  }
  
  fs.writeFileSync(file, content);
}
console.log("Fixed inline positioning.");
