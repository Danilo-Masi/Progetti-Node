import http from "http";
import fs from "fs/promises";
import mimeMap from "./media-types.mjs";
import { extname } from "path";
import { log } from "./logger.mjs";
import { createGzip } from "zlib";
import { hrtime } from "process";

const host = "127.0.0.1";
const port = 3000;
const root = "files";

const server = http.createServer();

server.on("request", async (req, res) => {
    const startTime = hrtime.bigint(); // Misurazione iniziale

    const [isGET, isHEAD] = [req.method === "GET", req.method === "HEAD"];
    if (!isGET && !isHEAD) {
        res.statusCode = 405;
        res.end();
        return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`;

    res.on("finish", () => {
        const endTime = hrtime.bigint(); // Misuriamo il tempo finale
        const duration = (endTime - startTime) / BigInt(1e6); // Calcoliamo la differenza tra il tempo finale e quello iniziale
        const timestamp = new Date().toISOString(); // Data della richiesta
        const ip = req.socket.remoteAddress; // Indirizzo IP
        const httpDetails = `"${req.method} ${pathname}" ${res.statusCode}`; // Metodo, risorsa e stato della richiesta
        log(`${ip} - ${timestamp} - ${httpDetails} - ${duration}ms`);
    });

    let fh;
    try {
        fh = await fs.open(file);
    } catch (error) {
        console.error(error);
        req.statusCode = 404;
        res.end();
        return;
    }

    const mimeType = mimeMap.get(extname(pathname));
    if (mimeType) {
        res.setHeader("Content-Type", mimeType);
    }

    if (isHEAD) {
        const fileStat = await fh.stat();
        res.setHeader("Content-Length", fileStat.size);
        res.statusCode = 200;
        res.end();
        await fh.close();
        return;
    }

    res.setHeader("Content-Encoding", "gzip");
    const fileStream = fh.createReadStream();
    const gzipTransform = createGzip();
    const handleStreamError = (err) => {
        console.error(err);
        fileStream.destroy();
        gzipTransform.destroy();
        res.statusCode = 500;
    }
    fileStream
        .on("error", handleStreamError)
        .pipe(gzipTransform)
        .on("error", handleStreamError)
        .pipe(res);
});

server.listen(port, host, () => {
    console.log(`Web server running at http:;//${host}:${port}/`);
})