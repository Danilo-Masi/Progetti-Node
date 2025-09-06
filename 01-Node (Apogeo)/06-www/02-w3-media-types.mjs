import http from "http";
import fs from "fs/promises";
import typesMap from "./media-types.mjs";
import { extname } from "path";

const host = "127.0.0.1";
const port = 3000;
const root = "files";

const server = http.createServer();
server.on("request", async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;

    console.log(`Requested ${file} file`);

    const mimeType = typesMap.get(extname(pathname));
    if (mimeType) {
        res.setHeader("Content-Type", mimeType);
    }

    try {
        const data = await fs.readFile(file);
        res.end(data);
    } catch (error) {
        console.error(error);
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Web server running at http://${host}:${port}/`);
})