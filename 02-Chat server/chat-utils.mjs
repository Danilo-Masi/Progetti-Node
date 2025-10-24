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
function getSocktesExcluding(sockets, sock) {
    return sockets.filter((s) => !isSameSocket(s, sock));
}

// Funzione che attraverso i regex elimina gli eventuali caratteri \n e \r dalla stringa
function removeCRLF(str) {
    return str.replace(/[\r\n]+$/, "");
}

//
function socketToId(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`;
}

//
function setName(namesMap, sock, name) {
    namesMap[socketToId(sock)] = name;
}

//
function getName(namesMap, sock) {
    return namesMap[socketToId(sock)];
}

// Funzione che stampa il messaggio inviato dall'utente su tutti i terminali connessi (tranne che proprio a colui che ha scritto il messaggio)
function processMessage(sockets, sock, message) {
    const cleanMsg = removeCRLF(message);

    if (cleanMsg.startsWith("/nick ")) {
        const oldName = getName(sock);
        const [_, name] = cleanMsg.split(" ");
        setName(sock, name);
        broadcastMessage(sockets, `${oldName} is now ${name}\n`);
    } else {
        broadcastMessage(
            getSocktesExcluding(sockets, sock),
            `<${getName(sock)}> ${cleanMsg}\n`
        );
    }
}

export { processMessage, setName, getName, socketToId };