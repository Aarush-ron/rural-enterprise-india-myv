const fs = require('fs');
const files = [
  'schemes-benefits.html',
  'loans-facility.html', 
  'government-initiatives.html',
  'impact-data.html',
  'dashboard.html',
  'start-business.html',
  'login.html',
  'register.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix: class="" class="active" => class="active"
  content = content.replace(/class=""\s+class="active"/g, 'class="active"');
  
  fs.writeFileSync(file, content);
  console.log(`Fixed: ${file}`);
}
