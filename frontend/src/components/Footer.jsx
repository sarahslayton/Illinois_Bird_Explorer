export default function Footer() {
  return (
    <ilw-footer source="Illinois-Bird-Explorer">

      <a slot="primary-unit" href="https://inhs.illinois.edu">
        Illinois Natural History Survey
      </a>

      <a slot="site-name" href="/">
        Illinois Bird Explorer
      </a>

      <div slot="address">
        <p>1816 South Oak Street MC-652<br />Champaign, IL 61820</p>
        <p>
          <a href="mailto:info@inhs.illinois.edu">info@inhs.illinois.edu</a><br />
          <a href="tel:+12173336880">217-333-6880</a>
        </p>
      </div>

      <a slot="legal-link" href="https://illinois.edu/about/privacy-notice.html">
        Privacy Policy
      </a>

    </ilw-footer>
  )
}
