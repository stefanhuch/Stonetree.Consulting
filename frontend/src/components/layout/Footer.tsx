import { Link } from "react-router-dom"
import Logo from "../brand/Logo"
import { site } from "../../data/site"
import { pillars } from "../../data/pillars"
import { karriereColumns } from "../../data/navigation"
import { useConsent } from "../../features/consent/consentContext"

export default function Footer() {
  const karriereLinks = karriereColumns[0].links
  const { oeffneEinstellungen } = useConsent()

  return (
    <footer className="site-footer on-dark">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" aria-label={`${site.brand}, zur Startseite`}>
              <Logo variante={site.logoVariante} />
            </Link>
            <p>{site.tagline}</p>
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Expertise</p>
            {pillars.map((pillar) => (
              <Link key={pillar.id} to={`/bereiche/${pillar.slug}`}>
                {pillar.title}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Unternehmen</p>
            <Link to="/#leistungen">Leistungen</Link>
            <Link to="/#kundenprojekte">Kundenprojekte</Link>
            <Link to="/#publikationen">Publikationen</Link>
            <Link to="/#ueber-uns">Über uns</Link>
            <Link to="/#kontakt">Kontakt</Link>
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Karriere</p>
            <Link to="/karriere">Überblick</Link>
            {karriereLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-legal">
          <span>
            Fiktive Website aus einem Hochschulprojekt. Unternehmen, Personen
            und Kennzahlen sind erfunden.
          </span>
          <nav className="footer-legal__links" aria-label="Rechtliches">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
            <button type="button" className="footer-legal__button" onClick={oeffneEinstellungen}>
              Cookie-Einstellungen
            </button>
            <span>© 2026 {site.brand} GmbH</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
