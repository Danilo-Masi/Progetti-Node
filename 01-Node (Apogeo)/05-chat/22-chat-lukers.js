const net = require("net");
const { broadcastMessage, getSocketsExcluding, removeCRLF, socketToId, colorGrey, parseNickMessage, colorGreen, parsePvtMessage } = require("./chat-utils");
// Importa il modulo del `LukersDetector`
const LukersDetector = require("./luckers-detector");

// Imposta il timer per stabilire quando terminare una connessione in caso di inattività
let ld = new LukersDetector(10);

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
});

let namesMap = {};

function setName(sock, name) {
    namesMap[socketToId(sock)] = name;
}

function getName(sock) {
    return namesMap[socketToId(sock)];
}

function getSocketByName(sockets, name) {
    return sockets.find((s) => getName(s) === name);
}

let sockets = [];

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);
    if (cleanMsg.startsWith("/nick ")) {
        const oldName = getName(sock);
        const name = parseNickMessage(cleanMsg);
        setName(sock, name);
        broadcastMessage(sockets, `${colorGrey(`${oldName} is now ${name}\n`)}`);
        // Aggiorna il nome dell'utente in `LukersDetector`
        ld.renameUser(oldName, name);
    } else if (cleanMsg.startsWith("/pvt ")) {
        const [receiver, pvtMsg] = parsePvtMessage(cleanMsg);
        const receiverSock = getSocketByName(sockets, receiver);
        const prevMsg = colorGreen(`(pvt msg from ${getName(sock)})`);
        receiverSock.write(`${prevMsg} ${pvtMsg}\n`);
    } else if (cleanMsg === "/list") {
        const preMsg = colorGrey(`(only visible to you)`);
        const usersString = sockets.map(getName).join(",");
        sock.write(`${preMsg} Users are: ${usersString}\n`);
    } else {
        broadcastMessage(getSocketsExcluding(sockets, sock), `<${getName(sock)}> ${cleanMsg}\n`)
    }
}

const joinedMessage = (sock) => `${colorGrey(`${getName(sock)} joined the chat`)}\n`;

const leftMessage = (sock) => `${colorGrey(`${getName(sock)} left the chat`)}\n`;

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketToId(sock)}`);
    sockets.push(sock);
    setName(sock, socketToId(sock));
    broadcastMessage(sockets, joinedMessage(sock));
    // Aggiunge il client al  `LukersDetector` per monitorare la sua attività
    ld.addUser(socketToId(sock));

    sock.on("data", function (data) {
        // Reset dell'inattività del client in caso di interazione
        ld.touchUser(socketToId(sock));
        processMessage(sock, data.toString());
    });

    sock.on("close", function () {
        sockets = getSocketsExcluding(sockets, sock);
        broadcastMessage(sockets, leftMessage(sock));
        console.log("CLOSED: " + socketToId(sock));
        // Rimuove il client dalla lista degli utenti monitorati
        ld.removeUser(socketToId(sock));
    });

    // Gestisce l'eveneto di inattività del client
    ld.on("luker detected", (name) => {
        console.log(`${name} is a luker!`);
        const sock = getSocketByName(sockets, name);
        sock.resetAndDestroy();
    });
});