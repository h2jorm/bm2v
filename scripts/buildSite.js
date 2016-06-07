const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

fs.readFile(path.join(projectDir, 'example/index.html'), 'utf8', (err, data) => {
  data = data.replace('../build/bm2v.js', './build/bm2v.js')
    .replace('./style.css', './example/style.css')
    .replace(/\.\/snippets/g, './example/snippets');
  fs.writeFile(path.join(projectDir, 'index.html'), data);
});

fs.readFile(path.join(projectDir, '.gitignore'), 'utf8', (err, data) => {
  data = data.replace('/build/\n', '');
  fs.writeFile(path.join(projectDir, '.gitignore'), data);
});
