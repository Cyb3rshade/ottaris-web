# ottaris.com – Projektwissen für Claude

Webseite der Dachmarke **Ottaris** unter `ottaris.com`. Gemeinsame Regeln: `../../CLAUDE.md`, `../../ARCHITEKTUR.md` und `../../OTTARIS.md` (Cybershade Workspace).

## Stand (23.11.2026)

- Nur eine **„Bald da“-Seite**: Abzeichen, Schriftzug, Satz „Software, die Orientierung gibt.“, Hinweis „Bald da“. Keine Apps, kein Kontakt, kein Formular.
- Dunkel = Nachthimmel mit funkelnden Sternen, Sternschnuppe und treibenden Wellen. Hell = Morgendämmerung in Creme und Gold. Umschaltung nur über die Geräte-Einstellung (`prefers-color-scheme`), kein Schalter, weil es keine Skripte gibt.
- **Kein Impressum und keine Datenschutzerklärung**, weil Melvin dafür erst eine Impressum-Adresse (Service mit c/o-Anschrift) besorgt. Sobald Inhalte dazukommen (Apps, Kontakt, Über mich), müssen beide vorher rein.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite, relative Pfade (läuft auch unter `<nutzer>.github.io/ottaris-web/`) |
| `404.html` | Fehlerseite im selben Stil, absolute Pfade (GitHub liefert sie für jeden Pfad aus) |
| `style.css` | Alles Aussehen. Farben nur über die Variablen oben (Werte aus `OTTARIS.md`), Hell über `prefers-color-scheme: light` |
| `img/zeichen-*.svg`, `img/schriftzug-*.svg`, `favicon*`, `apple-touch-icon.png` | Kopien aus `kit/logo/ottaris/`. **Nie von Hand ändern**, im Kit neu bauen und wieder kopieren |
| `img/sterne-*.svg` | Sternenfelder, erzeugt mit `werkzeug/sterne.cjs` (fester Zufall) |
| `og.png` | Vorschaubild beim Teilen des Links (1200 × 630), Bildschirmfoto der Seite in Dunkel |
| `fonts/` | Plus Jakarta Sans (variabel, nur lateinisch) mit `OFL.txt` |
| `.github/workflows/deploy.yml` | Key-Scan, Prüfung „nichts von außen, keine Skripte“, Seite zusammenstellen, Pages |

## Regeln

- **Keine Skripte, nichts von außen.** CSP per Meta-Tag: `default-src 'none'`, nur eigene Styles, Bilder und Schriften. Der Workflow bricht ab, wenn ein `<script>` oder eine fremde Adresse auftaucht (Ausnahme: `ottaris.com` in Meta-Angaben).
- Bewegung ist ruhig und hört bei `prefers-reduced-motion` ganz auf.
- Die Domain hängt an **diesem** Repo, nie am Nutzer-Repo (siehe `ARCHITEKTUR.md` Abschnitt 7). Einrichtung in `ANLEITUNG-DOMAIN.md`.

## Testen

Lokal mit `python3 -m http.server` im Ordner starten, dann im Browser bei 320, 390 und 1440 px in Hell und Dunkel ansehen: kein waagerechtes Scrollen, Schrift geladen, keine CSP-Meldungen in der Konsole, Inhalt nicht unter den Wellen, mit reduzierter Bewegung steht alles still.

## Ideen für später

- Abschnitt mit den Apps (Sidequest mit Link, private Apps nur mit Beschreibung), Kontakt, Impressum, Datenschutz.
- Englische Fassung, weil `.com`.
- `ottaris.de` leitet auf `ottaris.com` weiter (siehe Anleitung).
