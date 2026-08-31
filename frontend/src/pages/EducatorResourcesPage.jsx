const RESOURCES = [
  {
    heading: 'Placeholder Resource Name',
    body: `Placeholder text for this educator resource. This section will describe the resource, how educators can access or use it, and any relevant links or materials. Content will be added once resource details are confirmed.`,
  },
  {
    heading: 'Placeholder Resource Name',
    body: `Placeholder text for this educator resource. This section will describe the resource, how educators can access or use it, and any relevant links or materials. Content will be added once resource details are confirmed.`,
  },
  {
    heading: 'Placeholder Resource Name',
    body: `Placeholder text for this educator resource. This section will describe the resource, how educators can access or use it, and any relevant links or materials. Content will be added once resource details are confirmed.`,
  },
]

export default function EducatorResourcesPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Education</span>
          <h1 className="resource-page__title">Educator Resources</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {RESOURCES.map((res, i) => (
            <section key={i} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{res.heading}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{res.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
