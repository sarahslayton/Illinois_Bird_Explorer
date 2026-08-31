import rows from '../../species_account_files/full_bird_list_photos.csv'

// Fixed display order for the directory filter buttons. Any status found in the
// data that isn't listed here is appended alphabetically.
const STATUS_ORDER = ['Migrant', 'Breeder', 'Winter', 'Resident', 'Vagrant', 'Introduced', 'Extirpated']

// "Rare Breeder" is filtered under the "Breeder" button; the card keeps the
// full label. Strip a leading "Rare " to get the button a status belongs to.
const baseStatus = (status) => status.replace(/^Rare\s+/i, '').trim()

// Badge modifier class, e.g. "Rare Breeder" -> "species-badge--rare-breeder".
export const statusModifier = (status) => status.toLowerCase().replace(/\s+/g, '-')

function toSpecies(row) {
  return {
    common: row.Common_Name,
    scientific: row.Scientific_Name,
    slug: row.Slug,
    photo: row.Slug,
    attribution: row.Photo_attribution,
    statuses: [row.Status1, row.Status2, row.Status3, row.Status4].filter(Boolean),
    stateList: row.State_list, // '' | 'Endangered' | 'Threatened'
  }
}

export const SPECIES = rows
  .filter((r) => r.Has_photo === 'Y' && r.Has_species_account === 'Y')
  .map(toSpecies)
  .sort((a, b) => a.common.localeCompare(b.common))

export function getSpeciesBySlug(slug) {
  return SPECIES.find((s) => s.slug === slug) || null
}

// Filter buttons, derived from the statuses present in SPECIES so the bar grows
// as species are added. "State Listed" covers both Endangered and Threatened.
export const SPECIES_FILTERS = (() => {
  const present = new Set()
  SPECIES.forEach((s) => s.statuses.forEach((st) => present.add(baseStatus(st))))

  const ordered = [
    ...STATUS_ORDER.filter((s) => present.has(s)),
    ...[...present].filter((s) => !STATUS_ORDER.includes(s)).sort(),
  ]

  const filters = [{ value: 'all', label: 'All Species' }]
  ordered.forEach((s) => filters.push({ value: `status:${s}`, label: s }))
  if (SPECIES.some((s) => s.stateList)) {
    filters.push({ value: 'state-listed', label: 'State Listed' })
  }
  return filters
})()

export function matchesFilter(species, filterValue) {
  if (filterValue === 'all') return true
  if (filterValue === 'state-listed') return species.stateList !== ''
  if (filterValue.startsWith('status:')) {
    const target = filterValue.slice('status:'.length)
    return species.statuses.some((st) => baseStatus(st) === target)
  }
  return true
}
