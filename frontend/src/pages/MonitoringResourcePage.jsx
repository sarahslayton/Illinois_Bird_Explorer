import { useParams, Link } from 'react-router-dom'
import { getMonitoringResourceBySlug } from '../data/monitoringResources'

export default function MonitoringResourcePage() {
  const { slug } = useParams()
  const resource = getMonitoringResourceBySlug(slug)

  if (!resource) {
    return (
      <div className="resource-page__not-found">
        <h1>Page not found</h1>
        <Link to="/">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Monitoring Programs</span>
          <h1 className="resource-page__title">{resource.title}</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">

          {/* Overview */}
          <section className="resource-page__overview">
            <h2 className="resource-page__section-heading">Overview</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text">{resource.overview}</p>
          </section>

          {/* Key Resources */}
          <section className="resource-page__links-section">
            <h2 className="resource-page__section-heading">Key Resources</h2>
            <ul className="resource-links-grid">
              {resource.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="resource-link-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="resource-link-card__top">
                      <span className="resource-link-card__label">{link.label}</span>
                      <svg
                        className="resource-link-card__arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="resource-link-card__desc">{link.description}</p>
                    <span className="resource-link-card__url">{link.url.replace(/^https?:\/\//, '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Coming soon */}
          <div className="resource-page__coming-soon">
            <span className="resource-page__coming-soon-icon" aria-hidden="true">◎</span>
            <h3>More content coming soon</h3>
            <p>This section will be expanded with detailed data, maps, and additional information about {resource.title.toLowerCase()}.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
