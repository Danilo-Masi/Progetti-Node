setImmediate(() => {
    console.log("First immediate");
    Promise.resolve()
        .then(() => {
            console.log("then 1");
            return;
        })
        .then(() => {
            console.log("then 2")
        });
    queueMicrotask(() => { console.log("queueMicrotask"); });
    process.nextTick(() => { console.log("nextTick"); });
});
setImmediate(() => {
    console.log("Last immediate");
});