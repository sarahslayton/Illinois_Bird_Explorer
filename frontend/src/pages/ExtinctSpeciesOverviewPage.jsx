import { Link, useParams } from 'react-router-dom'
import { getExtinctBirdBySlug } from '../data/extinctBirds'

const FACTS = [
  { label: 'Extinction Year',       key: 'extinctYear' },
  { label: 'Last Illinois Record',  key: 'lastIllinoisRecord' },
  { label: 'Diet',                  key: 'diet' },
  { label: 'Habitat',               key: 'habitat' },
  { label: 'Cause of Extinction',   key: 'causeOfExtinction' },
]

export default function ExtinctSpeciesOverviewPage() {
  const { slug } = useParams()
  const bird = getExtinctBirdBySlug(slug)

  if (!bird) {
    return (
      <div className="species-overview__not-found">
        <p>Species not found.</p>
        <Link to="/conservation/extinct-birds">← Extinct Birds of Illinois</Link>
      </div>
    )
  }

  return (
    <div className="species-overview">

      {/* Header */}
      <div className="species-overview__header">
        <div className="species-overview__header-inner">
          <Link to="/conservation/extinct-birds" className="species-overview__back">
            ← Extinct Birds of Illinois
          </Link>
          <h1 className="species-overview__title">{bird.common}</h1>
          <p className="species-overview__scientific">{bird.scientific}</p>
          <div className="species-overview__badges">
            <span className="species-badge species-badge--extinct">Extinct</span>
          </div>
        </div>
      </div>
      <div className="species-subnav__accent" aria-hidden="true" />

      {/* Body */}
      <div className="species-overview__body">
        <div className="species-overview__body-inner">

          {/* Photo + historical notes row */}
          <div className="species-overview__media">
            <div className="species-overview__photo-wrap">
              <img
                className="species-overview__photo"
                src={`/species_photos/extinct/${bird.image}`}
                alt={bird.common}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="species-overview__map-wrap">
              <div className="species-overview__map-placeholder">
                <span className="species-overview__map-icon" aria-hidden="true">◎</span>
                <p className="species-overview__map-label">Former Illinois Range</p>
                <p className="species-overview__map-sub">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Former status — narrative */}
          <div className="species-overview__life-history">
            <h2 className="species-overview__section-heading">Historical Status in Illinois</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="extinct-species__narrative">{bird.formerStatus}</p>
          </div>

          {/* Facts */}
          <div className="species-overview__life-history">
            <h2 className="species-overview__section-heading">Species Facts</h2>
            <span className="placeholder-label">Placeholder text</span>
            <dl className="species-facts-grid">
              {FACTS.map(({ label, key }) => (
                <div key={key} className="species-fact">
                  <dt className="species-fact__label">{label}</dt>
                  <dd className="species-fact__value">{bird[key]}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </div>
  )
}
