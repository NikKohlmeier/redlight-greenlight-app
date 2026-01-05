const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'docs', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found at:', indexPath);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Replace absolute paths with relative paths for GitHub Pages
// /_expo/... becomes ./_expo/...
html = html.replace(/src="\/_expo\//g, 'src="./_expo/');
html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed paths in index.html for GitHub Pages');

