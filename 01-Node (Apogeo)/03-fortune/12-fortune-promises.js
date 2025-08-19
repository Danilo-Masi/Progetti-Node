const fs = require("fs/promises");

const QUOTES_DIR = "./data";

fs.readdir(QUOTES_DIR, { withFileTypes: true })
    .then((files) => {
        const txtFiles = files
            .filter((f) => f.isFile() && f.name.endsWith(".txt"))
            .map((f) => f.name);

        const randomIdx = Math.floor(Math.random() * txtFiles.length);
        const quoteFile = `${QUOTES_DIR}/${txtFiles[randomIdx]}`;

        return fs.readFile(quoteFile, "utf-8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(`Error: ${err.message}`);
        process.exitCode = 1;
        return;
    });