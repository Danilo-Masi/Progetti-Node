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

function isPrimeRecursive(n, i, cb) {
    if (i >= n) { return cb(true); }
    if (n % i === 0) { return cb(false) }
    setImmediate(isPrimeRecursive.bind(null, n, i + 1, cb));
}

function isPrimeAsync(num, cb) {
    process.nextTick(() => {
        if (num < 2) { return cb(false) }
        isPrimeRecursive(num, 2, cb);
    });
}

const PRIME_BIG = 39916801;
const PRIME_HUGE = 999999989;

export { isPrime, PRIME_BIG, isPrimeAsync, PRIME_HUGE };