import net from "net";
import { isSameSocket } from "./chat-utils.mjs";

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

let sockets = [];

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`); // Da qui capiamo l'indiirizzo IP e la porta del nuovo utente connesso
    sockets.push(sock); // Inserisce la nuova sock (nuovo utente connesso) nella lista delle sockets (lista degli utenti connessi)
    sock.on("data", function (data) {
        const sender = `${sock.remoteAddress}:${sock.remotePort}`;
        sockets.forEach((s) => {
            if (!isSameSocket(s, sock)) {
                s.write(`<${sender}> ${data}`); // Stampa sul terminale di ogni utente connesso (tranne di chi manda il messaggio) il messaggio inviato da uno degli utenti
            }
        })
    });
});

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} at port ${port}`);
});