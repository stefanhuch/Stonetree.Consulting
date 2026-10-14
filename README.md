# stonetree: Unternehmenswebsite (Hochschulprojekt)

Website des **fiktiven** Beratungsunternehmens stonetree mit den Bereichen
Consulting, KI-Automatisierung und Research Lab, ausgerichtet auf den
Mittelstand. Unternehmen, Personen, Kennzahlen und Kundenprojekte sind
erfunden. Das Impressum nutzt Musterdaten und weist darauf hin.

**Live:** https://ahuemmer3.github.io/Stonetree.Consulting/ (GitHub Pages)

## Aufbau

| Ordner | Inhalt |
| --- | --- |
| `frontend/` | React 18, TypeScript (strict), Vite 6, Tailwind CSS 4 |
| `backend/` | FastAPI, nimmt das Kontaktformular an und verschickt es per SMTP |
| `deploy/` | Caddy-Konfiguration (Docker) und `.htaccess` (Apache-Webhosting) |
| `.github/workflows/` | automatische Veröffentlichung auf GitHub Pages |
| `docs/` | Projektdokumentation, Hosting-Anleitung, Screenshots |

Inhalte stehen in `frontend/src/data/`, Logik in `frontend/src/features/`,
Darstellung in `frontend/src/components/`. Texte lassen sich ändern, ohne
Komponenten anzufassen.

## Lokal starten

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Das Kontaktformular braucht zusätzlich das Backend (Anleitung in
`docs/hosting.md`, Abschnitt „Lokal testen").

## Prüfen

```bash
cd frontend
npm run build        # Typprüfung und Build
npx oxlint src       # Linter
cd ../backend
pytest               # Backend-Tests
```

## Veröffentlichen

Drei Wege, beschrieben in [docs/hosting.md](docs/hosting.md):

- **GitHub Pages**: statisch, automatisch bei jedem Push, Formular öffnet das E-Mail-Programm
- **IONOS**: Domain auf GitHub Pages zeigen lassen oder Webspace per SFTP befüllen
- **Eigener Server**: Docker Compose mit Caddy und Backend, voller Funktionsumfang

## Dokumentation

| Dokument | Inhalt |
| --- | --- |
| [docs/Projektdokumentation-stonetree.pdf](docs/Projektdokumentation-stonetree.pdf) | wissenschaftliche Projektdokumentation |
| [docs/dokumentation/](docs/dokumentation/) | Quelltext der Dokumentation, erzeugt mit `python docs/dokumentation/build_docx.py` |
| [UMSETZUNG.md](UMSETZUNG.md) | fortlaufendes Änderungsprotokoll |
| [Arbeitsplan.md](Arbeitsplan.md) | ursprünglicher Zeitplan |
| [frontend/README.md](frontend/README.md) | Bilder, Hero-Video, Gestaltungsregeln |

## Datenschutz

- Keine Anfragen an Dritte beim Laden: Schrift, Bilder und Videos kommen vom
  eigenen Server.
- Einwilligungsbanner (`frontend/src/features/consent/`): Statistik lädt erst
  nach Zustimmung, Widerruf über „Cookie-Einstellungen“ in der Fußzeile.
  Statistikdienst einschalten: `docs/hosting.md`, Abschnitt „Statistik
  einschalten“.
- Impressum und Datenschutzerklärung sind Muster für die fiktive Website.

## Medien

Fotos und Videos stammen von Unsplash und Pexels, Nachweis in
`frontend/public/images/BILDNACHWEIS.txt`.

## Projekt

| | |
| --- | --- |
| Autor | Aaron Huemmer, wissenschaftliche Hilfskraft, Wirtschaftsinformatik |
| Betreuung | Prof. Dr. Stefan Huch, Hochschule Hof |
| GitLab (Hochschule) | https://gitlab.hof-university.de/ahuemmer/h2h-consulting |
| GitHub (Veröffentlichung) | https://github.com/ahuemmer3/Stonetree.Consulting |
