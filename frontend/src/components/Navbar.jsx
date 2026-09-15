import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Bird Species',
    path: '/bird-species',
    dropdown: [
      { label: 'Species Accounts', path: '/bird-species' },
    ],
  },
  {
    label: 'Migration',
    path: '/migration',
    dropdown: [
      { label: 'Bird Migration Hotspots and Important Stopover Sites', path: '/migration/hotspots' },
      { label: 'MOTUS', path: '/migration/motus' },
      { label: 'Chicago Bird Migration Monitoring Network', path: '/migration/chicago-monitoring' },
      { label: 'Midwest Migration Network', path: '/migration/midwest-migration' },
      { label: 'Southern Wings', path: '/migration/southern-wings' },
      { label: 'BirdCast', path: '/migration/birdcast' },
      { label: 'Forbes Biological Station Waterfowl Aerial Inventories', path: '/migration/forbes-waterfowl' },
    ],
  },
  {
    label: 'Monitoring Programs',
    path: '/monitoring',
    dropdown: [
      { label: 'North American Breeding Bird Survey', path: '/monitoring/breeding-bird-survey' },
      { label: 'Audubon Christmas Bird Count', path: '/monitoring/christmas-bird-count' },
      { label: 'Spring Bird Count', path: '/monitoring/spring-bird-count' },
      { label: 'Critical Trends Assessment Program', path: '/monitoring/critical-trends' },
      { label: 'Upland Game Bird Surveys', path: '/monitoring/upland-game-surveys' },
      { label: 'Illinois Natural Heritage Database', path: '/monitoring/natural-heritage-database' },
    ],
  },
  {
    label: 'Conservation',
    path: '/conservation',
    dropdown: [
      { label: 'Endangered Species Protection Board', path: '/conservation/endangered-species' },
      { label: 'Illinois Wildlife Action Plan', path: '/conservation/wildlife-action-plan' },
      { label: 'Extinct Birds of Illinois', path: '/conservation/extinct-birds' },
      { label: 'Major Conservation Issues', path: '/conservation/major-issues' },
      { label: 'Bird Conservation Organizations', path: '/conservation/organizations' },
    ],
  },
  {
    label: 'Data Explorer',
    path: '/data-explorer',
    dropdown: [
      { label: 'Christmas Bird Count', path: '#' },
      { label: 'Spring Bird Count', path: '#' },
      { label: 'North American Breeding Bird Survey', path: '#' },
    ],
  },
  {
    label: 'Education',
    path: '/education',
    dropdown: [
      { label: 'Educator Resources', path: '/education/educator-resources' },
      { label: 'Illinois Birding Hotspots', path: '/education/birding-hotspots' },
      { label: 'Volunteer Opportunities', path: '/education/volunteer-opportunities' },
      { label: 'Helping Birds from Home', path: '/education/helping-birds-from-home' },
    ],
  },
  {
    label: 'Illinois BirdLab',
    path: '/birdlab',
    dropdown: [
      { label: 'People', path: '/birdlab/people' },
      { label: 'History of Bird Research in Illinois', path: '/birdlab/history' },
      { label: 'Current Research', path: '/birdlab/current-research' },
      { label: 'Resources', path: '/birdlab/resources' },
    ],
  },
]

function BlockI() {
  return (
    <svg
      className="block-i"
      width="20"
      height="28"
      viewBox="0 0 20 28"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="20" height="5" />
      <rect x="6" y="5" width="8" height="18" />
      <rect x="0" y="23" width="20" height="5" />
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__bar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" aria-label="Illinois Bird Explorer home">
            <BlockI />
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Illinois Bird Explorer</span>
              <span className="navbar__logo-sub">University of Illinois</span>
            </div>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="navbar__nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.path} className="navbar__item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                    }
                    aria-haspopup="true"
                  >
                    {item.label}
                    <span className="navbar__chevron" aria-hidden="true" />
                  </NavLink>

                  <ul className="navbar__dropdown" role="menu">
                    {item.dropdown.map((drop) => (
                      <li key={drop.label} className="navbar__dropdown-item" role="none">
                        <a
                          href={drop.path}
                          className="navbar__dropdown-link"
                          role="menuitem"
                        >
                          {drop.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="navbar__accent" aria-hidden="true" />
    </header>
  )
}
