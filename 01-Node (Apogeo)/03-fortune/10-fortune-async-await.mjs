//*** Fa tutto quello che faceva il file 08 però utilizzando async/await.
//*** Utilizzando async e await il formato del file non è ".js" ma ".mjs".

import fs from "fs/promises";

const QUOTE_DIR = "./data";

try {
    const files = await fs.readdir(QUOTE_DIR, { withFileTypes: true });
    const txtFiles = files.filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * txtFiles.length);
    const quoteFile = `${QUOTE_DIR}/${txtFiles[randomIdx]}`;

    const data = await fs.readFile(quoteFile, "utf-8");
    console.log(data);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}
