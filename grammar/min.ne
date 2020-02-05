# Grammar for Spacewalk files (.sw)

@{%
const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  number: /[0-9]+/,
  identifier:  /[a-zA-Z0-9]+/,
  newline: {match: '\n', lineBreaks: true},
});
%}

@lexer lexer

file        -> trace_row:+      {% id %}

trace_row   -> %number %ws %number %ws %number %ws %number %ws %number %ws %number %newline
{% (d) => { return { chr:d[0], start:d[2], end:d[4], x:d[6], y:d[8], z:d[10] } } %}

