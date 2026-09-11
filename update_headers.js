const fs = require('fs');

const switcherHtml = `
      <div class="app-switcher" style="display:inline-flex; background:var(--grey-200); border-radius:24px; padding:4px; margin-right:16px;">
        <a href="index.html" class="switch-btn active" style="padding:8px 16px; border-radius:20px; font-size:14px; font-weight:700; color:var(--navy-dark); background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.1); text-decoration:none; transition:all 0.3s;">Business</a>
        <a href="financial-literacy.html" class="switch-btn" style="padding:8px 16px; border-radius:20px; font-size:14px; font-weight:600; color:var(--grey-700); text-decoration:none; transition:all 0.3s;">Academy</a>
      </div>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  if (file === 'financial-literacy.html') continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove FAB
  content = content.replace(/<a href="financial-literacy\.html" class="academy-fab">.*?<\/a>\n?/s, '');
  
  // Insert switcher before header-actions select
  if (!content.includes('class="app-switcher"')) {
    content = content.replace(/<div class="header-actions"([^>]*)>/, `<div class="header-actions"$1>${switcherHtml}`);
  }
  
  fs.writeFileSync(file, content);
}
console.log("Updated main HTML headers.");
