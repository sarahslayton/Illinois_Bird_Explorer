const SECTIONS = [
  {
    heading: 'Plant Native',
    body: `Native plants are the foundation of healthy bird habitat. They support the insects that nearly all terrestrial bird species depend on to feed their young, provide berries and seeds timed to migration and winter needs, and offer shelter and nesting sites that non-native plants cannot replicate. Even small native plantings — a rain garden, a pollinator bed, a few native shrubs along a fence line — can meaningfully increase the insect and food resources available to birds in your neighborhood. This section will provide guidance on selecting Illinois-native plants for gardens, yards, and community green spaces, with recommendations tailored to different regions and habitat types across the state.`,
  },
  {
    heading: 'Lights Out!',
    body: `Billions of birds migrate at night, navigating by stars and the Earth's magnetic field. Artificial light disrupts this orientation system, drawing migrating birds toward cities and increasing their risk of collision with buildings. Chicago's position along the Lake Michigan shoreline makes it one of the most dangerous cities in North America for migrating birds during spring and fall. Turning off or shielding unnecessary exterior lights during peak migration nights — particularly in April–May and September–October — significantly reduces this hazard. Programs like the Chicago Bird Collision Monitors and Audubon's Lights Out initiative coordinate with building managers to dim lights during critical migration windows. This section will include resources and links for participating in lights-out efforts.`,
  },
  {
    heading: 'Window Decals',
    body: `Window collisions kill an estimated 600 million to 1 billion birds in the United States every year — more than from any other human-caused source other than feral cats. Birds cannot perceive glass as a solid barrier; they fly toward what appears to be open sky or reflected vegetation. Window decals, films, and screens break up the reflective surface and make glass visible to approaching birds. The most effective treatments cover the full window surface at 2-inch spacing, rather than relying on a single large decal. This section will describe the most effective window treatment options for homes, offices, and other structures, and provide links to recommended products and installation resources.`,
  },
  {
    heading: 'Bird Feeder Tips',
    body: `Bird feeders can provide an important supplemental food source for birds, particularly during winter when natural food supplies are scarce. They also offer unmatched opportunities for close observation and engagement with local bird communities. To maximize benefit and minimize harm, feeders should be kept clean to prevent disease transmission, placed where they minimize collision risk (either very close to or very far from windows), and stocked with appropriate seeds for the species you hope to attract. This section will cover feeder types, seed selection, placement and maintenance best practices, and guidance on which species to expect at feeders across different regions and seasons in Illinois.`,
  },
]

export default function HelpingBirdsPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Education</span>
          <h1 className="resource-page__title">Helping Birds from Home</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {SECTIONS.map((sec) => (
            <section key={sec.heading} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{sec.heading}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{sec.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
