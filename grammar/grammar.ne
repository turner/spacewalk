# Grammar for Spacewalk files (.sw)
@{%
const global = { genomic: {}, nongenomic: {} };

const genomicHandler = (traceID, traces) => global.genomic[ traceID ] = traces;

const nongenomicHandler = (label, xyzList) => global.nongenomic[ label ] = xyzList;

%}
@builtin "number.ne"
@builtin "whitespace.ne"

file            -> header section:+                         {% (d) => global %}

header          -> format __ cell_line __ genome newline    {% ([ a, b, { cellLine }, c, { genome }, d ]) => { return { 'cellLine': cellLine, 'genome': genome } } %}

format          -> "##format=" version                      {% (d) => null %}
version         -> "sw1"                                    {% (d) => null %}

cell_line       -> "name=" cell_line_name                   {% ([ key, cellLine ]) => { return { 'cellLine': cellLine } } %}
cell_line_name  -> label                                    {% id %}

genome          -> "genome=" genome_name                    {% ([ key, genome ]) => { return { 'genome': genome } } %}
genome_name     -> label                                    {% id %}

section         -> genomic_section_title trace:+             {% (d) => null %}
                 | non_genomic_section_title non_genomic:+   {% (d) => null %}

genomic_section_title    -> "chromosome" __ "start" __ "end" __ "x" __ "y" __ "z" newline                       {% (d) => true %}
trace                   -> trace_label trace_row:+                                                              {% (d) => { genomicHandler(d[0], d[1]); return d[0]; } %}
trace_label             -> "trace" __ int newline                                                               {% (d) => { return `${ d[2] }` } %}
trace_row               -> "chr" int __ int __ int __ number_or_nan __ number_or_nan __ number_or_nan newline   {% (d) => { return { 'chr': d[1], 'start': d[3], 'end': d[5], 'x':d[7], 'y':d[9], 'z':d[11] } } %}
number_or_nan           -> decimal  {% id %}
                         | "nan"    {% id %}

non_genomic_section_title    -> "nongenomic" newline                    {% (d) => false %}
non_genomic                 -> non_genomic_label non_genomic_row:+      {% (d) => { nongenomicHandler(d[0], d[1]); return d[0]; } %}
non_genomic_label           -> label newline                            {% (d) => d[0] %}
non_genomic_row             -> decimal __ decimal __ decimal newline    {% (d) => { return { 'x':d[0], 'y':d[2], 'z':d[4] } } %}

label       -> [\w]:+       {% (d) => d[0].join("") %}
newline     -> [\r?\n|\r]   {% (d) => null          %}
