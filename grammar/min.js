// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  number: /[0-9]+/,
  identifier:  /[a-zA-Z0-9]+/,
  newline: {match: '\n', lineBreaks: true},
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "file$ebnf$1", "symbols": ["trace_row"]},
    {"name": "file$ebnf$1", "symbols": ["file$ebnf$1", "trace_row"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "file", "symbols": ["file$ebnf$1"], "postprocess": id},
    {"name": "trace_row", "symbols": [(lexer.has("number") ? {type: "number"} : number), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("number") ? {type: "number"} : number), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("number") ? {type: "number"} : number), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("number") ? {type: "number"} : number), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("number") ? {type: "number"} : number), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("number") ? {type: "number"} : number), (lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": (d) => { return { chr:d[0], start:d[2], end:d[4], x:d[6], y:d[8], z:d[10] } }}
]
  , ParserStart: "file"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
