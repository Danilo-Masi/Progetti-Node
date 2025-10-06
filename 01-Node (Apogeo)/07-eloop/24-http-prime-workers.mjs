import http from "http";
import process, { hrtime } from "process";
import { generateLogString } from "./eloop-utils.mjs";
import { isPrime } from "./cpu-intensive.mjs";
import { isMainThread, workerData, Worker, parentPort } from "worker_threads";

if (isMainThread) {
    const server = http.createServer();
    server.on("request", (req, res) => {
        const startTime = hrtime.bigint();

        const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
        const num = parseInt(searchParams.get("num"));

        res.on("finish", () => {
            console.log(generateLogString(req, res, pathname, startTime));
        });

        const worker = new Worker("./24-http-prime-workers.mjs", {
            workerData: { num: num },
        });

        worker.on("message", (result) => {
            res.end(`${num} is prime? ${result}`);
        })
    });

    server.listen(3000);
    console.log(`Worker ${process.pid} started`);

} else {
    const result = isPrime(workerData.num);
    parentPort.postMessage(result);
    process.exit();
}