// Funzione per verificare se due socket sono uguali
function isSameSocket(s1, s2) {
    return (s1.remoteAddress === s2.remoteAddress && s1.remotePort === s2.remotePort);
}

// Funzione che invia il messaggio (message) a tutta la lista di utenti connessi (sockets)
function broadcastMessage(sockets, message) {
    sockets.forEach((sock) => sock.write(message));
}

// Funzione che compara le sock (utente che invia il messaggio) con gli utenti nella lista di utenti connessi (sockets)
// e ritorna una mappa filtrata che esclude l'utente che invia il messaggio
function getSocketsExcluding(sockets, sock) {
    return sockets.filter((s) => !isSameSocket(s, sock));
}

// Funzione che attraverso i regex elimina gli eventuali caratteri \n e \r dalla stringa
function removeCRLF(str) {
    return str.replace(/[\r\n]+$/, "");
}

function colorGrey(str) {
    return `\x1b[97;100m${str}\x1b[0m`;
}

function colorGreen(str) {
    return `\x1b[97;42m${str}\x1b[0m`;
}
// Funzione che divide il comando [/pvt] [name] [message] e fa ritornare solo [name] come receiver e [message] come pvtMsg
function parsePvtMessage(msg) {
    const [_, receiver, ...rest] = msg.split(" ");
    const pvtMsg = rest.join(" ");
    return [receiver, pvtMsg];
}

// Funzione che divide il comando [/nick] [name] e fa ritornare solo [name] come name
function parseNickMessage(msg) {
    const [_, name] = msg.split(" ");
    return name;
}

export { broadcastMessage, getSocketsExcluding, removeCRLF, colorGrey, colorGreen, parsePvtMessage, parseNickMessage };