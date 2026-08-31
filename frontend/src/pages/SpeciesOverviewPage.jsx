import { Link, useParams } from 'react-router-dom'
import { getSpeciesBySlug, statusModifier } from '../data/species'

const SUB_NAV = [
  { label: 'Phenology' },
  { label: 'Illinois Population Trends' },
  { label: 'Conservation' },
]

export default function SpeciesOverviewPage() {
  const { slug } = useParams()
  const species  = getSpeciesBySlug(slug)

  if (!species) {
    return (
      <div className="species-overview__not-found">
        <p>Species not found.</p>
        <Link to="/bird-species">← Back to Species Accounts</Link>
      </div>
    )
  }

  return (
    <div className="species-overview">

      {/* Page header */}
      <div className="species-overview__header">
        <div className="species-overview__header-inner">
          <Link to="/bird-species" className="species-overview__back">
            ← Species Accounts
          </Link>
          <h1 className="species-overview__title">{species.common}</h1>
          <p className="species-overview__scientific">{species.scientific}</p>
          <div className="species-overview__badges">
            {species.statuses.map((st) => (
              <span key={st} className={`species-badge species-badge--${statusModifier(st)}`}>
                {st}
              </span>
            ))}
            {species.stateList && (
              <span className={`species-badge species-badge--${species.stateList.toLowerCase()}`}>
                IL {species.stateList}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      <nav className="species-subnav" aria-label="Species sections">
        <div className="species-subnav__inner">
          <span className="species-subnav__current">Overview</span>
          <div className="species-subnav__divider" aria-hidden="true" />
          {SUB_NAV.map((item) => (
            <button
              key={item.label}
              className="species-subnav__link"
              type="button"
              aria-disabled="true"
              title="Coming soon"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="species-subnav__accent" aria-hidden="true" />
      </nav>

      {/* Main content */}
      <div className="species-overview__body">
        <div className="species-overview__body-inner">

          {/* Photo + Map row */}
          <div className="species-overview__media">
            <div className="species-overview__photo-wrap">
              <img
                className="species-overview__photo"
                src={`/species_photos/${species.photo}.webp`}
                alt={species.common}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {species.attribution && (
                <span className="species-overview__credit">{species.attribution}</span>
              )}
            </div>
            <div className="species-overview__map-wrap">
              <div className="species-overview__map-placeholder">
                <span className="species-overview__map-icon" aria-hidden="true">◎</span>
                <p className="species-overview__map-label">Illinois Distribution Map</p>
                <p className="species-overview__map-sub">Coming soon</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
