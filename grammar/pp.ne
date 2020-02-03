# Grammar for Spacewalk files (.sw)
@{%
const global = { genomic: {}, nongenomic: {} };

const genomicHandler = (traceID, traces) => global.genomic[ traceID ] = traces;

const nongenomicHandler = (label, xyzList) => global.nongenomic[ label ] = xyzList;

%}
@builtin "number.ne"
@builtin "whitespace.ne"

file            -> header section:+                           {% ([ header, payload ]) => { return global } %}

header          -> format __ cell_line __ genome newline    {% ([ a, b, { cellLine }, c, { genome }, d ]) => { return { 'cellLine': cellLine, 'genome': genome } } %}

format          -> "##format=" version                      {% (d) => null %}
version         -> "sw1"                                    {% (d) => null %}

cell_line       -> "name=" cell_line_name                   {% ([ key, cellLine ]) => { return { 'cellLine': cellLine } } %}
cell_line_name  -> label                                    {% id %}

genome          -> "genome=" genome_name                    {% ([ key, genome ]) => { return { 'genome': genome } } %}
genome_name     -> label                                    {% id %}

section         -> genomic_section_title trace:+             {% ([ status, traceID ]) => traceID %}
                 | non_genomic_section_title non_genomic:+   {% ([ status, nonGenomicLabel  ]) => nonGenomicLabel %}

genomic_section_title    -> "chromosome" _ "start" _ "end" _ "x" _ "y" _ "z" newline         {% (d) => true %}
trace                   -> trace_label trace_row:+                                          {% ([ traceID, traces ]) => { genomicHandler(traceID, traces); return traceID; } %}
trace_label             -> "trace" _ int newline                                            {% ([ a, b, traceNumber, c ]) => { return `${ traceNumber }` } %}
trace_row               -> "chr" int __ int __ int __ decimal __ decimal __ decimal newline {% ([ a, chr, b, start, c, end, d, xx, e, yy, f, zz, g ]) => { return { 'chr': chr, 'start': start, 'end': end, 'x':xx, 'y':yy, 'z':zz } } %}

non_genomic_section_title    -> "nongenomic" newline                 {% (d) => false %}
non_genomic                 -> non_genomic_label non_genomic_row:+  {% ([ nonGenomicLabel, xyzList ]) => { nongenomicHandler(nonGenomicLabel, xyzList); return nonGenomicLabel; } %}
non_genomic_label           -> label newline                        {% ([ nonGenomicLabel, a ]) => nonGenomicLabel %}
non_genomic_row             -> decimal _ decimal _ decimal newline  {% ([ xx, a, yy, b, zz, c ]) => { return { 'x':xx, 'y':yy, 'z':zz } } %}

label       -> [\w]:+       {% (d) => d[0].join("") %}
newline     -> [\r?\n|\r]   {% (d) => null          %}
