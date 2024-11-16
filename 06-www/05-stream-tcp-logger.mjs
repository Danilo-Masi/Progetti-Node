// Importa il modulo `net` per creare un server TCP
import net from "net";

// Crea un instanza del server TCP
const server = net.createServer();

// Fa si che il server inizi ad ascoltare le connessioni in ingresso sulla porta e host specificato
server.listen(5050, "127.0.0.1");

// Listener per l'evento "connection", che viene attivato ogni volta che un client si connette al server
server.on("connection", function (sock) {
    // L'istener per l'evento "data" che viene attivato quando il server riceve i dati dal client
    sock.on("data", function (data) {
        console.log("Received data event with: " + data);
    });
});