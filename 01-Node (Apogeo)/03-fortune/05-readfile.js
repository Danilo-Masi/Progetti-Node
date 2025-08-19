const fs = require("fs");

fs.readFile("./data/002.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error while reading quote file");
        return;
    }
    console.log(data);
});