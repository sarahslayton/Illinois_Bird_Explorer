const PEOPLE = [
  {
    name: 'Placeholder Name',
    role: 'Principal Investigator',
    position: 'Professor, Department of Natural Resources and Environmental Sciences',
    email: 'placeholder@illinois.edu',
  },
  {
    name: 'Placeholder Name',
    role: 'Postdoctoral Researcher',
    position: 'Postdoctoral Associate, Illinois BirdLab',
    email: 'placeholder@illinois.edu',
  },
  {
    name: 'Placeholder Name',
    role: 'Graduate Student',
    position: 'Ph.D. Candidate, Natural Resources and Environmental Sciences',
    email: 'placeholder@illinois.edu',
  },
  {
    name: 'Placeholder Name',
    role: 'Graduate Student',
    position: 'M.S. Student, Natural Resources and Environmental Sciences',
    email: 'placeholder@illinois.edu',
  },
  {
    name: 'Placeholder Name',
    role: 'Undergraduate Researcher',
    position: 'Undergraduate Research Assistant',
    email: 'placeholder@illinois.edu',
  },
  {
    name: 'Placeholder Name',
    role: 'Lab Coordinator',
    position: 'Research Program Coordinator',
    email: 'placeholder@illinois.edu',
  },
]

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export default function BirdLabPeoplePage() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-page__header">
        <div className="resource-page__header-inner">          <span className="resource-page__kicker">Illinois BirdLab</span>
          <h1 className="resource-page__title">People</h1>
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      {/* Body */}
      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          <span className="placeholder-label">Placeholder text</span>
          <div className="people-grid">
            {PEOPLE.map((person, i) => (
              <div key={i} className="person-card">
                <div className="person-card__avatar" aria-hidden="true">
                  {initials(person.name)}
                </div>
                <div className="person-card__info">
                  <div className="person-card__role-badge">{person.role}</div>
                  <h2 className="person-card__name">{person.name}</h2>
                  <p className="person-card__position">{person.position}</p>
                  <a
                    href={`mailto:${person.email}`}
                    className="person-card__email"
                  >
                    {person.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
