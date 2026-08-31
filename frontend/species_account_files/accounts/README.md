# Species account content

One Markdown file per species, consumed at build time to render the species
detail page (`/bird-species/<slug>`).

## Rules

- **Filename:** `<slug>.md`, where `<slug>` exactly matches the `Slug` column in
  `../full_bird_list_photos.csv` — the same key used for the photo files.
- A species with no file here still renders (photo + map placeholder); content
  fills in when the file is added.
- Don't repeat fields the CSV already owns (`Common_Name`, `Scientific_Name`,
  `Photo_attribution`, status, state listing). Keep this file to the narrative
  and to fields the CSV doesn't have.

## Shape (draft — will firm up when the loader is built)

```markdown
---
# only fields not in the CSV
nest: >
  ...
eggs: 4–6, pale blue-green
incubation: 12–14 days
---

## General Account
...

## Illinois History
...
```
