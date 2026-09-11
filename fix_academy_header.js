const fs = require('fs');

let content = fs.readFileSync('financial-literacy.html', 'utf8');

// Wrap the inner contents of <header class="academy-header"> in an academy-header-row
content = content.replace(
  /<header class="academy-header">\n  <a href="index\.html" class="academy-brand">/, 
  '<header class="academy-header">\n  <div class="academy-header-row">\n    <a href="index.html" class="academy-brand">'
);

// Close the wrapper before </header>
content = content.replace(
  /    <\/div>\n  <\/div>\n<\/header>/,
  '    </div>\n  </div>\n  </div>\n</header>'
);

fs.writeFileSync('financial-literacy.html', content);
console.log("Wrapped academy header.");
