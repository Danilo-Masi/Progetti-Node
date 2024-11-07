const http = require("http");

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json"); // Aggiunto l'header per comunicare che stiamo restituendo dei dati in formato JSON
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" })); // Aggiunto messaggio in formato JSON
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});