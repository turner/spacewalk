# Grammar for Spacewalk files (.sw)
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives
@builtin "string.ne"     # `int`, `decimal`, and `percentage` number primitives

file            -> header sections

header          -> format _ cell_line _ genome newline

format          -> "##format=" version
version         -> "sw1"

cell_line       -> "name=" cell_line_name
cell_line_name  -> id

genome          -> "genome=" genome_name
genome_name     -> id

sections    -> section
            | sections section

section     -> genomic_section
            | non_genomic_section

genomic_section         -> genomic_column_title traces
genomic_column_title    -> "chromosome" _ "start" _ "end" _ "x" _ "y" _ "z" newline

traces      -> trace
            | traces trace

trace       -> trace_label trace_rows

trace_label -> "trace" _ int newline

trace_rows  -> trace_row
            | trace_rows trace_row

trace_row   -> int _ int _ int _ decimal _ decimal _ decimal newline

non_genomic_section         -> non_genomic_column_title
non_genomic_column_title    -> "nongenomic" newline

id          -> [\w]:+
_           -> [\s\t]:+
newline     -> [\r?\n|\r]
