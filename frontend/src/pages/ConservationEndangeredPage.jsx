const IL_SPECIES = [
  { common: 'American Bittern',         scientific: 'Botaurus lentiginosus',          status: 'Endangered' },
  { common: 'Barn Owl',                 scientific: 'Tyto alba',                       status: 'Endangered' },
  { common: "Bell's Vireo",             scientific: 'Vireo bellii',                    status: 'Endangered' },
  { common: "Bewick's Wren",            scientific: 'Thryomanes bewickii',             status: 'Endangered' },
  { common: 'Black-crowned Night-Heron',scientific: 'Nycticorax nycticorax',           status: 'Endangered' },
  { common: 'Black Tern',               scientific: 'Chlidonias niger',                status: 'Endangered' },
  { common: 'Cerulean Warbler',         scientific: 'Setophaga cerulea',               status: 'Endangered' },
  { common: "Henslow's Sparrow",        scientific: 'Centronyx henslowii',             status: 'Endangered' },
  { common: 'King Rail',                scientific: 'Rallus elegans',                  status: 'Endangered' },
  { common: 'Least Bittern',            scientific: 'Ixobrychus exilis',               status: 'Endangered' },
  { common: 'Loggerhead Shrike',        scientific: 'Lanius ludovicianus',             status: 'Endangered' },
  { common: 'Mississippi Kite',         scientific: 'Ictinia mississippiensis',         status: 'Endangered' },
  { common: 'Prairie Warbler',          scientific: 'Setophaga discolor',              status: 'Endangered' },
  { common: 'Short-eared Owl',          scientific: 'Asio flammeus',                   status: 'Endangered' },
  { common: 'Yellow-headed Blackbird',  scientific: 'Xanthocephalus xanthocephalus',   status: 'Endangered' },
  { common: 'Brown Creeper',            scientific: 'Certhia americana',               status: 'Threatened' },
  { common: 'Louisiana Waterthrush',    scientific: 'Parkesia motacilla',              status: 'Threatened' },
  { common: 'Northern Harrier',         scientific: 'Circus hudsonius',                status: 'Threatened' },
  { common: 'Red-shouldered Hawk',      scientific: 'Buteo lineatus',                  status: 'Threatened' },
  { common: 'Sandhill Crane',           scientific: 'Antigone canadensis',             status: 'Threatened' },
]

export default function ConservationEndangeredPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Conservation</span>
          <h1 className="resource-page__title">Endangered Species Protection Board</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">

          {/* About section */}
          <section className="resource-page__overview">
            <h2 className="resource-page__section-heading">About the Board</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text">
              Detailed information about the Illinois Endangered Species Protection Board will be added here.
            </p>
          </section>

          {/* Species list */}
          <section>
            <h2 className="resource-page__section-heading">
              2025 Illinois Endangered and Threatened Bird Species
            </h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text" style={{ marginBottom: 'var(--sp-6)' }}>
              The following bird species are listed as Endangered or Threatened under the Illinois Endangered Species Protection Act. This list is subject to revision; consult the Illinois DNR for the most current official list.
            </p>
            <div className="status-table-wrap">
              <table className="status-table">
                <thead>
                  <tr>
                    <th className="status-table__th">Common Name</th>
                    <th className="status-table__th">Scientific Name</th>
                    <th className="status-table__th">Illinois Status</th>
                  </tr>
                </thead>
                <tbody>
                  {IL_SPECIES.map((sp) => (
                    <tr key={sp.scientific} className="status-table__row">
                      <td className="status-table__td status-table__td--common">{sp.common}</td>
                      <td className="status-table__td status-table__td--sci">{sp.scientific}</td>
                      <td className="status-table__td">
                        <span className={`il-status-badge il-status-badge--${sp.status.toLowerCase()}`}>
                          {sp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Coming soon */}
          <div className="resource-page__coming-soon">
            <span className="resource-page__coming-soon-icon" aria-hidden="true">◎</span>
            <h3>More content coming soon</h3>
            <p>This page will be expanded with detailed information about the Endangered Species Protection Board and the full 2025 species list.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
