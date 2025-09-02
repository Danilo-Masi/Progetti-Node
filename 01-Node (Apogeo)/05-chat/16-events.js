const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("event", () => {
    console.log("an event occured!");
});

emitter.emit("event");