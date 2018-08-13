const ReactComponentJson = require('react-component-json');
const fs = require('fs');

const file = fs.readFileSync('./src/Dragger/index.js', 'utf8');

const json = ReactComponentJson.json(file);
const md = ReactComponentJson.md(json);


const readme = fs.readFileSync('./scripts/readme.md', 'utf8');

fs.writeFileSync('./README.md', readme + "\n" + md.md);
