import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getContent } from '../data/content'

// Open external links in a new tab; leave in-app links to react-router elsewhere.
const markdownComponents = {
  a({ href = '', children, ...props }) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
}

function ResourceLinks({ resources }) {
  // Tolerate stray/blank list entries in a page's frontmatter.
  resources = resources.filter((link) => link && link.url)
  if (resources.length === 0) return null
  return (
    <section className="resource-page__links-section">
      <h2 className="resource-page__section-heading">Key Resources</h2>
      <ul className="resource-links-grid">
        {resources.map((link) => (
          <li key={link.url}>
            <a
              className="resource-link-card"
              href={link.url}
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
              {link.description && (
                <p className="resource-link-card__desc">{link.description}</p>
              )}
              <span className="resource-link-card__url">
                {link.url.replace(/^https?:\/\//, '')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ContentPage({ section, sectionLabel, slug: slugProp }) {
  const params = useParams()
  const slug = slugProp ?? params.slug
  const doc = getContent(section, slug)

  if (!doc) {
    return (
      <div className="resource-page__not-found">
        <h1>Page not found</h1>
        <Link to="/">← Back to Home</Link>
      </div>
    )
  }

  const { title, intro, body, resources, placeholder } = doc

  return (
    <div className="resource-page">
      <div className="resource-page__header">
        <div className="resource-page__header-inner">
          <span className="resource-page__kicker">{sectionLabel}</span>
          <h1 className="resource-page__title">{title}</h1>
          {intro && <p className="resource-page__intro">{intro}</p>}
        </div>
      </div>
      <div className="resource-page__accent" aria-hidden="true" />

      <div className="resource-page__body">
        <div className="resource-page__body-inner">
          {body && (
            <div className="content-prose">
              {placeholder && (
                <span className="placeholder-label">Placeholder text</span>
              )}
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {body}
              </ReactMarkdown>
            </div>
          )}

          {resources?.length > 0 && <ResourceLinks resources={resources} />}
        </div>
      </div>
    </div>
  )
}
