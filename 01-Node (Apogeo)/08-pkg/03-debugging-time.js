const debugFactory = require("./modules/debug");
const debug = debugFactory("03-debugging-time.js");

debug(`Script started at ${new Date().toISOString()}`);

setTimeout(() => {
    // doing something...
    debug(`Script ended at ${new Date().toISOString()}`);
}, 1000);