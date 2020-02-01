# Grammar for Spacewalk files (.sw)
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

file            -> header sections

header          -> format _ cell_line _ genome newline

format          -> "##format=" version
version         -> "sw1"

cell_line       -> "name=" cell_line_name
cell_line_name  -> label

genome          -> "genome=" genome_name
genome_name     -> label

sections    -> section | sections section
section     -> genomic_section | non_genomic_section

genomic_section         -> genomic_column_title traces
genomic_column_title    -> "chromosome" _ "start" _ "end" _ "x" _ "y" _ "z" newline

traces      -> trace | traces trace
trace       -> trace_label trace_rows
trace_label -> "trace" _ int newline
trace_rows  -> trace_row | trace_rows trace_row
trace_row   -> "chr" int _ int _ int _ decimal _ decimal _ decimal newline

non_genomic_section         -> non_genomic_column_title non_genomics
non_genomic_column_title    -> "nongenomic" newline
non_genomics                -> non_genomic | non_genomics non_genomic
non_genomic                 -> non_genomic_label non_genomic_rows
non_genomic_label           -> label newline
non_genomic_rows            -> non_genomic_row | non_genomic_rows non_genomic_row
non_genomic_row             -> decimal _ decimal _ decimal newline

label          -> [\w]:+
_           -> [\s\t]:+
newline     -> [\r?\n|\r]
