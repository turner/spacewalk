// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const global = { genomic: {}, nongenomic: {} };

const genomicHandler = (traceID, traces) => global.genomic[ traceID ] = traces;

const nongenomicHandler = (label, xyzList) => global.nongenomic[ label ] = xyzList;

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
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "file$ebnf$1", "symbols": ["section"]},
    {"name": "file$ebnf$1", "symbols": ["file$ebnf$1", "section"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "file", "symbols": ["header", "file$ebnf$1"], "postprocess": ([ header, payload ]) => { return global }},
    {"name": "header", "symbols": ["format", "__", "cell_line", "__", "genome", "newline"], "postprocess": ([ a, b, { cellLine }, c, { genome }, d ]) => { return { 'cellLine': cellLine, 'genome': genome } }},
    {"name": "format$string$1", "symbols": [{"literal":"#"}, {"literal":"#"}, {"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}, {"literal":"a"}, {"literal":"t"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "format", "symbols": ["format$string$1", "version"], "postprocess": (d) => null},
    {"name": "version$string$1", "symbols": [{"literal":"s"}, {"literal":"w"}, {"literal":"1"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "version", "symbols": ["version$string$1"], "postprocess": (d) => null},
    {"name": "cell_line$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "cell_line", "symbols": ["cell_line$string$1", "cell_line_name"], "postprocess": ([ key, cellLine ]) => { return { 'cellLine': cellLine } }},
    {"name": "cell_line_name", "symbols": ["label"], "postprocess": id},
    {"name": "genome$string$1", "symbols": [{"literal":"g"}, {"literal":"e"}, {"literal":"n"}, {"literal":"o"}, {"literal":"m"}, {"literal":"e"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genome", "symbols": ["genome$string$1", "genome_name"], "postprocess": ([ key, genome ]) => { return { 'genome': genome } }},
    {"name": "genome_name", "symbols": ["label"], "postprocess": id},
    {"name": "section$ebnf$1", "symbols": ["trace"]},
    {"name": "section$ebnf$1", "symbols": ["section$ebnf$1", "trace"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "section", "symbols": ["genomic_section_title", "section$ebnf$1"], "postprocess": ([ status, traceID ]) => traceID},
    {"name": "section$ebnf$2", "symbols": ["non_genomic"]},
    {"name": "section$ebnf$2", "symbols": ["section$ebnf$2", "non_genomic"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "section", "symbols": ["non_genomic_section_title", "section$ebnf$2"], "postprocess": ([ status, nonGenomicLabel  ]) => nonGenomicLabel},
    {"name": "genomic_section_title$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"r"}, {"literal":"o"}, {"literal":"m"}, {"literal":"o"}, {"literal":"s"}, {"literal":"o"}, {"literal":"m"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_section_title$string$2", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_section_title$string$3", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "genomic_section_title", "symbols": ["genomic_section_title$string$1", "_", "genomic_section_title$string$2", "_", "genomic_section_title$string$3", "_", {"literal":"x"}, "_", {"literal":"y"}, "_", {"literal":"z"}, "newline"], "postprocess": (d) => true},
    {"name": "trace$ebnf$1", "symbols": ["trace_row"]},
    {"name": "trace$ebnf$1", "symbols": ["trace$ebnf$1", "trace_row"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "trace", "symbols": ["trace_label", "trace$ebnf$1"], "postprocess": ([ traceID, traces ]) => { genomicHandler(traceID, traces); return traceID; }},
    {"name": "trace_label$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trace_label", "symbols": ["trace_label$string$1", "_", "int", "newline"], "postprocess": ([ a, b, traceNumber, c ]) => { return `${ traceNumber }` }},
    {"name": "trace_row$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trace_row", "symbols": ["trace_row$string$1", "int", "__", "int", "__", "int", "__", "decimal", "__", "decimal", "__", "decimal", "newline"], "postprocess": ([ a, chr, b, start, c, end, d, xx, e, yy, f, zz, g ]) => { return { 'chr': chr, 'start': start, 'end': end, 'x':xx, 'y':yy, 'z':zz } }},
    {"name": "non_genomic_section_title$string$1", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"n"}, {"literal":"g"}, {"literal":"e"}, {"literal":"n"}, {"literal":"o"}, {"literal":"m"}, {"literal":"i"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "non_genomic_section_title", "symbols": ["non_genomic_section_title$string$1", "newline"], "postprocess": (d) => false},
    {"name": "non_genomic$ebnf$1", "symbols": ["non_genomic_row"]},
    {"name": "non_genomic$ebnf$1", "symbols": ["non_genomic$ebnf$1", "non_genomic_row"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "non_genomic", "symbols": ["non_genomic_label", "non_genomic$ebnf$1"], "postprocess": ([ nonGenomicLabel, xyzList ]) => { nongenomicHandler(nonGenomicLabel, xyzList); return nonGenomicLabel; }},
    {"name": "non_genomic_label", "symbols": ["label", "newline"], "postprocess": ([ nonGenomicLabel, a ]) => nonGenomicLabel},
    {"name": "non_genomic_row", "symbols": ["decimal", "_", "decimal", "_", "decimal", "newline"], "postprocess": ([ xx, a, yy, b, zz, c ]) => { return { 'x':xx, 'y':yy, 'z':zz } }},
    {"name": "label$ebnf$1", "symbols": [/[\w]/]},
    {"name": "label$ebnf$1", "symbols": ["label$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "label", "symbols": ["label$ebnf$1"], "postprocess": (d) => d[0].join("")},
    {"name": "newline", "symbols": [/[\r?\n|\r]/], "postprocess": (d) => null}
]
  , ParserStart: "file"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
