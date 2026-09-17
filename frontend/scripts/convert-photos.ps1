<#
  Convert source JPGs to the web-optimized .webp sizes the site serves.
  Windows-native twin of convert-photos.sh — use this one on Windows.
  Requires ImageMagick 7 (winget install ImageMagick.ImageMagick).

  Run from anywhere (it cd's to frontend/):

    scripts\convert-photos.ps1 main <slug>
        species_account_files\main_photos\<slug>.jpg
          -> public\species_photos\<slug>.webp           (full,  long edge <=1500, q80)
          -> public\species_photos\thumb\<slug>.webp      (thumb, long edge <=600,  q78)

    scripts\convert-photos.ps1 main-all
        every <slug>.jpg under species_account_files\main_photos\ (batch).
        Re-encodes from the .jpg sources each run; overwriting is harmless.

    scripts\convert-photos.ps1 additional <slug>
        species_account_files\additional_photos\<slug>\*.jpg
          -> public\species_photos\additional\<slug>\*.webp
          -> public\species_photos\additional\<slug>\thumb\*.webp

    scripts\convert-photos.ps1 additional-all
        every folder under species_account_files\additional_photos\ (batch).
        Re-encodes from the .jpg sources each run; overwriting is harmless.

    scripts\convert-photos.ps1 content <section>/<slug>
        content_images_src\<section>\<slug>\*.jpg
          -> public\content_images\<section>\<slug>\*.webp   (full only, no thumbs)

    scripts\convert-photos.ps1 home-all
        species_account_files\home_photos_src\*.jpg / *.png (batch, flat folder)
          -> public\species_photos\home\*.webp   (full only, no thumbs)
        Home page "Explore the Site" feature-card photos. Re-encodes from
        source each run; overwriting is harmless.

  This script OWNS everything it writes under public\ — never hand-place
  converted images there.

  If PowerShell refuses to run it ("running scripts is disabled on this
  system"), either allow local scripts once:
      Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  or invoke without changing policy:
      powershell -ExecutionPolicy Bypass -File scripts\convert-photos.ps1 additional <slug>
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory)][ValidateSet('main', 'main-all', 'additional', 'additional-all', 'content', 'home-all')][string]$Mode,
  [string]$Key
)

$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')   # -> frontend/

if ($Mode -notlike '*-all' -and -not $Key) {
  throw "Usage: convert-photos.ps1 $Mode <key>"
}

# Resolve ImageMagick: PATH first, then the default Windows install dir (the
# installer adds it to PATH, but a shell opened before the install won't see it).
$cmd = Get-Command magick -ErrorAction SilentlyContinue
$magick = if ($cmd) { $cmd.Source } else { $null }
if (-not $magick) {
  $magick = Get-ChildItem -ErrorAction SilentlyContinue -Path `
    'C:\Program Files\ImageMagick-*\magick.exe',
    'C:\Program Files (x86)\ImageMagick-*\magick.exe' |
    Select-Object -First 1 -ExpandProperty FullName
}
if (-not $magick) {
  throw "ImageMagick not found. Install it (winget install ImageMagick.ImageMagick) and open a fresh terminal."
}

function Convert-Full  { param($Dst, $In) & $magick mogrify -path $Dst -format webp -quality 80 -strip -colorspace sRGB -resize '1500x1500>' $In }
function Convert-Thumb { param($Dst, $In) & $magick mogrify -path $Dst -format webp -quality 78 -strip -colorspace sRGB -resize '600x600>'  $In }

# One species' main photo -> full + thumb webp. Shared by 'main' and 'main-all'.
function Convert-MainSlug {
  param([string]$Slug)
  $src = "species_account_files\main_photos\$Slug.jpg"
  New-Item -ItemType Directory -Force -Path 'public\species_photos\thumb' | Out-Null
  Convert-Full  'public\species_photos'       $src
  Convert-Thumb 'public\species_photos\thumb' $src
  Write-Host "  converted $Slug"
}

# One species' additional-photos folder -> full + thumb webp. Shared by
# 'additional' and 'additional-all'.
function Convert-AdditionalSlug {
  param([string]$Slug)
  $src = "species_account_files\additional_photos\$Slug"
  if (-not (Test-Path -LiteralPath $src -PathType Container)) { throw "not found: $src\" }
  if (-not (Get-ChildItem -LiteralPath $src -Filter *.jpg -File -ErrorAction SilentlyContinue)) {
    Write-Host "  skip $Slug (no .jpg)"
    return
  }
  $dst = "public\species_photos\additional\$Slug"
  New-Item -ItemType Directory -Force -Path "$dst\thumb" | Out-Null
  Convert-Full  $dst         "$src\*.jpg"
  Convert-Thumb "$dst\thumb" "$src\*.jpg"
  Write-Host "  converted $Slug"
}

switch ($Mode) {
  'main' {
    $src = "species_account_files\main_photos\$Key.jpg"
    if (-not (Test-Path -LiteralPath $src)) { throw "not found: $src" }
    Convert-MainSlug $Key
  }
  'main-all' {
    $root = 'species_account_files\main_photos'
    if (-not (Test-Path -LiteralPath $root -PathType Container)) { throw "not found: $root\" }
    $files = Get-ChildItem -LiteralPath $root -Filter *.jpg -File
    if (-not $files) { Write-Host "no .jpg files in $root\" }
    foreach ($f in $files) { Convert-MainSlug $f.BaseName }
  }
  'additional' {
    Convert-AdditionalSlug $Key
  }
  'additional-all' {
    $root = 'species_account_files\additional_photos'
    if (-not (Test-Path -LiteralPath $root -PathType Container)) { throw "not found: $root\" }
    $dirs = Get-ChildItem -LiteralPath $root -Directory
    if (-not $dirs) { Write-Host "no species folders in $root\" }
    foreach ($d in $dirs) { Convert-AdditionalSlug $d.Name }
  }
  'content' {
    $src = "content_images_src\$Key"
    if (-not (Test-Path -LiteralPath $src -PathType Container)) { throw "not found: $src\" }
    $dst = "public\content_images\$Key"
    New-Item -ItemType Directory -Force -Path $dst | Out-Null
    Convert-Full $dst "$src\*.jpg"
  }
  'home-all' {
    $root = 'species_account_files\home_photos_src'
    if (-not (Test-Path -LiteralPath $root -PathType Container)) { throw "not found: $root\" }
    $files = @(Get-ChildItem -LiteralPath $root -Filter *.jpg -File) + @(Get-ChildItem -LiteralPath $root -Filter *.png -File)
    if (-not $files) { Write-Host "no .jpg/.png files in $root\" }
    $dst = 'public\species_photos\home'
    New-Item -ItemType Directory -Force -Path $dst | Out-Null
    foreach ($f in $files) {
      Convert-Full $dst $f.FullName
      Write-Host "  converted $($f.Name)"
    }
  }
}

Write-Host "done: $Mode$(if ($Key) { " $Key" })"
