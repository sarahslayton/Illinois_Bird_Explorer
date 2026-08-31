import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  // Close any open dropdowns when React Router navigates.
  // ilw-header-menu-section listens for keydown on itself (not document), so dispatching
  // to document doesn't reach it. Setting .expanded = false directly is the reliable fix.
  useEffect(() => {
    document.querySelectorAll('ilw-header-menu-section').forEach(section => {
      section.expanded = false
    })
  }, [location.pathname])

  return (
    <ilw-header source="Illinois-Bird-Explorer">

      <a slot="parent-unit" href="https://inhs.illinois.edu">
        Illinois Natural History Survey
      </a>

      <Link slot="site-name" to="/">Illinois Bird Explorer</Link>

      <nav slot="links" aria-label="Utility">
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Search</a></li>
        </ul>
      </nav>

      <ilw-header-menu slot="navigation">
        <ul>

          <li>
            <ilw-header-menu-section linked="true">
              <Link slot="link" to="/bird-species">Bird Species</Link>
              <ul>
                <li><Link to="/bird-species">Species Accounts</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section>
              <span slot="label">Migration</span>
              <ul>
                <li><Link to="/migration/hotspots">Bird Migration Hotspots and Important Stopover Sites</Link></li>
                <li><Link to="/migration/motus">MOTUS Wildlife Tracking System</Link></li>
                <li><Link to="/migration/chicago-monitoring">Chicago Bird Migration Monitoring Network</Link></li>
                <li><Link to="/migration/midwest-migration">Midwest Migration Network</Link></li>
                <li><Link to="/migration/southern-wings">Southern Wings</Link></li>
                <li><Link to="/migration/birdcast">BirdCast</Link></li>
                <li><Link to="/migration/forbes-waterfowl">Forbes Biological Station Waterfowl Aerial Inventories</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section>
              <span slot="label">Monitoring Programs</span>
              <ul>
                <li><Link to="/monitoring/breeding-bird-survey">North American Breeding Bird Survey</Link></li>
                <li><Link to="/monitoring/christmas-bird-count">Audubon Christmas Bird Count</Link></li>
                <li><Link to="/monitoring/spring-bird-count">Spring Bird Count</Link></li>
                <li><Link to="/monitoring/critical-trends">Critical Trends Assessment Program</Link></li>
                <li><Link to="/monitoring/upland-game-surveys">Upland Game Bird Surveys</Link></li>
                <li><Link to="/monitoring/upland-hunting-forecast">2025–2026 Upland Hunting Forecast</Link></li>
                <li><Link to="/monitoring/natural-heritage-database">Illinois Natural Heritage Database</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section>
              <span slot="label">Conservation</span>
              <ul>
                <li><Link to="/conservation/endangered-species">Endangered Species Protection Board</Link></li>
                <li><Link to="/conservation/wildlife-action-plan">Illinois Wildlife Action Plan</Link></li>
                <li><Link to="/conservation/extinct-birds">Extinct Birds of Illinois</Link></li>
                <li><Link to="/conservation/major-issues">Major Conservation Issues</Link></li>
                <li><Link to="/conservation/organizations">Bird Conservation Organizations</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section linked="true">
              <Link slot="link" to="/data-explorer">Data Explorer</Link>
              <ul>
                <li><a href="#">Christmas Bird Count</a></li>
                <li><a href="#">Spring Bird Count</a></li>
                <li><a href="#">North American Breeding Bird Survey</a></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section>
              <span slot="label">Education</span>
              <ul>
                <li><Link to="/education/educator-resources">Educator Resources</Link></li>
                <li><Link to="/education/birding-hotspots">Illinois Birding Hotspots</Link></li>
                <li><Link to="/education/volunteer-opportunities">Volunteer Opportunities</Link></li>
                <li><Link to="/education/helping-birds-from-home">Helping Birds from Home</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

          <li>
            <ilw-header-menu-section>
              <span slot="label">Illinois BirdLab</span>
              <ul>
                <li><Link to="/birdlab/people">People</Link></li>
                <li><Link to="/birdlab/history">History of Bird Research in Illinois</Link></li>
                <li><Link to="/birdlab/current-research">Current Research</Link></li>
                <li><Link to="/birdlab/resources">Resources</Link></li>
              </ul>
            </ilw-header-menu-section>
          </li>

        </ul>
      </ilw-header-menu>

    </ilw-header>
  )
}
