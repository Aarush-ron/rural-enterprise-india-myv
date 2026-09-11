const fs = require('fs');

let content = fs.readFileSync('start-business.html', 'utf8');

// Inject CSS
if (!content.includes('leaflet.css')) {
  content = content.replace('<link rel="stylesheet" href="assets/css/style.css">', 
    '<link rel="stylesheet" href="assets/css/style.css">\n<!-- Leaflet CSS for Map -->\n<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>');
}

// Inject Scripts
if (!content.includes('leaflet.js')) {
  content = content.replace('<script src="assets/js/wizard.js"></script>', 
    '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>\n<script src="https://unpkg.com/leaflet.heat/dist/leaflet-heat.js"></script>\n<script src="assets/js/wizard.js"></script>');
}

fs.writeFileSync('start-business.html', content);
console.log("Injected Leaflet into start-business.html");
