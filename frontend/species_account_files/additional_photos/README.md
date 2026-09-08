# Source photos for the species "Photos" tab

Drop full-size original JPGs here, one folder per species (folder name = the
species `Slug`, e.g. `american_robin/`). These are the archive — **never edit
them in place** (same rule as `main_photos/`).

```
additional_photos/
  american_robin/
    1.jpg
    2.jpg
    3.jpg
```

File basenames become the `file:` keys in `accounts/additional_photo_info/<slug>.yml`. Numbers
(`1.jpg`, `2.jpg`, …) are the simplest, but any name works — `female.jpg`,
`juvenile.jpg`, `nest.jpg` — as long as the `.yml` `file:` value matches.

## Full process (per species)

1. Create `additional_photos/<slug>/` and put the JPGs in it.
2. From `frontend/`, in PowerShell, run:
   ```
   scripts\convert-photos.ps1 additional <slug>
   ```
   (macOS/Linux: `scripts/convert-photos.sh additional <slug>` in a real bash —
   Git Bash on Windows, **not** WSL.)

   Working through many species at once? Add all the source folders first, then
   batch-convert every one:
   ```
   scripts\convert-photos.ps1 additional-all
   ```
   It re-encodes each folder from its `.jpg` sources (overwriting is harmless)
   and skips folders with no `.jpg` yet.

   Either way this generates the web images the site actually serves:
   - `public/species_photos/additional/<slug>/<name>.webp`   (full, long edge ≤ 1500, q80)
   - `public/species_photos/additional/<slug>/thumb/<name>.webp` (thumb, long edge ≤ 600, q78)

   You do **not** hand-place anything under `public/` — the script owns that folder.
3. Create `accounts/additional_photo_info/<slug>.yml` with a `caption` and
   `credit` for each file (see `accounts/additional_photo_info/README.md`).
4. Restart the dev server the first time you add a `.yml` for a new species
   (a brand-new file isn't always picked up by hot reload), then open
   `/bird-species/<slug>` — the "Photos" tab appears.

Requires ImageMagick 7. Install: `winget install ImageMagick.ImageMagick`, then open a fresh
terminal so `magick` is on PATH.
