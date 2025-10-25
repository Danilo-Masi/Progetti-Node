import net from "net";
import { broadcastMessage, colorGreen, colorGrey, getSocketsExcluding, parseNickMessage, parsePvtMessage, removeCRLF } from "./chat-utils.mjs";

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

// Lista delle socket (es: 127.0.0.1:50342, 127.0.0.1:50344, ...)
let sockets = [];
// Mappa dei nomi degli utenti (es: 127.0.0.1:50342:Danilo, 127.0.0.1:50343:Fra, ...)
let namesMap = {};
// Lista dei comandi attualmente disponibili
let commands = [
    "/nick [new name] : Change the users name",
    "/pvt [name] [receiver] [message] : Send a private message to specific user",
    "/list : View a list of online users",
    "/help : View a list of avabile commands",
]

// Funzione che ritorna l'indirizzo IP+Porta di una socket specifica
function socketToId(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`;
}

// Funzione che permette di settare un nome per una socket
function setName(sock, name) {
    namesMap[socketToId(sock)] = name;
}

// Funzione che permette di recuperare un nome per una socket
function getName(sock) {
    return namesMap[socketToId(sock)];
}

// ---
function getSocketByName(sockets, name) {
    return sockets.find((s) => getName(s) === name);
}

// Funzione che ritorna un messaggio con il nome dell'utente che è entrato nella chat
const joinedMessage = (sock) => {
    return `${colorGrey(`${getName(sock)} joined the chat`)}\n`;
}

// Funzione che ritorna un messaggio con il nome dell'utente che ha abbandonato la chat
const leftMessage = (sock) => {
    return `${colorGrey(`${getName(sock)} left the chat`)}\n`;
}

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);

    if (cleanMsg.startsWith("/nick ")) {
        // Cambio nome
        const oldName = getName(sock);
        const name = parseNickMessage(cleanMsg);
        setName(sock, name);
        broadcastMessage(sockets, `${colorGrey(`${oldName} is now ${name}`)}\n`);
    } else if (cleanMsg.startsWith("/pvt")) {
        // Messaggio privato
        const [receiver, pvtMsg] = parsePvtMessage(cleanMsg);
        const receiverSock = getSocketByName(sockets, receiver);
        const preMsg = colorGreen(`(pvt msg from ${getName(sock)})`);
        receiverSock.write(`${preMsg} ${pvtMsg}\n`);
    } else if (cleanMsg.startsWith("/list")) {
        // Lista utenti online
        const preMsg = colorGrey(`Users online are:`);
        const usersString = sockets.map(getName).join("\n");
        sock.write(`${preMsg}\n${usersString}\n`);
    } else if (cleanMsg.startsWith("/help")) {
        // Lista comandi disponibili
        const preMsg = colorGrey("The actual command avabile: ");
        sock.write(`${preMsg}\n${commands.join("\n")}\n`);
    } else {
        // Messaggio in broadcast
        broadcastMessage(
            getSocketsExcluding(sockets, sock),
            `<${getName(sock)}> ${cleanMsg}\n`
        );
    }
}

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketToId(sock)}`);

    sockets.push(sock);
    setName(sock, socketToId(sock));
    broadcastMessage(sockets, joinedMessage(sock));

    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });

    sock.on("close", function () {
        sockets = getSocketsExcluding(sockets, sock);
        broadcastMessage(sockets, leftMessage(sock));
        console.log("CLOSED: " + socketToId(sock));
    });
});

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} at port ${port}`);
});