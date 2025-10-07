const debug = require("./modules/debug")("04-open-rad-map.js");
const open = require("./modules/open/open");

debug("script started");
open("https://postonreddit.com");
debug("Function open called");