// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "file", "symbols": ["header", "sections"]},
    {"name": "header", "symbols": ["format", "_", "cell_line", "_", "genome", "newline"]},
    {"name": "format$string$1", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}, {"literal":"a"}, {"literal":"t"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "format", "symbols": ["format$string$1", "version"]},
    {"name": "version$string$1", "symbols": [{"literal":"s"}, {"literal":"w"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "version", "symbols": ["version$string$1"]},
    {"name": "cell_line$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cell_line", "symbols": ["cell_line$string$1", "cell_line_name"]},
    {"name": "cell_line_name", "symbols": ["label"]},
    {"name": "genome$string$1", "symbols": [{"literal":"g"}, {"literal":"e"}, {"literal":"n"}, {"literal":"o"}, {"literal":"m"}, {"literal":"e"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genome", "symbols": ["genome$string$1", "genome_name"]},
    {"name": "genome_name", "symbols": ["label"]},
    {"name": "sections", "symbols": ["section"]},
    {"name": "sections", "symbols": ["sections", "section"]},
    {"name": "section", "symbols": ["genomic_section"]},
    {"name": "section", "symbols": ["non_genomic_section"]},
    {"name": "genomic_section", "symbols": ["genomic_column_title", "traces"]},
    {"name": "genomic_column_title$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"r"}, {"literal":"o"}, {"literal":"m"}, {"literal":"o"}, {"literal":"s"}, {"literal":"o"}, {"literal":"m"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_column_title$string$2", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_column_title$string$3", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_column_title", "symbols": ["genomic_column_title$string$1", "_", "genomic_column_title$string$2", "_", "genomic_column_title$string$3", "_", {"literal":"x"}, "_", {"literal":"y"}, "_", {"literal":"z"}, "newline"]},
    {"name": "traces", "symbols": ["trace"]},
    {"name": "traces", "symbols": ["traces", "trace"]},
    {"name": "trace", "symbols": ["trace_label", "trace_rows"]},
    {"name": "trace_label$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trace_label", "symbols": ["trace_label$string$1", "_", "int", "newline"]},
    {"name": "trace_rows", "symbols": ["trace_row"]},
    {"name": "trace_rows", "symbols": ["trace_rows", "trace_row"]},
    {"name": "trace_row$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trace_row", "symbols": ["trace_row$string$1", "int", "_", "int", "_", "int", "_", "decimal", "_", "decimal", "_", "decimal", "newline"]},
    {"name": "non_genomic_section", "symbols": ["non_genomic_column_title", "non_genomics"]},
    {"name": "non_genomic_column_title$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"n"}, {"literal":"g"}, {"literal":"e"}, {"literal":"n"}, {"literal":"o"}, {"literal":"m"}, {"literal":"i"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "non_genomic_column_title", "symbols": ["non_genomic_column_title$string$1", "newline"]},
    {"name": "non_genomics", "symbols": ["non_genomic"]},
    {"name": "non_genomics", "symbols": ["non_genomics", "non_genomic"]},
    {"name": "non_genomic", "symbols": ["non_genomic_label", "non_genomic_rows"]},
    {"name": "non_genomic_label", "symbols": ["label", "newline"]},
    {"name": "non_genomic_rows", "symbols": ["non_genomic_row"]},
    {"name": "non_genomic_rows", "symbols": ["non_genomic_rows", "non_genomic_row"]},
    {"name": "non_genomic_row", "symbols": ["decimal", "_", "decimal", "_", "decimal", "newline"]},
    {"name": "label$ebnf$1", "symbols": [/[\w]/]},
    {"name": "label$ebnf$1", "symbols": ["label$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "label", "symbols": ["label$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": [/[\s\t]/]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s\t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "newline", "symbols": [/[\r?\n|\r]/]}
]
  , ParserStart: "file"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
