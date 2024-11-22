import path from 'path';
import fs from 'fs';

const componentsDir = path.resolve(__dirname, "src/components");
const outputFile = path.resolve(componentsDir, "index.js");

const files = fs
  .readdirSync(componentsDir)
  .filter((file) => file.endsWith(".vue"));

const exports = files
  .map((file) => {
    const name = file.replace(".vue", ""); // Remove .vue extension
    return `export { default as ${name} } from './${file}';`;
  })
  .join("\n");

fs.writeFileSync(outputFile, exports, "utf-8");
console.log("Auto-generated component exports:");
console.log(exports);
