import fs from "fs/promises";

const QUOTES_DIR = "./data";

try {
    const files = await fs.readdir(QUOTES_DIR, { withFileTypes: true });
    const txtFiles = files
        .filter((f) => f.isFile() && f.name.endsWith(".txt"))
        .map((f) => f.name);

    const randomIdx = Math.floor(Math.random() * txtFiles.length);
    const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

    const data = await fs.readFile(quoteFile, "utf-8");
    console.log(data);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}