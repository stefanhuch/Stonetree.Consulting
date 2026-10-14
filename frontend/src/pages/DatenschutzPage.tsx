import PageHero from "../components/ui/PageHero"
import Section from "../components/ui/Section"
import {
  datenschutzAbschnitte,
  datenschutzHinweis,
  datenschutzStand,
} from "../data/datenschutz"
import { statistikDienst } from "../data/einwilligung"
import { useConsent } from "../features/consent/consentContext"
import { kontaktPerMailprogramm } from "../features/contact/useContactForm"
import { usePageMeta } from "../hooks/usePageMeta"

// Datenschutzerklärung (Muster). Aufbau wie das Impressum: Hinweis auf die
// fiktive Website zuerst, danach die Abschnitte aus src/data/datenschutz.ts.
export default function DatenschutzPage() {
  usePageMeta("Datenschutz · stonetree")
  const { oeffneEinstellungen } = useConsent()
  const abschnitte = datenschutzAbschnitte({ kontaktPerMailprogramm, statistikDienst })

  return (
    <>
      <PageHero
        kicker="Rechtliches"
        title="Datenschutzerklärung"
        back={{ to: "/", label: "Zur Startseite" }}
      />

      <Section>
        <aside className="impressum-notice" aria-labelledby="ds-hinweis">
          <h2 id="ds-hinweis" className="impressum-notice__title">
            Hinweis: Muster für eine fiktive Website
          </h2>
          <p>{datenschutzHinweis}</p>
        </aside>

        <div className="legal-text">
          {abschnitte.map((abschnitt) => (
            <section key={abschnitt.titel}>
              <h2>{abschnitt.titel}</h2>
              {abschnitt.absaetze.map((absatz) => (
                <p key={absatz}>{absatz}</p>
              ))}
            </section>
          ))}
        </div>

        <button type="button" className="btn btn--secondary legal-text__aktion" onClick={oeffneEinstellungen}>
          Cookie-Einstellungen ändern
        </button>
        <p className="note">Stand: {datenschutzStand}</p>
      </Section>
    </>
  )
}
