export interface FAQ {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FAQ[] = [
  {
    q: 'Voor wie is Seizoensplanner?',
    a: 'Belgische KMO\'s met 2 tot 50 werknemers en duidelijke seizoenspieken: horeca, kust & toerisme, tuinbouw, events. Als jouw FTE-behoefte in augustus 3× hoger ligt dan in januari, is dit voor jou.',
  },
  {
    q: 'Is dit al beschikbaar vandaag?',
    a: 'Nee. We zijn in beta-fase. Schrijf je in voor vroege toegang en je krijgt 50% early-bird korting als we live gaan. Eerste betalende klanten: zomer 2026.',
  },
  {
    q: 'Wat betekent Belgisch-fiscaal correct?',
    a: 'We rekenen met flexi-regime horeca, gelegenheidsarbeid (100-dagen-plukkaart), studentencontracten (475u-quotum), RSZ-bijdragen per type contract, Dimona-verplichtingen en PC-gebonden minimumlonen. Bronnen: RSZ, FOD WASO, Securex, Acerta. Laatste check bij elke update gedocumenteerd.',
  },
  {
    q: 'Hoe verschilt dit van Strobbo, Shyfter of Officient?',
    a: 'Die tools plannen op dag-niveau (wie werkt morgen). Seizoensplanner plant op maand- en seizoens-niveau: hoeveel FTE heb je in juli nodig, welke mix, en wanneer begin je te werven. Aanvullend, geen vervanging.',
  },
  {
    q: 'Welke data gebruiken jullie voor de forecast?',
    a: 'Jouw eigen historie (omzet + FTE per maand, ideaal 2 jaar) plus publieke bronnen: KMI weerdata, schoolvakanties, feestdagen, Westtoer toerisme-statistieken, evenementenkalenders, sector-benchmarks. Geen zwarte doos: elk voorstel legt uit waarom.',
  },
  {
    q: 'Wat als ik geen 2 jaar historie heb?',
    a: 'We starten met sector-baselines op basis van jouw locatie, sector en omvang. Na één seizoen met jouw data wordt het model preciezer. Je bent niet afhankelijk van historie om iets bruikbaars te krijgen.',
  },
  {
    q: 'Is mijn data veilig? GDPR-compliant?',
    a: 'Ja. Jouw bedrijfsdata blijft van jou. Sector-benchmarks werken alleen op opt-in basis en met anonimisering. Hosting in EU. Details in ons privacy-beleid.',
  },
  {
    q: 'Wat als het niets voor mij blijkt te zijn?',
    a: 'Starter is eenmalig — geen abonnement. Pro en Team zijn maandelijks opzegbaar. In beta geven we 30 dagen geld-terug-garantie. We willen liever één tevreden klant dan tien ontevreden.',
  },
];
