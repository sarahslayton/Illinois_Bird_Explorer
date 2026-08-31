import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EXTINCT_BIRDS } from '../data/extinctBirds'

export default function ExtinctBirdsPage() {
  const [query, setQuery] = useState('')

  const filtered = EXTINCT_BIRDS.filter((b) => {
    const q = query.toLowerCase()
    return b.common.toLowerCase().includes(q) || b.scientific.toLowerCase().includes(q)
  })

  return (
    <div className="species-page">
      {/* Header */}
      <div className="species-page__header">
        <div className="species-page__header-inner">          <span className="species-page__kicker">Conservation</span>
          <h1 className="species-page__title">Extinct Birds of Illinois</h1>
          <p className="species-page__subtitle">
            Species that historically occurred in Illinois and are now globally extinct or almost certainly so.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="species-page__controls">
        <div className="species-page__controls-inner">
          <div className="species-search">
            <svg className="species-search__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              className="species-search__input"
              type="search"
              placeholder="Search by common or scientific name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search extinct bird species"
            />
          </div>
          <p className="species-page__count">
            {filtered.length} of {EXTINCT_BIRDS.length} species
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="species-page__body">
        <div className="species-page__body-inner">
          {filtered.length === 0 ? (
            <p className="species-page__empty">No species match your search.</p>
          ) : (
            <ul className="species-grid">
              {filtered.map((bird) => (
                <li key={bird.slug}>
                  <Link to={`/conservation/extinct-birds/${bird.slug}`} className="species-card-link">
                    <div className="species-card">
                      <div className="species-card__photo-wrap">
                        <img
                          className="species-card__photo"
                          src={`/species_photos/extinct/${bird.image}`}
                          alt={bird.common}
                          onError={(e) => {
                            e.currentTarget.classList.add('species-card__photo--missing')
                          }}
                        />
                      </div>
                      <div className="species-card__body">
                        <p className="species-card__common">{bird.common}</p>
                        <p className="species-card__scientific">{bird.scientific}</p>
                        <div className="species-card__badges">
                          <span className="species-badge species-badge--extinct">Extinct</span>
                          <span className="species-badge species-badge--migrant">
                            Last IL record: {bird.lastIllinoisRecord}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
