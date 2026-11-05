#!/usr/bin/env bash
# Compila os currículos e grava os PDFs em assets/cv/.
# Requer pdflatex com enumitem e titlesec (Fedora: sudo dnf install texlive-enumitem texlive-titlesec).
set -euo pipefail
cd "$(dirname "$0")"
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
build() { # $1 = fonte .tex, $2 = nome do PDF
  pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$tmp" "$1" >/dev/null \
    || { tail -20 "$tmp/${1%.tex}.log"; exit 1; }
  cp "$tmp/${1%.tex}.pdf" "../assets/cv/$2"
  echo "ok: assets/cv/$2 ($(pdfinfo "../assets/cv/$2" 2>/dev/null | awk '/Pages/{print $2}') página)"
}
build cv-pt.tex thales-amaral-cv-pt.pdf
build resume-en.tex thales-amaral-resume-en.pdf
