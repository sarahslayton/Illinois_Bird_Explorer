import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function serveTestPhotos() {
  return {
    name: 'serve-test-photos',
    configureServer(server) {
      server.middlewares.use('/species_photos', (req, res, next) => {
        const fileName = req.url.replace(/^\//, '')
        const filePath = path.resolve(__dirname, '../test_photos', fileName)
        if (fs.existsSync(filePath)) {
          const ext = path.extname(filePath).toLowerCase()
          const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
          res.setHeader('Content-Type', mime)
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })
    },
  }
}

// Minimal RFC-4180 CSV parser: handles quoted fields, escaped quotes, and
// newlines inside quotes. Returns an array of objects keyed by the header row.
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') {
      quoted = true
    } else if (c === ',') {
      row.push(field); field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      rows.push(row); row = []
    } else {
      field += c
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }

  const headers = (rows.shift() || []).map((h) => h.trim())
  return rows
    .filter((r) => r.some((v) => v.trim() !== ''))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])))
}

// Lets `.csv` files be imported as a default-exported array of row objects,
// parsed once at build time (no parser ships to the client).
function csvLoader() {
  return {
    name: 'csv-loader',
    transform(src, id) {
      if (!id.endsWith('.csv')) return null
      return { code: `export default ${JSON.stringify(parseCsv(src))}`, map: { mappings: '' } }
    },
  }
}

export default defineConfig({
  plugins: [react(), serveTestPhotos(), csvLoader()],
})
