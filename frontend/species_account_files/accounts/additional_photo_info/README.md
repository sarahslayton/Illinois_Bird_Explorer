# Additional species photos — the `.yml` sidecars

One optional YAML file per species drives the **Photos** tab on that species'
detail page. Filename must be `<slug>.yml`, matching the account file and the CSV
`Slug` (e.g. `american_robin.yml`).

```yaml
photos:
  - file: 1
    caption: Adult female on the nest, central Illinois, May.
    credit: Jane Doe
  - file: 2
    caption: Juvenile with a spotted breast, three weeks out of the nest.
    credit: Rob Kanter / INHS
```

- `file` — the image basename (no extension). `file: 1` resolves to
  `public/species_photos/additional/<slug>/1.webp` and `.../thumb/1.webp`.
  Numbers are simplest; any name works (`female`, `juvenile`, `nest`) as long as
  the source JPG and this key match.
- `caption` — shown under the photo; also the image's alt text.
- `credit` — shown as "Photo: <credit>".
- Order in the file = display order on the page.
- **No sidecar (or an empty `photos: []`) → the species gets no Photos tab.**

This `additional_photo_info/` folder is invisible to `normalize-accounts.mjs`
(it only reads `accounts/*.md`), so nothing here is ever rewritten or deleted by
that script.

## Full process for one species

1. **Source photos.** Create `species_account_files/additional_photos/<slug>/`
   and put the full-size original JPGs in it, e.g. `1.jpg`, `2.jpg`, `3.jpg`.
   Originals are the archive — never edited in place.
2. **Convert.** From `frontend/`, in PowerShell:
   ```
   scripts\convert-photos.ps1 additional <slug>
   ```
   (macOS/Linux: `scripts/convert-photos.sh additional <slug>`.)
   Generates, and owns, everything under
   `public/species_photos/additional/<slug>/` — full images plus a `thumb/`
   subfolder. You never hand-place files under `public/`.
3. **Captions.** Create `accounts/additional_photo_info/<slug>.yml` (this folder)
   with a `caption` and `credit` per file.
4. **View.** Restart the dev server the first time you add a `.yml` for a new
   species (a brand-new file isn't always caught by hot reload), then open
   `/bird-species/<slug>`. The "Photos" tab now appears.

See `species_account_files/additional_photos/README.md` for the source-photo side,
and `CLAUDE.md` → "Photo conversion" for the script.

## Current state

`american_robin.yml` is a **live test**: its three images are placeholder copies
of other species' photos so the tab can be previewed. Replace
`additional_photos/american_robin/*.jpg` with real robin photos, re-run the
converter, and update the captions — or delete `american_robin.yml` to hide the
tab again.
