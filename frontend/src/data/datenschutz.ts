// Inhalt der Datenschutzerklärung (/datenschutz).
//
// Muster für die fiktive Website. Die Abschnitte beschreiben, was die Seite
// tatsächlich tut: Hosting auf GitHub Pages, Schrift und Medien vom eigenen
// Server, Speicherung im Browser, Statistik nur nach Einwilligung. Für eine
// echte Firma vor der Veröffentlichung rechtlich prüfen lassen.

import type { StatistikDienst } from "./einwilligung"

export interface DatenschutzAbschnitt {
  titel: string
  absaetze: string[]
}

export const datenschutzStand = "Oktober 2026"

export const datenschutzHinweis =
  "Diese Datenschutzerklärung gehört zu einer fiktiven Website aus einem Hochschulprojekt. Sie ist ein Muster und nennt als Verantwortlichen die Musterdaten aus dem Impressum. Die technischen Angaben entsprechen dem tatsächlichen Betrieb der Seite."

interface Umstaende {
  // true: Kontaktformular öffnet das E-Mail-Programm (kein eigener Server)
  kontaktPerMailprogramm: boolean
  statistikDienst: StatistikDienst | null
}

// Einige Abschnitte hängen davon ab, wie die Seite betrieben wird. Deshalb
// eine Funktion statt einer festen Liste.
export function datenschutzAbschnitte({
  kontaktPerMailprogramm,
  statistikDienst,
}: Umstaende): DatenschutzAbschnitt[] {
  return [
    {
      titel: "1. Verantwortlicher",
      absaetze: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte stonetree GmbH, vertreten durch Max Mustermann. Die Kontaktdaten stehen im Impressum.",
      ],
    },
    {
      titel: "2. Hosting",
      absaetze: [
        "Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Adresse und Browserkennung, um die Seite auszuliefern und vor Angriffen zu schützen.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO). Einzelheiten stehen in der Datenschutzerklärung von GitHub.",
      ],
    },
    {
      titel: "3. Schriften, Bilder und Videos",
      absaetze: [
        "Schriftarten, Bilder, Videos und Dokumente werden vom selben Server ausgeliefert wie die Website. Es wird keine Verbindung zu Schriftdiensten wie Google Fonts oder zu anderen Drittanbietern aufgebaut.",
      ],
    },
    {
      titel: "4. Speicherung im Browser",
      absaetze: [
        "Wir speichern Ihre Entscheidung im Einwilligungsbanner im lokalen Speicher Ihres Browsers (localStorage), damit das Banner nicht bei jedem Aufruf erscheint. Gespeichert werden die Auswahl und der Zeitpunkt, bis Sie die Browserdaten löschen. Eine gewählte Ansichtsvariante wird nur für die laufende Sitzung gespeichert (sessionStorage).",
        "Diese Speicherungen sind für den von Ihnen gewünschten Betrieb der Seite unbedingt erforderlich und deshalb ohne Einwilligung zulässig (§ 25 Abs. 2 Nr. 2 TDDDG). Es werden dabei keine Daten an uns oder Dritte übermittelt.",
      ],
    },
    {
      titel: "5. Statistik",
      absaetze: statistikDienst
        ? [
            `Mit Ihrer Einwilligung nutzen wir ${statistikDienst.name} von ${statistikDienst.anbieter}, um zu erfahren, welche Seiten wie oft aufgerufen werden. Der Dienst wird erst geladen, wenn Sie im Banner zustimmen.`,
            `Rechtsgrundlage ist Ihre Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Sie können sie jederzeit über „Cookie-Einstellungen“ in der Fußzeile widerrufen. Weitere Informationen: ${statistikDienst.datenschutzUrl}`,
          ]
        : [
            "Derzeit ist kein Statistikdienst eingebunden. Sollte künftig eine Statistik genutzt werden, geschieht das nur mit Ihrer Einwilligung über das Banner, und dieser Abschnitt wird um den Dienst ergänzt.",
          ],
    },
    {
      titel: "6. Kontakt",
      absaetze: kontaktPerMailprogramm
        ? [
            "Das Kontaktformular sendet keine Daten über diese Website. Es öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht, die Sie selbst abschicken. Wenn Sie uns schreiben, verarbeiten wir Ihre Angaben, um die Anfrage zu beantworten (Art. 6 Abs. 1 lit. b oder f DSGVO), und löschen sie, sobald sie erledigt ist und keine Aufbewahrungspflicht besteht.",
          ]
        : [
            "Das Kontaktformular übermittelt Name, E-Mail-Adresse und Nachricht an unseren Server, der sie per E-Mail an uns weiterleitet. Wir verarbeiten die Angaben, um die Anfrage zu beantworten (Art. 6 Abs. 1 lit. b oder f DSGVO), und löschen sie, sobald sie erledigt ist und keine Aufbewahrungspflicht besteht.",
          ],
    },
    {
      titel: "7. Ihre Rechte",
      absaetze: [
        "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3).",
        "Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa beim Bayerischen Landesamt für Datenschutzaufsicht (Art. 77 DSGVO).",
      ],
    },
  ]
}
