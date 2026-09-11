const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the old transition block
  content = content.replace(/<!-- Smooth Switcher Transition -->.*?<\/script>\n?/s, '');
  
  // Add meta tag for cross-document view transitions if not present
  if (!content.includes('<meta name="view-transition"')) {
    content = content.replace('</head>', '  <meta name="view-transition" content="same-origin">\n</head>');
  }
  
  fs.writeFileSync(file, content);
}
console.log("Replaced manual transition with Cross-Document View Transitions.");
