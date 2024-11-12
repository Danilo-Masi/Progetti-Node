// Funzione che verifica se due socket sono uguali confrontando indirizzo e porta
function isSameSocket(s1, s2) {
    return (
        s1.remoteAddress === s2.remoteAddress && s1.remotePort === s2.remotePort
    );
}

// Funzione per inviare un messaggio a tutti i socket nella lista
function broadcastMessage(sockets, message) {
    sockets.forEach((sock) => sock.write(message));
}

// Funzione per ottenere tutti i socket dalla lista, escluso un socket specificato
function getSocketsExcluding(sockets, sock) {
    return sockets.filter((s) => !isSameSocket(s, sock));
}

// Funzione che rimuove eventuali caratteri di ritorno a capo (CRLF) alla fine di una stringa
function removeCRLF(str) {
    return str.replace(/[\r\n]+$/, "");
}

module.exports = { isSameSocket, broadcastMessage, getSocketsExcluding, removeCRLF };