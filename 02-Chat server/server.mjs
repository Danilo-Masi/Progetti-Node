import net from "net";
import { processMessage, setName, socketToId } from "./chat-utils.mjs";

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

let sockets = [];
let nameMap = {};

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketToId(sock)}`); // Da qui capiamo l'indiirizzo IP e la porta del nuovo utente connesso
    sockets.push(sock); // Inserisce la nuova sock (nuovo utente connesso) nella lista delle sockets (lista degli utenti connessi)
    setName(sockets, sock, socketToId(sock));
    sock.on("data", function (data) {
        processMessage(sockets, sock, data.toString());
    });
});

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} at port ${port}`);
});