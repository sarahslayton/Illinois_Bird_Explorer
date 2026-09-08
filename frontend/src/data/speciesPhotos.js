// Extra photos for a species' "Photos" tab, authored as one small YAML sidecar
// per species in species_account_files/accounts/additional_photo_info/<slug>.yml:
//
//   photos:
//     - file: 1                       # -> /species_photos/additional/<slug>/1.webp
//       caption: Adult female on the nest, central Illinois, May.
//       credit: Jane Doe
//     - file: 2
//       caption: Juvenile, three weeks out of the nest.
//       credit: Rob Kanter / INHS
//
// Order in the file is the display order. A species with no sidecar file simply
// has no extra photos (and no "Photos" tab). These files live in an
// `additional_photo_info/` subfolder so normalize-accounts.mjs — which only
// touches accounts/*.md — never sees them.

import { load as parseYaml } from 'js-yaml'

const files = import.meta.glob(
  '../../species_account_files/accounts/additional_photo_info/*.yml',
  { query: '?raw', import: 'default', eager: true },
)

const PHOTOS = {}
for (const [path, raw] of Object.entries(files)) {
  const slug = path.split('/').pop().replace(/\.ya?ml$/i, '').toLowerCase()
  const data = parseYaml(raw) || {}
  const list = Array.isArray(data.photos) ? data.photos : []
  PHOTOS[slug] = list
    .filter((p) => p && p.file != null && String(p.file).trim() !== '')
    .map((p) => {
      const file = String(p.file).trim()
      return {
        full:    `/species_photos/additional/${slug}/${file}.webp`,
        thumb:   `/species_photos/additional/${slug}/thumb/${file}.webp`,
        caption: (p.caption || '').trim(),
        credit:  (p.credit || '').trim(),
      }
    })
}

export function getSpeciesPhotos(slug) {
  return PHOTOS[slug?.toLowerCase()] || []
}
