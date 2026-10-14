// Texte und Einstellungen für die Einwilligung (Cookie-Banner).
//
// Rechtlicher Rahmen: Was im Browser gespeichert oder ausgelesen wird und
// nicht unbedingt nötig ist, braucht eine Einwilligung (§ 25 TDDDG). Für die
// Verarbeitung personenbezogener Daten gilt Art. 6 Abs. 1 lit. a DSGVO.
// Ablehnen muss so einfach sein wie Zustimmen, nichts ist vorausgewählt, und
// die Wahl lässt sich jederzeit über die Fußzeile ändern.

// Ein Statistikdienst, der erst nach Einwilligung geladen wird. Gedacht für
// Dienste, die sich mit einem einzigen Skript einbinden lassen (z. B. Matomo
// Cloud, Plausible, Umami). Die Seitenwechsel einer React-Seite erkennen diese
// Dienste selbst.
export interface StatistikDienst {
  name: string
  anbieter: string
  skript: string
  // zusätzliche Attribute am Skript, z. B. die ID der Website
  attribute: Record<string, string>
  datenschutzUrl: string
}

// Noch kein Dienst eingerichtet: Die Kategorie Statistik steht im Banner,
// geladen wird aber nichts. Zum Aktivieren hier eintragen, Beispiel:
//
// export const statistikDienst: StatistikDienst | null = {
//   name: "Umami",
//   anbieter: "Umami Software, Inc.",
//   skript: "https://cloud.umami.is/script.js",
//   attribute: { "data-website-id": "<ID aus dem Umami-Konto>" },
//   datenschutzUrl: "https://umami.is/privacy",
// }
//
// Danach die Version unten erhöhen, damit alle Besucher neu gefragt werden,
// und den Dienst in der Datenschutzerklärung (src/data/datenschutz.ts) nennen.
export const statistikDienst: StatistikDienst | null = null

// Bei jeder inhaltlichen Änderung an Kategorien oder Diensten erhöhen.
// Gespeicherte Entscheidungen mit älterer Version gelten dann nicht mehr.
export const EINWILLIGUNG_VERSION = 1

export interface Kategorie {
  id: "notwendig" | "statistik"
  titel: string
  text: string
  // notwendige Speicherungen lassen sich nicht abwählen
  pflicht: boolean
}

export const kategorien: Kategorie[] = [
  {
    id: "notwendig",
    titel: "Notwendig",
    text: "Speichert Ihre Auswahl in diesem Banner und Ihre Ansichtseinstellungen. Ohne diese Angaben funktioniert die Seite nicht wie erwartet. Es werden keine Daten an Dritte übermittelt.",
    pflicht: true,
  },
  {
    id: "statistik",
    titel: "Statistik",
    text: "Hilft uns zu verstehen, welche Seiten besucht werden, damit wir Inhalte verbessern können. Die Auswertung erfolgt zusammengefasst und ohne Werbezwecke.",
    pflicht: false,
  },
]

export const bannerText = {
  titel: "Datenschutz-Einstellungen",
  text: "Wir verwenden notwendige Speicherungen, damit diese Website funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich eine Statistik, um die Seite zu verbessern. Sie können Ihre Wahl jederzeit über „Cookie-Einstellungen“ in der Fußzeile ändern.",
}
