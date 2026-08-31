// Normalize species account Markdown files to the canonical structure the app parses.
//
//   node species_account_files/normalize-accounts.mjs          rewrite files in place
//   node species_account_files/normalize-accounts.mjs --dry     preview only, write nothing
//   node species_account_files/normalize-accounts.mjs --warn    only list files with warnings
//   (flags combine, e.g. --dry --warn)
//
// Canonical shape:
//   ## Species Description
//   <prose>
//   ## Fast Facts
//   ### Rangewide Distribution:
//   <value>            (+ Illinois Abundance, Conservation Status, Diet, Breeding Habitat)
//   ## Phenology
//   ### Nest:
//   <value>            (+ Eggs, Incubation Period, Time to Fledge)
//   ## Illinois Population Trends
//   ### History
//   <prose>
//
// What it fixes automatically: missing "##"/"###", "Label: value" on one line,
// known label synonyms (Incubation -> Incubation Period, Fledging -> Time to Fledge,
// Illinois History -> Illinois Population Trends, ...), stray name lines at the top,
// trailing tabs/whitespace, and trailing periods on card values.
// It WARNS (and leaves you to fix) on: unknown labels, missing canonical fields,
// missing sections, and any extra sub-headings under Illinois Population Trends.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'accounts')
const DRY = process.argv.includes('--dry') || process.argv.includes('--check')
const WARN_ONLY = process.argv.includes('--warn')

const SECTIONS = {
  'species description': 'Species Description',
  'fast facts': 'Fast Facts',
  'phenology': 'Phenology',
  'illinois history': 'Illinois Population Trends',
  'illinois population trends': 'Illinois Population Trends',
}

const FAST_FACTS = ['Rangewide Distribution', 'Illinois Abundance', 'Conservation Status', 'Diet', 'Breeding Habitat']
const PHENOLOGY = ['Nest', 'Eggs', 'Incubation Period', 'Time to Fledge']

const FIELD_ALIASES = {
  'rangewide distribution': 'Rangewide Distribution',
  'range-wide distribution': 'Rangewide Distribution',
  'range wide distribution': 'Rangewide Distribution',
  'illinois abundance': 'Illinois Abundance',
  'abundance in illinois': 'Illinois Abundance',
  'conservation status': 'Conservation Status',
  'conservation': 'Conservation Status',
  'diet': 'Diet',
  'food': 'Diet',
  'breeding habitat': 'Breeding Habitat',
  'habitat': 'Breeding Habitat',
  'nest': 'Nest',
  'nesting': 'Nest',
  'eggs': 'Eggs',
  'egg': 'Eggs',
  'clutch': 'Eggs',
  'clutch size': 'Eggs',
  'incubation period': 'Incubation Period',
  'incubation': 'Incubation Period',
  'incubation time': 'Incubation Period',
  'time to fledge': 'Time to Fledge',
  'time to fledging': 'Time to Fledge',
  'fledging': 'Time to Fledge',
  'fledging period': 'Time to Fledge',
  'nestling period': 'Time to Fledge',
}

const stripPeriod = (s) => s.replace(/([a-z0-9)\]])\.$/, '$1')
const headingKey = (s) => s.replace(/^#+/, '').trim().replace(/:$/, '').trim().toLowerCase()
const trimBlank = (arr) => {
  const out = arr.slice()
  while (out.length && !out[0].trim()) out.shift()
  while (out.length && !out[out.length - 1].trim()) out.pop()
  const packed = []
  for (const l of out) {
    if (!l.trim() && packed.length && !packed[packed.length - 1].trim()) continue
    packed.push(l)
  }
  return packed
}

function normalize(raw) {
  const warnings = []
  const notes = []
  const lines = raw.split(/\r?\n/).map((l) => l.replace(/[ \t]+$/, ''))

  let current = null
  const sec = {}
  const preamble = []
  for (const line of lines) {
    const key = headingKey(line)
    if (SECTIONS[key] !== undefined && line.trim().length <= 60) {
      current = SECTIONS[key]
      if (!sec[current]) sec[current] = []
      continue
    }
    if (current) sec[current].push(line)
    else if (line.trim()) preamble.push(line)
  }

  const sectionsFound = Object.keys(sec).length
  if (preamble.length) {
    notes.push(`dropped ${preamble.length} line(s) before the first section: ` +
      preamble.map((l) => JSON.stringify(l.slice(0, 40))).join(', '))
  }
  for (const name of ['Species Description', 'Fast Facts', 'Phenology', 'Illinois Population Trends']) {
    if (!sec[name]) warnings.push(`no "${name}" section found`)
  }

  const parseFields = (name) => {
    const found = {}
    const extras = []
    let curArr = null
    for (const line of sec[name] || []) {
      const m = /^#{0,4}[ \t]*([A-Za-z][A-Za-z /-]*?)[ \t]*:[ \t]*(.*)$/.exec(line)
      if (m) {
        const rawLabel = m[1].trim()
        const canon = FIELD_ALIASES[rawLabel.toLowerCase()]
        curArr = [m[2]]
        if (canon) {
          if (canon.toLowerCase() !== rawLabel.toLowerCase()) notes.push(`${name}: mapped "${rawLabel}" -> "${canon}"`)
          found[canon] = curArr
        } else {
          warnings.push(`${name}: unrecognized field "${rawLabel}" - kept as-is`)
          extras.push({ label: rawLabel, arr: curArr })
        }
      } else if (line.trim()) {
        if (curArr) curArr.push(line)
        else warnings.push(`${name}: stray text before any field: ${JSON.stringify(line.slice(0, 40))}`)
      }
    }
    const val = (arr) => stripPeriod(arr.join(' ').replace(/\s+/g, ' ').trim())
    for (const f of (name === 'Fast Facts' ? FAST_FACTS : PHENOLOGY)) {
      if (sec[name] && !found[f]) warnings.push(`${name}: missing "${f}"`)
    }
    return {
      values: Object.fromEntries(Object.entries(found).map(([k, a]) => [k, val(a)])),
      extras: extras.map((e) => ({ label: e.label, value: val(e.arr) })),
    }
  }

  const ff = parseFields('Fast Facts')
  const ph = parseFields('Phenology')

  const trendsBody = (sec['Illinois Population Trends'] || []).filter((l) => {
    const k = headingKey(l)
    if (k === 'history') return false
    if (/^#{1,4}\s/.test(l)) warnings.push(`extra sub-heading under Illinois Population Trends kept as prose: ${JSON.stringify(l)}`)
    return true
  })

  const out = []
  out.push('## Species Description')
  out.push(...trimBlank(sec['Species Description'] || ['']))
  out.push('')
  out.push('## Fast Facts')
  for (const f of FAST_FACTS) if (ff.values[f]) out.push(`### ${f}:`, ff.values[f])
  for (const e of ff.extras) out.push(`### ${e.label}:`, e.value)
  out.push('')
  out.push('## Phenology')
  for (const f of PHENOLOGY) if (ph.values[f]) out.push(`### ${f}:`, ph.values[f])
  for (const e of ph.extras) out.push(`### ${e.label}:`, e.value)
  out.push('')
  out.push('## Illinois Population Trends')
  out.push('### History')
  out.push(...trimBlank(trendsBody.length ? trendsBody : ['']))

  const text = out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n'
  return { text, warnings, notes, sectionsFound }
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md').sort()
let changed = 0
let warned = 0
let skipped = 0

for (const f of files) {
  const path = join(DIR, f)
  const before = readFileSync(path, 'utf8')
  if (!before.trim()) { skipped++; continue }

  const { text, warnings, notes, sectionsFound } = normalize(before)
  if (sectionsFound === 0) {
    console.log(`x ${f} - no recognized section headings, left untouched`)
    warned++
    continue
  }

  const isChanged = text !== before.replace(/\r\n/g, '\n')
  if (isChanged) changed++
  if (warnings.length) warned++

  const show = warnings.length || (isChanged && !WARN_ONLY)
  if (show) {
    console.log(`${warnings.length ? '!' : '~'} ${f}`)
    for (const n of notes) console.log(`    . ${n}`)
    for (const w of warnings) console.log(`    ! ${w}`)
  }
  if (isChanged && !DRY) writeFileSync(path, text, 'utf8')
}

console.log(`\n${DRY ? '[dry run] ' : ''}${files.length} files: ${changed} ${DRY ? 'would change' : 'rewritten'}, ${warned} need attention, ${skipped} empty (skipped)`)
