const quotes = [
    `l valore non serve a nulla quando non si accompagna alla giustizia, 
    e se tutti gli uomini fossero giusti, non ci sarebbe bisogno di essere valorosi
                                                                --- Gesilao II`,

    `Il Papa è un divino Otelma al quale è andata da Dio
                                            --- Aldo Busi`,
];

const randomIdx = Math.floor(Math.random() * quotes.length);

console.log(quotes[randomIdx]);