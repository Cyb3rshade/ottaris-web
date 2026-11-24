# ottaris.com – Projektwissen für Claude

Webseite der Dachmarke **Ottaris** unter `ottaris.com`. Gemeinsame Regeln: `../../CLAUDE.md`, `../../ARCHITEKTUR.md` und `../../OTTARIS.md` (Cybershade Workspace).

## Stand (23.11.2026)

- **Online** über GitHub Pages (Repo öffentlich, Quelle „GitHub Actions“). Domain `ottaris.com` bei checkdomain eingerichtet und bei GitHub bestätigt (23.11.2026). **HTTPS aktiv und erzwungen** seit 24.11.2026 (Let's Encrypt über GitHub, verlängert sich selbst). Hürde war die „Haupt-IP-Adresse“ bei checkdomain: Sie veröffentlicht zusätzlich eigene A/AAAA-Einträge, dort stehen jetzt GitHub-Adressen. `ottaris.de` leitet noch nicht weiter.
- **Startseite:** Kopfzeile mit Menü, Hero („Software, die Orientierung gibt.“) mit dem großen Ottaris-Zeichen, drei Fakten, Abschnitt **Apps** mit einer **Kachel für Rare Drop** (Link auf `raredrop.html`, Status „Privater Test“) und „Weitere Apps in Arbeit“, **Prinzipien**, **Über Ottaris** (Zeichen = Otter, der zum Leitstern aufschaut), Fuß. Auf der Startseite steht sonst nichts zu Rare Drop (Melvin 24.11.: Rare Drop gehört auf eine eigene Seite). Keine Skripte, keine Formulare.
- **Rare-Drop-Seite `raredrop.html`:** App-Kopf mit Status und Button „Zur App (Testkreis)“ (`https://raredrop.ottaris.com`, Melvin gibt Einladungscodes nur an Freunde und den privaten Testkreis), sechs Funktionen, **Vorschau „Ein Blick hinein“** (drei Szenen im Handy: Mappe mit Lücken, Preis je Seltenheit, Mappe zeigen mit QR; umgeschaltet nur mit Radio-Knöpfen und CSS, gezeichnet mit erfundenen Karten und Beispielpreisen, keine Konami-Motive, das QR-Muster ist nur Deko), „Gut zu wissen“ mit Konami-Hinweis, Quellen (YGOPRODeck, Yugipedia, Cardmarket) und Datenschutz-Link.
- **Logo (24.11.2026):** Neues Logo-Paket von Melvin (Vorlage aus einem KI-Bild, Vektordatei von Melvin von Hand gezeichnet, Farben mit Claude gesetzt). `img/zeichen.svg` = Emblem, `img/schriftzug-dunkel.svg` und `-hell.svg` = Schrift aus dem Paket herausgelöst (Hell mit dunklerem Gold für Kontrast), Favicons und Apple-Icon aus dem Paket. Das Paket-Original liegt nicht im Repo, bei Melvin.
- **Rechtliches:** Datenschutzerklärung ist drin (Name des Verantwortlichen nach Melvins Wunsch nur dort, Seite mit `noindex`). **Kein Impressum**, bewusste Entscheidung von Melvin (24.11.): Privatperson ohne Einnahmen, Rare Drop nur im privaten Testkreis. Das Risiko ist klein, aber nicht null. Impressum spätestens bei Plus, Store oder öffentlicher Freigabe von Rare Drop nachziehen. Die Aussage „Kein Tracking, keine Cookies“ stimmt nur, solange das so bleibt.
- Dunkel = Nachthimmel mit funkelnden Sternen, Sternschnuppe und treibenden Wellen. Hell = Morgendämmerung in Creme und Gold. Umschaltung nur über die Geräte-Einstellung (`prefers-color-scheme`), kein Schalter, weil es keine Skripte gibt.
- **Datenschutz:** `datenschutz.html` ist als Entwurf da (Kontakt `info@ottaris.com`, Weiterleitung über Cloudflare Email Routing an Melvins private Adresse, eingerichtet 24.11.). Der Workflow lässt `main` nicht durch, solange ein Platzhalter wie `[NAME EINTRAGEN]` in einer HTML-Datei steht. Rare Drop zeigt beim Anlegen des Kontos einen kurzen Datenschutzhinweis (seit 24.11., `datenschutz.html` verweist darauf, `rare-drop/web/src/screens/Welcome.svelte`).

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Abschnitte `#apps`, `#prinzipien`, `#ueber`), relative Pfade (läuft auch unter `<nutzer>.github.io/ottaris-web/`) |
| `raredrop.html` | Rare-Drop-Seite (`#funktionen`, `#vorschau`, `#hinweise`) |
| `datenschutz.html` | Datenschutzerklärung (`noindex`), Kontakt `info@ottaris.com` |
| `404.html` | Fehlerseite im selben Stil, absolute Pfade (GitHub liefert sie für jeden Pfad aus) |
| `style.css` | Alles Aussehen (in den HTML-Dateien als `style.css?v=__BUILD__`, der Workflow ersetzt den Stempel, damit Browser nach einem Update nicht altes CSS zu neuem HTML mischen). Farben nur über die Variablen oben (Werte aus `OTTARIS.md`), Hell über `prefers-color-scheme: light` |
| `img/zeichen.svg`, `img/schriftzug-*.svg`, `favicon-*.png`, `apple-touch-icon.png` | Aus dem Logo-Paket (siehe „Logo“). Nicht von Hand ändern, bei neuem Logo das Paket neu einspielen |
| `img/raredrop-icon.svg` | Kopie von `rare-drop/web/public/icon.svg` |
| `img/sterne-*.svg` | Sternenfelder, erzeugt mit `werkzeug/sterne.cjs` (fester Zufall) |
| `og.png` | Vorschaubild beim Teilen des Links (1200 × 630): neues Zeichen, Schriftzug, Satz auf Nachthimmel, gerendert aus einer kurzen Wegwerf-HTML mit `style.css` |
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
