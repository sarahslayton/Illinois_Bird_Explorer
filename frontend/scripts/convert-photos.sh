#!/usr/bin/env bash
#
# Convert source JPGs to web-optimized .webp, in the sizes the site expects.
# Requires ImageMagick 7 (`magick`).  Run from anywhere — it cd's to frontend/.
#
# ON WINDOWS: use scripts/convert-photos.ps1 instead. This .sh needs Git Bash
# (MINGW64) — it will NOT work under WSL bash, which mounts C: at /mnt/c and has
# a separate PATH. This script is here for macOS/Linux.
#
#   scripts/convert-photos.sh main <slug>
#       species_account_files/main_photos/<slug>.jpg
#         -> public/species_photos/<slug>.webp            (full, long edge <=1500, q80)
#         -> public/species_photos/thumb/<slug>.webp      (thumb, long edge <=600,  q78)
#
#   scripts/convert-photos.sh additional <slug>
#       species_account_files/additional_photos/<slug>/*.jpg
#         -> public/species_photos/additional/<slug>/*.webp
#         -> public/species_photos/additional/<slug>/thumb/*.webp
#
#   scripts/convert-photos.sh additional-all
#       every folder under species_account_files/additional_photos/ (batch).
#       Re-encodes from the .jpg sources each run; overwriting is harmless.
#
#   scripts/convert-photos.sh content <section>/<slug>
#       content_images_src/<section>/<slug>/*.jpg
#         -> public/content_images/<section>/<slug>/*.webp   (full only, no thumbs)
#
set -euo pipefail
cd "$(dirname "$0")/.."            # -> frontend/

cmd=${1:-}
key=${2:-}
if [[ -z "$cmd" ]] || { [[ "$cmd" != *-all ]] && [[ -z "$key" ]]; }; then
  sed -n '2,34p' "$0" >&2
  exit 2
fi

# Find ImageMagick. Honors $MAGICK, then PATH, then the default Windows install
# dir (the installer adds it to PATH, but a shell opened before the install
# won't have picked that up yet).
MAGICK="${MAGICK:-magick}"
if ! command -v "$MAGICK" >/dev/null 2>&1; then
  for c in "/c/Program Files/ImageMagick-"*/magick.exe "/c/Program Files (x86)/ImageMagick-"*/magick.exe; do
    [[ -x "$c" ]] && { MAGICK="$c"; break; }
  done
fi
if ! command -v "$MAGICK" >/dev/null 2>&1 && [[ ! -x "$MAGICK" ]]; then
  echo "ImageMagick not found. Install it (winget install ImageMagick.ImageMagick)," >&2
  echo "open a fresh terminal, or run with MAGICK=/path/to/magick.exe" >&2
  exit 1
fi

full()  { "$MAGICK" mogrify -path "$1" -format webp -quality 80 -strip -colorspace sRGB -resize "1500x1500>" $2; }
thumb() { "$MAGICK" mogrify -path "$1" -format webp -quality 78 -strip -colorspace sRGB -resize "600x600>"   $2; }

case "$cmd" in
  main)
    src="species_account_files/main_photos/$key.jpg"
    [[ -f "$src" ]] || { echo "not found: $src" >&2; exit 1; }
    mkdir -p public/species_photos/thumb
    full  "public/species_photos"       "$src"
    thumb "public/species_photos/thumb"  "$src"
    ;;
  additional)
    src="species_account_files/additional_photos/$key"
    [[ -d "$src" ]] || { echo "not found: $src/" >&2; exit 1; }
    dst="public/species_photos/additional/$key"
    mkdir -p "$dst/thumb"
    full  "$dst"        "$src/*.jpg"
    thumb "$dst/thumb"  "$src/*.jpg"
    ;;
  additional-all)
    root="species_account_files/additional_photos"
    [[ -d "$root" ]] || { echo "not found: $root/" >&2; exit 1; }
    for d in "$root"/*/; do
      [[ -d "$d" ]] || continue
      s=$(basename "$d")
      compgen -G "$d*.jpg" >/dev/null || { echo "  skip $s (no .jpg)"; continue; }
      dst="public/species_photos/additional/$s"
      mkdir -p "$dst/thumb"
      full  "$dst"        "$d*.jpg"
      thumb "$dst/thumb"  "$d*.jpg"
      echo "  converted $s"
    done
    ;;
  content)
    src="content_images_src/$key"
    [[ -d "$src" ]] || { echo "not found: $src/" >&2; exit 1; }
    dst="public/content_images/$key"
    mkdir -p "$dst"
    full "$dst" "$src/*.jpg"
    ;;
  *)
    echo "unknown command: $cmd (expected: main | additional | additional-all | content)" >&2
    exit 2
    ;;
esac

echo "done: $cmd${key:+ $key}"
