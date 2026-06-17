export type SegmentSlug = 'horeca' | 'kust-toerisme' | 'tuinbouw' | 'events';

export interface PainPoint {
  title: string;
  body: string;
  source: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface MiniCase {
  title: string;
  body: string;
  label: string;
}

export interface Segment {
  slug: SegmentSlug;
  label: string;
  shortLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  tileDescription: string;
  painPoints: PainPoint[];
  steps: Step[];
  miniCase: MiniCase;
  dashboardIcon: string;
  metaTitle: string;
  metaDescription: string;
}

export const SEGMENTS: Segment[] = [
  {
    slug: 'horeca',
    label: 'Horeca (bars, restaurants, strandbars)',
    shortLabel: 'Horeca',
    heroTitle:
      'Plan je horeca-personeel op data, niet op "vorig jaar ook".',
    heroSubtitle:
      'Voor bars, restaurants en strandbars: forecast je FTE-behoefte, contract-mix (flexi, student, vast) en loonkosten maand-per-maand. Belgisch-fiscaal correct.',
    tileDescription:
      'Bars, restaurants, strandbars, brasseries. Flexi + student + vast in de juiste mix — en op tijd aangeworven.',
    painPoints: [
      {
        title: 'Vacatures die 187 dagen open staan',
        body:
          'Horeca-vacatures staan gemiddeld 187 dagen open. Te laat publiceren betekent starten met 70% bezetting en 10-20% omzet verliezen in mei-juni.',
        source: 'Horeca Webzine, 2025 · VDAB Knelpuntberoepen',
      },
      {
        title: '77% heeft maandelijks no-shows',
        body:
          '77% van Belgische horeca-uitbaters ervaart maandelijks no-shows, 31% noemt omzetverlies het grootste schade-item. Eén persoon te veel of te weinig heeft direct effect op je omzet.',
        source: 'Lightspeed × Zenchef, 250 BE-uitbaters, 2024',
      },
      {
        title: 'Verkeerde contract-mix kost honderden euro\'s per week',
        body:
          'Student in nachtshift waar flexi voordeliger is. 475u-quotum te vroeg opgebruikt in juli. Geen zicht op wat jouw optimale mix is voor elke maand.',
        source: 'RSZ: 229.423 flexi-jobbers in 2024, 44% in horeca',
      },
    ],
    steps: [
      {
        title: '1. Vul je sector, omvang en historie in',
        body:
          'Duurt 5 minuten. Omzet per maand (2 jaar terug), huidige FTE-basis, welke locatie (kust, centrum, platteland).',
      },
      {
        title: '2. Krijg een maand-per-maand forecast',
        body:
          'Weer-historie + evenementenkalender + jouw eigen cijfers + sector-benchmarks. Met betrouwbaarheidsband, niet één doodgezegd getal.',
      },
      {
        title: '3. Zie je contract-mix en aanwervings-planning',
        body:
          'Per maand: hoeveel flexi, student, vast. Wanneer publiceren om op 1 juli klaar te zijn. RSZ-bijdragen en totale loonkost in één scherm.',
      },
    ],
    miniCase: {
      label: 'Illustratief voorbeeld',
      title: 'Strandbar De Haan — 12% minder loonkost-afwijking',
      body:
        'Een strandbar-uitbater (illustratief, niet echt klant) met €400K omzet plant vandaag op gevoel. Na één seizoen met maand-per-maand forecast: 12% minder afwijking tussen geplande en werkelijke loonkost, vooral dankzij juiste inschatting van mei-weken en weekend-piek in augustus.',
    },
    dashboardIcon: 'utensils',
    metaTitle: 'FTE-planning horeca — forecast loonkost per maand | Seizoensplanner',
    metaDescription:
      'Data-gedreven personeelsplanning voor Belgische horeca: bars, restaurants, strandbars. Flexi + student + vast in juiste mix, loonkost per maand. Beta — vroege toegang.',
  },
  {
    slug: 'kust-toerisme',
    label: 'Kust & toerisme (verhuur, attracties, B&B)',
    shortLabel: 'Kust & toerisme',
    heroTitle:
      'Weer-gedreven personeelsplanning voor je kust-onderneming.',
    heroSubtitle:
      'Fietsverhuur, watersport, minigolf, kleine attracties, B&B\'s en campings. Koppel weer + schoolvakanties + jouw historie en plan zonder regendagen met volle bezetting.',
    tileDescription:
      'Fietsverhuur, watersport, minigolf, attracties, B&B\'s. Jouw planning past zich aan weer en vakantiekalender aan.',
    painPoints: [
      {
        title: 'Regendagen met volle bezetting zijn directe verliesposten',
        body:
          'Een fietsverhuurder aan de kust verliest bij 10 regendagen/zomer met volle bezetting €2.000-3.000 vermijdbare loonkost. Studenten kun je niet zomaar naar huis sturen.',
        source: 'KMI klimatologisch overzicht 2024 · Westtoer kust-cijfers',
      },
      {
        title: '20% minder overnachtingen herfstvakantie',
        body:
          'De kust is volatiel: -20% overnachtingen herfstvakantie 2025 vs 2024. Zonder forecasting plan je op "vorig jaar" en betaal je 2 FTE te veel in dalperiode.',
        source: 'VRT NWS, 2025-11-02 (data Westtoer)',
      },
      {
        title: 'Concurrentie om dezelfde studenten als horeca',
        body:
          'Kust-verhuurders zoeken dezelfde jobstudenten als strandbars. Te laat publiceren = zonder mensen beginnen. 475u-quotum per student is cumulatief over alle werkgevers.',
        source: 'Apache — 60+ beachbars Belgische kust, 2020',
      },
    ],
    steps: [
      {
        title: '1. Geef je locatie en openingsmaanden door',
        body:
          'Oostende, Knokke, Nieuwpoort, De Haan, Bredene, Blankenberge. Openingsdagen en weer-afhankelijkheid per activiteit.',
      },
      {
        title: '2. Krijg een week-per-week forecast met weer-scenario',
        body:
          'Natte zomer, droge zomer, gemiddeld: drie scenario\'s met FTE-plan per week. Inclusief schoolvakanties en lokale events.',
      },
      {
        title: '3. Stuur bij per week zodra forecasts binnenkomen',
        body:
          'Stel je planning bij op basis van 14-daagse weersvoorspelling. Minder lege dagen met volle loonkost, meer marge op piek-weekends.',
      },
    ],
    miniCase: {
      label: 'Illustratief voorbeeld',
      title: 'Fietsverhuur Knokke — minder lege regendagen',
      body:
        'Een fietsverhuurder (illustratief) met 5 FTE in piek bespaart bij consistent weer-aangestuurde planning circa €2.500/jaar aan niet-nodige studentdagen. Op seizoen-niveau minder "paniek-inhuur" bij onverwachte zonne-weekends dankzij 14-dagen vooruitblik.',
    },
    dashboardIcon: 'sun',
    metaTitle: 'Personeelsplanning kust & toerisme — weer-gedreven forecast | Seizoensplanner',
    metaDescription:
      'Voor fietsverhuur, watersport, attracties en B&B aan de Belgische kust: FTE-forecast met weer-data, schoolvakanties en historie. Beta — vroege toegang.',
  },
  {
    slug: 'tuinbouw',
    label: 'Tuinbouw & fruitpluk',
    shortLabel: 'Tuinbouw',
    heroTitle:
      'Plan je oogst-capaciteit op rijping + weer + student-quota.',
    heroSubtitle:
      'Voor aardbeien-, kersen- en fruitkwekerijen: week-per-week plukkers-behoefte met rijpingscurve, weer-forecast en 475u-quotum-bewaking per student.',
    tileDescription:
      'Aardbeien, kersen, appels, seizoensteelt. 100-dagen-plukkaart + jobstudent-mix onder controle.',
    painPoints: [
      {
        title: 'Rijpe aardbeien die blijven staan = €1.000-2.000 per dag',
        body:
          'Te weinig plukkers op piek-dag betekent 500 kg niet-geplukte aardbei × €2-4/kg = €1.000-2.000 verloren per mis-dag. Op 3-5 mis-dagen/seizoen: €3.000-10.000.',
        source: 'Landbouwcijfers Vlaanderen · Veiling Hoogstraten',
      },
      {
        title: '475u-quotum overlapt tussen telers',
        body:
          'Jobstudenten werken bij meerdere telers; het 475u-quotum is cumulatief. Misgelopen controle betekent RSZ-herberekening. Zonder zicht op quota per student plan je blind.',
        source: 'RSZ jobstudent-regeling · Boerenbond',
      },
      {
        title: 'Krimpende Poolse plukkersgroep',
        body:
          'Poolse plukkers zijn een krimpende groep; Roemenen en Bulgaren nemen over. Meer jobstudent-mix beheren wordt de norm — en dat is complexer dan één pool van 100-dagen-plukkaart-medewerkers.',
        source: 'VILT · Boerenbond tewerkstelling fruitpluk',
      },
    ],
    steps: [
      {
        title: '1. Geef je teelt en areaal door',
        body:
          'Aardbei serre, openlucht, kersen, appel. Hectares, verwachte rijpingsstart, historische oogst-kg per week.',
      },
      {
        title: '2. Krijg een week-per-week plukkers-plan',
        body:
          'Gebaseerd op graaddagen-rijping, weersverwachting en historie. Met jobstudent-quotum-bewaking per medewerker.',
      },
      {
        title: '3. Koppel 100-dagen-plukkaart + student-mix fiscaal optimaal',
        body:
          'Zie wat je bespaart met plukkaart-medewerkers (€3.750/100 dagen) versus wanneer een jobstudent goedkoper is. Uitleg per beslissing.',
      },
    ],
    miniCase: {
      label: 'Illustratief voorbeeld',
      title: 'Aardbeienkwekerij Hoogstraten — minder misgelopen plukdagen',
      body:
        'Een middelgrote aardbeienteler (illustratief, niet echt klant) met 35 seizoenarbeiders plant vandaag de piekweek met marge "voor de zekerheid". Met week-per-week forecast gebaseerd op graaddagen-rijping verschuift de piek-bezetting twee weken, en wordt één mis-dag in juni voorkomen.',
    },
    dashboardIcon: 'leaf',
    metaTitle: 'Plukkers-planning tuinbouw — forecast op rijping + weer | Seizoensplanner',
    metaDescription:
      'Voor aardbeien-, kersen- en fruitkwekerijen: week-per-week plukkers-behoefte met rijpingscurve, weer en 475u-quotum per jobstudent. Beta — vroege toegang.',
  },
  {
    slug: 'events',
    label: 'Events & pop-ups',
    shortLabel: 'Events & pop-ups',
    heroTitle:
      'Minder last-minute flex-paniek op elk event.',
    heroSubtitle:
      'Voor festivals, event-agencies, standhouders en pop-ups: forecast je crew-behoefte per event-type, koppel met weer- en bezoekersvoorspelling en plan op tijd in plaats van de avond vóór.',
    tileDescription:
      'Festivals, event-agencies, standhouders, pop-ups. Plan crew op tijd in plaats van de avond vóór bellen.',
    painPoints: [
      {
        title: 'Last-minute flex-inhuur kost 25-40% meer',
        body:
          'Dezelfde dag of avond vóór crew zoeken betekent premium betalen of mensen missen. Bij 5 events/zomer met een mis van 3-4 crew per event loopt de extra kost snel op.',
        source: 'Sector-ervaring event-agencies BE',
      },
      {
        title: 'Weer-gevoelige openluchtvenues zonder scenario-plan',
        body:
          'Bij regenvoorspelling beslis je dag-vóór wie je nog nodig hebt voor op-/afbouw. Zonder scenario\'s per weertype draai je telkens dezelfde discussie.',
        source: 'KMI zomer-variabiliteit 2024',
      },
      {
        title: 'Crew-database vs. realiteit: onbeschikbaarheid per datum',
        body:
          'Je databank zegt "beschikbaar", maar studenten hebben 475u-quotum en flexi-jobbers werken ook elders. Zicht op wie écht kan op een specifieke datum ontbreekt.',
        source: 'RSZ flexi-jobs + jobstudent-regeling',
      },
    ],
    steps: [
      {
        title: '1. Voer je event-kalender in',
        body:
          'Per event: type (festival, bedrijfsfeest, markt, popup), locatie, datum, verwachte bezoekers, crew-profielen.',
      },
      {
        title: '2. Krijg crew-forecast per event + scenario',
        body:
          'Droog versus nat: hoeveel crew per rol. Koppel met weer-14-dagenforecast vóór je definitief boekt.',
      },
      {
        title: '3. Plan aanwervings- en oproep-timing terug',
        body:
          'Wanneer flexi-oproep versturen, wanneer studenten bevestigen, wanneer backup-pool activeren. Minder gsm\'s de avond vóór.',
      },
    ],
    miniCase: {
      label: 'Illustratief voorbeeld',
      title: 'Event-agency — 20% minder last-minute flex',
      body:
        'Een mid-size event-agency (illustratief) met 15 events/zomer zag op seizoen-basis circa 20% minder last-minute flexi-oproepen na systematische forecast per event-type. Minder premium betaald, meer zekerheid voor crew zelf.',
    },
    dashboardIcon: 'calendar',
    metaTitle: 'Crew-planning events & festivals — forecast op event-type | Seizoensplanner',
    metaDescription:
      'Voor festivals, event-agencies en pop-ups: crew-forecast per event-type, weer-scenario en aanwervings-timing. Minder last-minute flex-paniek. Beta — vroege toegang.',
  },
];

export function getSegment(slug: SegmentSlug): Segment {
  const s = SEGMENTS.find((x) => x.slug === slug);
  if (!s) throw new Error(`Segment niet gevonden: ${slug}`);
  return s;
}
