# Duroc de Kempen — Project Context

## Over het bedrijf
Familiaal varkensbedrijf in Weelde (Noorderkempen), gerund door Ann en Frank Van Dijck. Opgericht in 2000, sinds 2017 gefocust op het Duroc-ras. Twee productlijnen: Duroc (hoofdlijn) en Ambiorixx (niche, kruising Duroc-zeug met menapische beer).

## Slogan en subslogan
Slogan: Duroc vlees uit eigen stal.
Subslogan: Gekweekt in de Kempen, van begin tot eind.

## Sitestructuur
- index.html (homepage)
- over-ons.html
- uit-eigen-stal.html
- verkooppunten.html
- hoevezaal.html
- contact.html
- styles.css

## Huisstijl
- Primaire kleur: #8B2635
- Accentkleur: #A63344
- Bijna zwart: #1C1C1A
- Crème: #F5F2ED
- Titelfont: Playfair Display Bold
- Bodyfont: Source Serif 4

## Tone of voice
Eerlijk en direct. Spreek zoals een boer die zijn vak kent. Trots maar bescheiden. Geen marketingtaal, geen woordspelingen, geen opgesomde adjectieven. Geen liggende streepjes als leesteken. Vuistregel: zou Frank dit zelf ook zo zeggen?

## Technische afspraken
- Statische website: HTML, CSS, JavaScript
- Geen frameworks
- Geen liggende streepjes als leesteken in teksten
- Logo staat als PNG in de map: logo_duroc_de_kempen.png
- Foto-placeholders zijn donkere rechthoeken met een label in kleine letters

## Wat niet vermeld wordt
- Namen of rol van grossisten
- Prijsstrategie
- Openingsuren kijkstal (die bestaat niet meer als vrij te bezoeken locatie)

## Screenshot Workflow
- Start server en maak screenshot via: node screenshot.mjs http://localhost:3000/index.html
- Screenshots worden opgeslagen in ./temporary-screenshots/
- Na het maken van een screenshot, lees het PNG-bestand en analyseer het
- Controleer: spacing, font grootte, kleuren (exacte hex), uitlijning, afbeeldingsgroottes
- Vergelijk altijd met FRONTEND_DESIGN.md

## Verplichte werkwijze
Bij elke aanpassing aan HTML of CSS bestanden:
1. Lees eerst FRONTEND_DESIGN.md
2. Zorg dat alle wijzigingen mobiel-vriendelijk zijn (responsive design, minimale breedte 320px, hamburger menu op mobiel)
3. Test mentaal of het resultaat past bij de tone of voice in dit bestand
