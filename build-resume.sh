#!/usr/bin/env bash

set -euo pipefail

root_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source_file="$root_dir/latex/resume.tex"
output_dir="$root_dir/static"
build_dir="$(mktemp -d)"

trap 'rm -rf "$build_dir"' EXIT

mkdir -p "$output_dir"
latexmk \
  -pdf \
  -interaction=nonstopmode \
  -halt-on-error \
  -file-line-error \
  -outdir="$build_dir" \
  "$source_file"

cp "$build_dir/resume.pdf" "$output_dir/resume.pdf"
printf 'Generated %s\n' "$output_dir/resume.pdf"
