import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getContent } from '../data/content'

// Drop whitespace-only text nodes (Markdown soft breaks between images).
const meaningful = (nodes = []) =>
  nodes.filter((n) => !(n.type === 'text' && !n.value.trim()))

const markdownComponents = {
  // Open external links in a new tab; leave in-app links to react-router elsewhere.
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

  // A Markdown image becomes a captioned <figure>: alt text is the caption,
  // the title string ("...") is the photo credit. Append ?full to the src for
  // a full-width figure; the default is centered at a comfortable reading width.
  img({ src = '', alt = '', title }) {
    const full = /[?&]full\b/.test(src)
    const clean = src.replace(/[?#].*$/, '')
    return (
      <figure className={`content-figure${full ? ' content-figure--full' : ''}`}>
        <img src={clean} alt={alt} loading="lazy" decoding="async" />
        {(alt || title) && (
          <figcaption className="content-figure__caption">
            {alt}
            {title && <span className="content-figure__credit">Photo: {title}</span>}
          </figcaption>
        )}
      </figure>
    )
  },

  // react-markdown wraps a lone image in <p>, and <figure> inside <p> is invalid.
  // Unwrap it. Two or three images on consecutive lines (no blank line between)
  // land in one paragraph — render those as a side-by-side group.
  p({ node, children }) {
    const kids = meaningful(node?.children)
    const imgCount = kids.filter(
      (k) => k.type === 'element' && k.tagName === 'img',
    ).length
    if (imgCount === 0 || imgCount !== kids.length) return <p>{children}</p>
    if (imgCount === 1) return <>{children}</>
    return <div className="content-figure content-figure--group">{children}</div>
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

  const { title, intro, body, resources, placeholder, hero } = doc

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
          {hero?.src && (
            <figure className="content-hero">
              <img src={hero.src} alt={hero.alt || ''} loading="eager" decoding="async" />
              {hero.credit && (
                <figcaption className="content-hero__credit">Photo: {hero.credit}</figcaption>
              )}
            </figure>
          )}

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
