const ORGS = [
  {
    name: 'Illinois Audubon Society',
    url: 'https://illinoisaudubon.org',
    body: `The Illinois Audubon Society is the state affiliate of the National Audubon Society and one of the oldest conservation organizations in Illinois. The society manages a network of sanctuaries across the state, advocates for bird-friendly policies, and supports local Audubon chapters and bird monitoring programs. Their work spans habitat protection, environmental education, and community engagement with both urban and rural Illinoisans.`,
  },
  {
    name: 'Bird Conservation Network',
    url: 'https://www.bcnbirds.org',
    body: `The Bird Conservation Network (BCN) is a consortium of ornithological and birding organizations in the Chicago region working together on bird conservation, monitoring, and education. BCN coordinates regional monitoring programs, publishes research on Chicago-area bird populations, and supports collaborative conservation initiatives across the region's diverse habitats — from the Lake Michigan shoreline to the remnant prairies and savannas of the Chicagoland area.`,
  },
  {
    name: 'American Bird Conservancy',
    url: 'https://abcbirds.org',
    body: `The American Bird Conservancy (ABC) is a national organization dedicated to conserving native birds and their habitats throughout the Americas. ABC works on habitat protection, feral cat management, collision reduction, pesticide reform, and policy advocacy. Several Illinois bird species of concern benefit from ABC programs targeting grassland, shrubland, and bottomland forest habitats across the continent.`,
  },
  {
    name: 'Illinois Department of Natural Resources',
    url: 'https://www2.illinois.gov/dnr',
    body: `The Illinois Department of Natural Resources (IDNR) is the primary state agency responsible for managing and protecting Illinois's wildlife and natural resources. IDNR administers wildlife management areas, enforces wildlife protection laws, conducts long-term population monitoring, and manages federal funding for wildlife conservation through the State Wildlife Grant program. IDNR's Division of Natural Heritage oversees endangered species protection and the Illinois Natural Heritage Database.`,
  },
  {
    name: 'Outdoor Illinois Journal',
    url: 'https://www2.illinois.gov/dnr/outreach/Pages/OutdoorIllinoisJournal.aspx',
    body: `Outdoor Illinois is a publication of the Illinois Department of Natural Resources covering wildlife, conservation, outdoor recreation, and natural history across the state. The journal connects the public with accessible information about Illinois wildlife and wild places, including seasonal features on bird migration, rare species accounts, habitat restoration projects, and conservation programs underway across the state.`,
  },
  {
    name: 'The Nature Conservancy — Illinois',
    url: 'https://www.nature.org/en-us/about-us/where-we-work/united-states/illinois/',
    body: `The Nature Conservancy operates across Illinois and the broader Midwest, protecting and restoring critical habitats including tallgrass prairies, wetlands, savannas, and bottomland forests. TNC's Illinois chapter has protected hundreds of thousands of acres and works with private landowners, government agencies, and local communities on conservation projects that directly benefit birds and other wildlife.`,
  },
  {
    name: 'Audubon Great Lakes',
    url: 'https://greatlakes.audubon.org',
    body: `Audubon Great Lakes is a regional office of the National Audubon Society focused on bird conservation across the Great Lakes basin. The program works to protect and restore the wetlands, shorelines, and forests that migratory birds depend on throughout the region. Illinois's Lake Michigan shoreline is one of the most important migration corridors in North America, and Audubon Great Lakes plays a key role in conservation and advocacy efforts along this corridor.`,
  },
]

export default function BirdOrganizationsPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Conservation</span>
          <h1 className="resource-page__title">Bird Conservation Organizations</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {ORGS.map((org) => (
            <section key={org.name} className="resource-page__overview">
              <h2 className="resource-page__section-heading">
                <a
                  href={org.url}
                  className="org-heading-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {org.name}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="org-heading-link__icon"
                  >
                    <path
                      d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L8 9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{org.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
