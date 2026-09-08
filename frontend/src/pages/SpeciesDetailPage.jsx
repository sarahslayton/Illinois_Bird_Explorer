import { Link, useParams } from 'react-router-dom'
import { getSpeciesBySlug, statusModifier } from '../data/species'
import { getSpeciesAccount } from '../data/speciesAccounts'
import { getSpeciesPhotos } from '../data/speciesPhotos'

// "Photos" only appears when the species has an additional_photo_info/<slug>.yml sidecar.
const BASE_TABS = [
  { id: 'overview',  label: 'Overview',                  path: '' },
  { id: 'phenology', label: 'Phenology',                 path: '/phenology' },
  { id: 'trends',    label: 'Illinois Population Trends', path: '/trends' },
  { id: 'photos',    label: 'Photos',                     path: '/photos' },
]

function Prose({ paragraphs }) {
  return (
    <div className="species-prose">
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Placeholder({ children }) {
  return <div className="species-placeholder-box">{children}</div>
}

function FactsGrid({ facts }) {
  return (
    <dl className="species-facts-grid">
      {facts.map(({ label, value }) => (
        <div key={label} className="species-fact">
          <dt className="species-fact__label">{label}</dt>
          <dd className="species-fact__value">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function OverviewPanel({ species, account }) {
  return (
    <>
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

      <section>
        <h2 className="species-overview__section-heading">Species Description</h2>
        {account?.description.length
          ? <Prose paragraphs={account.description} />
          : <Placeholder>Species description coming soon.</Placeholder>}
      </section>

      <section>
        <h2 className="species-overview__section-heading">Conservation Status</h2>
        {account?.conservationStatus.length
          ? <Prose paragraphs={account.conservationStatus} />
          : <Placeholder>Conservation status coming soon.</Placeholder>}
      </section>

      <section>
        <h2 className="species-overview__section-heading">Fast Facts</h2>
        {account?.fastFacts.length
          ? <FactsGrid facts={account.fastFacts} />
          : <Placeholder>Fast facts coming soon.</Placeholder>}
      </section>
    </>
  )
}

function PhenologyPanel({ account }) {
  return (
    <>
      <section>
        <h2 className="species-overview__section-heading">Description</h2>
        <Placeholder>Phenology description coming soon.</Placeholder>
      </section>

      <section>
        {account?.phenology.length
          ? <FactsGrid facts={account.phenology} />
          : <Placeholder>Phenology details coming soon.</Placeholder>}
      </section>
    </>
  )
}

function TrendsPanel({ account }) {
  return (
    <>
      <section>
        <h2 className="species-overview__section-heading">History</h2>
        {account?.history.length
          ? <Prose paragraphs={account.history} />
          : <Placeholder>History coming soon.</Placeholder>}
      </section>

      <section>
        <h2 className="species-overview__section-heading">Model Summary</h2>
        <Placeholder>Coming soon.</Placeholder>
      </section>
    </>
  )
}

function PhotosPanel({ species, photos }) {
  return (
    <section>
      <h2 className="species-overview__section-heading">Photos</h2>
      {photos.length === 0 ? (
        <Placeholder>Additional photos of the {species.common} coming soon.</Placeholder>
      ) : (
        <ul className="species-gallery">
          {photos.map((p, i) => (
            <li key={i} className="species-gallery__card">
              <a
                className="species-gallery__figure"
                href={p.full}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="species-gallery__img"
                  src={p.thumb}
                  alt={p.caption || species.common}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const card = e.currentTarget.closest('.species-gallery__card')
                    if (card) card.style.display = 'none'
                  }}
                />
              </a>
              {(p.caption || p.credit) && (
                <div className="species-gallery__body">
                  {p.caption && <p className="species-gallery__caption">{p.caption}</p>}
                  {p.credit && <p className="species-gallery__credit">Photo: {p.credit}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function SpeciesDetailPage({ tab }) {
  const { slug } = useParams()
  const species = getSpeciesBySlug(slug)

  if (!species) {
    return (
      <div className="species-overview__not-found">
        <p>This species account isn’t available yet.</p>
        <Link to="/bird-species">← Back to Species Accounts</Link>
      </div>
    )
  }

  const account = getSpeciesAccount(slug)
  const photos = getSpeciesPhotos(slug)
  const tabs = BASE_TABS.filter((t) => t.id !== 'photos' || photos.length > 0)

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
          {tabs.map((t) => (
            <Link
              key={t.id}
              to={`/bird-species/${slug}${t.path}`}
              className={`species-subnav__link${tab === t.id ? ' species-subnav__link--active' : ''}`}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <div className="species-subnav__accent" aria-hidden="true" />
      </nav>

      {/* Active tab */}
      <div className="species-overview__body">
        <div className="species-overview__body-inner">
          {tab === 'overview'  && <OverviewPanel species={species} account={account} />}
          {tab === 'phenology' && <PhenologyPanel account={account} />}
          {tab === 'trends'    && <TrendsPanel account={account} />}
          {tab === 'photos'    && <PhotosPanel species={species} photos={photos} />}
        </div>
      </div>

    </div>
  )
}
