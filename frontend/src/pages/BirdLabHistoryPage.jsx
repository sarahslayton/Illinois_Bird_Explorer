const TIMELINE = [
  {
    year: '1800s',
    heading: 'Placeholder Milestone',
    body: 'Placeholder text describing an early milestone in bird research affiliated with the University of Illinois. This entry will be updated with verified historical content.',
  },
  {
    year: '1900s',
    heading: 'Placeholder Milestone',
    body: 'Placeholder text describing a notable development in Illinois bird research during the early twentieth century. This entry will be updated with verified historical content.',
  },
  {
    year: '1950s',
    heading: 'Placeholder Milestone',
    body: 'Placeholder text describing a mid-century development in bird research at the University of Illinois. This entry will be updated with verified historical content.',
  },
  {
    year: '1980s',
    heading: 'Placeholder Milestone',
    body: 'Placeholder text describing a significant research program or publication from this period. This entry will be updated with verified historical content.',
  },
  {
    year: '2000s',
    heading: 'Placeholder Milestone',
    body: 'Placeholder text describing the founding or expansion of a key Illinois bird research initiative. This entry will be updated with verified historical content.',
  },
  {
    year: 'Present',
    heading: 'Illinois BirdLab',
    body: 'Placeholder text describing the current work and focus of the Illinois BirdLab research group at the University of Illinois. This entry will be updated with verified content.',
  },
]

export default function BirdLabHistoryPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Illinois BirdLab</span>
          <h1 className="resource-page__title">History of Bird Research in Illinois</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          <ol className="timeline" aria-label="Timeline of bird research at the University of Illinois">
            {TIMELINE.map((entry, i) => (
              <li key={i} className="timeline__item">
                <div className="timeline__marker" aria-hidden="true">
                  <span className="timeline__year">{entry.year}</span>
                </div>
                <div className="timeline__body">
                  <h2 className="timeline__heading">{entry.heading}</h2>
                  <span className="placeholder-label">Placeholder text</span>
                  <p className="timeline__text">{entry.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
