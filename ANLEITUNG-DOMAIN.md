# ottaris.com mit der Webseite verbinden

Einmalig, etwa 20 Minuten plus Wartezeit. Du brauchst: dein GitHub-Konto und den Zugang zu deinem Domain-Anbieter.

## 1. Pages einschalten

Repo **ottaris-web** → *Settings* → *Pages* → *Source*: **GitHub Actions**. Danach läuft der Workflow bei jedem Push von selbst. Die Seite ist dann erst einmal unter `https://cyb3rshade.github.io/ottaris-web/` erreichbar.

## 2. Domain bei GitHub bestätigen (Schutz vor Übernahme)

Damit niemand anderes `ottaris.com` mit seiner eigenen GitHub-Seite verbinden kann:

1. GitHub → oben rechts dein Profilbild → *Settings* → links *Pages* → **Add a domain** → `ottaris.com`.
2. GitHub zeigt einen **TXT-Eintrag** (Name beginnt mit `_github-pages-challenge-`, dazu ein Wert).
3. Beim Domain-Anbieter in der DNS-Verwaltung von `ottaris.com` genau diesen TXT-Eintrag anlegen.
4. Zurück bei GitHub auf **Verify** tippen. Kann ein paar Minuten dauern, dann einfach noch mal.

## 3. DNS-Einträge beim Domain-Anbieter

In der DNS-Verwaltung von `ottaris.com` vorhandene Einträge für `@` (die Domain selbst) und `www` löschen, z. B. eine Parkseite des Anbieters. Dann anlegen:

| Typ | Name | Wert |
|---|---|---|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| AAAA | @ | `2606:50c0:8000::153` |
| AAAA | @ | `2606:50c0:8001::153` |
| AAAA | @ | `2606:50c0:8002::153` |
| AAAA | @ | `2606:50c0:8003::153` |
| CNAME | www | `cyb3rshade.github.io.` |

Der TXT-Eintrag aus Schritt 2 bleibt stehen. Manche Anbieter schreiben statt `@` einfach nichts oder den Domainnamen.

**Bei checkdomain:** Domain anklicken → Kachel **checkdomain Nameserver** → **Profi-Einstellungen**. Hostname **leer** steht für die Domain selbst (`ottaris.com` wird hinten angehängt), bei `www` und beim TXT-Eintrag nur den vorderen Teil eintragen. TTL und Priorität leer lassen. Den vorhandenen MX-Eintrag (E-Mail) stehen lassen. In der Kachel **Domainweiterleitung** darf für `ottaris.com` nichts eingerichtet sein.

## 4. Domain im Repo eintragen

Repo **ottaris-web** → *Settings* → *Pages* → *Custom domain*: `ottaris.com` → *Save*. GitHub prüft die DNS-Einträge (bis zu einer Stunde, selten länger). Wenn der Haken grün ist: **Enforce HTTPS** anhaken. Das Zertifikat kommt von selbst, meist nach wenigen Minuten.

Fertig: `https://ottaris.com` zeigt die Seite, `www.ottaris.com` leitet dorthin.

## 5. ottaris.de auf ottaris.com umleiten

Am einfachsten beim Domain-Anbieter: für `ottaris.de` eine **Weiterleitung** (oft „URL-Weiterleitung“ oder „Domain-Weiterleitung“, Art **301 / dauerhaft**) auf `https://ottaris.com` einrichten.

Danach `https://ottaris.de` im Browser testen. Kommt eine Zertifikatswarnung, kann der Anbieter Weiterleitungen nur ohne HTTPS. Dann sag mir Bescheid: Ich baue ein kleines zweites Repo, das `ottaris.de` mit HTTPS weiterleitet.

## Wenn etwas hakt

| Problem | Lösung |
|---|---|
| GitHub meldet „DNS check unsuccessful“ | Abwarten (bis 1 Stunde), Einträge auf Tippfehler prüfen, alte Parkseiten-Einträge gelöscht? |
| „Enforce HTTPS“ lässt sich nicht anhaken | Zertifikat wird noch erstellt, später noch mal versuchen (bis 24 Stunden) |
| Seite unter `cyb3rshade.github.io/ottaris-web/` sieht kaputt aus | Nur die Fehlerseite nutzt feste Pfade, die passen erst mit der Domain. Die Startseite funktioniert unter beiden Adressen |
| Workflow startet nicht („Waiting for a runner“) | Bei privatem Repo: Actions-Budget nicht 0 $ (siehe `ARCHITEKTUR.md`) |
