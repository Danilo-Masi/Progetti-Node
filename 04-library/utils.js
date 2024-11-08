// Funzione per inviare una risposta con JSON
function resJson(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
}

// Funzione per inviare una risposta con testo semplice
function resText(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(data);
}

// Funzione per determinare i tipi di contenuto accettati dal client
function getAcceptedTypes(req) {
    // Ottiene il valore dell'header "Accept" o, se non specificato imposta "*/*"
    const acceptHeaderVal = req.headers.accept || "*/*";
    // Divide il valore dell'header "Accept" in una lista di tipi di contenuto
    const acceptList = acceptHeaderVal.split(",");
    // Rimuove eventuali parametri di tipi di contenuto, mantenendo solo la parte principale
    const acceptTypes = acceptList.map((a) => a.split(";")[0]);

    // Verifica quali tipi di contenuto specifici sono accettati dal client
    const json = acceptTypes.includes("application/json");
    const textPlain = acceptTypes.includes("text/plain");
    const textHtml = acceptTypes.includes("text/html");
    const text = acceptTypes.includes("text/*");
    const any = acceptTypes.includes("*/*");

    // Restituisce un oggetto con le informazioni sui tipi accetatti
    return { json, textPlain, textHtml, text, any };
}

// Esporta le funzioni per poterle utilizzare in altri moduli
module.exports = { resJson, resText, getAcceptedTypes };