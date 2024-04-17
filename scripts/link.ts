import fsPromises from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";

async function main() {
    const trendiLinkDir = '../../../dist';
    const trendiDir = path.resolve(process.cwd(), "dist");
    if(!(fs.existsSync(trendiDir))) {
        throw new Error(`${trendiDir} is not exists, please run npm run build first!`);
    }
    const examples = ["basic", "esm"];
    for (const example of examples) {
        const exampleTrendiDir = path.resolve(process.cwd(), `./examples/${example}/node_modules/trendi`);
        if (!(fs.existsSync(exampleTrendiDir))) {
            await fsPromises.symlink(trendiLinkDir, exampleTrendiDir);
        }
        console.log(`link example ${example} successfully!`);
    }
   
}

main();