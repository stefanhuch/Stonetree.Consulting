# Umsetzung der Überarbeitung

Diese Datei dokumentiert, wie die Website von stonetree überarbeitet wurde. Sie
wird während der Arbeit fortlaufend gepflegt und dient als Grundlage für eine
spätere Projektdokumentation. Sprache bewusst schlicht, ohne Gedankenstriche.

## 1. Ausgangslage

Bestehender Prototyp im Ordner `frontend/`: React 18 mit Vite und Tailwind v4,
Routing über `react-router-dom`. Startseite mit den Abschnitten Hero, Expertise,
Publikationen, Über uns, Kontakt sowie Detailseiten je Bereich unter
`/bereiche/<slug>`. Inhalte lagen bereits zentral in `src/data/` (JavaScript).
Optik: monochrom in Grautönen. Marke: stonetree, mit Bonsai-auf-Fels-Logo.

## 2. Ziel der Überarbeitung

stonetree ist kein klassisches Consulting. Das Unternehmen betreibt eigene
angewandte Forschung und bringt die Ergebnisse direkt in Kundenprojekte, vor
allem im Mittelstand. Begleitet wird von der Strategie bis zur laufenden Lösung.
Dazu kommen eine Farbwelt aus dem Logo, eine begriffliche Vereinheitlichung und
neue Abschnitte (Leistungen, Kundenprojekte).

## 3. Änderungen im Detail

### Block 0: Farbwelt aus dem Logo
Was: Palette aus dem Logo gezogen und alle Sektionen umgefärbt. Layout,
Typografie, Abstände und Animationen unverändert.
Warum: Der Auftraggeber wünscht die Gestaltung passend zum Logo.
Dateien: `src/styles/index.css`, `src/components/layout/Header.tsx`,
`src/pages/PillarPage.tsx`.

Farben (als `@theme`-Tokens):

| Rolle | Wert |
| --- | --- |
| Creme (Grund, heller Header, helle Sektionen) | `#f7efe5` |
| Oliv-Anthrazit (dunkle Sektionen) | `#2b2920` |
| Footer (dunkelste Fläche) | `#201e17` |
| Oliv-Grün (Akzent) | `#4f5c37` |
| Taupe (gedämpfter Text) | `#797261` |

Der Header ist jetzt hell mit dem farbigen Emblem. Dunkle Sektionen tragen
Creme-Text statt reinweiß.

### Block 0b: TypeScript-Migration
Was: Projekt von JavaScript auf TypeScript umgestellt. `tsconfig.json` mit
`strict`, alle Quelldateien `.jsx` zu `.tsx` und `.js` zu `.ts`, Import-Endungen
entfernt, `index.html` zeigt auf `main.tsx`. Datenmodelle und Komponenten-Props
typisiert. Skript `typecheck` ergänzt, `build` prüft erst Typen.
Warum: Wunsch nach typisierten Datenmodellen und wartbarem Code.
Ergebnis: `tsc --noEmit` und Build fehlerfrei.

### Block 1: Positionierung und Begriffe
Was: Neue Positionierung in Hero, Über uns, Tagline und Meta. Begriffe
vereinheitlicht, Slugs geändert, alte Pfade leiten weiter.
Warum: Siehe Ziel der Überarbeitung.
Dateien: `src/components/sections/Hero.tsx`, `src/data/about.ts`,
`src/data/site.ts`, `src/data/pillars.ts`, `src/components/sections/Contact.tsx`,
`src/components/sections/About.tsx`, `src/App.tsx`, `index.html`,
`src/pages/PillarPage.tsx`.

Begriffe vorher und nachher:

| vorher | nachher |
| --- | --- |
| Beratung (Bereich) | Consulting |
| AI Automation | KI-Automatisierung |
| Forschung (Tag/Eyebrow) | Research |
| unabhängiges Beratungshaus | mehr als reines Consulting (umformuliert) |
| `/bereiche/beratung` | `/bereiche/consulting` (alt leitet weiter) |
| `/bereiche/ai-automation` | `/bereiche/ki-automatisierung` (alt leitet weiter) |

Texte vorher und nachher (Auswahl):

| Stelle | vorher | nachher |
| --- | --- | --- |
| Hero H1 | Klare Strategien. Intelligente Prozesse. Echte Forschung. | Aus eigener Forschung. In die Praxis gebracht. Bis zur laufenden Lösung. |
| Hero Eyebrow | Beratung, KI-Automatisierung & Forschung | Consulting, KI-Automatisierung & Research |
| Tagline | Beratung für den Mittelstand ... | Eigene Forschung, im Mittelstand umgesetzt. Von der Strategie bis zur laufenden Lösung. |
| Über uns, Absatz 1 | stonetree ist ein unabhängiges Beratungshaus ... | stonetree ist mehr als reines Consulting ... |
| Über uns, Absatz 3 | Was uns von klassischer Beratung unterscheidet ... | Unser Alleinstellungsmerkmal ist das eigene Research Lab ... |

### Block 2: Neue Sektionen Branchen, Leistungen, Kundenprojekte
Was: Drei neue Abschnitte auf der Startseite, direkt nach Expertise. Branchen
(Automotive, Banking & Finance, Public Sector, Branchenübergreifend) im gleichen
Kartenraster. Leistungen mit sechs nummerierten Bausteinen von Strategie bis
Umsetzung. Kundenprojekte mit drei anonymisierten Fällen. Navigation um Branchen
erweitert, Footer um Branchen und Kundenprojekte.
Warum: Die Seite soll nach Branchen denken und konkrete Leistungen sowie
Beispiele zeigen, statt abstrakt zu bleiben.
Dateien: `src/data/branchen.ts`, `src/data/leistungen.ts`,
`src/data/kundenprojekte.ts`, drei neue Komponenten unter
`src/components/sections/`, `src/pages/HomePage.tsx`, `src/data/navigation.ts`,
`src/components/layout/Footer.tsx`, `src/styles/index.css`. Bilder unter
`public/images/branche-*.jpg`.
Hinweis: Eigene Unterseiten je Branche wurden bewusst nicht gebaut, um keinen
neuen Sonderfall in der Seitenvorlage zu schaffen (der Brief lässt das offen).
Die Kennzahlen der Fälle sind fiktiv, ein Hinweis steht unter der Sektion.

### Block 3: Research Lab und Publikationen
Was: Publikationen im Research Lab gebündelt. Die Detailseite
`/bereiche/research-lab` zeigt jetzt die vollständige Liste aller Beiträge. Die
Startseite zeigt nur noch die drei neuesten als Teaser mit Link ins Research Lab.
Datenmodell erweitert: Beitragstyp (PAPER, RESEARCH NOTE, PRAXISBERICHT,
WHITEPAPER), Themen und optionales pdfUrl. Ist ein pdfUrl gesetzt, wird aus dem
Badge "PDF folgt" ein Download-Link. Sechs Beiträge angelegt, davon zwei Paper,
Schwerpunkt KI-Automatisierung.
Warum: Publikationen gehören inhaltlich zum Research Lab und sollen dort
gebündelt sein.
Dateien: `src/data/publications.ts`, `src/components/sections/Publications.tsx`
(Teaser), `src/components/sections/PublicationList.tsx` (vollständige Liste),
`src/pages/PillarPage.tsx`, `src/styles/index.css`.
Entscheidung: Der Nav-Punkt Publikationen bleibt ein Startseiten-Anker
(`#publikationen`), passend zu den übrigen Nav-Punkten. Von dort führt der
Teaser-Link in die vollständige Liste im Research Lab. Das ist mit dem
bestehenden Anker-Routing sauberer als ein Deep-Link in der Navigation.

### Block 4: Aktuelle Themen (Stand 2026)
Was: Kurze Recherche zu Digitalisierung und KI-Automatisierung im Mittelstand
2026, Ergebnisse in ganzen Sätzen eingearbeitet. Auf der KI-Automatisierung
Bereichsseite: welche Abläufe sich eignen (hohe Wiederholung, klare Regeln,
digitale Datenbasis), der Schritt vom Prototyp zum verlässlichen Betrieb und
Nachvollziehbarkeit nach dem EU AI Act (gilt ab August 2026, besonders bei
eigenständig handelnden Systemen). In den Publikationen als Thema EU AI Act
ergänzt.
Warum: Die Inhalte sollen aktuell wirken und reale Anforderungen aufgreifen.
Dateien: `src/data/pillars.ts`, `src/data/publications.ts`.

### Block 5: Footer, Impressum, Links
Was: Impressum-Firmierung auf stonetree GmbH gesetzt, alle offenen Felder klar
als Platzhalter gekennzeichnet (noch offen). Footer-Fußzeile aktualisiert
(Copyright stonetree GmbH, Hinweis auf Platzhalter). Footer-Spalten geprüft:
Expertise listet die Bereiche datengetrieben, Unternehmen enthält Branchen,
Kundenprojekte, Publikationen, Über uns, Kontakt, Impressum. Alle internen Links
und Anker gegengecheckt, keine toten Links.
Warum: Konsistenz und ein rechtlicher Rahmen als klar erkennbarer Platzhalter.
Dateien: `src/data/site.ts`, `src/components/layout/Footer.tsx`.

### Block 6: Sprachdurchgang
Was: Alle sichtbaren Texte auf schlichte Sprache geprüft und die restlichen
Gedankenstriche entfernt (Kontakt-Text, zwei Arbeitsweise-Punkte, Trenner in der
Mailto-Nachricht). Verbotene Phrasen wie ganzheitlich, maßgeschneidert, auf
Augenhöhe oder an der Schnittstelle von kommen nicht vor. Gedankenstriche in
Code- und CSS-Kommentaren blieben, da nicht sichtbar.
Warum: Der Text soll schlicht und konkret klingen, nicht generiert.
Dateien: `src/components/sections/Contact.tsx`, `src/data/approach.ts`,
`src/features/contact/useContactForm.ts`.

### Block 7: Technischer Durchgang
Was: Seitentitel und Meta-Beschreibung je Route gesetzt (neuer Hook
usePageMeta, ohne zusätzliche Bibliothek). Sichtbarer Fokus-Zustand für Links
und Buttons ergänzt, passt sich hell und dunkel an. Überschriftenhierarchie
geprüft: genau ein h1 je Seite, Sektionen nutzen h2, Karten h3. Die neuen Grids
brechen bei 980 und 860 Pixeln auf weniger Spalten um. Typprüfung und Build
laufen fehlerfrei, keine neuen Laufzeit-Abhängigkeiten.
Warum: Barrierefreiheit, Auffindbarkeit und saubere Struktur.
Dateien: `src/hooks/usePageMeta.ts`, `src/pages/HomePage.tsx`,
`src/pages/PillarPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/styles/index.css`.

### Nacharbeit: Bilder, Branchen-Unterseiten, Beispiel-PDFs
Was: Research-Lab-Bild auf ein Bibliotheks-Motiv geändert (geisteswissenschaftlich
statt Labor), KI-Automatisierung auf einen Software-Arbeitsplatz. Branche
Banking & Finance in Financial Services umbenannt, Branchenübergreifend entfernt,
sodass drei Branchen in einer Reihe stehen. Jede Branche hat jetzt eine eigene
Unterseite unter /branchen/<slug> mit Fließtext und Dreispalter. Dafür eine
gemeinsame Vorlage DetailPage angelegt, die Bereichs- und Branchenseiten nutzen.
Zwei Beispiel-PDFs für die Paper erzeugt und als pdfUrl hinterlegt, dadurch wird
aus dem Badge ein Download-Link.
Warum: Wünsche des Auftraggebers.
Dateien: `src/data/branchen.ts`, `src/data/publications.ts`,
`src/components/detail/DetailPage.tsx`, `src/pages/BranchePage.tsx`,
`src/pages/PillarPage.tsx`, `src/components/sections/Branchen.tsx`, `src/App.tsx`,
`public/pdf/*.pdf`, geänderte Bilder unter `public/images/`.

### Nacharbeit: Research-Bild und Typische Aufgaben
Was: Research-Lab-Bild erneut getauscht, jetzt eine Arbeitssituation mit Notizen
und Diskussion (weder Labor noch Bibliothek). Auf den drei Bereichs-Detailseiten
einen Abschnitt Typische Aufgaben ergänzt, je sechs konkrete Beispiele, was wir
dort tun. Umgesetzt über ein optionales Feld tasks im Detail-Datenmodell, das die
Vorlage DetailPage rendert (Branchenseiten nutzen es nicht).
Dateien: `src/data/pillars.ts`, `src/components/detail/DetailPage.tsx`,
`src/pages/PillarPage.tsx`, `src/styles/index.css`,
`public/images/expertise-research.jpg`.

### Nacharbeit: Branchen entfernt, Bereichsseiten ausgebaut
Was: Der komplette Branchen-Bereich ist raus, also die Sektion auf der
Startseite, die drei Unterseiten unter /branchen/, die Daten, die Bilder und die
Links in Navigation und Footer. Alte Branchen-Adressen leiten auf die Startseite.
Dafür sind die drei Bereichsseiten deutlich voller: je Bereich kommen
Ausgangslage (vier typische Situationen), Leistungsbausteine (sechs Stück, jeder
mit dem Ergebnis, das beim Auftraggeber bleibt), Vorgehen (vier Schritte mit
Dauer), Einstiegsformate (drei Formate mit Umfang) und häufige Fragen (fünf)
hinzu. Die Abschnitte stehen als Daten in `pillars.ts` und werden von kleinen
Komponenten unter `components/detail/` gerendert.
Warum: Der Auftraggeber wollte die Branchen weg und die Bereichsseiten gefüllt.
Recherche: Aufbau geprüft bei Roland Berger (Servicesseiten mit Cluster je
Leistung), CodeCamp:N (zwei Phasen Kompass und Projekt) und mehreren deutschen
KI-Beratungen (Einstiegsformate, Vorgehen in drei bis vier Schritten, FAQ).
Übernommen wurden Leistungscluster, Vorgehen mit Dauer, Einstiegsformate und
FAQ. Bewusst nicht übernommen: Preistabellen, Selbsttests, Newsletter-Kästen und
Kundenstimmen, weil das zur nüchternen Anmutung nicht passt und die Zahlen im
Prototyp ohnehin Platzhalter wären.
Hinweis: Häufige Fragen laufen über das native details-Element, also ohne
zusätzliches JavaScript und mit Tastaturbedienung.
Dateien: `src/data/pillars.ts`, `src/components/detail/SectionHead.tsx`,
`Situations.tsx`, `Offerings.tsx`, `Tasks.tsx`, `Phases.tsx`, `Formats.tsx`,
`Faq.tsx`, `DetailPage.tsx`, `src/pages/PillarPage.tsx`, `src/App.tsx`,
`src/pages/HomePage.tsx`, `src/data/navigation.ts`,
`src/components/layout/Footer.tsx`, `src/styles/index.css`. Entfernt:
`src/data/branchen.ts`, `src/components/sections/Branchen.tsx`,
`src/pages/BranchePage.tsx`, `public/images/branche-*.jpg`.

### Nacharbeit: Abstimmung vom Meeting (Farben, Inhalte, Karussell, Video, Mailversand, Hosting)
Was:
- Farbwelt neutral: Weiß, helle und dunkle Grautöne, dunkles Grau als Akzent.
  Creme und Oliv sind raus (Tokens und fest eingetragene Werte).
- Die drei Bereichskarten sind abgestuft grau: hell, mittel, dunkel.
- Leistungen jetzt: Strategie und Management, KI-Automatisierung, Target
  Operating Model, Umsetzungsfahrplan, Umsetzungsbegleitung, Nachhaltigkeit.
- Kundenprojekte: Automotive raus. Neu ein Energieversorger
  (KI-Automatisierung), die Regionalbank als Digital Maturity und Impact
  Assessment, die kommunale Verwaltung als IT-Automatisierung und
  Organisationsdesign. Alle drei mit Laufzeit „bis 6 Monate", ohne Kennzahlen.
- Publikationen auf der Startseite laufen als Bild-Karussell durch (alle sechs
  Beiträge, Pfeile und Positionspunkte, Pause bei Hover und Fokus, kein
  automatischer Lauf bei „Animationen reduzieren").
- Hero mit stummem Hintergrundvideo in Dauerschleife, Foto als Vorschau und
  Rückfall. Pause-Knopf, kein Video bei „Animationen reduzieren" oder
  Datensparmodus.
- Kontaktformular verschickt jetzt über ein eigenes FastAPI-Backend per SMTP,
  mit Honeypot, Rate-Limit je IP, Lade- und Fehlerzustand. Der Anbieter ist
  frei wählbar über die .env.
- Hosting vorbereitet: Docker Compose mit Caddy (HTTPS automatisch, liefert die
  Seite aus, leitet /api weiter) und dem Backend. Anleitung in `docs/hosting.md`.
Warum: Mitschriften aus der Abstimmung mit dem Auftraggeber.
Hinweise: Der Energieversorger ist anonymisiert, obwohl der Kundenname in den
Notizen steht. Ein echter Name gehört erst nach Freigabe auf die Seite. Die
Projekttexte sind Platzhalter. „TOP" aus den Notizen wurde als Target
Operating Model gelesen. Das Video ist ein Platzhalter von Mixkit (freie
Lizenz, siehe BILDNACHWEIS.txt).
Tests: Typprüfung und Build fehlerfrei, acht Backend-Tests grün, Backend lokal
mit echten HTTP-Anfragen geprüft. Die Docker-Images sind noch nicht gebaut,
weil Docker Desktop nicht lief.
Dateien: `src/styles/index.css`, `src/data/leistungen.ts`,
`src/data/kundenprojekte.ts`, `src/components/sections/Pillars.tsx`,
`Publications.tsx`, `Hero.tsx`, `Kundenprojekte.tsx`,
`src/features/carousel/useCarousel.ts`,
`src/features/hero-video/useBackgroundVideo.ts`,
`src/features/contact/useContactForm.ts`, `ContactForm.tsx`,
`src/components/detail/DetailPage.tsx`, `src/vite-env.d.ts`, `vite.config.js`,
`public/videos/hero.mp4`, `backend/`, `docker-compose.yml`, `deploy/Caddyfile`,
`frontend/Dockerfile`, `.env.example`, `.gitignore`, `docs/hosting.md`.
Entfernt: `docs/kontaktformular-backend.md` (umgesetzt, Inhalt steht jetzt in
`backend/` und `docs/hosting.md`).

### Nacharbeit: Hero mit Hintergrundvideo
Was: Der Hero zeigt statt eines Fotos stumme Clips, die nacheinander weich
ineinander überblenden. Darüber liegen wie bisher Abdunklung, Überschrift, Text
und Buttons. Die Seite funktioniert ohne Video vollständig, dann steht das
Standbild des ersten Clips.
Warum: Große Beratungsseiten arbeiten mit ruhigen Bewegtbildern im Kopfbereich.
Das Video soll zeigen, wo die Arbeit von stonetree ankommt: in Werken und Büros
des Mittelstands. Es ist Dekoration und trägt keine Information.

Aufbau:
- `src/data/heroClips.ts`: Liste der Clips (mp4, webm, Standbild groß und klein,
  Beschreibung). Die Reihenfolge ist die Abspielreihenfolge.
- `src/features/hero-video/videoPolicy.ts`: entscheidet, ob ein Video lädt.
- `src/features/hero-video/useHeroVideo.ts`: Abspielen, Überblenden, Pausieren.
- `src/features/hero-video/HeroMedia.tsx`: nur die Darstellung.
- `scripts/prepare-hero-video.sh`: bereitet Clips reproduzierbar mit ffmpeg auf.
- Dateien liegen in `public/media/` und gehen nicht durch den Bundler.

Clips:

| Datei | Motiv | Quelle | Lizenz |
| --- | --- | --- | --- |
| `hero.*` | Luftaufnahme einer Fabrikhalle, Ausschnitt 0,5 bis 16,5 s | [Pexels 30899654](https://www.pexels.com/video/aerial-view-of-large-industrial-factory-30899654/), Toàn BDS | [Pexels License](https://www.pexels.com/license/) |
| `hero-2.*` | Drohnenflug an einer Hochhausfassade, Ausschnitt 6 bis 22 s | [Pexels 4673651](https://www.pexels.com/video/drone-footage-of-building-4673651/), Tom Fisk | [Pexels License](https://www.pexels.com/license/) |

Beide Aufnahmen stammen nicht aus Deutschland. Für die Live-Seite sind eigene
Aufnahmen von Kunden oder Standorten besser.

ffmpeg-Einstellungen und Gründe:

| Einstellung | Grund |
| --- | --- |
| `scale=1920:-2`, `fps=25` | Mehr als Full HD bringt im Hintergrund nichts. |
| `-an` | Keine Tonspur. Sie kostet nur Bytes und blockiert auf manchen Geräten Autoplay. |
| H.264, `-crf 32` (Fabrik) und `30` (Fassade), `-preset slow` | Mit CRF 26 lagen die Dateien bei 11,5 und 8,7 MB. Unter der Abdunklung fällt die stärkere Kompression nicht auf. Ergebnis 4,7 und 5,1 MB. |
| `-movflags +faststart` | Der Index steht am Dateianfang, das Video startet vor dem kompletten Download. |
| VP9, `-crf 50 -b:v 0` | Mit CRF 34 war die webm größer als die mp4. Ergebnis 3,7 und 3,6 MB. |
| Standbild erstes Bild, `-q:v 16`, zusätzlich 960 Pixel breit | Das Standbild ist das LCP-Element. Mit `-q:v 3` hatte es 556 KB. Jetzt 207 KB groß und 57 KB klein. |
| Länge 16 s, ohne harten Schnitt | Die Überblendung startet 800 ms vor dem Ende des Clips. So bleibt kein Standbild am Clipende stehen. Ein einzelner Clip blendet in sich selbst über. |

Wann kein Video lädt:

| Fall | Grund |
| --- | --- |
| „Bewegung reduzieren" im System | Barrierefreiheit. |
| Fenster schmaler als 768 Pixel | Wenig Nutzen, kostet mobiles Datenvolumen. |
| Datensparmodus (`saveData`) | Wunsch der Nutzerin oder des Nutzers. |
| Verbindung `slow-2g`, `2g` oder `3g` | Das Video würde die Seite ausbremsen. |
| Autoplay verweigert oder Datei fehlerhaft | Das Standbild bleibt, das ist ein gültiger Endzustand. |

Die Prüfung läuft erst nach dem `load`-Ereignis. Der erste Render zeigt immer
das Standbild. Außerhalb des Sichtbereichs hält das Video an
(IntersectionObserver). Der nächste Clip lädt erst vier Sekunden vor dem
Wechsel vor.

Lesbarkeit: Die Abdunklung ist jetzt ein Verlauf von unten links (96 Prozent)
nach oben rechts (55 Prozent). Geprüft wurde rechnerisch mit einem Bild pro
Sekunde aus beiden Clips, bei 1024, 1440 und 1920 Pixeln Breite, jeweils am
hellsten Punkt unter jedem Textblock. Mit der alten Abdunklung erreichte die
graue dritte Zeile der Überschrift nur 3,75 zu 1. Jetzt liegt der schlechteste
Wert aller Textstellen bei 4,64 zu 1. Die Schriftfarben blieben unverändert.

Lighthouse (Leistung, lokaler Produktions-Build, `vite preview`):

| | vorher | nachher |
| --- | --- | --- |
| Mobil: Punkte | 71 | 83 |
| Mobil: LCP | 4,8 s | 4,1 s |
| Mobil: Total Blocking Time | 320 ms | 90 ms |
| Mobil: Datenmenge | 5.343 KiB | 551 KiB |
| Desktop: Punkte | 97 | 96 bis 97 |
| Desktop: LCP | 1,1 s | 1,2 s |
| Desktop: Total Blocking Time | 0 ms | 0 bis 50 ms |
| Desktop: Datenmenge | 4.608 KiB | 4.688 KiB |

Vorher lud das Video schon beim ersten Aufruf, auch auf dem Handy. Der Desktop-LCP
ist um 0,1 s gestiegen. Das liegt im Rahmen der Messschwankung, das Standbild
ist mit 207 KB aber noch etwas schwerer als das alte Foto mit 191 KB.

Geprüft im Browser (Chrome, Netzwerkliste aus Lighthouse): Desktop lädt das
Standbild und `hero.webm`. Mit „Bewegung reduzieren" lädt nur das Standbild. Bei
412 Pixeln Breite lädt nur das kleine Standbild. Keine Datei enthält eine
Tonspur (`ffmpeg -i` zeigt nur einen Videostream).

Abweichungen vom Auftrag:
- Der kleine Pause-Knopf bleibt. WCAG 2.2.2 verlangt für bewegte Inhalte über
  fünf Sekunden eine Möglichkeit zum Anhalten. Native Bedienelemente gibt es nicht.
- Die Überblendung startet kurz vor dem Ende statt bei `onEnded`.
- Die Clips stehen in `src/data/`, weil dort alle Inhalte des Projekts liegen.
- Die manuellen Tests mit Netzwerkdrosselung und Betriebssystem-Einstellung
  wurden über Lighthouse und Chrome-Schalter nachgestellt, nicht von Hand.

Dateien: `src/components/sections/Hero.tsx`, `src/data/heroClips.ts`,
`src/features/hero-video/*`, `src/styles/index.css`, `scripts/prepare-hero-video.sh`,
`public/media/*`, `README.md` (frontend), `public/images/BILDNACHWEIS.txt`.
Entfernt: `src/features/hero-video/useBackgroundVideo.ts`, `public/videos/`,
`public/images/hero.jpg`.

### Nacharbeit: Bereichsseiten konkret und überfliegbar (Oktober 2026)
Was: Die drei Bereichsseiten neu gefasst. Statt drei Absätzen, Dreispalter,
Ausgangslagen, Leistungsbausteinen und Aufgaben gibt es jetzt einen kurzen
Einleitungssatz mit drei Eckdaten, Leistungsfelder als Reiter mit kompakten
Karten (ein Satz, Schlagworte, Eckdaten) und drei Projektbeispiele mit Kennzahl.
Inhalte konkret: Consulting mit SAP-Beratung (S/4HANA, Clean Core),
Logistik-Templates mit SAP EWM und Rollout, Management und Organisation.
KI-Automatisierung mit zwölf Anwendungsfällen in vier Unternehmensbereichen.
Research Lab mit neun Vorhaben in KI-Entwicklung, SAP-Optimierung und Agenten,
jeweils mit Stand.
Warum: Rückmeldung, dass die Seiten zu viel Text hatten und das Angebot
abstrakt blieb.
Technik: Reiter nach dem WAI-ARIA-Tabs-Muster, Logik in
`src/features/tabs/useTabs.ts`, aktiver Reiter in der Adresse (`?feld=sap`).
Das Menü Expertise verlinkt jedes Leistungsfeld. Karten können Text jetzt
vollständig zeigen (`clampText`). Kennzahl in Karten als eigener Baustein
`CardMetric`. Bewerbungs-Vorauswahl bewusst nicht aufgenommen (Hochrisiko nach
EU AI Act).
Dateien: `src/data/pillars.ts`, `src/data/navigation.ts`,
`src/components/detail/Services.tsx`, `Cases.tsx`, `DetailPage.tsx`,
`src/components/ui/Card.tsx`, `CardMetric.tsx`, `NumberedSteps.tsx`,
`src/components/sections/Kundenprojekte.tsx`, `src/pages/PillarPage.tsx`,
`src/features/tabs/useTabs.ts`, `src/styles/ui.css`, `sections.css`.
Entfernt: `Situations.tsx`, `Offerings.tsx`, `Tasks.tsx` samt Stilen.
Tests: Typprüfung, Build und Linter fehlerfrei. Tastaturbedienung der Reiter
im Browser geprüft, mobile Ansicht bei 375 Pixeln ohne waagerechtes Scrollen.

### Nacharbeit: Mobile Ansicht (Oktober 2026)
Was: Drei Fehler unter 640 bzw. 980 Pixeln behoben, Desktop unverändert.
- Research-Lab-Karte auf der Startseite zeigte am Handy nur ein riesiges Bild
  ohne Text. Ursache: Die Regel für die waagerechte Einzelkarte (Tablet) war
  spezifischer als die Handy-Regel und galt deshalb auch am Handy. Sie gilt
  jetzt nur noch von 641 bis 980 Pixeln.
- Kopfzeile am Handy und Tablet: Logo und Knöpfe standen gedrängt in der
  Mitte, weil der innere Container in der Flex-Leiste auf seinen Inhalt
  schrumpfte. Unter 980 Pixeln füllt er jetzt die Breite (Logo links, Knöpfe
  rechts).
- Diagramm: Monatsnamen liefen bei 360 bis 375 Pixeln ineinander. Bei zu wenig
  Platz steht jetzt nur jeder zweite Monat, vom Ende gezählt, sodass der
  hervorgehobene Dezember immer beschriftet ist (`achsenTextSichtbar` in
  `features/chart/geometry.ts`).
Geprüft: alle Seiten bei 375 und 360 Pixeln mit Geräteemulation, kein Element
ragt über den Rand, Handymenü geöffnet. Desktop bei 1280 Pixeln pixelgleich
zur vorherigen Fassung (abgesehen von verzögert geladenen Bildern).
Dateien: `src/styles/ui.css`, `src/styles/layout.css`,
`src/features/chart/geometry.ts`, `src/components/charts/AufwandChart.tsx`.

### Nacharbeit: Bedienung am Handy (Oktober 2026)
Was:
- Handymenü nach dem Scrollen kaputt: Der Header bekam beim Scrollen ein
  `transform`. Ein transform macht das Element zum Bezugsrahmen für feste
  Kindelemente, das Vollbildmenü war dann nur so hoch wie der Header. Jetzt
  über `top` gelöst, sieht gleich aus. Das Menü beginnt außerdem genau unter
  der Leiste, auch in der kompakten Form nach dem Scrollen.
- Publikationskarussell: Wischgeste (eigener Hook `useSwipe`), nach Antippen
  kein automatischer Weiterlauf mehr, kein versehentlicher Klick nach dem
  Wischen, senkrechtes Scrollen bleibt möglich (`touch-action: pan-y`).
- Formularfelder am Handy mit 16 Pixeln Schrift, sonst vergrößert das iPhone
  die Seite beim Antippen.
- Tippflächen auf mindestens 24 Pixel vergrößert, ohne die Lage zu ändern
  (Logo, Zurück-Link im Seitenkopf, Punkte des Karussells, Impressum-Link,
  Tabellen-Aufklapper am Diagramm).
Geprüft mit Touch-Emulation bei 375 Pixeln: Menü oben und nach dem Scrollen
öffnen, Ausklappbereiche, im Menü scrollen, Link antippen; Karussell wischen
in beide Richtungen; kein waagerechtes Scrollen auf allen Seiten.
Dateien: `src/styles/layout.css`, `ui.css`, `sections.css`, `features.css`,
`src/components/sections/Publications.tsx`,
`src/features/carousel/useSwipe.ts`.

### Nacharbeit: Datenschutz und Einwilligung (Oktober 2026)
Was:
- Schrift Ubuntu aus dem eigenen Build (`@fontsource/ubuntu`, nur lateinische
  Zeichen, fünf Schnitte) statt von Google Fonts. Beim Laden geht keine
  Anfrage mehr an fremde Server (im Browser gemessen).
- Einwilligungsbanner als Feature `src/features/consent/`: Speicher
  (`speicher.ts`), Laden der Statistik (`statistik.ts`), gemeinsamer Zustand
  (`consentContext.ts`, `ConsentProvider.tsx`), Darstellung
  (`CookieBanner.tsx`). Texte und Dienst in `src/data/einwilligung.ts`.
- Regeln: Ablehnen gleich gestaltet wie Zustimmen, nichts vorausgewählt,
  Seite bleibt bedienbar, Widerruf über die Fußzeile (lädt neu). Das Banner
  liegt unter dem Handymenü, damit ein geöffnetes Menü ganz bedienbar bleibt.
- Datenschutzerklärung `/datenschutz` als Muster, Abschnitte passen sich an
  (Kontakt mit oder ohne Backend, Statistikdienst ja oder nein).
- Fußzeile: Impressum, Datenschutz, Cookie-Einstellungen.
Geprüft: Banner bei 375 und 1280 Pixeln, Entscheidung bleibt nach Neuladen,
Fußzeile öffnet die Einstellungen mit Fokus. Mit einem Platzhalterdienst:
keine Anfrage vor der Entscheidung und nach Ablehnen, genau eine nach
Zustimmen, keine nach Widerruf.
Offen: Statistikdienst auswählen und eintragen (Anleitung in `docs/hosting.md`).

## 4. Neue Struktur (Seitenbaum)

```
/                         Startseite
  #top                    Hero (Übersicht)
  #expertise              Expertise (Consulting, KI-Automatisierung, Research Lab)
  #leistungen             Leistungen
  #kundenprojekte         Kundenprojekte
  #publikationen          Publikationen
  #ueber-uns              Über uns
  #kontakt                Kontakt
/bereiche/consulting          Detailseite Consulting
/bereiche/ki-automatisierung  Detailseite KI-Automatisierung
/bereiche/research-lab        Detailseite Research Lab
/branchen/*                   leitet auf die Startseite (Branchen entfallen)
/bereiche/beratung            leitet auf /bereiche/consulting
/bereiche/ai-automation       leitet auf /bereiche/ki-automatisierung
*                         404
```

## 5. Datenmodelle

TypeScript-Interfaces in `src/data/`:

- `Pillar`, `PillarDetail` (pillars.ts): die drei Bereiche.
- `PillarBlock<T>` mit `PillarField`, `PillarService`, `PillarCase`, `PillarPhase`, `PillarFormat`, `PillarFaq` (pillars.ts): die Abschnitte der Bereichsseiten, jeweils mit eigener Überschrift.
- `Publication` und `PublicationType` (publications.ts): Publikationen, mit Typ, Themen und optionalem pdfUrl.
- `Leistung` (leistungen.ts): Leistungsbausteine.
- `Kundenprojekt` (kundenprojekte.ts): Fallbeispiele.
- `About`, `AboutFact` (about.ts): Über-uns-Inhalte.
- `ApproachItem` (approach.ts): die drei Arbeitsweise-Punkte.
- `NavLink` (navigation.ts): Navigationslinks.
- `Site`, `Impressum` (site.ts): Marke, Tagline, Kontakt, Impressum.
- `StatistikDienst`, `Kategorie` (einwilligung.ts), `DatenschutzAbschnitt` (datenschutz.ts): Einwilligung und Datenschutzerklärung.
- `Einwilligung` (features/consent/speicher.ts): gespeicherte Entscheidung mit Version und Zeitpunkt.
- `ContactValues`, `ContactStatus` (features/contact/useContactForm.ts): Formularfelder und Versandzustand.
- `ContactRequest` (backend/app/contact.py): Anfrage an `POST /api/contact`, geprüft mit Pydantic.

## 6. Entscheidungen und Abwägungen

- Farbwelt aus dem Logo statt monochrom. Der Auftraggeber hat das gewählt, es
  widersprach dem ersten Brief (dort hieß es, Farben bleiben unverändert).
  Nach der Abstimmung im September wieder zurück auf Weiß und Grau.
- TypeScript statt JavaScript. Höherer Aufwand, dafür typsichere Datenmodelle.
- Header hell statt dunkel, damit das farbige Emblem passt.
- Hero-Headline: Variante, die die eigene Forschung nach vorn stellt.
- Kontaktformular über ein eigenes FastAPI-Backend mit SMTP statt über einen
  Formulardienst. Passt zum geplanten Stack, die Daten laufen über keinen
  weiteren Dienst außer dem Mailanbieter.
- Frontend und Backend unter derselben Domain (Caddy leitet /api weiter),
  dadurch ist kein CORS nötig.

## 7. Offene Punkte

- Echte Impressumsdaten, Datenschutzerklärung (muss Kontaktformular und
  Mailanbieter nennen), weitere echte PDFs und finale Bilder und Video statt
  der Platzhalter.
- Server, Domain und SMTP-Zugang fehlen noch. Danach nach `docs/hosting.md`
  live schalten und die Docker-Images einmal bauen.
- Echte Inhalte der drei Kundenprojekte, Freigabe für den Kundennamen des
  Energieversorgers.
- Die Angaben auf den Bereichsseiten zu Dauer und Umfang der Formate sind
  Annahmen und sollten vom Auftraggeber bestätigt werden.
- `@types/react` liegt als v19 vor, React ist v18. Läuft, kann später
  angeglichen werden.

## 8. Abschluss-Checkliste

- [x] Kein "Beratungshaus" mehr auf der Seite
- [x] "Beratung" durchgängig zu "Consulting", sonst als normales Wort umformuliert
- [x] "AI Automation" durchgängig zu "KI-Automatisierung", inklusive Slug
- [x] Kein Gedankenstrich mehr in sichtbarem Text
- [x] Branchen komplett entfernt, alte Branchen-Adressen leiten weiter
- [x] Bereichsseiten konkret: Eckdaten, Leistungsfelder als Reiter, Projektbeispiele, Vorgehen, Einstieg, häufige Fragen
- [x] Sechs Leistungsbausteine in der Reihenfolge Strategie bis Umsetzung
- [x] Drei Kundenprojekte mit Ausgangslage, Vorgehen, Ergebnis (Energie, Bank, Kommune, je bis 6 Monate)
- [x] Farben neutral Weiß und Grau, Bereichskarten abgestuft
- [x] Publikationen als Karussell, Hero mit Hintergrundvideo
- [x] Kontaktformular verschickt über das Backend, Backend-Tests grün
- [~] Hosting vorbereitet, Docker-Images lokal noch nicht gebaut
- [x] Publikationen im Research Lab gebündelt, mindestens zwei Paper
- [x] Alle internen Links und Anker funktionieren
- [x] Alte Routen leiten weiter
- [x] Typprüfung und Build laufen fehlerfrei (kein separater ESLint eingerichtet)
- [~] Responsive bei 375, 768, 1280 und 1920: über Breakpoints gelöst, in dieser Umgebung nicht pixelgenau getestet
- [x] UMSETZUNG.md vollständig und aktuell
