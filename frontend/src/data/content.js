// Free-form page content authored as Markdown in
// written_content/<section>/<slug>.md and loaded here at build time.
//
// Frontmatter (YAML between --- fences):
//   title      required  — page heading
//   intro      optional  — one-line lead under the title
//   updated    optional  — ISO date
//   placeholder optional — true while the body is provisional (shows a label)
//   resources  optional  — [{ label, url, description }] for the "Key Resources" grid
// Body: standard Markdown, rendered with react-markdown + remark-gfm.

import { load as parseYaml } from 'js-yaml'

const files = import.meta.glob('../../written_content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parse(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { title: '', body: raw.trim() }
  const data = parseYaml(m[1]) || {}
  return { ...data, body: m[2].trim() }
}

const CONTENT = {}
for (const [path, raw] of Object.entries(files)) {
  // ".../written_content/migration/birdcast.md" -> "migration/birdcast"
  const key = path.split('/written_content/')[1].replace(/\.md$/i, '').toLowerCase()
  CONTENT[key] = parse(raw)
}

// getContent('home')  -> written_content/home.md
// getContent('migration', 'birdcast') -> written_content/migration/birdcast.md
export function getContent(section, slug) {
  const key = (slug ? `${section}/${slug}` : section).toLowerCase()
  return CONTENT[key] || null
}

// Slugs that have a content file for a section — handy for building index lists.
export function getSectionSlugs(section) {
  const prefix = `${section.toLowerCase()}/`
  return Object.keys(CONTENT)
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.slice(prefix.length))
}
