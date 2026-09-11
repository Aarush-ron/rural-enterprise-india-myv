const fs = require('fs');

const mainActions = `      <select class="lang-select" aria-label="Select language" style="border: 1px solid var(--grey-200); padding: 10px 14px; border-radius: 8px; font-weight: 600; font-size: 14px; background: #fff; cursor: pointer; color: var(--navy); outline: none;">
        <option>English</option><option>हिन्दी</option>
      </select>
      <form class="search-form gov-search" role="search" onsubmit="return false;">
        <label for="siteSearch" class="visually-hidden" style="position:absolute;left:-9999px;">Search</label>
        <input id="siteSearch" type="text" placeholder="Search schemes, loans, businesses, terms...">
        <button type="submit" aria-label="Search">🔍</button>
      </form>`;

const academyActions = `    <div class="streak-counter">
      🔥 12 Day Streak
    </div>
    <div class="user-profile">
      JA
    </div>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file === 'financial-literacy.html') {
    content = content.replace(/<div class="academy-header-right">\s*<\/div>/s, '<div class="academy-header-right">\n' + academyActions + '\n  </div>');
  } else {
    content = content.replace(/<div class="header-actions"[^>]*>\s*<nav class="main-nav gov-nav"/s, '<div class="header-actions" style="display: flex; gap: 16px; align-items: center;">\n' + mainActions + '\n    </div>\n  <nav class="main-nav gov-nav"');
  }
  
  fs.writeFileSync(file, content);
}
console.log("Restored lost header elements.");
