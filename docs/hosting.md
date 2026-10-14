# Website live schalten

Es gibt drei Wege. Alle nutzen denselben Code, sie unterscheiden sich nur darin,
ob das Backend für das Kontaktformular mitläuft.

| Weg | Kontaktformular | Aufwand | Wofür |
| --- | --- | --- | --- |
| A. GitHub Pages | öffnet das E-Mail-Programm | gering, kostenlos | schnell erreichbare Fassung, Rückfallebene |
| B. IONOS (Domain des Profs) | je nach Paket, siehe unten | gering bis mittel | endgültige Adresse |
| C. Eigener Server mit Docker | Versand über das Backend | mittel | volle Funktion |

## A. GitHub Pages

GitHub Pages liefert nur statische Dateien aus. Das FastAPI-Backend läuft dort
nicht. Das Formular baut deshalb eine E-Mail und öffnet das E-Mail-Programm
der Besucherin. Der Workflow `.github/workflows/pages.yml` baut und
veröffentlicht die Seite bei jedem Push auf `main` automatisch.

Einmalig einrichten:

1. Auf github.com ein **öffentliches** Repository anlegen, z. B.
   `h2h-consulting` (ohne README, leer). Pages ist bei privaten Repositories
   nur mit bezahltem Konto möglich.
2. Im Repository unter **Settings > Pages > Build and deployment > Source**
   den Eintrag **GitHub Actions** wählen.
3. Lokal GitHub als zweites Ziel eintragen und hochladen. GitLab bleibt
   `origin`:

   ```bash
   git remote add github https://github.com/<benutzername>/h2h-consulting.git
   git push github main
   ```

4. Unter **Actions** läuft der Workflow „GitHub Pages" (rund zwei Minuten).
   Danach ist die Seite erreichbar unter
   `https://<benutzername>.github.io/<repository>/`.

Aktuell: Repository `github.com/ahuemmer3/Stonetree.Consulting`, Seite
`https://ahuemmer3.github.io/Stonetree.Consulting/` (Groß- und Kleinschreibung
beachten).

Meldet der Schritt `deploy-pages` „Failed to create deployment (status: 404)",
war Pages noch nicht auf GitHub Actions umgestellt (Schritt 2). Danach den Lauf
unter Actions mit „Re-run failed jobs" wiederholen.

Neue Version: `git push github main`. Wer beide Ziele mit einem Befehl
bedienen will, pusht nacheinander auf `origin` und `github`.

Hinweise:

- Unterseiten wie `/bereiche/consulting` funktionieren auch beim direkten
  Aufruf. GitHub liefert dafür `404.html` aus, die eine Kopie der Startseite
  ist. Der Browser zeigt die richtige Seite, technisch kommt Status 404 zurück.
- Alle Pfade zu Bildern, Videos und PDFs laufen über `publicUrl()`
  (`frontend/src/utils/publicUrl.ts`), damit der Unterordner stimmt.
- Die Seite ist per `noindex` von Suchmaschinen ausgeschlossen, weil das
  Unternehmen fiktiv ist (`frontend/index.html`).

## B. IONOS

Was hier zu tun ist, hängt davon ab, was bei IONOS gebucht ist. Das im
IONOS-Kundenbereich nachsehen oder beim Prof erfragen.

**B1. Nur die Domain, Seite bleibt auf GitHub Pages (einfachster Weg).**
Eine Subdomain, z. B. `stonetree.domain-des-profs.de`, zeigt auf GitHub Pages.

1. IONOS > Domains & SSL > Domain > DNS: einen **CNAME**-Eintrag anlegen,
   Name `stonetree`, Ziel `<benutzername>.github.io`.
2. GitHub > Settings > Pages > Custom domain: `stonetree.domain-des-profs.de`
   eintragen, nach der Prüfung **Enforce HTTPS** anhaken.
3. GitHub > Settings > Secrets and variables > Actions > **Variables**:
   `PAGES_BASE` mit dem Wert `/` anlegen. Die Seite liegt dann an der Wurzel
   der Domain statt im Unterordner. Danach den Workflow einmal neu starten
   (Actions > GitHub Pages > Run workflow).

Für die Hauptdomain selbst statt einer Subdomain verlangt GitHub vier
A-Records statt eines CNAME (siehe GitHub-Hilfe „Managing a custom domain").

**B2. IONOS Webhosting (Webspace mit Apache).**
Die Seite wird gebaut und per SFTP hochgeladen. Ein Backend mit Python läuft
dort nicht, das Formular nutzt wie bei GitHub Pages das E-Mail-Programm.

```bash
cd frontend
VITE_CONTACT_ENDPOINT= npm run build      # Git Bash; PowerShell siehe unten
cp ../deploy/apache/.htaccess dist/
```

PowerShell: `$env:VITE_CONTACT_ENDPOINT=""; npm run build`

Dann den **Inhalt** von `frontend/dist` (inklusive `.htaccess`) per SFTP in
das Verzeichnis laden, auf das die Domain im IONOS-Kundenbereich zeigt.
Zugangsdaten stehen unter Hosting > SFTP & SSH. Die `.htaccess` sorgt dafür,
dass Unterseiten beim direkten Aufruf funktionieren.

**B3. IONOS Cloud Server oder VPS.** Wie Weg C unten, nur bei IONOS statt
Hetzner. Bei IONOS ist ausgehend Port 587 in der Regel offen.

## C. Eigener Server mit Docker (Hetzner o. ä.)

Diese Anleitung bringt die Seite samt Kontaktformular auf einen eigenen Server.
Alles, was im Projekt dafür nötig ist, liegt bereits bereit. Von euch kommen
nur Server, Domain und die Zugangsdaten für den Mailversand.

### Überblick

```
Besucher ──HTTPS──▶ Caddy (web)  ──▶ Website-Dateien (React-Build)
                         │
                         └── /api/* ──▶ FastAPI (api) ──SMTP──▶ euer Postfach
```

| Datei | Zweck |
| --- | --- |
| `docker-compose.yml` | startet beide Container |
| `frontend/Dockerfile` | baut die Seite und liefert sie mit Caddy aus |
| `deploy/Caddyfile` | Domain, HTTPS, Weiterleitung von `/api` ans Backend |
| `backend/` | FastAPI mit `POST /api/contact` (Mailversand, Spam-Schutz) |
| `.env.example` | Vorlage für Domain und SMTP-Zugangsdaten |

### 1. Was ihr braucht

1. **Server:** Hetzner Cloud, kleinste Stufe (CX22 o. ä.), Ubuntu 24.04, Standort
   Deutschland. Beim Anlegen einen SSH-Schlüssel hinterlegen.
2. **Domain:** bei einem beliebigen Anbieter. Einen **A-Record** auf die IPv4
   des Servers setzen (für `eure-domain.de` und `www.eure-domain.de`).
3. **E-Mail-Versand (SMTP):** eine der beiden Varianten
   - **Postfach der eigenen Domain** (IONOS, Strato, all-inkl, Google Workspace):
     SMTP-Daten stehen in der Hilfe des Anbieters.
   - **Brevo** (Sitz in der EU, kostenloser Einstieg mit 300 Mails am Tag):
     Konto anlegen, Domain verifizieren, unter „SMTP & API" die SMTP-Daten
     erzeugen. Host `smtp-relay.brevo.com`, Port 587.

> Hetzner sperrt bei neuen Konten ausgehend die Ports 25 und 465. Deshalb
> **Port 587 mit `SMTP_SECURITY=starttls`** verwenden, der ist offen.

### 2. Server vorbereiten (einmalig)

```bash
ssh root@SERVER-IP
curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
```

### 3. Projekt holen und einrichten

```bash
git clone <URL-des-Repositorys> /opt/stonetree
cd /opt/stonetree
cp .env.example .env
nano .env        # DOMAIN und SMTP-Daten eintragen
```

### 4. Starten

```bash
docker compose up -d --build
```

Caddy holt beim ersten Aufruf automatisch ein HTTPS-Zertifikat. Das klappt
nur, wenn der A-Record schon auf den Server zeigt (DNS braucht manchmal
einige Stunden).

Prüfen:

```bash
curl https://eure-domain.de/api/health
# {"ok":true,"mail_configured":true}
```

Dann das Kontaktformular auf der Seite einmal selbst ausfüllen.

### 5. Neue Version einspielen

```bash
cd /opt/stonetree
git pull
docker compose up -d --build
```

### 6. Damit Mails nicht im Spam landen

Beim Domain-Anbieter die Einträge setzen, die euer Mailanbieter vorgibt:

- **SPF** (TXT-Eintrag, z. B. `v=spf1 include:spf.brevo.com ~all`)
- **DKIM** (TXT- oder CNAME-Eintrag, liefert der Anbieter)
- **DMARC** (TXT auf `_dmarc`, zum Start `v=DMARC1; p=none`)

### 7. Fehlersuche

| Problem | Nachsehen |
| --- | --- |
| Seite lädt nicht | `docker compose ps`, `docker compose logs web` |
| Kein HTTPS | A-Record prüfen, `docker compose logs web` |
| Formular meldet Fehler | `docker compose logs api` |
| `mail_configured: false` | SMTP_HOST, SMTP_USER oder CONTACT_RECIPIENT fehlt in `.env` |
| „Versand fehlgeschlagen" im Log | SMTP-Daten oder Port falsch (bei Hetzner 587 nehmen) |

### Lokal testen

Ohne Docker, zwei Terminals:

```bash
# Terminal 1: Backend
cd backend
python -m venv .venv
.venv/Scripts/activate           # macOS/Linux: source .venv/bin/activate
pip install -r requirements-dev.txt
pytest                           # Tests
uvicorn app.main:app --port 8000

# Terminal 2: Frontend (leitet /api an Port 8000 weiter)
cd frontend
npm run dev
```

Mit Docker wie auf dem Server: `.env` mit `DOMAIN=localhost` anlegen und
`docker compose up --build`. Die Seite läuft dann unter `https://localhost`
(der Browser warnt einmal wegen des lokalen Zertifikats).

### Vor dem Livegang

- Das Impressum enthält bewusst Musterdaten mit Hinweis auf die fiktive
  Website. Für eine echte Firma echte Daten eintragen (`frontend/src/data/site.ts`)
  und eine Datenschutzerklärung ergänzen, die Kontaktformular und Mailanbieter nennt.
- Die Schrift Ubuntu kommt aus dem eigenen Build (`@fontsource/ubuntu`),
  beim Aufruf geht keine Anfrage an Google oder andere Dritte.
- Datenschutzerklärung (`/datenschutz`) ist ein Muster. Inhalt in
  `frontend/src/data/datenschutz.ts`.

### Statistik einschalten

Das Einwilligungsbanner ist eingebaut, ein Statistikdienst aber noch nicht
eingetragen. So wird einer aktiviert:

1. Dienst wählen, der sich mit einem Skript einbinden lässt und Daten in der
   EU verarbeitet (z. B. Matomo Cloud, Plausible, Umami).
2. In `frontend/src/data/einwilligung.ts` bei `statistikDienst` Name,
   Anbieter, Skript-Adresse, Attribute (z. B. Website-ID) und Link zur
   Datenschutzerklärung des Dienstes eintragen.
3. Dort `EINWILLIGUNG_VERSION` um eins erhöhen, damit alle Besucher neu
   gefragt werden.
4. Pushen. Die Datenschutzerklärung nennt den Dienst danach automatisch.

Das Skript lädt erst nach Zustimmung im Banner. Ein Widerruf über
„Cookie-Einstellungen“ in der Fußzeile lädt die Seite neu, dann ohne Statistik.
