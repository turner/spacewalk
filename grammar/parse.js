const nearley = require("nearley");
const grammar = require("./grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
const file =
    [
        '##format=sw1\tname=IMR90 genome=hg38\n',
        'chromosome\tstart end\tx y z\n',
        'trace 0\n',
        '11\t125000 150000\t4.323 -3.950 4.992\n'
    ];

const str = file.join('');
parser.feed(str);

const parsed = parser.results;

// parser.results is an array of possible parsings.
console.log(parsed); // [[[[ "foo" ],"\n" ]]]
