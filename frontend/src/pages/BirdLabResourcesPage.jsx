const CATEGORIES = [
  {
    heading: 'Code & Software',
    body: 'Scripts, pipelines, and software tools developed by the BirdLab for data processing, acoustic analysis, and movement modeling will be made available here. Links to GitHub repositories and documentation will be added as resources are cleared for public release.',
  },
  {
    heading: 'Field Protocols',
    body: 'Standardized field protocols used by the BirdLab for point counts, acoustic monitoring, telemetry deployment, and nightjar surveys will be provided here. These documents support consistent data collection across collaborating sites and can be adapted for use by partner researchers and agency biologists.',
  },
  {
    heading: 'Data & Datasets',
    body: 'Curated datasets from completed BirdLab projects will be archived and linked here, along with associated metadata and data dictionaries. Data sharing is subject to publication status and partner agreements; contact the lab for access to datasets not yet publicly available.',
  },
]

export default function BirdLabResourcesPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Illinois BirdLab</span>
          <h1 className="resource-page__title">Resources</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {CATEGORIES.map((cat) => (
            <section key={cat.heading} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{cat.heading}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{cat.body}</p>
              <div className="resource-page__coming-soon">
                <span>Content coming soon</span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
