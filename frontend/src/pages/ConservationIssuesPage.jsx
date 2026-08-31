const ISSUES = [
  {
    heading: 'Full Annual Cycle Conservation',
    body: `Birds face threats throughout their entire annual cycle — on breeding grounds, along migration corridors, and on wintering areas. Full annual cycle conservation recognizes that population declines cannot be reversed by protecting breeding habitat alone; events on the wintering grounds or during migration can drive trends just as powerfully as anything happening in summer. For Illinois species, this means coordinating conservation across the Mississippi Flyway and extending into Latin America and the Caribbean, where many of our migratory birds spend more than half the year. Programs like Southern Wings provide a mechanism for state wildlife agencies to invest in international habitat protection, and emerging tracking technologies are clarifying which parts of the annual cycle are most limiting for specific species.`,
  },
  {
    heading: 'Insect Declines',
    body: `Birds and insects are deeply intertwined — the vast majority of terrestrial bird species depend on insects to feed their young, even if adults primarily consume seeds or fruit. Widespread declines in insect abundance and diversity, linked to pesticide use, habitat loss, invasive plants, and light pollution, are increasingly recognized as a major driver of songbird population declines across North America. In Illinois, the intensification of row-crop agriculture and the reduction of native plant communities have degraded insect prey availability for many breeding and migratory species. Restoring native vegetation — even in small patches, gardens, and roadsides — can meaningfully support insect communities and the birds that depend on them.`,
  },
  {
    heading: 'Bird Collisions',
    body: `An estimated 600 million to 1 billion birds die each year in the United States from collisions with glass — windows, building facades, and glass walls that birds cannot perceive as barriers. Chicago alone accounts for a disproportionate share of these deaths due to its position along the Lake Michigan shoreline during peak migration, where birds funnel along the shoreline and encounter a dense urban core of reflective and illuminated buildings. Night-migrating songbirds are particularly vulnerable to artificial lighting, which disrupts their orientation. Initiatives like the FLAP program, building lights-out campaigns during peak migration nights, and the promotion of bird-safe glass in new construction are among the most effective tools available to reduce this mortality.`,
  },
  {
    heading: 'Avian Influenza',
    body: `Highly pathogenic avian influenza (HPAI), caused by H5N1 influenza strains, has emerged as a serious and ongoing threat to wild bird populations globally. Since 2021, the current outbreak has spread rapidly through North America, causing unprecedented mortality in waterfowl, raptors, shorebirds, and colonial waterbirds. Illinois has documented HPAI in wild birds and domestic poultry flocks. Raptors, particularly Bald Eagles and Red-tailed Hawks that scavenge infected waterfowl, have experienced notable mortality. Ongoing surveillance is critical for tracking the geographic spread and evolution of the virus, identifying particularly vulnerable species, and assessing long-term population impacts.`,
  },
]

export default function ConservationIssuesPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Conservation</span>
          <h1 className="resource-page__title">Major Conservation Issues</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {ISSUES.map((issue) => (
            <section key={issue.heading} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{issue.heading}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{issue.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
