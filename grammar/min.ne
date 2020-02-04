# Grammar for Spacewalk files (.sw)
@{%
const acc = [];
%}

@builtin "number.ne"
@builtin "whitespace.ne"

file                    -> trace_rows           {% (d) => { return acc; } %}

trace_rows              -> trace_row            {% (d) => { acc.push(d[0]); } %}
                         | trace_rows trace_row {% (d) => { acc.push(d[1]); } %}

trace_row               -> "chr" int __ int __ int __ number_or_nan __ number_or_nan __ number_or_nan newline   {% (d) => { return { 'chr': d[1], 'start': d[3], 'end': d[5], 'x':d[7], 'y':d[9], 'z':d[11] } } %}

number_or_nan           -> decimal              {% id %}
                         | "nan"                {% id %}

newline                 -> [\r?\n|\r]           {% (d) => null %}
