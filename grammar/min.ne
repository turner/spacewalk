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
{% ([ chr, a, start, b, end, c, xx, d, yy, e, zz, f ]) => { return { chr, start, end, xx, yy, zz } } %}

