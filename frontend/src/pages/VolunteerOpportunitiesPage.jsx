const PROGRAMS = [
  {
    name: 'Spring Bird Count',
    body: `The Illinois Spring Bird Count is a statewide one-day survey conducted each May in which volunteers across all 102 Illinois counties count every bird species seen or heard. It is one of the longest-running statewide bird counts in North America and provides a valuable annual snapshot of breeding and migrating bird populations across Illinois. Participants are organized by county compilers and submit their data to a central database.`,
  },
  {
    name: 'Audubon Christmas Bird Count',
    body: `The Christmas Bird Count is an annual citizen science survey conducted each winter between December 14 and January 5. Volunteers in local count circles spend a single day counting every bird seen or heard within a 15-mile diameter area. Illinois has dozens of active count circles, with results contributing to over a century of continent-wide population trend data maintained by the National Audubon Society.`,
  },
  {
    name: 'MOON — Monitoring of Owls and Nightjars in Illinois',
    body: `MOON is a volunteer-based roadside survey program designed to track populations of nocturnal birds — owls and nightjars — across Illinois. Participants drive pre-assigned survey routes at night during the breeding season, stopping at regular intervals to listen for vocalizing birds. The program provides trend data for species that are difficult to monitor through daytime surveys, including Eastern Whip-poor-will, Chuck-will's-widow, and several owl species.`,
  },
  {
    name: 'Cornell Lab Great Backyard Bird Count',
    body: `The Great Backyard Bird Count (GBBC) is a free, global citizen science event held each February in which people of all skill levels count the birds they see for as little as 15 minutes over four days. Results are submitted through eBird and contribute to a worldwide snapshot of bird populations in winter. The GBBC is an ideal entry point for new birders and can be conducted from backyards, parks, or any outdoor location.`,
  },
  {
    name: 'Bird Banding Stations',
    body: `Bird banding is a federally permitted research technique in which small, individually numbered aluminum bands are placed on the legs of wild birds to study survival, movement, behavior, and population trends. Illinois has several active banding stations — particularly along the Lake Michigan shoreline and at inland stopover sites — that capture and band thousands of migratory birds each year. Volunteers assist with net checks, data recording, and bird processing under the supervision of licensed banders.`,
  },
]

export default function VolunteerOpportunitiesPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Education</span>
          <h1 className="resource-page__title">Volunteer Opportunities</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {PROGRAMS.map((prog) => (
            <section key={prog.name} className="resource-page__overview">
              <h2 className="resource-page__section-heading">{prog.name}</h2>
              <span className="placeholder-label">Placeholder text</span>
              <p className="resource-page__overview-text">{prog.body}</p>

              <div className="contact-placeholder">
                <div className="contact-placeholder__label">Contact Information</div>
                <p className="contact-placeholder__body">
                  Contact details for this program have not yet been added. Check back soon.
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
