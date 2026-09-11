const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add id="loginBtn" to the login-nav anchor if missing
  content = content.replace(
    /<li class="login-nav"><a href="login.html">👤 Login<\/a><\/li>/g,
    '<li class="login-nav"><a id="loginBtn" href="login.html">👤 Login</a></li>'
  );
  
  fs.writeFileSync(file, content);
  console.log(`Fixed: ${file}`);
}
