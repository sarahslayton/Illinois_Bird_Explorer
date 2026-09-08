# Source photos for prose content pages

Full-size original JPGs for images embedded in the Markdown pages under
`written_content/` (Migration, Monitoring, Conservation, Education, BirdLab).
One folder per page: `content_images_src/<section>/<slug>/`.

```
content_images_src/
  monitoring/
    breeding-bird-atlas/
      hero.jpg
      survey-block.jpg
```

These are the archive — never edited in place.

## Process

1. Put JPGs in `content_images_src/<section>/<slug>/`.
2. From `frontend/`, in PowerShell:
   ```
   scripts\convert-photos.ps1 content <section>/<slug>
   ```
   (macOS/Linux: `scripts/convert-photos.sh content <section>/<slug>`.)
   Generates `public/content_images/<section>/<slug>/*.webp` — long edge ≤ 1500,
   q80, no thumbnails. The script owns everything under `public/`.
3. Reference the images from the page's Markdown.

## Authoring in Markdown

**Inline figure** — one line anywhere in the body. Alt text becomes the visible
caption; the quoted string becomes the credit ("Photo: …").

```markdown
![Volunteers survey a breeding-bird block along the Kaskaskia River.](/content_images/monitoring/breeding-bird-atlas/survey-block.webp "Colin Dobson")
```

- Default: centered at a comfortable reading width.
- `?full` on the src → spans the full body column:
  `](/content_images/.../survey-block.webp?full "Colin Dobson")`
- **Side by side:** put two or three image lines back-to-back with **no blank
  line between them** → one centered row, each with its own caption. A **blank
  line between** them → separate stacked figures.

**Lead image** — in the page's frontmatter (the `---` block at the top):

```yaml
hero:
  src: /content_images/monitoring/breeding-bird-atlas/hero.webp
  alt: A birder scanning a wet prairie at dawn
  credit: USFWS
```

Renders as a wide banner above the article text, credit in the corner.
