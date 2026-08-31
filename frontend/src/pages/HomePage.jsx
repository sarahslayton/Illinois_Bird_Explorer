import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.jpg'
import { getContent } from '../data/content'

// Editable copy lives in written_content/home.md. The "Explore the Site" grid
// below (labels, photos, links) stays defined here on purpose.
const home = getContent('home')
const MISSION_STATEMENT =
  'Illinois is home to over 400 species of birds, from year-round residents to spectacular ' +
  'seasonal migrants passing through on their journeys across the continent. This resource ' +
  'brings together scientific data, community observations, and conservation information to ' +
  'help agencies, land managers, researchers, and the public understand and protect the ' +
  'birds of Illinois.'

// Toggle to false to instantly revert cards to plain white background
const SHOW_CARD_PHOTOS = true

const FEATURES = [
  {
    path: '/bird-species',
    label: 'Bird Species',
    heading: 'Discover Illinois Birds',
    desc: 'Explore detailed profiles of over 400 bird species documented across Illinois, including identification guides, habitat information, and seasonal range maps.',
    accent: 'var(--orange)',
    photo: 'bird-species.jpg',
  },
  {
    path: '/migration',
    label: 'Migration',
    heading: 'Track Seasonal Movements',
    desc: 'Follow the remarkable journeys of migratory birds through Illinois, from spring arrivals to fall departures, with route maps and peak timing guides.',
    accent: 'var(--orange)',
    photo: 'migration.jpg',
  },
  {
    path: '/monitoring',
    label: 'Monitoring Programs',
    heading: 'Community Science in Action',
    desc: 'Learn about long-term bird monitoring programs across the state and how citizen science efforts are tracking population changes over decades.',
    accent: 'var(--orange)',
    photo: 'monitoring-programs.jpg',
  },
  {
    path: '/conservation',
    label: 'Conservation',
    heading: 'Protecting Illinois Habitats',
    desc: 'Understand the conservation challenges facing Illinois birds and explore ongoing efforts to protect the habitats they depend on throughout their life cycles.',
    accent: 'var(--orange)',
    photo: 'conservation.png',
  },
  {
    path: '/data-explorer',
    label: 'Data Explorer',
    heading: 'Explore the Data',
    desc: 'Access interactive maps, population trend charts, and historical records drawn from decades of bird monitoring data collected across Illinois.',
    accent: 'var(--orange)',
    photo: 'data-explorer.png',
  },
  {
    path: '/education',
    label: 'Education & Volunteers',
    heading: 'Learn and Get Involved',
    desc: 'Find resources for new and experienced birders, connect with volunteer monitoring programs, and discover upcoming events and field trips near you.',
    accent: 'var(--orange)',
    photo: 'education.jpg',
  },
  {
    path: '/birdlab',
    label: 'Illinois BirdLab',
    heading: 'Field Research & Discovery',
    desc: "Explore the research programs, publications, and team behind Illinois BirdLab — advancing scientific understanding of the state's avian communities.",
    accent: 'var(--orange)',
    photo: 'illinois-birdlab.png',
  },
]

export default function HomePage() {
  return (
    <div className="home">

      {/* ── HERO ── */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="Illinois Bird Explorer hero"
      >
        <div className="hero__noise" aria-hidden="true" />
        <div className="hero__content">
          <h1 className="hero__title">
            Illinois Bird<br />Explorer
          </h1>
          <div className="hero__actions">
            <Link to="/bird-species" className="btn btn--outline">
              Explore Species
            </Link>
            <Link to="/data-explorer" className="btn btn--outline">
              View Data
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="mission" aria-labelledby="mission-heading">
        <div className="mission__inner">
          <span className="placeholder-label">Placeholder text</span>
          <span className="mission__kicker">{home?.missionKicker ?? 'Our Mission'}</span>
          <h2 id="mission-heading" className="mission__heading">
            {home?.missionHeading ?? 'Connecting People with Illinois Birds'}
          </h2>
          <blockquote className="mission__quote">
            {home?.body || MISSION_STATEMENT}
          </blockquote>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" aria-labelledby="features-heading">
        <div className="features__inner">
          <span className="placeholder-label">Placeholder text</span>
          <h2 id="features-heading" className="features__heading">
            {home?.featuresHeading ?? 'Explore the Site'}
          </h2>
          <p className="features__subheading">
            {home?.featuresSubheading ?? 'Everything you need to learn about, track, and protect Illinois birds.'}
          </p>
          <div className="features__grid">
            {FEATURES.map((card) => (
              <Link
                to={card.path}
                key={card.path}
                className={`feature-card${SHOW_CARD_PHOTOS && card.photo ? ' feature-card--photo' : ''}`}
                style={SHOW_CARD_PHOTOS && card.photo
                  ? { backgroundImage: `url(/species_photos/home/${card.photo})` }
                  : undefined}
              >
                <div
                  className="feature-card__accent"
                  style={{ background: card.accent }}
                  aria-hidden="true"
                />
                <div className="feature-card__body">
                  <span className="feature-card__label">{card.label}</span>
                  <span className="placeholder-label">Placeholder text</span>
                  <h3 className="feature-card__heading">{card.heading}</h3>
                  <p className="feature-card__desc">{card.desc}</p>
                  <span className="feature-card__cta">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
