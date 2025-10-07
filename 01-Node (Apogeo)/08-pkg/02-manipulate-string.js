const { urlify } = require("./modules/string-utils");
const { inspect } = require("util");

const songs = ["Guerrillia radio", "Killing in the name", "Bullet in the head", null];

for (const s of songs) {
    try {
        console.log(`${s} -> ${urlify(s)}`);
    } catch (error) {
        console.error(`Skipped non string value: ${inspect(s)}`);
    }
}