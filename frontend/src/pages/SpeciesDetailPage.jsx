import { Link, useParams } from 'react-router-dom'
import { getSpeciesBySlug, statusModifier } from '../data/species'
import { getSpeciesAccount } from '../data/speciesAccounts'

const TABS = [
  { id: 'overview',  label: 'Overview',                  path: '' },
  { id: 'phenology', label: 'Phenology',                 path: '/phenology' },
  { id: 'trends',    label: 'Illinois Population Trends', path: '/trends' },
]

function Prose({ paragraphs }) {
  return (
    <div className="species-prose">
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Placeholder({ children }) {
  return (
    <>
      <span className="placeholder-label">Placeholder text</span>
      <div className="species-placeholder-box">{children}</div>
    </>
  )
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

export default function SpeciesDetailPage({ tab }) {
  const { slug } = useParams()
  const species = getSpeciesBySlug(slug)

  if (!species) {
    return (
      <div className="species-overview__not-found">
        <p>Species not found.</p>
        <Link to="/bird-species">← Back to Species Accounts</Link>
      </div>
    )
  }

  const account = getSpeciesAccount(slug)

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
          {TABS.map((t) => (
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
        </div>
      </div>

    </div>
  )
}
