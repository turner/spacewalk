const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const str =

    '##format=sw1 name=A549 genome=hg38\n' +

    'nongenomic\n' +
    'billybobthorton\n' +
    '121786 120787 121192\n' +
    '122944 120197 121320\n' +

    'chromosome\tstart\tend\tx\ty\tz\n' +

    'trace 0\n' +
    'chr18 50000 100000 121702 120524 120359\n' +
    'chr18 100000 150000 121381 121344 120706\n' +
    'chr18 150000 200000 121032 121740 121470\n' +

    'trace 1\n' +
    'chr18 50000 100000 121727 121616 120815\n' +
    'chr18 100000 150000 121786 120787 121192\n' +
    'chr18 150000 200000 121216 120548 121989\n' +

    'trace 2\n' +
    'chr18 50000 100000 121211 119760 120834\n' +
    'chr18 100000 150000 122007 120077 121333\n' +
    'chr18 150000 200000 122944 120197 121320\n' +

    'nongenomic\n' +
    'rna\n' +
    '73235 6561 1677\n' +
    '73262 6644 1755\n';

parser.feed(str);

const parsed = parser.results;

// parser.results is an array of possible parsings.
console.log(parsed);

