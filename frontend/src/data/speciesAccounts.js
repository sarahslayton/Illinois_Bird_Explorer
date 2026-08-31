// Per-species detail content, authored as Markdown in
// species_account_files/accounts/<slug>.md and parsed here at build time.
//
// Expected shape (heading-driven, no frontmatter):
//   ## Species Description        -> prose (Overview tab)
//   ## Fast Facts                 -> ### <field> cards (Overview tab)
//   ## Phenology                  -> ### <field> cards (Phenology tab)
//   ## Illinois Population Trends  -> ### History prose (Trends tab)

// Canonical field order. A file that omits one just skips that card; any
// heading not in this list is ignored, so every species page stays uniform.
export const FAST_FACTS = [
  'Rangewide Distribution',
  'Illinois Abundance',
  'Conservation Status',
  'Diet',
  'Breeding Habitat',
]

export const PHENOLOGY_FACTS = ['Nest', 'Eggs', 'Incubation Period', 'Time to Fledge']

const norm = (s) => s.replace(/[:\s]+$/, '').trim().toLowerCase()
const collapse = (s) => s.replace(/\s+/g, ' ').trim()
// Card values read as fragments, not sentences — drop a trailing period.
// Only when it follows a lowercase letter / digit / closing bracket, so
// abbreviations like "U.S." are left intact.
const trimSentencePeriod = (s) => s.replace(/([a-z0-9)\]])\.$/, '$1')
const toParagraphs = (lines) =>
  lines.join('\n').split(/\n\s*\n/).map(collapse).filter(Boolean)

function parseAccount(raw) {
  const sections = {}
  let h2 = null
  let h3 = null

  for (const line of raw.split(/\r?\n/)) {
    const m2 = /^##\s+(.+?)\s*$/.exec(line)
    const m3 = /^#{3,4}\s+(.+?)\s*$/.exec(line)

    if (m2) {
      h2 = m2[1].trim()
      h3 = null
      sections[h2] = { text: [], fields: {}, order: [] }
    } else if (m3 && h2) {
      h3 = m3[1].replace(/[:\s]+$/, '').trim()
      if (!sections[h2].fields[h3]) {
        sections[h2].fields[h3] = []
        sections[h2].order.push(h3)
      }
    } else if (h2) {
      ;(h3 ? sections[h2].fields[h3] : sections[h2].text).push(line)
    }
  }

  const pickFields = (sectionName, canonical) => {
    const sec = sections[sectionName]
    if (!sec) return []
    return canonical
      .map((label) => {
        const key = sec.order.find((k) => norm(k) === norm(label))
        const value = key ? trimSentencePeriod(collapse(sec.fields[key].join(' '))) : ''
        return value ? { label, value } : null
      })
      .filter(Boolean)
  }

  const trends = sections['Illinois Population Trends']
  let historyLines = []
  if (trends) {
    const key = trends.order.find((k) => norm(k) === 'history')
    historyLines = key ? trends.fields[key] : trends.text
  }

  return {
    description: toParagraphs(sections['Species Description']?.text || []),
    fastFacts: pickFields('Fast Facts', FAST_FACTS),
    phenology: pickFields('Phenology', PHENOLOGY_FACTS),
    history: toParagraphs(historyLines),
  }
}

const files = import.meta.glob(
  ['../../species_account_files/accounts/*.md', '!**/README.md'],
  { query: '?raw', import: 'default', eager: true },
)

const ACCOUNTS = {}
for (const [path, raw] of Object.entries(files)) {
  const slug = path.split('/').pop().replace(/\.md$/i, '').toLowerCase()
  ACCOUNTS[slug] = parseAccount(raw)
}

export function getSpeciesAccount(slug) {
  return ACCOUNTS[slug] || null
}
