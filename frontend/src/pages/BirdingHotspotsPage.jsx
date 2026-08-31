export default function BirdingHotspotsPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Education</span>
          <h1 className="resource-page__title">Illinois Birding Hotspots</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">

          <section className="resource-page__overview">
            <h2 className="resource-page__section-heading">eBird</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text">
              eBird is a real-time, online checklist program launched by the Cornell Lab of Ornithology
              in 2002. It collects bird sighting data from birders around the world, making those
              observations freely available to researchers, educators, and the public. In Illinois, eBird
              data are used by researchers, land managers, and conservation planners to track species
              distribution, abundance, and seasonal movement across the state. Birders can explore
              hotspot maps, recent sightings, and species bar charts for any location in Illinois. This
              section will be expanded with guidance on using eBird to find birding locations in Illinois.
            </p>
          </section>

          <section className="resource-page__overview">
            <h2 className="resource-page__section-heading">Map of Birding Recommendations</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text">
              Illinois offers a remarkable diversity of birding sites — from the Lake Michigan shoreline
              and Chicago's lakefront parks, which funnel millions of migrants each spring and fall, to
              the cypress swamps and bottomland forests of the far south, the prairies and wetlands of
              the central counties, and the river bluffs of the western border. This section will feature
              an interactive map highlighting recommended birding locations across the state, with notes
              on the best seasons, habitat types, and target species for each site.
            </p>
            <div className="resource-page__coming-soon">
              <span>Interactive map coming soon</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
