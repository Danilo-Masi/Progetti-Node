function isPrime(num) {
    // Verifica che il numero è maggiore di 1
    if (num < 2) {
        return false;
    }
    // Verifica che il resto non dia 0, altrimenti 
    // è divisibile per un numero minore di esso e quindi non è primo
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

const PRIME_BIG = 39916801;

export { isPrime, PRIME_BIG };