import fs from "fs/promises";
import { log } from "./logger.mjs";
import { hrtime } from "process";

async function exitIfNotDir(path) {
    try {
        const pathStat = await fs.stat(path);
        if (!pathStat.isDirectory()) {
            console.error(`${path} is not a directory`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`${path} does not exits or cannot be opened`);
        process.exit(1);
    }
}

function isStringTrue(str) {
    if (str === "true") {
        return true;
    }
    return false;
}

function hasTrailingSlash(path) {
    return path[path.length - 1] === "/";
}

async function tryOpenFile(path, index) {
    let file = path;
    if (hasTrailingSlash(path)) {
        if (index) {
            file = `${path}index.html`;
        } else {
            return { found: false }
        }
    }

    let fh;
    try {
        fh = await fs.open(file);
    } catch (e) {
        console.error(e);
        return { found: false };
    }

    const fileStat = await fh.stat();
    if (fileStat.isDirectory()) {
        await fh.close();
        return { found: false };
    }

    return { found: true, fh, fileStat };
}

function generateLogString(req, res, pathname, startTime) {
    const endTime = hrtime.bigint();
        const duration = (endTime - startTime) / BigInt(1e6);
        const timestamp = new Date().toISOString();
        const ip = req.socket.remoteAddress;
        const httpDetails = `"${req.method} ${pathname}" ${res.statusCode}`;
        log(`${ip} - ${timestamp} - ${httpDetails} - ${duration}ms`);
}

export { exitIfNotDir, isStringTrue, tryOpenFile, generateLogString };