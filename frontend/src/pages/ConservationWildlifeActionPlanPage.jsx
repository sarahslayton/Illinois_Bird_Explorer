const PLAN_LINKS = [
  {
    label: 'Illinois Wildlife Action Plan 2.0 (Full Document)',
    url: 'https://www2.illinois.gov/dnr/conservation/wildlife/IWAP/Pages/IllinoisWildlifeActionPlan.aspx',
    description: 'The complete Illinois Comprehensive Wildlife Conservation Plan and Strategy 2.0, updated to reflect current species status and conservation priorities.',
  },
  {
    label: 'Illinois DNR — Wildlife Action Plan Overview',
    url: 'https://www2.illinois.gov/dnr/conservation/wildlife/IWAP/Pages/default.aspx',
    description: 'Illinois DNR portal for the Wildlife Action Plan, including implementation updates and species of greatest conservation need.',
  },
  {
    label: 'AFWA — State Wildlife Action Plans',
    url: 'https://www.fishwildlife.org/landing/state-wildlife-action-plans',
    description: 'National overview of State Wildlife Action Plans coordinated through the Association of Fish and Wildlife Agencies.',
  },
  {
    label: 'State Wildlife Grants Program — USFWS',
    url: 'https://www.fws.gov/program/state-wildlife-grants',
    description: 'Federal funding program that supports implementation of State Wildlife Action Plans, including Illinois IWAP priorities.',
  },
]

export default function ConservationWildlifeActionPlanPage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Conservation</span>
          <h1 className="resource-page__title">Illinois Wildlife Action Plan</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">

          {/* About section */}
          <section className="resource-page__overview">
            <h2 className="resource-page__section-heading">About the Plan</h2>
            <span className="placeholder-label">Placeholder text</span>
            <p className="resource-page__overview-text">
              Detailed information about the Illinois Wildlife Action Plan will be added here.
            </p>
          </section>

          {/* Key documents */}
          <section className="resource-page__links-section">
            <h2 className="resource-page__section-heading">Key Documents and Resources</h2>
            <ul className="resource-links-grid">
              {PLAN_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="resource-link-card"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="resource-link-card__top">
                      <span className="resource-link-card__label">{link.label}</span>
                      <svg
                        className="resource-link-card__arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="resource-link-card__desc">{link.description}</p>
                    <span className="resource-link-card__url">{link.url.replace(/^https?:\/\//, '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Coming soon */}
          <div className="resource-page__coming-soon">
            <span className="resource-page__coming-soon-icon" aria-hidden="true">◎</span>
            <h3>More content coming soon</h3>
            <p>This page will be expanded with a summary of Illinois Wildlife Action Plan priorities relevant to birds and Illinois habitats.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
