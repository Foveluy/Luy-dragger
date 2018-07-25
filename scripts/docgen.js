const ReactComponentJson = require("react-component-json");
const fs = require("fs");

const file = fs.readFileSync("./src/Dragger/index.js", "utf8");

const json = ReactComponentJson.json(file);
const md = ReactComponentJson.md(json);

console.log(md);
