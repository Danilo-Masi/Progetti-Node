const net = require("net");
const { broadcastMessage, getSocketsExcluding, removeCRLF, socketToId } = require("./chat-utils");
const port = 5050;
const host = "127.0.0.1";

const server = net.createServer()

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
});

let nameMap = {};

function setName(sock, name) {
    nameMap[socketToId(sock)] = name;
}

function getName(sock) {
    return nameMap[socketToId(sock)];
}

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);
    if (cleanMsg.startsWith("/nick ")) {
        const oldName = getName(sock);
        const [_, name] = cleanMsg.split(" ");
        setName(sock, name);
        broadcastMessage(sockets, `${oldName} is now ${name}\n`);
    } else {
        broadcastMessage(getSocketsExcluding(sockets, sock), `<${getName(sock)}> ${cleanMsg}\n`);
    }
}


let sockets = [];
server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketToId(sock)}`);
    sockets.push(sock);
    setName(sock, socketToId(sock));
    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });
});