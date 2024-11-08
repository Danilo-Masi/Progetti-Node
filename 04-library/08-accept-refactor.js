// Importa il modulo http per creare il server
const http = require("http");
// Importa le funzioni di utilità per rispondere in JSON, testo e determinare i tipi accettati
const { resJson, resText, getAcceptedTypes } = require("./utils");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Definisce i dati di risposta per JSON e testo semplice
const data = {
    json: JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }),
    text: "Benvenuto nella biblioteca HTTP",
}

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Ottiene i tipi di contenuto accetati dal client
    const accepts = getAcceptedTypes(req);
    // Verifica se il client accetta JSON
    if (accepts.json) {
        resJson(res, data.json);
    } else if (accepts.textPlain || accepts.text || accepts.any) {
        resText(res, data.text);
    } else {
        // Se il client non accetta nessuno dei tipi supportati, risponde con lo status 406 (Not Acceptable)
        res.statusCode = 406;
        res.end();
    }
});

// Avvia il server in ascolto su host e porta definiti, con un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});