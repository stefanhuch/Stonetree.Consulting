import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { bannerText, kategorien } from "../../data/einwilligung"
import { useConsent } from "./consentContext"

// Einwilligungsbanner am unteren Rand. Die Seite bleibt dahinter bedienbar,
// Impressum und Datenschutz sind also immer erreichbar (keine Cookie-Wall).
// "Alle akzeptieren" und "Nur notwendige" sind gleich gestaltet, damit
// Ablehnen genauso einfach ist wie Zustimmen.
export default function CookieBanner() {
  const { statistik, bannerOffen, speichern } = useConsent()
  const ersteEntscheidung = statistik === null
  // Beim ersten Besuch die kurze Ansicht, aus der Fußzeile direkt die Details
  const [details, setDetails] = useState(!ersteEntscheidung)
  const [auswahl, setAuswahl] = useState(statistik ?? false)
  const kopf = useRef<HTMLHeadingElement>(null)

  // Beim Öffnen aus der Fußzeile den Fokus ins Banner setzen, damit man mit
  // der Tastatur nicht erst die ganze Seite durchlaufen muss.
  useEffect(() => {
    if (bannerOffen && !ersteEntscheidung) {
      setDetails(true)
      setAuswahl(statistik ?? false)
      kopf.current?.focus()
    }
  }, [bannerOffen, ersteEntscheidung, statistik])

  if (!bannerOffen) return null

  return (
    <section className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-titel">
      <div className="wrap consent__inner">
        <h2 className="consent__titel" id="consent-titel" tabIndex={-1} ref={kopf}>
          {bannerText.titel}
        </h2>
        <p className="consent__text">
          {bannerText.text} Mehr dazu in der{" "}
          <Link to="/datenschutz">Datenschutzerklärung</Link>.
        </p>

        {details && (
          <fieldset className="consent__kategorien">
            <legend className="sr-only">Kategorien</legend>
            {kategorien.map((kategorie) => (
              <label className="consent__kategorie" key={kategorie.id}>
                <input
                  type="checkbox"
                  checked={kategorie.pflicht || auswahl}
                  disabled={kategorie.pflicht}
                  onChange={(event) => setAuswahl(event.target.checked)}
                />
                <span>
                  <strong>
                    {kategorie.titel}
                    {kategorie.pflicht && " (immer aktiv)"}
                  </strong>
                  <span className="consent__beschreibung">{kategorie.text}</span>
                </span>
              </label>
            ))}
          </fieldset>
        )}

        <div className="consent__aktionen">
          <button type="button" className="btn btn--primary" onClick={() => speichern(true)}>
            Alle akzeptieren
          </button>
          <button type="button" className="btn btn--primary" onClick={() => speichern(false)}>
            Nur notwendige
          </button>
          {details ? (
            <button type="button" className="btn btn--secondary" onClick={() => speichern(auswahl)}>
              Auswahl speichern
            </button>
          ) : (
            <button type="button" className="consent__mehr" onClick={() => setDetails(true)}>
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
