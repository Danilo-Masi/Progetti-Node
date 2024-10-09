//*** Prende un indice casuale in un array di citazioni (quotes) e stampa la citazione con quell'indice.

const quotes = [
    `Any app that...`,
    `Javascript is the only...`,
    `Code never lies, comments sometimes do`,
];

const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);
