const RESEARCH = [
  {
    heading: 'Movement Research',
    body: `Understanding how birds move through space — across daily home ranges, seasonal migration routes, and multi-year dispersal events — is central to the BirdLab's research program. Using telemetry, geolocators, and archival light-level tags, the lab tracks individual birds across their full annual cycle to identify critical stopover sites, wintering areas, and migratory corridors. This work connects breeding-ground population dynamics to events occurring thousands of miles away and helps identify where conservation investments can have the greatest population-level impact for Illinois and Midwestern breeding species.`,
  },
  {
    heading: 'Migratory Flight Calls',
    body: `Many nocturnal migrants produce short, distinctive flight calls as they travel, which can be recorded using autonomous recording units deployed at fixed monitoring sites. The BirdLab uses acoustic monitoring to study the timing, composition, and volume of nocturnal migration over Illinois. By analyzing call libraries against continuous nighttime recordings, researchers can document which species are moving, when, and in what relative abundance — providing a complementary data stream to traditional visual count methods. This research also supports the development of automated species identification tools for acoustic data.`,
  },
  {
    heading: 'Window Collisions',
    body: `Collisions with glass are one of the leading causes of bird mortality in North America, killing hundreds of millions of birds annually. The BirdLab investigates the behavioral and environmental factors that predict collision risk, tests the effectiveness of various bird-safe glass treatments, and works with building managers and urban planners to implement evidence-based collision reduction strategies. Research sites along the Chicago lakefront and in downstate urban areas have provided rich datasets on collision patterns, species vulnerability, and seasonal variation in mortality rates across the state.`,
  },
  {
    heading: 'Nightjar Conservation',
    body: `Nightjars — including the Eastern Whip-poor-will, Chuck-will's-widow, and Common Nighthawk — are cryptic, nocturnal insectivores that have declined sharply across much of North America. The BirdLab studies nightjar habitat selection, breeding biology, migration, and overwintering ecology in Illinois and across the Mississippi Flyway. Using a combination of acoustic monitoring, radio telemetry, and breeding bird surveys, researchers are working to identify the land-cover and management conditions that support healthy nightjar populations and to understand how insect prey availability shapes nightjar distribution and productivity.`,
  },
  {
    heading: 'BirdLab in Mexico',
    body: `Many Illinois breeding birds — warblers, flycatchers, vireos, and thrushes among them — spend more than half the year on their Mexican and Central American wintering grounds. Research in these regions is critical to understanding what limits populations during the non-breeding season. The BirdLab conducts field work in Mexico to characterize the wintering ecology of Illinois migrants, examine habitat use and site fidelity on the wintering grounds, and build collaborative partnerships with Mexican researchers and conservation organizations. This international dimension of the lab's work supports a full annual cycle approach to bird conservation.`,
  },
]

export default function BirdLabResearchPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Illinois BirdLab</span>
          <h1 className="resource-page__title">Current Research</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {RESEARCH.map((item) => (
            <section key={item.heading} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{item.heading}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{item.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
