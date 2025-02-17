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

// Funzione che restituisce una stringa unica di identificazione per un socket basata su indirizzo e porta
function socketToId(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`;
}

// Funzione per colorare di grigio una stringa per il terminale
function colorGrey(str) {
    return `\x1b[97;100m${str}\x1b[0m`;
}

// Funzione per colorare di verde una stringa per il terminale
function colorGreen(str) {
    return `\x1b[97;42m${str}\x1b[0m`;
}

// Funzione che estrae il nickname da un messaggio di tipo "nick"
function parseNickMessage(msg) {
    const [_, name] = msg.split(" ");
    return name;
}

// Funzione che estrae il destinatario e il messaggio da un messaggio privato
function parsePvtMessage(msg) {
    const [_, receiver, ...rest] = msg.split(" ");
    const pvtMsg = rest.join(" ");
    return [receiver, pvtMsg];
}

module.exports = { isSameSocket, broadcastMessage, getSocketsExcluding, removeCRLF, socketToId, colorGrey, parseNickMessage, colorGreen, parsePvtMessage };