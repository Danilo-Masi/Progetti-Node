// Importa il modulo http per creare il server
const http = require("http");
// Importa le funzioni di utilità per rispondere in JSON, testo e determinare i tipi accettati
const { resJson, resText, getAcceptedTypes } = require("./utils");

// Definisce l'host e la porta del server
const host = "127.0.0.1";
const port = 3000;

// Definisce un oggetto che rappresenta la libreria con un messaggio e una lista di libri
const library = {
    message: "Benvenuto nella biblioteca HTTP",
    books: [
        { author: "Naomi Klein", title: "Shock economy" },
        { author: "Sarge Latouche", title: "L'invenzione dell'economia" },
        { author: "Yanis Varoufakis", title: "L'economia che cambia il mondo" },
    ],
};

// Definisce le rotte supportate dal server, con diverse risposte per ciascuna rotta
const routes = {
    "/": {
        // Funzione per restituire il messaggio in formato testo
        getText: () => library.message,
        // Funzione per restituire il messaggio in formato JSON
        getJson: function () {
            return JSON.stringify({ message: library.message });
        },
    },
    "/books": {
        // Funzione per restituire la lista dei libri come stringa di testo, formattata autore-titolo
        getText: () => library.books.reduce((acc, cur) => {
            acc += `${cur.author} - ${cur.title}\n`;
            return acc;
        }, ""),
        // Funzione per restituire la lista dei libri in formato JSON
        getJson: function () {
            return JSON.stringify(library.books);
        },
    },
};

// Crea il server HTTP
const server = http.createServer((req, res) => {
    // Cerca una rotta che corrisponda alla richiesta URL
    const route = routes[req.url];
    // Se la rotta non esiste, restituisce un errore 404 (Not Found)
    if (!route) {
        res.statusCode = 404;
        res.end();
        return;
    }
    // Se il metodo della richiesta è HEAD
    if (req.method === "HEAD") {
        res.statusCode = 204; // Imposta il codice di stato 204 (No Content)
        res.end();
    } else if (req.method === "GET") { // Se il metodo della richiesta è GET
        // Ottiene i tipi di contenuto accetati dal client
        const accepts = getAcceptedTypes(req);
        if (accepts.json) {
            // Se il client accettat JSON, risponde con la rappresentazione JSON della rotta
            resJson(res, route.getJson());
        } else if (accepts.textPlain || accepts.text || accepts.any) {
            // Se il client accetta testo o un tipo generico, risponde con la rappresentazione in testo della rotta
            resText(res, route.getText());
        } else {
            // Se il client non accetta nessuno dei tipi supportati, risponde con lo status 406 (Not Acceptable)
            res.statusCode = 406;
            res.end();
        }
    } else {
        // Se il metodo della richiesta non è nè HEAD e nè GET, imposta il codice di stato 405 (Method Not Allowed)
        res.statusCode = 405;
        res.end();
    }
});

// Avvia il server in ascolto su host e porta definiti, con un messaggio di conferma nella console
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});