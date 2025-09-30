import { PRIME_BIG, isPrimeAsync } from "./cpu-intensive.mjs";
import { hrtime } from "process";

let lastTime = hrtime.bigint();
const interval = setInterval(() => {
    const now = hrtime.bigint();
    const duration = (now - lastTime) / BigInt(1e6);
    console.log(`[interval] ${duration}ms passed since last one`);
}, 1000);

isPrimeAsync(PRIME_BIG, function (res) {
    console.log(`${PRIME_BIG} is prime? ${res}`);
    clearInterval(interval);
});