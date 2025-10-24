import net from "net";
import { processMessage, setName, socketToId } from "./chat-utils.mjs";

const port = 5050;
const host = "127.0.0.1";

const server = net.createServer();

let sockets = [];
let nameMap = {};

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketToId(sock)}`);
    sockets.push(sock);
    setName(nameMap, sock, socketToId(sock));
    sock.on("data", function (data) {
        processMessage(nameMap, sock, data.toString());
    });
});

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} at port ${port}`);
});