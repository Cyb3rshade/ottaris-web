# ottaris.com – Projektwissen für Claude

Webseite der Dachmarke **Ottaris** unter `ottaris.com`. Gemeinsame Regeln: `../../CLAUDE.md`, `../../ARCHITEKTUR.md` und `../../OTTARIS.md` (Cybershade Workspace).

## Stand (23.11.2026)

- **Online** über GitHub Pages (Repo öffentlich, Quelle „GitHub Actions“). Domain `ottaris.com` bei checkdomain eingerichtet und bei GitHub bestätigt (23.11.2026). **HTTPS aktiv und erzwungen** seit 24.11.2026 (Let's Encrypt über GitHub, verlängert sich selbst). Hürde war die „Haupt-IP-Adresse“ bei checkdomain: Sie veröffentlicht zusätzlich eigene A/AAAA-Einträge, dort stehen jetzt GitHub-Adressen. `ottaris.de` leitet noch nicht weiter.
- **Startseite mit Inhalt (Branch `ccr-7f6b67b8-3nz091`, noch nicht auf `main`):** Kopfzeile mit Menü, Hero („Software, die Orientierung gibt.“) mit Handy-Illustration einer Rare-Drop-Mappe (reines CSS, keine echten Kartenbilder), drei Fakten, Abschnitt **Apps** (Rare Drop mit Link auf `https://raredrop.ottaris.com`, Status „Privater Test“, Hinweis „nur für einen privaten Testkreis“ (Melvin gibt Einladungscodes nur an Freunde und den privaten Testkreis, 24.11.), sechs Funktionen; Platzhalter „Weitere Apps“), **Prinzipien**, **Über Ottaris** (Zeichen = Otter, der zum Leitstern aufschaut), Schlussband, Fuß mit Marken- und Quellenhinweis (Konami, YGOPRODeck, Yugipedia, Cardmarket). Keine Skripte, keine Formulare.
- **Vor dem Mergen auf `main` müssen Impressum und Datenschutzerklärung rein** (Seite verweist auf eine App, gilt als geschäftsmäßig). Platz dafür: Link im Fuß neben „© 2026 Ottaris“. Die Aussage „Kein Tracking, keine Cookies“ stimmt nur, solange das so bleibt.
- Dunkel = Nachthimmel mit funkelnden Sternen, Sternschnuppe und treibenden Wellen. Hell = Morgendämmerung in Creme und Gold. Umschaltung nur über die Geräte-Einstellung (`prefers-color-scheme`), kein Schalter, weil es keine Skripte gibt.
- **Datenschutz:** `datenschutz.html` ist als Entwurf da (Kontakt `info@ottaris.com`, Weiterleitung über Cloudflare Email Routing an Melvins private Adresse, eingerichtet 24.11.). Der Name des Verantwortlichen steht noch als Platzhalter `[NAME EINTRAGEN]`, der Workflow lässt `main` nicht durch, solange so ein Platzhalter in einer HTML-Datei steht. **Kein Impressum:** Melvin sieht sich als Privatperson ohne Einnahmen (24.11.), Impressum kommt spätestens mit Plus, Store oder öffentlicher Freigabe von Rare Drop. Die App braucht noch einen kurzen Datenschutzhinweis beim Anlegen des Kontos (`datenschutz.html` verweist darauf).

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Abschnitte `#apps`, `#prinzipien`, `#ueber`), relative Pfade (läuft auch unter `<nutzer>.github.io/ottaris-web/`) |
| `404.html` | Fehlerseite im selben Stil, absolute Pfade (GitHub liefert sie für jeden Pfad aus) |
| `style.css` | Alles Aussehen. Farben nur über die Variablen oben (Werte aus `OTTARIS.md`), Hell über `prefers-color-scheme: light` |
| `img/zeichen-*.svg`, `img/schriftzug-*.svg`, `favicon*`, `apple-touch-icon.png` | Kopien aus `kit/logo/ottaris/`. **Nie von Hand ändern**, im Kit neu bauen und wieder kopieren |
| `img/raredrop-icon.svg` | Kopie von `rare-drop/web/public/icon.svg` |
| `img/sterne-*.svg` | Sternenfelder, erzeugt mit `werkzeug/sterne.cjs` (fester Zufall) |
| `og.png` | Vorschaubild beim Teilen des Links (1200 × 630): Zeichen, Schriftzug, Satz auf Nachthimmel, gerendert aus einer kurzen Wegwerf-HTML mit `style.css` |
| `fonts/` | Plus Jakarta Sans (variabel, nur lateinisch) mit `OFL.txt` |
| `.github/workflows/deploy.yml` | Key-Scan, Prüfung „nichts von außen, keine Skripte“, Seite zusammenstellen, Pages |

## Regeln

- **Keine Skripte, kein `style="…"` im HTML, nichts von außen.** CSP per Meta-Tag: `default-src 'none'`, nur eigene Styles, Bilder und Schriften. Der Workflow bricht ab, wenn ein `<script>` oder eine fremde Adresse auftaucht (Ausnahme: `ottaris.com` und Unterdomains wie `raredrop.ottaris.com` als Link).
- Bewegung ist ruhig und hört bei `prefers-reduced-motion` ganz auf.
- Die Domain hängt an **diesem** Repo, nie am Nutzer-Repo (siehe `ARCHITEKTUR.md` Abschnitt 7). Einrichtung in `ANLEITUNG-DOMAIN.md`.

## Testen

Lokal mit `python3 -m http.server` im Ordner starten, dann im Browser bei 320, 390 und 1440 px in Hell und Dunkel ansehen: kein waagerechtes Scrollen, Schrift geladen, keine CSP-Meldungen in der Konsole, Inhalt nicht unter den Wellen, mit reduzierter Bewegung steht alles still.

## Ideen für später

- Sidequest als zweite App-Karte (mit Link), private Apps nur mit Beschreibung. Kontakt, Impressum, Datenschutz.
- Echte Rare-Drop-Bildschirmfotos statt der Illustration (Kartenbilder sind Konami-Rechte, dann lieber Beispielkarten ohne Motiv).
- Englische Fassung, weil `.com`.
- `ottaris.de` leitet auf `ottaris.com` weiter (siehe Anleitung).
