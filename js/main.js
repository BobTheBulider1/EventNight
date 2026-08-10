/* ==========================================================================
   EVENTNIGHT GMBH - CLEAN SECTION-BY-SECTION PRODUCT & SINGLE PRODUCT DETAIL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // State
  let cart = [];
  let navigationHistory = ['main'];

  // DOM Elements
  const mainView = document.getElementById('mainView');
  const categoryDetailView = document.getElementById('categoryDetailView');
  const productDetailView = document.getElementById('productDetailView');

  const detailTitle = document.getElementById('detailTitle');
  const detailSubtitle = document.getElementById('detailSubtitle');
  const detailBreadcrumb = document.getElementById('detailBreadcrumb');
  const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
  const detailCatalogGrid = document.getElementById('detailCatalogGrid');

  // Single Product DOM Elements
  const singleProductBreadcrumb = document.getElementById('singleProductBreadcrumb');
  const singleProductImg = document.getElementById('singleProductImg');
  const singleProductCategory = document.getElementById('singleProductCategory');
  const singleProductTitle = document.getElementById('singleProductTitle');
  const singleProductMetaCat = document.getElementById('singleProductMetaCat');
  const singleProductQtyInput = document.getElementById('singleProductQtyInput');
  const singleProductAnfragenBtn = document.getElementById('singleProductAnfragenBtn');
  const backFromSingleBtn = document.getElementById('backFromSingleBtn');

  // Logos for Homepage Navigation
  const siteLogos = document.querySelectorAll('.site-logo, .footer-logo');

  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawerClose = document.getElementById('cartDrawerClose');
  const cartHeaderBtn = document.getElementById('cartHeaderBtn');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartItemsBody = document.getElementById('cartItemsBody');
  const cartForm = document.getElementById('cartForm');
  const cartSuccessAlert = document.getElementById('cartSuccessAlert');

  // Current active product being viewed in detail
  let currentDetailProduct = null;

  // Exact Sections Data for ABSPERRUNGEN with enriched B2B metadata
  const absperrungenSections = [
    {
      title: 'ABSPERRGITTER',
      products: [
        {
          id: 'ab1',
          title: 'Mannesmanngitter / Absperrgitter',
          categoryName: 'Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/Mannesmanngitter  Absperrgitter.jpg',
          defaultQty: 10,
          description: 'Schnelles Aufstellen und einfache Handhabung: Verbindung mittels Haken und Öse.<br><br><strong>Einsatzort:</strong> Volksfest, Sportveranstaltung, Konzerte, Straßenfeste, usw.',
          specs: '<strong>Technische Daten:</strong><br>• Länge: 2,50 m<br>• Gewicht: 14 kg<br>• Lieferung: Das Absperrgitter wird im Transportsystem angeliefert.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: '2,50m x 1,10m',
          useCase: 'Festivals, Konzerte, Sportveranstaltungen, Stadtfeste',
          availability: 'sofort',
          articleNr: 'EV-1001',
          related: ['ab3', 'bg1']
        },
        {
          id: 'ab2',
          title: 'Polizeigitter klappbar',
          categoryName: 'Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/Polizeigitter klappbar.jpg',
          defaultQty: 5,
          description: 'Schnelles Aufstellen und einfache Handhabung: Verbindung mittels Haken und Öse.<br><br><strong>Einsatzort:</strong> Volksfest, Sportveranstaltung, Konzerte, Straßenfeste, u.s.w. Einsatz überall dort, wo Druck entsteht.',
          specs: '<strong>Technische Daten:</strong><br>• Höhe: 108 cm<br>• Gesamtbreite: 2,10 m<br>• Tiefe Klappgitter: 0,61 m<br>• Gewicht: 45 kg<br>• Lieferung: Das Polizeigitter wird im Transportgestell angeliefert.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: '2,10m x 1,08m',
          useCase: 'Festivals, Konzerte, Stadtfeste',
          availability: 'sofort',
          articleNr: 'EV-1002',
          related: ['bg1', 'es1']
        },
        {
          id: 'ab3',
          title: 'Erdnagel für Absperrband / Flatterband etc.',
          categoryName: 'Zubehör für Absperrgitter',
          img: 'images/ABSPERRUNGEN/Absperrgitter/erdnagel-300x300.jpg',
          defaultQty: 20,
          description: 'Robuster Stahlerdnagel zur sicheren Befestigung von Absperrband oder Flatterband.',
          specs: '<strong>Technische Daten:</strong><br>• Typ: Sicherheits-Erdnagel mit Öse',
          material: 'Stahl',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Baustellen, Straßenfeste, Private Events',
          availability: 'sofort',
          articleNr: 'EV-1003',
          related: ['ab1']
        }
      ]
    },
    {
      title: 'BÜHNENGITTER',
      products: [
        {
          id: 'bg1',
          title: 'Bühnengitter / Crash Barrier (Alu)',
          categoryName: 'Bühnengitter',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Crash Barrier.jpg',
          defaultQty: 5,
          description: 'Bühnengitter (Crashbarrier) erhalten Sie bei uns wahlweise in Aluminium- oder Stahl-Ausführung. Crash-Barriers werden für die Sicherung von Bühnen auf Konzerten oder als Wellenbrecher bei großen Menschenansammlungen eingesetzt.<br><br>Für Kurvenbau sind Vario-Elemente lieferbar.',
          specs: '<strong>Technische Daten:</strong><br>• Verbindung untereinander: Durch Verschraubung.',
          material: 'Aluminium',
          color: 'Silber',
          dimensions: '1,00m x 1,20m',
          useCase: 'Festivals, Konzerte, Sportveranstaltungen',
          availability: 'sofort',
          articleNr: 'EV-2001',
          related: ['bg2', 'bg3']
        },
        {
          id: 'bg2',
          title: 'Bühnengitter Eck-Element / Vario-Element',
          categoryName: 'Bühnengitter Zubehör',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Eck-Element  Vario-Element.jpg',
          defaultQty: 2,
          description: 'Dieses Element wird verwendet um Ecken in der Bühnenabsperrung zu realisieren.',
          specs: '<strong>Technische Daten:</strong><br>• Geeignet für Ecken & Kurvenbau.',
          material: 'Aluminium',
          color: 'Silber',
          dimensions: 'Vario',
          useCase: 'Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-2002',
          related: ['bg1', 'bg3']
        },
        {
          id: 'bg3',
          title: 'Multicore Kabeldurchlass Element',
          categoryName: 'Bühnengitter Zubehör',
          img: 'images/ABSPERRUNGEN/Buehnengitter/Multicore Kabeldurchlass.jpg',
          defaultQty: 2,
          description: 'Dieses Element wird mit dem Standardelement verbunden und hat eine Aussparung für ein Multicore-Kabel.',
          specs: '<strong>Technische Daten:</strong><br>• Kabeltunnel im Fußteil integriert.',
          material: 'Aluminium',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-2003',
          related: ['bg1', 'bg2']
        }
      ]
    },
    {
      title: 'EINLASSSCHLEUSEN',
      products: [
        {
          id: 'es1',
          title: 'Einlassschleuse',
          categoryName: 'Einlassschleusen',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Einlassschleuse.jpg',
          defaultQty: 2,
          description: 'Einsatz bei Großveranstaltungen, Konzerten, Messen etc.; überall dort wo der Zuschauerstrom reguliert werden muß.',
          specs: '<strong>Technische Daten:</strong><br>• Geländerhöhe: 1,10 m<br>• Durchlassbreite: 0,60 m<br>• Breite Verbindungsbogen: 0,60 m<br>• Breite Endbogen: 0,30 m<br>• Länge (aufgebaut): ca. 2,90 m',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: '2,90m x 1,10m',
          useCase: 'Festivals, Konzerte, Sportveranstaltungen, Messen',
          availability: 'sofort',
          articleNr: 'EV-3001',
          related: ['es2', 'es3']
        },
        {
          id: 'es2',
          title: 'Einlassschleuse mit Korb',
          categoryName: 'Einlassschleusen',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Einlassschleuse mit Korb.jpg',
          defaultQty: 2,
          description: 'Einsatz bei Großveranstaltungen, Konzerten, Messen etc.; überall dort wo der Zuschauerstrom reguliert werden muß.',
          specs: '<strong>Technische Daten:</strong><br>• Geländerhöhe: 1,10 m<br>• Durchlassbreite: 0,60 m<br>• Breite Verbindungsbogen: 0,60 m<br>• Breite Endbogen: 0,30 m<br>• Länge (aufgebaut): ca. 2,90 m',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: '2,90m x 1,10m',
          useCase: 'Festivals, Konzerte, Sportveranstaltungen, Messen',
          availability: 'sofort',
          articleNr: 'EV-3002',
          related: ['es1', 'es3']
        },
        {
          id: 'es3',
          title: 'Korb für Einlassschleuse',
          categoryName: 'Zubehör für Einlassschleuse',
          img: 'images/ABSPERRUNGEN/Einlassschleusen/Korb-fuer-Einlassschleuse.jpg',
          defaultQty: 1,
          description: 'Separierkorb-Aufsatz für Personenvereinzelung an Einlassschleusen.',
          specs: '<strong>Zubehör für Einlassschleuse</strong>',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Festivals, Konzerte, Sportveranstaltungen, Messen',
          availability: 'sofort',
          articleNr: 'EV-3003',
          related: ['es1', 'es2']
        }
      ]
    }
  ];

  const bauzaunSections = [
    {
      title: 'BAUZAUN-ELEMENTE & ABSTÜTZUNG',
      products: [
        {
          id: 'bz1',
          title: 'Bauzaun-Element 3,50m x 2,00m (Mobilzaun)',
          categoryName: 'Bauzaun',
          img: 'images/Bauzaun/Bauzaun-Element.png',
          defaultQty: 10,
          description: 'B2B-Industriestandard Mobilzaun zur Absicherung von Veranstaltungsbereichen oder Baustellen.',
          specs: '<strong>Technische Daten:</strong><br>• Breite: 3,50 m<br>• Höhe: 2,00 m<br>• Maschenweite standardisiert.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: '3,50m x 2,00m',
          useCase: 'Baustellen, Festivals, Konzerte, Messen',
          availability: 'sofort',
          articleNr: 'EV-4001',
          related: ['bz2', 'bz3']
        },
        {
          id: 'bz2',
          title: 'Bauzaun Abstützung / Stütze',
          categoryName: 'Bauzaun Zubehör',
          img: 'images/Bauzaun/Bauzaun-Abstutzung.jpg',
          defaultQty: 5,
          description: 'Stützstrebe zur Standsicherung von Bauzäunen bei Windlasten oder Planenbehängen.',
          specs: '<strong>Technische Daten:</strong><br>• Erdanker-Bohrung integriert.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Baustellen, Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-4002',
          related: ['bz1', 'bz3']
        },
        {
          id: 'bz3',
          title: 'Kreuzverbinder für Bauzaun',
          categoryName: 'Bauzaun Zubehör',
          img: 'images/Bauzaun/Kreuzverbinder-fur-Bauzaun.jpg',
          defaultQty: 10,
          description: 'Stabile Verbindungsschelle zur mechanischen Koppelung von zwei Bauzaun-Elementen.',
          specs: '<strong>Technische Daten:</strong><br>• Schraub-Verriegelung.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Baustellen, Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-4003',
          related: ['bz1', 'bz2']
        }
      ]
    },
    {
      title: 'TOR-SYSTEME & ROLLEN',
      products: [
        {
          id: 'bz4',
          title: 'Drehgelenk Halterung für Bauzauntür / Bauzauntor',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Drehgelenk-Halterung-fur-Bauzauntur-Bauzauntor.jpg',
          defaultQty: 2,
          description: 'Drehgelenk-Aufsatz zur Umrüstung eines Standard-Bauzauns in ein schwenkbares Tor.',
          specs: '<strong>Technische Daten:</strong><br>• Einfache Steckmontage am Standrohr.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Baustellen, Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-4004',
          related: ['bz1', 'bz5', 'bz6']
        },
        {
          id: 'bz5',
          title: 'Einfache Tor Rolle für Bauzaun',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Einfache-Tor-Rolle.jpg',
          defaultQty: 2,
          description: 'Laufrolle zur leichten Führung von Bauzauntoren auf ebenem Untergrund.',
          specs: '<strong>Technische Daten:</strong><br>• Achse gelagert.',
          material: 'Stahl / Kunststoff',
          color: 'Silber / Schwarz',
          dimensions: 'Standard',
          useCase: 'Baustellen, Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-4005',
          related: ['bz1', 'bz4']
        },
        {
          id: 'bz6',
          title: 'Tor Rolle mit Gestell für Bauzaun',
          categoryName: 'Bauzaun Tor Zubehör',
          img: 'images/Bauzaun/Tor-Rolle-mit-Gestell.jpg',
          defaultQty: 2,
          description: 'Robustes Laufrad-Gestell für hohe Belastungen und häufig genutzte Bauzauntore.',
          specs: '<strong>Technische Daten:</strong><br>• Anschraubbares Gestell.',
          material: 'Stahl (feuerverzinkt)',
          color: 'Silber',
          dimensions: 'Standard',
          useCase: 'Baustellen, Festivals, Konzerte',
          availability: 'sofort',
          articleNr: 'EV-4006',
          related: ['bz1', 'bz4']
        }
      ]
    }
  ];

  // Fully comprehensive lookup structure for all categories
  const categoryData = {
    absperrgitter: {
      title: 'ABSPERRUNGEN',
      subtitle: 'Absperrgitter, Bühnengitter & Einlassschleusen im Überblick',
      sections: absperrungenSections
    },
    bauzaun: {
      title: 'BAUZAUN',
      subtitle: 'Bauzäune, Abstützungen, Verbinder & Tor-Rollen im Überblick',
      sections: bauzaunSections
    },
    bodenschutz: {
      title: 'BODENSCHUTZ',
      subtitle: 'Bodenschutz- und Schwerlastplatten zur Geländeabsicherung',
      sections: [
        {
          title: 'BODENSCHUTZPLATTEN',
          products: [
            {
              id: 'boden1',
              title: 'Bodenschutzplatte / Fahrstraße 2,00m x 1,00m',
              categoryName: 'Bodenschutz',
              img: 'images/Bodenschutz/Bodenschutz.png',
              defaultQty: 50,
              description: 'Extrem belastbare Kunststoffplatte zum Schutz des Bodens und zum Bau temporärer Fahrstraßen.',
              specs: '<strong>Technische Daten:</strong><br>• Maße: 2,00m x 1,00m<br>• Belastbarkeit: bis zu 50 Tonnen<br>• Strukturierte Anti-Rutsch-Oberfläche.',
              material: 'Kunststoff (recycelt)',
              color: 'Schwarz',
              dimensions: '2,00m x 1,00m',
              useCase: 'Festivals, Baustellen, Sportveranstaltungen, Messen',
              availability: 'sofort',
              articleNr: 'EV-5001',
              related: ['bz1', 'stapler1']
            }
          ]
        }
      ]
    },
    fluchtwege: {
      title: 'FLUCHTWEGE',
      subtitle: 'Fluchtwegbeleuchtung & Notausgangs-Banner',
      sections: [
        {
          title: 'NOTAUSGANGS-BANNER',
          products: [
            {
              id: 'flucht1',
              title: 'Großes Notausgangsbanner (2,00m x 0,50m)',
              categoryName: 'Fluchtwege Banner',
              img: 'images/Fluchtwege/Gro?er Notausgangsbanner.png',
              defaultQty: 2,
              description: 'Gut sichtbares, normgerechtes Notausgangs-Banner zur Kennzeichnung von Fluchtwegen an Zäunen.',
              specs: '<strong>Technische Daten:</strong><br>• B1 zertifiziert (schwer entflammbar)<br>• Geöst zur einfachen Montage.',
              material: 'PVC-Gewebeplane',
              color: 'Grün / Weiß',
              dimensions: '2,00m x 0,50m',
              useCase: 'Festivals, Konzerte, Messen, Stadtfeste',
              availability: 'sofort',
              articleNr: 'EV-6001',
              related: ['flucht2', 'bz1']
            },
            {
              id: 'flucht2',
              title: 'Riesiges Notausgangsbanner (4,00m x 1,00m)',
              categoryName: 'Fluchtwege Banner',
              img: 'images/Fluchtwege/Riesiger Notausgangsbanner.png',
              defaultQty: 2,
              description: 'Überdimensionales Notausgangsbanner für maximale Sichtbarkeit aus großen Entfernungen auf Eventgeländen.',
              specs: '<strong>Technische Daten:</strong><br>• B1 zertifiziert (schwer entflammbar)<br>• Extrem reißfest.',
              material: 'PVC-Gewebeplane',
              color: 'Grün / Weiß',
              dimensions: '4,00m x 1,00m',
              useCase: 'Festivals, Konzerte, Sportveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-6002',
              related: ['flucht1', 'bz1']
            }
          ]
        }
      ]
    },
    gator: {
      title: 'GATOR',
      subtitle: 'Allrad-Nutzfahrzeuge für Eventgelände',
      sections: [
        {
          title: 'GATOR NUTZFAHRZEUGE',
          products: [
            {
              id: 'gator1',
              title: 'John Deere Gator Nutzfahrzeug (Diesel, 4x4)',
              categoryName: 'Gator',
              img: 'images/Gator/Gator.png',
              defaultQty: 1,
              description: 'Praktisches Geländefahrzeug mit Ladefläche für Transport- und Logistikaufgaben auf Ihrem Event.',
              specs: '<strong>Technische Daten:</strong><br>• Antrieb: Allrad (4x4)<br>• Kraftstoff: Diesel<br>• Ladekipper vorhanden.',
              material: 'Mischkonstruktion',
              color: 'Grün / Gelb',
              dimensions: 'Nutzfahrzeug',
              useCase: 'Festivals, Messen, Sportveranstaltungen, Logistik',
              availability: 'sofort',
              articleNr: 'EV-7001',
              related: ['stapler1', 'boden1']
            }
          ]
        }
      ]
    },
    kassenhaus: {
      title: 'KASSENHAUS',
      subtitle: 'Mobile Kassenhäuschen & Kassencontainer',
      sections: [
        {
          title: 'MOBIL-KASSEN & CONTAINER',
          products: [
            {
              id: 'kass1',
              title: 'Kassenanhänger fahrbar (2 Kassenplätze)',
              categoryName: 'Kassenhaus',
              img: 'images/KASSEN/Kassenanh?nger.png',
              defaultQty: 1,
              description: 'Fahrbarer Kassenanhänger mit integrierten Arbeitsplätzen, Beleuchtung und Stromanschlüssen.',
              specs: '<strong>Technische Daten:</strong><br>• Kassenfenster: 2 Plätze nebeneinander<br>• Einfach zu rangieren.',
              material: 'Stahl / Holz',
              color: 'Weiß',
              dimensions: 'Kompakt-Anhänger',
              useCase: 'Festivals, Stadtfeste, Messen, Konzerte',
              availability: 'sofort',
              articleNr: 'EV-8001',
              related: ['kass2', 'kass3']
            },
            {
              id: 'kass2',
              title: 'Kassencontainer Event (Premium)',
              categoryName: 'Kassenhaus',
              img: 'images/KASSEN/Kassencontainer Event.png',
              defaultQty: 1,
              description: 'Verglaster Event-Kassencontainer für repräsentative Einlassbereiche mit hoher Frequenz.',
              specs: '<strong>Technische Daten:</strong><br>• Heizung/Klimatisierung vorbereitet<br>• Sicherheitsverglasung.',
              material: 'Stahlrahmen / Glas',
              color: 'Anthrazit',
              dimensions: 'Premium-Container',
              useCase: 'Festivals, Messen, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-8002',
              related: ['kass1', 'kass3']
            },
            {
              id: 'kass3',
              title: 'Kassencontainer Standard (Kompakt)',
              categoryName: 'Kassenhaus',
              img: 'images/KASSEN/Kassencontainer.png',
              defaultQty: 1,
              description: 'Standardisierter Kassencontainer, robust und sicher abschließbar für den Außeneinsatz.',
              specs: '<strong>Technische Daten:</strong><br>• Stromanschluss integriert<br>• Diebstahlgesichert.',
              material: 'Stahl',
              color: 'Grau / Weiß',
              dimensions: 'Standard-Container',
              useCase: 'Festivals, Sportveranstaltungen, Stadtfeste',
              availability: 'sofort',
              articleNr: 'EV-8003',
              related: ['kass1', 'kass2']
            }
          ]
        }
      ]
    },
    mietmoebel: {
      title: 'MIETMÖBEL',
      subtitle: 'Tische, Stühle, Barhocker & Loungemöbel',
      sections: [
        {
          title: 'STÜHLE & SITZE',
          products: [
            {
              id: 'moeb1',
              title: 'Bankettstuhl Polster (Blau/Schwarz)',
              categoryName: 'Mietmöbel Stühle',
              img: 'images/MIETM?BEL/Bankettstuhl.png',
              defaultQty: 50,
              description: 'Bequemer und stapelbarer Stuhl mit Polsterung für Gala-Events oder Konferenzen.',
              specs: '<strong>Technische Daten:</strong><br>• Stapelbar: ja<br>• Polsterung: hoher Sitzkomfort.',
              material: 'Metall / Polsterstoff',
              color: 'Blau / Schwarz',
              dimensions: 'Standard',
              useCase: 'Firmenveranstaltungen, Hochzeiten, Private Events',
              availability: 'sofort',
              articleNr: 'EV-9001',
              related: ['moeb2', 'moeb3', 'moeb4']
            },
            {
              id: 'moeb2',
              title: 'Bankettstuhl mit Husse (Weiß)',
              categoryName: 'Mietmöbel Stühle',
              img: 'images/MIETM?BEL/Bankettstuhl Husse.png',
              defaultQty: 50,
              description: 'Festlich eingekleideter Bankettstuhl mit elegant fließender weißer Stoffhusse.',
              specs: '<strong>Technische Daten:</strong><br>• Inklusive Husse (gereinigt geliefert).',
              material: 'Metall / Stoffbezug',
              color: 'Weiß',
              dimensions: 'Standard',
              useCase: 'Hochzeiten, Gala, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9002',
              related: ['moeb1', 'moeb4']
            },
            {
              id: 'moeb8',
              title: 'Open Air Stuhl (Stapelbar, wetterfest)',
              categoryName: 'Mietmöbel Stühle',
              img: 'images/MIETM?BEL/Open Air Stuhl.png',
              defaultQty: 100,
              description: 'Robuster, wetterfester Kunststoffstuhl für Großbestuhlung unter freiem Himmel.',
              specs: '<strong>Technische Daten:</strong><br>• Regenwasserablauf im Sitz<br>• Äußerst leicht.',
              material: 'Kunststoff',
              color: 'Schwarz',
              dimensions: 'Stapelbar',
              useCase: 'Festivals, Konzerte, Open-Air Events',
              availability: 'sofort',
              articleNr: 'EV-9008',
              related: ['moeb9', 'moeb7']
            },
            {
              id: 'moeb9',
              title: 'Reihenverbinder für Open Air Stuhl',
              categoryName: 'Mietmöbel Zubehör',
              img: 'images/MIETM?BEL/Verbinder Open Air Stuhl.png',
              defaultQty: 100,
              description: 'Kopplungselement zur vorschriftsmäßigen Verbindung von Stuhlreihen auf Events.',
              specs: '<strong>Technische Daten:</strong><br>• Erfüllt Versammlungsstättenverordnung.',
              material: 'Kunststoff',
              color: 'Schwarz',
              dimensions: 'Zubehör',
              useCase: 'Festivals, Konzerte, Großveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9009',
              related: ['moeb8']
            }
          ]
        },
        {
          title: 'TISCHE & STEHTISCHE',
          products: [
            {
              id: 'moeb3',
              title: 'Banketttisch Rechteckig (2,00m x 0,80m)',
              categoryName: 'Mietmöbel Tische',
              img: 'images/MIETM?BEL/Banketttisch.png',
              defaultQty: 10,
              description: 'Stabiler Klapptisch für Gala-Dinner, Präsentationen oder als Buffettisch.',
              specs: '<strong>Technische Daten:</strong><br>• Tischbeine einklappbar<br>• Transportfreundlich.',
              material: 'Holzplatte / Metallgestell',
              color: 'Natur / Silber',
              dimensions: '2,00m x 0,80m',
              useCase: 'Hochzeiten, Firmenveranstaltungen, Private Events, Messen',
              availability: 'sofort',
              articleNr: 'EV-9003',
              related: ['moeb1', 'moeb4']
            },
            {
              id: 'moeb4',
              title: 'Banketttisch Rund (Ø 1,80m)',
              categoryName: 'Mietmöbel Tische',
              img: 'images/MIETM?BEL/Banketttisch Rund.png',
              defaultQty: 10,
              description: 'Runder Hochzeitstisch für gehobene Bestuhlungsgruppen mit 8 bis 10 Personen.',
              specs: '<strong>Technische Daten:</strong><br>• Gestell klappbar<br>• Plattendurchmesser: 1,80 m.',
              material: 'Holzplatte / Metallgestell',
              color: 'Weiß / Silber',
              dimensions: 'Ø 1,80m',
              useCase: 'Hochzeiten, Gala, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9004',
              related: ['moeb2', 'moeb3']
            },
            {
              id: 'moeb7',
              title: 'Festzeltgarnitur 50er (Tisch + 2 Bänke)',
              categoryName: 'Mietmöbel Tische',
              img: 'images/MIETM?BEL/Festzeltgarnitur 50er.png',
              defaultQty: 5,
              description: 'Klassische Bierzeltgarnitur bestehend aus einem stabilen Tisch (50cm) und zwei Holzbänken.',
              specs: '<strong>Technische Daten:</strong><br>• Klappbare Schnappschlösser<br>• Brauereiqualität.',
              material: 'Fichtenholz / Stahlwinkel',
              color: 'Natur / Grün',
              dimensions: '50cm Tischbreite',
              useCase: 'Stadtfeste, Festivals, Private Events',
              availability: 'sofort',
              articleNr: 'EV-9007',
              related: ['zelt1', 'moeb8']
            }
          ]
        },
        {
          title: 'LOUNGE, BAR & BELEUCHTUNG',
          products: [
            {
              id: 'moeb5',
              title: 'Barhocker Z-Form Chrome',
              categoryName: 'Mietmöbel Lounge',
              img: 'images/MIETM?BEL/Barhocker Z.png',
              defaultQty: 20,
              description: 'Moderner Barhocker mit geschwungener Z-Linie und Kunstleder-Sitzpolster.',
              specs: '<strong>Technische Daten:</strong><br>• Stabiler Standfuß verchromt.',
              material: 'Stahl verchromt / Kunstleder',
              color: 'Silber / Schwarz',
              dimensions: 'Standard-Barhöhe',
              useCase: 'Firmenveranstaltungen, Messen, Private Events',
              availability: 'sofort',
              articleNr: 'EV-9005',
              related: ['moeb6', 'moeb10']
            },
            {
              id: 'moeb10',
              title: 'Cocktailsessel Leder (Schwarz)',
              categoryName: 'Mietmöbel Lounge',
              img: 'images/MIETM?BEL/Sessel Cocktail.png',
              defaultQty: 4,
              description: 'Eleganter Ledersessel für VIP-Bereiche, Künstlerlounges oder Messe-Loungeecken.',
              specs: '<strong>Technische Daten:</strong><br>• Echtes Lederpolster<br>• Bodenschonende Gleiter.',
              material: 'Leder / Holzrahmen',
              color: 'Schwarz',
              dimensions: 'Kompakt-Sessel',
              useCase: 'Lounge, VIP, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9010',
              related: ['moeb11', 'moeb6']
            },
            {
              id: 'moeb11',
              title: 'Sofa 2-Sitzer Leder (Schwarz)',
              categoryName: 'Mietmöbel Lounge',
              img: 'images/MIETM?BEL/Sofa 2er.png',
              defaultQty: 2,
              description: 'Passendes 2-Sitzer-Sofa zur Ergänzung stilvoller VIP- und Lounge-Garnituren.',
              specs: '<strong>Technische Daten:</strong><br>• Pflegeleichte Oberfläche<br>• Hoher Sitzkomfort.',
              material: 'Leder / Holzrahmen',
              color: 'Schwarz',
              dimensions: '2-Sitzer',
              useCase: 'Lounge, VIP, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9011',
              related: ['moeb10', 'moeb6']
            },
            {
              id: 'moeb6',
              title: 'Couchtisch Holz/Metal',
              categoryName: 'Mietmöbel Tische',
              img: 'images/MIETM?BEL/Couchtisch.png',
              defaultQty: 5,
              description: 'Flacher Beistell- und Couchtisch im modernen Industrial-Look für Sitzgruppen.',
              specs: '<strong>Technische Daten:</strong><br>• Passend zu Cocktailsessel & Sofa.',
              material: 'Holzplatte / Eisengestell',
              color: 'Dunkelbraun / Schwarz',
              dimensions: 'Kompakt-Couchtisch',
              useCase: 'Lounge, VIP, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9006',
              related: ['moeb10', 'moeb11']
            },
            {
              id: 'moeb12',
              title: 'Stehlampe Modern (Alu)',
              categoryName: 'Mietmöbel Zubehör',
              img: 'images/MIETM?BEL/Stehlampe.png',
              defaultQty: 2,
              description: 'Dekorative Standleuchte für stimmungsvolle indirekte Beleuchtung in Lounges.',
              specs: '<strong>Technische Daten:</strong><br>• Kabellänge: 2m<br>• Fassung E27.',
              material: 'Aluminium / Stoffschirm',
              color: 'Silber / Weiß',
              dimensions: '1,60m Höhe',
              useCase: 'Lounge, VIP, Firmenveranstaltungen',
              availability: 'sofort',
              articleNr: 'EV-9012',
              related: ['moeb10', 'moeb11']
            }
          ]
        }
      ]
    },
    stapler: {
      title: 'STAPLER',
      subtitle: 'Geländestapler & Gabelstapler',
      sections: [
        {
          title: 'GABELSTAPLER',
          products: [
            {
              id: 'stapler1',
              title: 'Manitou MC 30-4 Geländestapler (3t Hubkraft)',
              categoryName: 'Stapler',
              img: 'images/Stapler/Manitu MC 30-4.png',
              defaultQty: 1,
              description: 'Geländegängiger Großstapler für unebene Untergründe beim Auf- und Abbau von Bühnen und Zelten.',
              specs: '<strong>Technische Daten:</strong><br>• Hubleistung: 3.000 kg (3t)<br>• Allradantrieb für raues Gelände.',
              material: 'Stahl / Gummi',
              color: 'Rot / Schwarz',
              dimensions: 'Allrad-Stapler',
              useCase: 'Logistik, Aufbau, Abbau, Festivals, Baustellen',
              availability: 'sofort',
              articleNr: 'EV-7002',
              related: ['gator1', 'boden1']
            }
          ]
        }
      ]
    },
    zelte: {
      title: 'ZELTE',
      subtitle: 'Faltzelte & Event-Pavillons',
      sections: [
        {
          title: 'FALTZELTE',
          products: [
            {
              id: 'zelt1',
              title: 'Ruck Zuck Faltzelt (3,00m x 3,00m, Wasserdicht)',
              categoryName: 'Zelte',
              img: 'images/ZELTE/Ruck Zuck Zelte.png',
              defaultQty: 2,
              description: 'Hochwertiges, sekundenschnell errichtbares Faltzelt zum Wetterschutz für Einlässe, Gastro oder Techniker.',
              specs: '<strong>Technische Daten:</strong><br>• Grundfläche: 3,00m x 3,00m<br>• Inklusive 4 Seitenteile.',
              material: 'Alu-Scherengestell / PVC-Plane',
              color: 'Weiß',
              dimensions: '3,00m x 3,00m',
              useCase: 'Festivals, Stadtfeste, Private Events, Messen',
              availability: 'sofort',
              articleNr: 'EV-8501',
              related: ['moeb7', 'bz1']
            }
          ]
        }
      ]
    },
    verkehrstechnik: {
      title: 'VERKEHRSTECHNIK',
      subtitle: 'Baken, Schranken & Verkehrsleitkegel',
      sections: [
        {
          title: 'VERKEHRSTECHNIK',
          products: [
            {
              id: 'verkehr1',
              title: 'Leitbake / Warnbake mit LED-Leuchte',
              categoryName: 'Verkehrstechnik',
              img: 'images/event-tech.jpg',
              defaultQty: 10,
              description: 'Warnbake zur Kennzeichnung von Engstellen, Absperrungen oder Fahrspuren auf Eventparkplätzen.',
              specs: '<strong>Technische Daten:</strong><br>• Standfuß inklusive<br>• LED-Blinkleuchte Dämmerungsautomatik.',
              material: 'Kunststoff / Gummi-Fuß',
              color: 'Rot / Weiß / Gelb',
              dimensions: 'Warnbake standardisiert',
              useCase: 'Verkehrsleitung, Baustellen, Festivals',
              availability: 'sofort',
              articleNr: 'EV-9501',
              related: ['verkehr2', 'bz1']
            },
            {
              id: 'verkehr2',
              title: 'Verkehrsleitkegel 50cm (Lübecker Hütchen)',
              categoryName: 'Verkehrstechnik',
              img: 'images/event-tech.jpg',
              defaultQty: 20,
              description: 'Schnelle Verkehrsführung und Abgrenzung auf Zufahrtsstraßen, Eventflächen oder im Baustellenbetrieb.',
              specs: '<strong>Technische Daten:</strong><br>• Höhe: 50 cm<br>• Retroreflektierend.',
              material: 'Gummi-Mischung',
              color: 'Rot / Weiß',
              dimensions: '50cm Höhe',
              useCase: 'Verkehrsleitung, Sportveranstaltung, Baustellen',
              availability: 'sofort',
              articleNr: 'EV-9502',
              related: ['verkehr1']
            }
          ]
        }
      ]
    }
  };

  // Helper map for all products (automatically populated from categoryData)
  const allProductsMap = {};
  Object.keys(categoryData).forEach(catKey => {
    categoryData[catKey].sections.forEach(sec => {
      sec.products.forEach(p => {
        p.parentCatKey = catKey;
        allProductsMap[p.id] = p;
      });
    });
  });

  /* ------------------------------------------------------------------------
     NAVBAR MODE SWITCHER (CLASSIC HOMEPAGE VS SUBPAGE/CART/CHECKOUT)
     ------------------------------------------------------------------------ */
  const mainNavLinks = document.getElementById('mainNavLinks');
  const eventbedarfNavDropdown = document.getElementById('eventbedarfNavDropdown');

  function updateNavbarMode(isSubpage) {
    if (isSubpage) {
      if (mainNavLinks) mainNavLinks.style.display = 'none';
      if (eventbedarfNavDropdown) eventbedarfNavDropdown.style.display = 'inline-block';
    } else {
      if (mainNavLinks) mainNavLinks.style.display = 'flex';
      if (eventbedarfNavDropdown) eventbedarfNavDropdown.style.display = 'none';
    }
  }

  /* ------------------------------------------------------------------------
     LOGO CLICK -> ALWAYS GO TO HOMEP      1. SUBPAGE CATEGORY NAVIGATION
      ------------------------------------------------------------------------ */
  let activeCategoryKey = '';
  let isFilterSetup = false;

  const catalogSearchInput = document.getElementById('catalogSearchInput');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const filteredProductsCount = document.getElementById('filteredProductsCount');
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

  function filterAndRenderCatalog() {
    if (!activeCategoryKey) return;
    const data = categoryData[activeCategoryKey === 'bauzaeune' ? 'bauzaun' : activeCategoryKey];
    if (!data) return;

    const searchTerm = catalogSearchInput ? catalogSearchInput.value.toLowerCase().trim() : '';

    // Collect checked filters
    const activeFilters = {
      material: [],
      color: [],
      useCase: [],
      availability: []
    };

    filterCheckboxes.forEach(cb => {
      if (cb.checked) {
        activeFilters[cb.getAttribute('data-filter')].push(cb.value);
      }
    });

    // Gather all products in this category
    let allCatProducts = [];
    data.sections.forEach(sec => {
      sec.products.forEach(p => {
        allCatProducts.push(p);
      });
    });

    // Filter products
    const filtered = allCatProducts.filter(item => {
      // 1. Search term match
      if (searchTerm) {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchTerm) ||
          (item.description && item.description.toLowerCase().includes(searchTerm)) ||
          (item.articleNr && item.articleNr.toLowerCase().includes(searchTerm)) ||
          (item.categoryName && item.categoryName.toLowerCase().includes(searchTerm));
        
        if (!matchesSearch) return false;
      }

      // 2. Material filter
      if (activeFilters.material.length > 0) {
        if (!item.material) return false;
        const matchesMat = activeFilters.material.some(val => 
          item.material.toLowerCase().includes(val.toLowerCase())
        );
        if (!matchesMat) return false;
      }

      // 3. Color filter
      if (activeFilters.color.length > 0) {
        if (!item.color) return false;
        const matchesCol = activeFilters.color.some(val => 
          item.color.toLowerCase().includes(val.toLowerCase())
        );
        if (!matchesCol) return false;
      }

      // 4. UseCase filter
      if (activeFilters.useCase.length > 0) {
        if (!item.useCase) return false;
        const matchesUC = activeFilters.useCase.some(val => 
          item.useCase.toLowerCase().includes(val.toLowerCase())
        );
        if (!matchesUC) return false;
      }

      // 5. Availability filter
      if (activeFilters.availability.length > 0) {
        if (!item.availability) return false;
        const matchesAvail = activeFilters.availability.some(val => 
          item.availability.toLowerCase().includes(val.toLowerCase())
        );
        if (!matchesAvail) return false;
      }

      return true;
    });

    // Display count
    if (filteredProductsCount) {
      filteredProductsCount.innerText = filtered.length;
    }

    // Render results
    detailCatalogGrid.innerHTML = '';

    const hasActiveFilters = searchTerm || Object.values(activeFilters).some(arr => arr.length > 0);

    if (filtered.length === 0) {
      detailCatalogGrid.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: #777; width: 100%; grid-column: 1 / -1;">
          <i class="fas fa-search" style="font-size: 2.5rem; color: #CCC; margin-bottom: 1rem;"></i>
          <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: #111;">Keine Mietartikel gefunden</p>
          <p style="font-size: 0.9rem; color: #666;">Passen Sie Ihre Suche oder die ausgewählten Filter an.</p>
        </div>
      `;
      return;
    }

    if (hasActiveFilters) {
      // Render as a unified grid when filters are active
      const gridBlock = document.createElement('div');
      gridBlock.className = 'subpage-products-grid';
      gridBlock.innerHTML = filtered.map(item => `
        <div class="product-row-card product-card" data-id="${item.id}" data-title="${item.title}">
          <div class="product-row-img">
            <img src="${item.img}" alt="${item.title}">
          </div>
          <div class="product-row-title">${item.title}</div>
          
          <div style="padding: 0 1rem; margin-top: -0.5rem; margin-bottom: 0.5rem; text-align: left; font-size: 0.8rem; color: #666;">
            <div>Art-Nr: ${item.articleNr || 'EV-0000'}</div>
          </div>

          <div class="product-row-action" onclick="event.stopPropagation()">
            <div class="qty-picker">
              <button class="qty-btn qty-minus">-</button>
              <input type="text" class="qty-input" value="${item.defaultQty || 1}" inputmode="numeric">
              <button class="qty-btn qty-plus">+</button>
            </div>
            <button class="add-cart-btn" style="padding: 0.55rem 0.85rem;">
              <i class="fas fa-plus"></i> Anfragen
            </button>
          </div>
        </div>
      `).join('');
      detailCatalogGrid.appendChild(gridBlock);
    } else {
      // Render original section-grouped layout when no search/filters are active
      data.sections.forEach(sec => {
        const secBlock = document.createElement('div');
        secBlock.className = 'subpage-section-block';
        secBlock.innerHTML = `
          <div class="subpage-dark-bar">
            <h2>${sec.title}</h2>
          </div>
          <div class="subpage-products-grid">
            ${sec.products.map(item => `
              <div class="product-row-card product-card" data-id="${item.id}" data-title="${item.title}">
                <div class="product-row-img">
                  <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="product-row-title">${item.title}</div>
                
                <div style="padding: 0 1rem; margin-top: -0.5rem; margin-bottom: 0.5rem; text-align: left; font-size: 0.8rem; color: #666;">
                  <div>Art-Nr: ${item.articleNr || 'EV-0000'}</div>
                </div>

                <div class="product-row-action" onclick="event.stopPropagation()">
                  <div class="qty-picker">
                    <button class="qty-btn qty-minus">-</button>
                    <input type="text" class="qty-input" value="${item.defaultQty || 1}" inputmode="numeric">
                    <button class="qty-btn qty-plus">+</button>
                  </div>
                  <button class="add-cart-btn" style="padding: 0.55rem 0.85rem;">
                    <i class="fas fa-plus"></i> Anfragen
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        detailCatalogGrid.appendChild(secBlock);
      });
    }

    attachProductCardListeners(detailCatalogGrid);
    initImageZoomHandlers(detailCatalogGrid);
  }

  function openCategorySubpage(catKey, pushState = true) {
    detailCatalogGrid.innerHTML = '';

    // Standardize keys (e.g. 'bauzaeune' -> 'bauzaun')
    let key = catKey === 'bauzaeune' ? 'bauzaun' : catKey;
    activeCategoryKey = key;

    // Reset filters
    if (catalogSearchInput) catalogSearchInput.value = '';
    filterCheckboxes.forEach(cb => cb.checked = false);

    // Setup filter listeners once
    if (!isFilterSetup) {
      if (catalogSearchInput) {
        catalogSearchInput.addEventListener('input', filterAndRenderCatalog);
      }
      filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', filterAndRenderCatalog);
      });
      if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
          if (catalogSearchInput) catalogSearchInput.value = '';
          filterCheckboxes.forEach(cb => cb.checked = false);
          filterAndRenderCatalog();
        });
      }
      isFilterSetup = true;
    }

    const data = categoryData[key];

    if (data) {
      detailTitle.innerText = data.title;
      detailSubtitle.innerText = data.subtitle;
      detailBreadcrumb.innerText = data.title;

      filterAndRenderCatalog();
    } else {
      // Fallback
      detailTitle.innerText = catKey.toUpperCase();
      detailSubtitle.innerText = `Mietartikel der Kategorie ${catKey.toUpperCase()}`;
      detailBreadcrumb.innerText = catKey.toUpperCase();

      const secBlock = document.createElement('div');
      secBlock.className = 'subpage-section-block';
      secBlock.innerHTML = `
        <div class="subpage-dark-bar">
          <h2>${catKey.toUpperCase()}</h2>
        </div>
        <div class="subpage-products-grid">
          <p style="padding: 2rem; color: #999999; text-align: center;">Keine Artikel in dieser Kategorie gefunden.</p>
        </div>
      `;
      detailCatalogGrid.appendChild(secBlock);
    }

    if (cartView) cartView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    productDetailView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'category', catKey: catKey }, '', '#kategorie-' + catKey);
    }
  }

  function showMainView(pushState = true) {
    if (cartView) cartView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    productDetailView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    mainView.style.display = 'block';
    updateNavbarMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'main' }, '', '#start');
    }
  }

  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  /* ------------------------------------------------------------------------
     2. SINGLE PRODUCT DETAIL VIEW
     ------------------------------------------------------------------------ */
  const cadImagesMap = {
    ab1: 'images/cad_3views/product_view_absperrgitter.jpg',
    ab2: 'images/cad_3views/product_view_polizeigitter.jpg',
    ab3: 'images/cad_3views/product_view_erdnagel.jpg',
    bg1: 'images/cad_3views/product_view_buehnen.jpg',
    bg2: 'images/cad_3views/product_view_buehnengitter_eck.jpg',
    bg3: 'images/cad_3views/product_view_kabeldurchlass.jpg',
    es1: 'images/cad_3views/product_view_einlassschleuse.jpg',
    es2: 'images/cad_3views/product_view_einlassschleuse_korb.jpg',
    es3: 'images/cad_3views/product_view_korb.jpg',
    bz1: 'images/cad_3views/product_view_bauzaun.jpg',
    bz2: 'images/cad_3views/product_view_abstutzung.jpg',
    bz3: 'images/cad_3views/product_view_kreuzverbinder.jpg',
    bz4: 'images/cad_3views/product_view_drehgelenk.jpg'
  };

  function openSingleProductView(productId, pushState = true) {
    const product = allProductsMap[productId] || {
      id: productId,
      title: 'Mietartikel',
      categoryName: 'Eventbedarf',
      img: 'images/Eventnight-Logo-ausgeschnitten.png',
      defaultQty: 1
    };

    currentDetailProduct = product;
    const parentCatKey = getCategoryKeyForProduct(product);
    const catDisplayName = product.categoryName || (parentCatKey === 'bauzaun' ? 'Bauzaun' : 'Absperrgitter');

    singleProductBreadcrumb.innerHTML = `<a href="#" class="breadcrumb-home-link">Start</a> / <a href="#" class="breadcrumb-cat-link">${catDisplayName}</a> / <strong style="color:#111;">${product.title}</strong>`;
    singleProductImg.src = product.img;
    singleProductImg.alt = product.title;
    singleProductCategory.innerText = catDisplayName;
    singleProductTitle.innerText = product.title;
    singleProductMetaCat.innerText = `Kategorie: ${catDisplayName}`;
    
    const artNrEl = document.getElementById('singleProductMetaArtNr');
    if (artNrEl) {
      artNrEl.innerText = `Artikel-Nr.: ${product.articleNr || 'EV-' + product.id.toUpperCase()}`;
    }

    if (singleProductQtyInput) singleProductQtyInput.value = product.defaultQty || 1;

    // Populate Description & Technical Specifications dynamically
    const descEl = document.getElementById('singleProductDescription');
    const specsEl = document.getElementById('singleProductSpecs');
    const detailAccordion = document.querySelector('.product-details-accordion');

    if (product.description || product.specs) {
      if (detailAccordion) detailAccordion.style.display = 'block';
      if (descEl) descEl.innerHTML = product.description || '';
      if (specsEl) {
        if (product.specs) {
          specsEl.style.display = 'block';
          specsEl.innerHTML = product.specs;
        } else {
          specsEl.style.display = 'none';
        }
      }
    } else {
      if (detailAccordion) detailAccordion.style.display = 'none';
    }

    // Reset view modes to 2D Photo by default when opening any product
    const view2DBtn = document.getElementById('view2DBtn');
    const view3DBtn = document.getElementById('view3DBtn');
    const viewCADBtn = document.getElementById('viewCADBtn');
    const product2DContainer = document.getElementById('product2DContainer');
    const product3DContainer = document.getElementById('product3DContainer');
    const productCADContainer = document.getElementById('productCADContainer');
    const singleProductCADImg = document.getElementById('singleProductCADImg');

    if (view2DBtn) view2DBtn.classList.add('active');
    if (view3DBtn) view3DBtn.classList.remove('active');
    if (viewCADBtn) viewCADBtn.classList.remove('active');

    if (product2DContainer) product2DContainer.style.display = 'flex';
    if (product3DContainer) product3DContainer.style.display = 'none';
    if (productCADContainer) productCADContainer.style.display = 'none';

    if (current3DAnimId) cancelAnimationFrame(current3DAnimId);

    // Check CAD drawing availability
    const cadImgUrl = cadImagesMap[product.id];
    if (cadImgUrl) {
      if (viewCADBtn) {
        viewCADBtn.style.display = 'inline-block';
      }
      if (singleProductCADImg) {
        singleProductCADImg.src = cadImgUrl;
      }
    } else {
      if (viewCADBtn) {
        viewCADBtn.style.display = 'none';
      }
    }

    // Populate Frequently Rented Together
    const relatedSection = document.getElementById('relatedProductsSection');
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedSection && relatedGrid) {
      relatedGrid.innerHTML = '';
      const relatedIds = product.related || [];
      const relatedItems = relatedIds.map(id => allProductsMap[id]).filter(Boolean);

      if (relatedItems.length > 0) {
        relatedSection.style.display = 'block';
        relatedItems.forEach(item => {
          const card = document.createElement('div');
          card.className = 'product-row-card product-card';
          card.style.background = '#FFFFFF';
          card.style.border = '1px solid #EAEAEA';
          card.style.padding = '1.25rem';
          card.style.borderRadius = 'var(--radius-md)';
          card.style.textAlign = 'center';
          card.style.cursor = 'pointer';
          card.style.display = 'flex';
          card.style.flexDirection = 'column';
          card.style.justifyContent = 'space-between';
          card.onclick = () => openSingleProductView(item.id);

          card.innerHTML = `
            <div>
              <img src="${item.img}" style="width: 100%; height: 120px; object-fit: contain; margin-bottom: 0.75rem; background: #F9FAFB; border-radius: var(--radius-sm); border: 1px solid #F3F4F6; padding: 4px;">
              <h5 style="font-size: 0.95rem; font-weight: 800; color: #111; margin-bottom: 0.25rem; font-family: var(--font-heading); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.5rem; line-height: 1.25;">${item.title}</h5>
              <span style="font-size: 0.78rem; color: #888; display: block; margin-bottom: 0.75rem;">Art-Nr: ${item.articleNr || 'EV-0000'}</span>
            </div>
            <button style="width: 100%; border: none; background: var(--brand-yellow); color: var(--dark-bg); padding: 0.45rem 0.75rem; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: var(--transition);">
              Details ansehen
            </button>
          `;
          relatedGrid.appendChild(card);
        });
      } else {
        relatedSection.style.display = 'none';
      }
    }

    // Attach breadcrumb links
    const breadHome = singleProductBreadcrumb.querySelector('.breadcrumb-home-link');
    if (breadHome) {
      breadHome.onclick = (e) => {
        e.preventDefault();
        showMainView();
      };
    }

    const breadCat = singleProductBreadcrumb.querySelector('.breadcrumb-cat-link');
    if (breadCat) {
      breadCat.onclick = (e) => {
        e.preventDefault();
        openCategorySubpage(parentCatKey);
      };
    }

    if (checkoutView) checkoutView.style.display = 'none';
    if (cartView) cartView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'product', productId: productId }, '', '#produkt-' + productId);
    }
  }

  /* ------------------------------------------------------------------------
     2D / 3D MEDIA SWITCHER & THREE.JS 360° ENGINE
     ------------------------------------------------------------------------ */
  const view2DBtn = document.getElementById('view2DBtn');
  const view3DBtn = document.getElementById('view3DBtn');
  const viewCADBtn = document.getElementById('viewCADBtn');
  const product2DContainer = document.getElementById('product2DContainer');
  const product3DContainer = document.getElementById('product3DContainer');
  const productCADContainer = document.getElementById('productCADContainer');
  const threeCanvasWrapper = document.getElementById('threeCanvasWrapper');
  const reset3DViewBtn = document.getElementById('reset3DViewBtn');

  let current3DScene = null;
  let current3DRenderer = null;
  let current3DCamera = null;
  let current3DControls = null;
  let current3DAnimId = null;

  if (view2DBtn) {
    view2DBtn.addEventListener('click', () => {
      if (view2DBtn) view2DBtn.classList.add('active');
      if (view3DBtn) view3DBtn.classList.remove('active');
      if (viewCADBtn) viewCADBtn.classList.remove('active');
      if (product2DContainer) product2DContainer.style.display = 'flex';
      if (product3DContainer) product3DContainer.style.display = 'none';
      if (productCADContainer) productCADContainer.style.display = 'none';
      if (current3DAnimId) cancelAnimationFrame(current3DAnimId);
    });
  }

  if (view3DBtn) {
    view3DBtn.addEventListener('click', () => {
      if (view3DBtn) view3DBtn.classList.add('active');
      if (view2DBtn) view2DBtn.classList.remove('active');
      if (viewCADBtn) viewCADBtn.classList.remove('active');
      if (product2DContainer) product2DContainer.style.display = 'none';
      if (product3DContainer) product3DContainer.style.display = 'flex';
      if (productCADContainer) productCADContainer.style.display = 'none';

      setTimeout(() => {
        initThreeJSViewer(currentDetailProduct);
      }, 50);
    });
  }

  if (viewCADBtn) {
    viewCADBtn.addEventListener('click', () => {
      if (viewCADBtn) viewCADBtn.classList.add('active');
      if (view2DBtn) view2DBtn.classList.remove('active');
      if (view3DBtn) view3DBtn.classList.remove('active');
      if (product2DContainer) product2DContainer.style.display = 'none';
      if (product3DContainer) product3DContainer.style.display = 'none';
      if (productCADContainer) productCADContainer.style.display = 'flex';
      if (current3DAnimId) cancelAnimationFrame(current3DAnimId);
    });
  }

  if (reset3DViewBtn) {
    reset3DViewBtn.addEventListener('click', () => {
      if (current3DControls && current3DCamera) {
        current3DControls.reset();
        current3DCamera.position.set(0, 1.8, 4.5);
      }
    });
  }

  function initThreeJSViewer(product) {
    if (typeof THREE === 'undefined' || !threeCanvasWrapper) {
      console.warn('Three.js is not loaded.');
      return;
    }

    threeCanvasWrapper.innerHTML = '';
    if (current3DAnimId) cancelAnimationFrame(current3DAnimId);

    const width = threeCanvasWrapper.clientWidth || 420;
    const height = threeCanvasWrapper.clientHeight || 380;

    const scene = new THREE.Scene();
    current3DScene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 4.5);
    current3DCamera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeCanvasWrapper.appendChild(renderer.domElement);
    current3DRenderer = renderer;

    let controls = null;
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.minDistance = 2.0;
      controls.maxDistance = 8.0;
      controls.maxPolarAngle = Math.PI / 2 + 0.05;
      current3DControls = controls;
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.5);
    fillLight.position.set(-5, 4, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe6f2ff, 0.7);
    rimLight.position.set(0, 6, -8);
    scene.add(rimLight);

    const groundGeo = new THREE.CircleGeometry(4.5, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xeaeaea,
      roughness: 0.8,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);

    const productGroup = build3DProductMesh(product);
    scene.add(productGroup);

    function animate() {
      current3DAnimId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      if (product3DContainer && product3DContainer.style.display !== 'none' && current3DRenderer && current3DCamera) {
        const w = threeCanvasWrapper.clientWidth;
        const h = threeCanvasWrapper.clientHeight;
        current3DCamera.aspect = w / h;
        current3DCamera.updateProjectionMatrix();
        current3DRenderer.setSize(w, h);
      }
    });
  }

  function build3DProductMesh(product) {
    const group = new THREE.Group();
    const pId = (product && product.id) ? product.id : '';
    const title = (product && product.title) ? product.title.toLowerCase() : '';
    const cat = (product && product.categoryName) ? product.categoryName.toLowerCase() : '';

    // 1. High Gloss Galvanized Steel (Chrome/Zinc PBR Physical Shader)
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2e6ef,
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95
    });

    // 2. Heavy Satin Powder Coated Dark Steel
    const darkSteelMat = new THREE.MeshPhysicalMaterial({
      color: 0x22252a,
      metalness: 0.9,
      roughness: 0.32,
      clearcoat: 0.35
    });

    // 3. 25kg Concrete Base Block (Textured grey concrete)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x565a63,
      roughness: 0.92,
      metalness: 0.05
    });

    // 4. Yellow Safety Accent Material
    const yellowAccentMat = new THREE.MeshPhysicalMaterial({
      color: 0xffc700,
      metalness: 0.3,
      roughness: 0.25,
      clearcoat: 0.4
    });

    // 5. Deep Tread Rubber Tire Material
    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.88,
      metalness: 0.05
    });

    if (pId === 'ab1' || title.includes('mannesmann') || (cat.includes('absperrgitter') && !title.includes('polizei') && !title.includes('erdnagel'))) {
      // --------------------------------------------------
      // 1. HYPER-REALISTIC MANNESMANNGITTER / ABSPERRGITTER
      // --------------------------------------------------
      const frameWidth = 3.6;
      const frameHeight = 1.8;
      const tubeRadius = 0.042;

      // Top Horizontal Bar
      const topBar = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, frameWidth - 0.2, 24), chromeMat);
      topBar.rotation.z = Math.PI / 2;
      topBar.position.y = frameHeight / 2;
      topBar.castShadow = true;
      group.add(topBar);

      // Bottom Horizontal Bar
      const bottomBar = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, frameWidth - 0.2, 24), chromeMat);
      bottomBar.rotation.z = Math.PI / 2;
      bottomBar.position.y = -frameHeight / 2;
      bottomBar.castShadow = true;
      group.add(bottomBar);

      // Left Vertical Post
      const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, frameHeight, 24), chromeMat);
      leftPost.position.x = -frameWidth / 2;
      leftPost.castShadow = true;
      group.add(leftPost);

      // Right Vertical Post
      const rightPost = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, frameHeight, 24), chromeMat);
      rightPost.position.x = frameWidth / 2;
      rightPost.castShadow = true;
      group.add(rightPost);

      // Rounded Top Corner Fillets
      const cornerGeo = new THREE.TorusGeometry(0.1, tubeRadius, 16, 24, Math.PI / 2);

      const topLeftCorner = new THREE.Mesh(cornerGeo, chromeMat);
      topLeftCorner.position.set(-frameWidth / 2 + 0.1, frameHeight / 2 - 0.1, 0);
      topLeftCorner.rotation.z = Math.PI / 2;
      group.add(topLeftCorner);

      const topRightCorner = new THREE.Mesh(cornerGeo, chromeMat);
      topRightCorner.position.set(frameWidth / 2 - 0.1, frameHeight / 2 - 0.1, 0);
      topRightCorner.rotation.z = 0;
      group.add(topRightCorner);

      // Vertical Interior Grid Bars (19 Bars)
      const numBars = 19;
      const barSpacing = (frameWidth - 0.4) / (numBars + 1);
      for (let i = 1; i <= numBars; i++) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, frameHeight - 0.08, 16), chromeMat);
        bar.position.x = -frameWidth / 2 + 0.2 + i * barSpacing;
        bar.castShadow = true;
        group.add(bar);
      }

      // Tubular Triangular Feet at Base
      const footTubeGeo = new THREE.CylinderGeometry(0.032, 0.032, 1.0, 16);

      const leftFoot = new THREE.Mesh(footTubeGeo, darkSteelMat);
      leftFoot.rotation.x = Math.PI / 2;
      leftFoot.position.set(-frameWidth / 2 + 0.35, -frameHeight / 2, 0);
      leftFoot.castShadow = true;
      group.add(leftFoot);

      const rightFoot = new THREE.Mesh(footTubeGeo, darkSteelMat);
      rightFoot.rotation.x = Math.PI / 2;
      rightFoot.position.set(frameWidth / 2 - 0.35, -frameHeight / 2, 0);
      rightFoot.castShadow = true;
      group.add(rightFoot);

      // Rubber End Caps on Feet
      const capGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16);
      const capPositions = [
        [-frameWidth / 2 + 0.35, -frameHeight / 2, 0.5],
        [-frameWidth / 2 + 0.35, -frameHeight / 2, -0.5],
        [frameWidth / 2 - 0.35, -frameHeight / 2, 0.5],
        [frameWidth / 2 - 0.35, -frameHeight / 2, -0.5]
      ];
      capPositions.forEach(pos => {
        const cap = new THREE.Mesh(capGeo, rubberMat);
        cap.rotation.x = Math.PI / 2;
        cap.position.set(pos[0], pos[1], pos[2]);
        group.add(cap);
      });

      // Interlocking Male Pin Hooks & Female Receptors
      const maleHook1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 12), chromeMat);
      maleHook1.position.set(-frameWidth / 2 - 0.06, 0.35, 0);
      group.add(maleHook1);

      const maleHook2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 12), chromeMat);
      maleHook2.position.set(-frameWidth / 2 - 0.06, -0.35, 0);
      group.add(maleHook2);

      const femaleLoop1 = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 12, 24), chromeMat);
      femaleLoop1.position.set(frameWidth / 2 + 0.05, 0.35, 0);
      femaleLoop1.rotation.x = Math.PI / 2;
      group.add(femaleLoop1);

      const femaleLoop2 = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 12, 24), chromeMat);
      femaleLoop2.position.set(frameWidth / 2 + 0.05, -0.35, 0);
      femaleLoop2.rotation.x = Math.PI / 2;
      group.add(femaleLoop2);

    } else if (pId === 'ab2' || title.includes('polizei')) {
      // --------------------------------------------------
      // 2. HYPER-REALISTIC POLIZEIGITTER KLAPPBAR (HOLLOW TUBE FRAME)
      // --------------------------------------------------
      const width = 3.2;
      const height = 1.9;
      const tubeRadius = 0.045;

      // Outer Frame Construction (Hollow Center!)
      const leftCol = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, height, 20), chromeMat);
      leftCol.position.set(-width / 2 + 0.05, 0.1, 0);
      leftCol.castShadow = true;
      group.add(leftCol);

      const rightCol = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, height, 20), chromeMat);
      rightCol.position.set(width / 2 - 0.05, 0.1, 0);
      rightCol.castShadow = true;
      group.add(rightCol);

      const topRail = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, width - 0.1, 24), chromeMat);
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(0, height / 2 + 0.1, 0);
      topRail.castShadow = true;
      group.add(topRail);

      const bottomRail = new THREE.Mesh(new THREE.CylinderGeometry(tubeRadius, tubeRadius, width - 0.1, 24), chromeMat);
      bottomRail.rotation.z = Math.PI / 2;
      bottomRail.position.set(0, -height / 2 + 0.1, 0);
      bottomRail.castShadow = true;
      group.add(bottomRail);

      // Vertical Interior Grid Bars Spaced Out Cleanly (16 Bars - Hollow Space in between!)
      const numBars = 16;
      const spacing = (width - 0.3) / (numBars + 1);
      for (let i = 1; i <= numBars; i++) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, height - 0.1, 16), chromeMat);
        bar.position.set(-width / 2 + 0.15 + i * spacing, 0.1, 0);
        bar.castShadow = true;
        group.add(bar);
      }

      // Anti-slip Tread Step Platform (Auftrittsstufe)
      const stepPlatform = new THREE.Mesh(new THREE.BoxGeometry(width - 0.15, 0.08, 0.95), darkSteelMat);
      stepPlatform.position.set(0, -height / 2 + 0.15, 0.45);
      stepPlatform.castShadow = true;
      group.add(stepPlatform);

      // Rear A-Frame Support Legs (Angled)
      const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 1.75, 16), chromeMat);
      leg1.rotation.x = -0.52;
      leg1.position.set(-width / 2 + 0.25, -0.22, -0.45);
      leg1.castShadow = true;
      group.add(leg1);

      const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 1.75, 16), chromeMat);
      leg2.rotation.x = -0.52;
      leg2.position.set(width / 2 - 0.25, -0.22, -0.45);
      leg2.castShadow = true;
      group.add(leg2);

      const crossBrace = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, width - 0.5, 16), darkSteelMat);
      crossBrace.rotation.z = Math.PI / 2;
      crossBrace.position.set(0, -0.55, -0.45);
      group.add(crossBrace);

    } else if (pId === 'ab3' || title.includes('erdnagel')) {
      // --------------------------------------------------
      // 3. HYPER-REALISTIC SIGNAL RED ERDNAGEL FÜR FLATTERBAND
      // --------------------------------------------------
      const redCoatedSteelMat = new THREE.MeshPhysicalMaterial({
        color: 0xd32f2f, // Signal Red Powder Coat PBR Shader
        metalness: 0.75,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15
      });

      const brightRedMat = new THREE.MeshPhysicalMaterial({
        color: 0xe53935,
        metalness: 0.6,
        roughness: 0.2
      });

      const pinLength = 2.5;
      const pinRadius = 0.038;

      // Solid Steel Rod Shaft (Red Coated)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(pinRadius, pinRadius * 0.7, pinLength - 0.2, 24), redCoatedSteelMat);
      shaft.position.y = 0;
      shaft.castShadow = true;
      group.add(shaft);

      // Tapered Ground Spike Point at Bottom
      const point = new THREE.Mesh(new THREE.CylinderGeometry(pinRadius * 0.7, 0.002, 0.25, 16), redCoatedSteelMat);
      point.position.y = -pinLength / 2 - 0.1;
      point.castShadow = true;
      group.add(point);

      // Forged Top Loop / Eyelet Hook (Schlaufenkopf)
      const topLoop = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.032, 16, 32), brightRedMat);
      topLoop.position.set(0, pinLength / 2 + 0.08, 0);
      topLoop.castShadow = true;
      group.add(topLoop);

      // Welded Collar Ring under loop
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 24), darkSteelMat);
      collar.position.set(0, pinLength / 2 - 0.04, 0);
      group.add(collar);

      // Threaded Yellow/Red Safety Ribbon (Flatterband / Absperrband) Through Eyelet Loop!
      const ribbonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, pinLength / 2 + 0.08, -0.2),
        new THREE.Vector3(-0.6, pinLength / 2 + 0.12, 0),
        new THREE.Vector3(0, pinLength / 2 + 0.08, 0),
        new THREE.Vector3(0.6, pinLength / 2 + 0.06, 0.1),
        new THREE.Vector3(1.8, pinLength / 2 + 0.02, 0.3)
      ]);
      const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 32, 0.03, 8, false);
      const ribbon = new THREE.Mesh(ribbonGeo, yellowAccentMat);
      ribbon.castShadow = true;
      group.add(ribbon);

    } else if (pId === 'bg1' || (title.includes('bühnengitter') && !title.includes('eck') && !title.includes('kabel'))) {
      // --------------------------------------------------
      // 4. HYPER-REALISTIC BÜHNENGITTER / CRASH BARRIER (ALU)
      // --------------------------------------------------
      const width = 2.0;
      const height = 1.2;
      const barrierGroup = new THREE.Group();

      const aluMat = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.25,
        clearcoat: 0.3
      });

      // 1. Outer Frame (Galvanized / Alu tubes)
      const leftCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, height, 16), aluMat);
      leftCol.position.set(-width / 2 + 0.025, 0, 0);
      leftCol.castShadow = true;
      barrierGroup.add(leftCol);

      const rightCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, height, 16), aluMat);
      rightCol.position.set(width / 2 - 0.025, 0, 0);
      rightCol.castShadow = true;
      barrierGroup.add(rightCol);

      const bottomRail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, width, 16), aluMat);
      bottomRail.rotation.z = Math.PI / 2;
      bottomRail.position.set(0, -height / 2 + 0.025, 0);
      barrierGroup.add(bottomRail);

      // 2. Thick Top Safety Handrail (Komfort-Handlauf)
      const topHandrail = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, width + 0.02, 24), aluMat);
      topHandrail.rotation.z = Math.PI / 2;
      topHandrail.position.set(0, height / 2, 0);
      topHandrail.castShadow = true;
      barrierGroup.add(topHandrail);

      // 3. Perforated Mesh / Grid Face (Vertical rods + horizontal bars to simulate perforated metal sheets)
      const rodGeo = new THREE.CylinderGeometry(0.008, 0.008, height - 0.1, 8);
      const numRods = 22;
      const spacing = (width - 0.1) / (numRods + 1);
      for (let i = 1; i <= numRods; i++) {
        const rod = new THREE.Mesh(rodGeo, aluMat);
        rod.position.set(-width / 2 + i * spacing, 0, 0);
        rod.castShadow = true;
        barrierGroup.add(rod);
      }

      // Horizontal reinforcement rods
      const refBarGeo = new THREE.CylinderGeometry(0.01, 0.01, width - 0.05, 12);
      const refBar1 = new THREE.Mesh(refBarGeo, aluMat);
      refBar1.rotation.z = Math.PI / 2;
      refBar1.position.y = 0.25;
      barrierGroup.add(refBar1);

      const refBar2 = new THREE.Mesh(refBarGeo, aluMat);
      refBar2.rotation.z = Math.PI / 2;
      refBar2.position.y = -0.25;
      barrierGroup.add(refBar2);

      // 4. Base Tread Step Plate (Auftrittsplatte) with anti-slip checker plate ribs
      const stepWidth = width - 0.04;
      const stepDepth = 0.8;
      const stepPlate = new THREE.Mesh(new THREE.BoxGeometry(stepWidth, 0.02, stepDepth), darkSteelMat);
      stepPlate.position.set(0, -height / 2 + 0.01, stepDepth / 2);
      stepPlate.castShadow = true;
      barrierGroup.add(stepPlate);

      // Anti-slip ribs/bars on the step plate
      const ribGeo = new THREE.BoxGeometry(0.01, 0.006, stepDepth - 0.04);
      for (let i = 0; i < 15; i++) {
        const rib = new THREE.Mesh(ribGeo, aluMat);
        rib.position.set(-stepWidth / 2 + 0.08 + (i * (stepWidth - 0.16) / 14), -height / 2 + 0.022, stepDepth / 2);
        barrierGroup.add(rib);
      }

      // 5. Rear Support Diagonal Strut Braces
      const braceGeo = new THREE.CylinderGeometry(0.022, 0.022, 1.25, 16);
      const leftBrace = new THREE.Mesh(braceGeo, aluMat);
      leftBrace.rotation.x = -0.7; // Slanted backwards
      leftBrace.position.set(-width / 2 + 0.15, -0.15, stepDepth * 0.45);
      leftBrace.castShadow = true;
      barrierGroup.add(leftBrace);

      const rightBrace = new THREE.Mesh(braceGeo, aluMat);
      rightBrace.rotation.x = -0.7;
      rightBrace.position.set(width / 2 - 0.15, -0.15, stepDepth * 0.45);
      rightBrace.castShadow = true;
      barrierGroup.add(rightBrace);

      // Rear horizontal floor brace linking the braces
      const rearFloorBrace = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, width - 0.3, 12), aluMat);
      rearFloorBrace.rotation.z = Math.PI / 2;
      rearFloorBrace.position.set(0, -height / 2 + 0.02, stepDepth - 0.08);
      barrierGroup.add(rearFloorBrace);

      // Adjust height and add to group
      barrierGroup.position.y = 0.2;
      group.add(barrierGroup);

    } else if (pId === 'bg2' || title.includes('eck-element')) {
      // --------------------------------------------------
      // 5. HYPER-REALISTIC BÜHNENGITTER ECK-ELEMENT / VARIO
      // --------------------------------------------------
      const h = 1.2;
      const w = 1.0; // Width of each side
      const aluMat = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.25,
        clearcoat: 0.3
      });

      const cornerGroup = new THREE.Group();

      // Outer columns at connection points
      const colL = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, h, 16), aluMat);
      colL.position.set(-w, 0, 0);
      colL.castShadow = true;
      cornerGroup.add(colL);

      const colR = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, h, 16), aluMat);
      colR.position.set(0, 0, w);
      colR.castShadow = true;
      cornerGroup.add(colR);

      // Center corner column (where the 90-degree bend occurs)
      const colC = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, h, 16), aluMat);
      colC.position.set(0, 0, 0);
      colC.castShadow = true;
      cornerGroup.add(colC);

      // Left Handrail Top (connecting L column to Center corner)
      const handrailL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, w, 24), aluMat);
      handrailL.rotation.z = Math.PI / 2;
      handrailL.position.set(-w / 2, h / 2, 0);
      cornerGroup.add(handrailL);

      // Right Handrail Top (connecting R column to Center corner)
      const handrailR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, w, 24), aluMat);
      handrailR.rotation.x = Math.PI / 2;
      handrailR.position.set(0, h / 2, w / 2);
      cornerGroup.add(handrailR);

      // Vertical interior bars on Left Panel
      const numRods = 8;
      const spacing = w / (numRods + 1);
      for (let i = 1; i <= numRods; i++) {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, h - 0.1, 8), aluMat);
        rod.position.set(-i * spacing, 0, 0);
        rod.castShadow = true;
        cornerGroup.add(rod);
      }

      // Vertical interior bars on Right Panel
      for (let i = 1; i <= numRods; i++) {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, h - 0.1, 8), aluMat);
        rod.position.set(0, 0, i * spacing);
        rod.castShadow = true;
        cornerGroup.add(rod);
      }

      // Wedge shaped bottom step plate (two matching sheets)
      const stepL = new THREE.Mesh(new THREE.BoxGeometry(w, 0.016, 0.6), darkSteelMat);
      stepL.position.set(-w / 2, -h / 2 + 0.01, 0.3);
      cornerGroup.add(stepL);

      const stepR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.016, w), darkSteelMat);
      stepR.position.set(-0.3, -h / 2 + 0.01, w / 2);
      cornerGroup.add(stepR);

      // Slanted support braces
      const braceGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 16);
      const braceL = new THREE.Mesh(braceGeo, aluMat);
      braceL.rotation.x = -0.7;
      braceL.position.set(-w + 0.15, -0.15, 0.4);
      cornerGroup.add(braceL);

      const braceR = new THREE.Mesh(braceGeo, aluMat);
      braceR.rotation.z = 0.7;
      braceR.position.set(-0.4, -0.1, w - 0.15);
      cornerGroup.add(braceR);

      cornerGroup.position.y = 0.2;
      group.add(cornerGroup);

    } else if (pId === 'bg3' || title.includes('kabel')) {
      // --------------------------------------------------
      // 6. MULTICORE KABELDURCHLASS ELEMENT (CABLE PASS-THROUGH BARRIER)
      // --------------------------------------------------
      const width = 2.0;
      const height = 1.2;
      const aluMat = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.25,
        clearcoat: 0.3
      });

      const cableGroup = new THREE.Group();

      // Outer pillars and handrail
      const leftCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, height, 16), aluMat);
      leftCol.position.set(-width / 2 + 0.025, 0, 0);
      leftCol.castShadow = true;
      cableGroup.add(leftCol);

      const rightCol = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, height, 16), aluMat);
      rightCol.position.set(width / 2 - 0.025, 0, 0);
      rightCol.castShadow = true;
      cableGroup.add(rightCol);

      const topHandrail = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, width + 0.02, 24), aluMat);
      topHandrail.rotation.z = Math.PI / 2;
      topHandrail.position.set(0, height / 2, 0);
      topHandrail.castShadow = true;
      cableGroup.add(topHandrail);

      // Bottom Cable Arch/Tunnel frame (opening center)
      const archW = 0.9;
      const archH = 0.45;

      const archTop = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, archW, 16), aluMat);
      archTop.rotation.z = Math.PI / 2;
      archTop.position.set(0, -height / 2 + archH, 0);
      cableGroup.add(archTop);

      const archLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, archH, 16), aluMat);
      archLeft.position.set(-archW / 2, -height / 2 + archH / 2, 0);
      cableGroup.add(archLeft);

      const archRight = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, archH, 16), aluMat);
      archRight.position.set(archW / 2, -height / 2 + archH / 2, 0);
      cableGroup.add(archRight);

      // Vertical interior rods ABOVE the cable arch (shorter rods)
      const numRodsUpper = 10;
      const spacingUpper = archW / (numRodsUpper + 1);
      const upperRodH = height - archH - 0.1;
      for (let i = 1; i <= numRodsUpper; i++) {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, upperRodH, 8), aluMat);
        rod.position.set(-archW / 2 + i * spacingUpper, height / 2 - upperRodH / 2 - 0.05, 0);
        rod.castShadow = true;
        cableGroup.add(rod);
      }

      // Vertical interior rods on Left & Right wings of the barrier
      const numRodsWings = 5;
      const spacingL = (width / 2 - archW / 2) / (numRodsWings + 1);
      for (let i = 1; i <= numRodsWings; i++) {
        const rodL = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, height - 0.1, 8), aluMat);
        rodL.position.set(-width / 2 + i * spacingL, 0, 0);
        rodL.castShadow = true;
        cableGroup.add(rodL);

        const rodR = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, height - 0.1, 8), aluMat);
        rodR.position.set(archW / 2 + i * spacingL, 0, 0);
        rodR.castShadow = true;
        cableGroup.add(rodR);
      }

      // Base step platform on left and right sides of the tunnel
      const stepDepth = 0.8;
      const stepL = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - archW / 2 - 0.02, 0.02, stepDepth), darkSteelMat);
      stepL.position.set(-width / 4 - archW / 4, -height / 2 + 0.01, stepDepth / 2);
      cableGroup.add(stepL);

      const stepR = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - archW / 2 - 0.02, 0.02, stepDepth), darkSteelMat);
      stepR.position.set(width / 4 + archW / 4, -height / 2 + 0.01, stepDepth / 2);
      cableGroup.add(stepR);

      // Yellow cable ramp visual representation running through the tunnel center
      const rampW = archW - 0.08;
      const rampGeo = new THREE.BoxGeometry(rampW, 0.08, stepDepth + 0.2);
      const ramp = new THREE.Mesh(rampGeo, yellowAccentMat);
      ramp.position.set(0, -height / 2 + 0.04, stepDepth / 2);
      ramp.castShadow = true;
      cableGroup.add(ramp);

      // Red/Yellow cable lines running through the ramp/tunnel
      const cableCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -height / 2 + 0.08, -0.4),
        new THREE.Vector3(0, -height / 2 + 0.1, 0.2),
        new THREE.Vector3(0.05, -height / 2 + 0.08, 0.8),
        new THREE.Vector3(-0.05, -height / 2 + 0.07, 1.4)
      ]);
      const cableMesh = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 20, 0.025, 8, false), darkSteelMat);
      cableMesh.castShadow = true;
      cableGroup.add(cableMesh);

      // Rear support diagonal struts (left/right)
      const braceGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.25, 16);
      const braceL = new THREE.Mesh(braceGeo, aluMat);
      braceL.rotation.x = -0.7;
      braceL.position.set(-width / 2 + 0.15, -0.15, stepDepth * 0.45);
      cableGroup.add(braceL);

      const braceR = new THREE.Mesh(braceGeo, aluMat);
      braceR.rotation.x = -0.7;
      braceR.position.set(width / 2 - 0.15, -0.15, stepDepth * 0.45);
      cableGroup.add(braceR);

      cableGroup.position.y = 0.2;
      group.add(cableGroup);

    } else if (pId === 'es1' || pId === 'es2' || pId === 'es3' || title.includes('einlass')) {
      // --------------------------------------------------
      // 7, 8, 9. HYPER-REALISTIC EINLASSSCHLEUSE & KORB
      // --------------------------------------------------
      const height = 2.4;
      const width = 1.4; // Realistic width of one lane

      // 1. Two side support pillars (Hauptständer)
      const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, height, 20), chromeMat);
      p1.position.x = -width / 2;
      p1.castShadow = true;
      group.add(p1);

      const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, height, 20), chromeMat);
      p2.position.x = width / 2;
      p2.castShadow = true;
      group.add(p2);

      // Top Arch horizontal pipe
      const topArch = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, width, 20), chromeMat);
      topArch.rotation.z = Math.PI / 2;
      topArch.position.y = height / 2;
      group.add(topArch);

      // Middle reinforcement safety rail (Querträger)
      const midRail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, width, 16), chromeMat);
      midRail.rotation.z = Math.PI / 2;
      midRail.position.y = 0.2;
      group.add(midRail);

      // If it's a basket/cage lane (Einlassschleuse mit Korb)
      if (pId === 'es2' || pId === 'es3' || title.includes('korb')) {
        const cageGroup = new THREE.Group();
        const cageW = width - 0.1;
        const cageH = 1.2;
        const cageD = 1.0;

        // 4 corner vertical thin pipes of the cage
        const corners = [
          [-cageW / 2, 0, cageD / 2],
          [cageW / 2, 0, cageD / 2],
          [-cageW / 2, 0, -cageD / 2],
          [cageW / 2, 0, -cageD / 2]
        ];
        corners.forEach(pos => {
          const cornerBar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, cageH, 12), chromeMat);
          cornerBar.position.set(pos[0], pos[1], pos[2]);
          cornerBar.castShadow = true;
          cageGroup.add(cornerBar);
        });

        // Horizontal cage railing loops at top, middle, and bottom
        const loopHeights = [cageH / 2, 0, -cageH / 2];
        loopHeights.forEach(y => {
          // Left panel rail
          const railL = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, cageD, 12), chromeMat);
          railL.rotation.x = Math.PI / 2;
          railL.position.set(-cageW / 2, y, 0);
          cageGroup.add(railL);

          // Right panel rail
          const railR = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, cageD, 12), chromeMat);
          railR.rotation.x = Math.PI / 2;
          railR.position.set(cageW / 2, y, 0);
          cageGroup.add(railR);

          // Front cross rail
          const railF = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, cageW, 12), chromeMat);
          railF.rotation.z = Math.PI / 2;
          railF.position.set(0, y, cageD / 2);
          cageGroup.add(railF);
        });

        // Yellow warning plate on the front of the security basket
        const warningPlate = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.01), yellowAccentMat);
        warningPlate.position.set(0, 0.1, cageD / 2 + 0.01);
        cageGroup.add(warningPlate);

        cageGroup.position.set(0, 0, 0);
        group.add(cageGroup);
      } else {
        // Standard turnstile gate (Dreiarm-Drehkreuz)
        const turnstileGroup = new THREE.Group();

        // Vertical central rotor axis
        const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.2, 16), darkSteelMat);
        axis.position.set(0, 0, 0);
        turnstileGroup.add(axis);

        // Turnstile rotor hub
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.2, 16), chromeMat);
        hub.position.set(0, 0.2, 0);
        turnstileGroup.add(hub);

        // Three metal blocker arms at 120-degree angles
        const armLength = 0.55;
        const armGeo = new THREE.CylinderGeometry(0.018, 0.018, armLength, 12);

        // Arm 1: Horizontal pointing forward
        const arm1 = new THREE.Mesh(armGeo, chromeMat);
        arm1.rotation.x = Math.PI / 2;
        arm1.position.set(0, 0.2, armLength / 2);
        turnstileGroup.add(arm1);

        // Arm 2: Angled back-left
        const arm2 = new THREE.Mesh(armGeo, chromeMat);
        arm2.rotation.x = Math.PI / 2;
        arm2.rotation.y = (2 * Math.PI) / 3;
        arm2.position.set(-armLength / 2 * Math.sin(Math.PI / 6), 0.2, -armLength / 2 * Math.cos(Math.PI / 6));
        turnstileGroup.add(arm2);

        // Arm 3: Angled back-right
        const arm3 = new THREE.Mesh(armGeo, chromeMat);
        arm3.rotation.x = Math.PI / 2;
        arm3.rotation.y = -(2 * Math.PI) / 3;
        arm3.position.set(armLength / 2 * Math.sin(Math.PI / 6), 0.2, -armLength / 2 * Math.cos(Math.PI / 6));
        turnstileGroup.add(arm3);

        turnstileGroup.position.set(0, 0, 0);
        group.add(turnstileGroup);
      }

    } else if (pId === 'bz1' || (cat.includes('bauzaun') && !title.includes('abstütz') && !title.includes('verbinder') && !title.includes('tor'))) {
      // --------------------------------------------------
      // 10. HYPER-REALISTIC BAUZAUN-ELEMENT (MOBILZAUN)
      // --------------------------------------------------
      const width = 3.5;
      const height = 2.0;
      const tubeR = 0.038;

      // Outer Tubular Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(width, height, tubeR * 2), chromeMat);
      frame.castShadow = true;
      group.add(frame);

      // High-Density Wire Mesh Panel Grid
      const meshMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        wireframe: true,
        roughness: 0.4
      });
      const wireMesh = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.1, height - 0.1, 30, 15), meshMat);
      wireMesh.position.z = 0.01;
      group.add(wireMesh);

      // Heavy 25kg Dark Concrete Base Blocks
      const footGeo = new THREE.BoxGeometry(0.7, 0.24, 0.28);

      const leftFoot = new THREE.Mesh(footGeo, concreteMat);
      leftFoot.position.set(-width / 2 + 0.35, -height / 2 - 0.12, 0);
      leftFoot.castShadow = true;
      group.add(leftFoot);

      const rightFoot = new THREE.Mesh(footGeo, concreteMat);
      rightFoot.position.set(width / 2 - 0.35, -height / 2 - 0.12, 0);
      rightFoot.castShadow = true;
      group.add(rightFoot);

    } else if (pId === 'bz2' || title.includes('abstütz')) {
      // --------------------------------------------------
      // 11. HYPER-REALISTIC DETAILED BAUZAUN ABSTÜTZUNG
      // --------------------------------------------------
      const pipeMat = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1
      });

      const plateMat = new THREE.MeshPhysicalMaterial({
        color: 0x999999,
        metalness: 0.9,
        roughness: 0.35
      });

      const boltMat = new THREE.MeshPhysicalMaterial({
        color: 0xddaa33, // Galvanized yellow zinc passivation for bolts/screws!
        metalness: 0.8,
        roughness: 0.2
      });

      // 1. Diagonal Strut Pipe (Abstützstange)
      const strutLen = 2.4;
      const strutRadius = 0.038;
      const strutGroup = new THREE.Group();

      const mainPipe = new THREE.Mesh(new THREE.CylinderGeometry(strutRadius, strutRadius, strutLen, 24), pipeMat);
      mainPipe.castShadow = true;
      strutGroup.add(mainPipe);

      // Flatted ends on the strut pipe
      const topFlat = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.12, 0.08), plateMat);
      topFlat.position.y = strutLen / 2 + 0.04;
      strutGroup.add(topFlat);

      const bottomFlat = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.12, 0.08), plateMat);
      bottomFlat.position.y = -strutLen / 2 - 0.04;
      strutGroup.add(bottomFlat);

      // Rotate and position the diagonal strut
      strutGroup.rotation.z = -0.55; // Angle of support
      strutGroup.position.set(0.35, 0.1, 0);
      group.add(strutGroup);

      // 2. Vertical Fence Reference Tube (Shows how it attaches!)
      const refPost = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.5, 16), darkSteelMat);
      refPost.position.set(-0.35, 0, 0);
      group.add(refPost);

      // 3. Top Collar Clamp (Schelle) wrapping around reference tube
      const clampCollar = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.014, 12, 24), plateMat);
      clampCollar.position.set(-0.35, 0.8, 0);
      clampCollar.rotation.x = Math.PI / 2;
      group.add(clampCollar);

      // Connector tab linking collar to flat end of the strut
      const clampTab = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.03), plateMat);
      clampTab.position.set(-0.28, 0.8, 0);
      group.add(clampTab);

      // Heavy locking bolt on collar
      const lockingBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.08, 12), boltMat);
      lockingBolt.rotation.z = Math.PI / 2;
      lockingBolt.position.set(-0.41, 0.8, 0);
      group.add(lockingBolt);

      const lockingNut = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.018, 6), boltMat);
      lockingNut.rotation.z = Math.PI / 2;
      lockingNut.position.set(-0.43, 0.8, 0);
      group.add(lockingNut);

      // 4. Ground Base Plate (Bodenplatte)
      const baseGroup = new THREE.Group();
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.016, 0.28), plateMat);
      basePlate.castShadow = true;
      baseGroup.add(basePlate);

      // 2 Hinge tabs on base plate holding the flat strut end
      const hingeTab1 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.08, 0.04), plateMat);
      hingeTab1.position.set(0, 0.04, 0.025);
      baseGroup.add(hingeTab1);

      const hingeTab2 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.08, 0.04), plateMat);
      hingeTab2.position.set(0, 0.04, -0.025);
      baseGroup.add(hingeTab2);

      // Hinge pin bolt
      const hingePin = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.09, 12), chromeMat);
      hingePin.rotation.x = Math.PI / 2;
      hingePin.position.set(0, 0.04, 0);
      baseGroup.add(hingePin);

      // Anchoring holes on the base plate
      const holeGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.02, 16);
      const holeL = new THREE.Mesh(holeGeo, darkSteelMat);
      holeL.position.set(-0.18, 0, 0);
      baseGroup.add(holeL);

      const holeR = new THREE.Mesh(holeGeo, darkSteelMat);
      holeR.position.set(0.18, 0, 0);
      baseGroup.add(holeR);

      // 5. Heavy Ground Stake (Erdnagel) driven through base plate hole!
      const erdnagel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.002, 0.8, 16), plateMat);
      erdnagel.rotation.z = 0.15; // Driven slightly angled
      erdnagel.position.set(-0.18, -0.32, 0);
      erdnagel.castShadow = true;
      baseGroup.add(erdnagel);

      const erdnagelHead = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.04, 6), darkSteelMat);
      erdnagelHead.position.set(-0.18, 0.09, 0);
      baseGroup.add(erdnagelHead);

      // Position entire base assembly
      baseGroup.position.set(0.98, -1.18, 0);
      group.add(baseGroup);

    } else if (pId === 'bz3' || title.includes('kreuzverbinder')) {
      // --------------------------------------------------
      // 12. HYPER-REALISTIC KREUZVERBINDER MODEL
      // --------------------------------------------------
      const clamp1 = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.28, 24), chromeMat);
      clamp1.rotation.z = Math.PI / 2;
      clamp1.position.x = -0.14;
      clamp1.castShadow = true;
      group.add(clamp1);

      const clamp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.28, 24), chromeMat);
      clamp2.rotation.z = Math.PI / 2;
      clamp2.position.x = 0.14;
      clamp2.castShadow = true;
      group.add(clamp2);

      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.48, 16), darkSteelMat);
      bolt.rotation.x = Math.PI / 2;
      group.add(bolt);

    } else if (pId === 'bz4' || title.includes('drehgelenk')) {
      // --------------------------------------------------
      // 13. HYPER-REALISTIC DREHGELENK HALTERUNG
      // --------------------------------------------------
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.85, 24), chromeMat);
      pin.castShadow = true;
      group.add(pin);

      const hingeCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.32, 24), yellowAccentMat);
      hingeCollar.position.y = 0.12;
      group.add(hingeCollar);

      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.07, 0.14), darkSteelMat);
      arm.position.set(0.22, 0.12, 0);
      group.add(arm);

    } else if (pId === 'bz5' || pId === 'bz6' || title.includes('rolle')) {
      // --------------------------------------------------
      // 14, 15. HYPER-REALISTIC TOR ROLLE
      // --------------------------------------------------
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 32), rubberMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      group.add(wheel);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.17, 24), chromeMat);
      rim.rotation.z = Math.PI / 2;
      group.add(rim);

      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.95, 24), chromeMat);
      spindle.position.y = 0.48;
      spindle.castShadow = true;
      group.add(spindle);

      if (pId === 'bz6' || title.includes('gestell')) {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 0.32), darkSteelMat);
        frame.position.y = 0.85;
        frame.castShadow = true;
        group.add(frame);
      }

    } else {
      // DEFAULT FALLBACK 3D STUDIO DISPLAY MODEL
      const basePodium = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32), yellowAccentMat);
      basePodium.position.y = -1.0;
      basePodium.castShadow = true;
      group.add(basePodium);

      const centerCol = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.6, 24), chromeMat);
      centerCol.position.y = -0.1;
      centerCol.castShadow = true;
      group.add(centerCol);

      const topRing = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 16, 32), darkSteelMat);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = 0.7;
      topRing.castShadow = true;
      group.add(topRing);
    }

    return group;
  }

  function getCategoryKeyForProduct(product) {
    if (!product) return 'absperrgitter';
    if (product.parentCatKey) return product.parentCatKey;
    const pid = (product.id || '').toLowerCase();
    if (pid.startsWith('bz')) return 'bauzaun';
    if (pid.startsWith('kass')) return 'kassenhaus';
    if (pid.startsWith('boden')) return 'bodenschutz';
    if (pid.startsWith('moeb') || pid.startsWith('miet')) return 'mietmoebel';
    if (pid.startsWith('verkehr')) return 'verkehrstechnik';
    if (pid.startsWith('zelt')) return 'zelte';
    if (pid.startsWith('flucht')) return 'fluchtwege';
    if (pid.startsWith('stapler')) return 'stapler';
    if (pid.startsWith('gator')) return 'gator';
    return 'absperrgitter';
  }

  if (backFromSingleBtn) {
    backFromSingleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCatKey = getCategoryKeyForProduct(currentDetailProduct);
      openCategorySubpage(parentCatKey);
    });
  }

  if (singleProductAnfragenBtn) {
    singleProductAnfragenBtn.addEventListener('click', () => {
      if (!currentDetailProduct) return;
      const qty = parseInt(singleProductQtyInput ? singleProductQtyInput.value : 1) || 1;

      const existing = cart.find(item => item.id === currentDetailProduct.id);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ id: currentDetailProduct.id, title: currentDetailProduct.title, qty });
      }

      updateCartUI();
      openCart();
    });
  }

  /* ------------------------------------------------------------------------
     3. INTERACTIVE VISUAL MAP HOTSPOTS NAVIGATION SYSTEM (images/menu-fotosu.png)
     ------------------------------------------------------------------------ */
  const hotspotBtns = document.querySelectorAll('.hotspot-label-btn');
  const hotspotsContainer = document.getElementById('menuHotspotsContainer');
  const mapWrapper = document.getElementById('interactiveMapWrapper');

  hotspotBtns.forEach(btn => {
    const catKey = btn.getAttribute('data-cat');
    let lineId = 'line-' + catKey;
    if (catKey === 'absperrgitter') lineId = 'line-absperrgitter';
    const connectLine = document.getElementById(lineId);

    function activateHotspot() {
      btn.classList.add('is-hovered');
      if (hotspotsContainer) hotspotsContainer.classList.add('has-active-hover');
      if (mapWrapper) mapWrapper.classList.add('has-active-hover');
      if (connectLine) connectLine.classList.add('active');
    }

    function deactivateHotspot() {
      btn.classList.remove('is-hovered');
      if (hotspotsContainer) hotspotsContainer.classList.remove('has-active-hover');
      if (mapWrapper) mapWrapper.classList.remove('has-active-hover');
      if (connectLine) connectLine.classList.remove('active');
    }

    // Mouse Hover Effects
    btn.addEventListener('mouseenter', activateHotspot);
    btn.addEventListener('mouseleave', deactivateHotspot);

    // Accessibility Keyboard Focus Effects
    btn.addEventListener('focus', activateHotspot);
    btn.addEventListener('blur', deactivateHotspot);

    // Click & Touch Navigation
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.style.transform = 'translate(-50%, -50%) scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
        openCategorySubpage(catKey);
      }, 120);
    });

    // Keyboard ENTER / SPACE Activation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCategorySubpage(catKey);
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. CART DRAWER OPEN / CLOSE
     ------------------------------------------------------------------------ */
  function openCart() {
    cartDrawerOverlay.classList.add('active');
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove('active');
  }

  if (cartHeaderBtn) cartHeaderBtn.addEventListener('click', openCart);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeCart);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCart();
    });
  }

  /* ------------------------------------------------------------------------
     5. PRODUCT CARD LISTENERS
     ------------------------------------------------------------------------ */
  function attachProductCardListeners(container) {
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        if (id) {
          openSingleProductView(id);
        }
      });
    });

    container.querySelectorAll('.qty-picker').forEach(picker => {
      const minusBtn = picker.querySelector('.qty-minus');
      const plusBtn = picker.querySelector('.qty-plus');
      const input = picker.querySelector('.qty-input');

      if (input) {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^0-9]/g, '');
        });

        input.addEventListener('blur', () => {
          if (!input.value || parseInt(input.value) < 1) {
            input.value = '1';
          }
        });
      }

      if (minusBtn && plusBtn && input) {
        minusBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.value) || 1;
          if (val > 1) input.value = val - 1;
        };

        plusBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.value) || 1;
          input.value = val + 1;
        };
      }
    });

    container.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const title = card.getAttribute('data-title');
        const qtyInput = card.querySelector('.qty-input');
        const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

        const existing = cart.find(item => item.id === id);
        if (existing) {
          existing.qty += qty;
        } else {
          cart.push({ id, title, qty });
        }

        updateCartUI();
        openCart();
        if (qtyInput) qtyInput.value = 1;
      };
    });
  }

  attachProductCardListeners(document);

  /* ------------------------------------------------------------------------
     6. UPDATE CART UI
     ------------------------------------------------------------------------ */
  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalItems;
    const cartDrawerTotalCount = document.getElementById('cartDrawerTotalCount');
    if (cartDrawerTotalCount) {
      cartDrawerTotalCount.innerText = `${totalItems} Artikel`;
    }

    // Update mobile sticky cart bar
    const mobileStickyCartBar = document.getElementById('mobileStickyCartBar');
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (mobileStickyCartBar) {
      if (totalItems > 0) {
        mobileStickyCartBar.style.display = 'block';
        if (mobileCartCount) mobileCartCount.innerText = totalItems;
      } else {
        mobileStickyCartBar.style.display = 'none';
      }
    }

    if (cart.length === 0) {
      cartItemsBody.innerHTML = `
        <div class="cart-empty-msg">
          <i class="fas fa-shopping-basket"></i>
          <p>Ihr Anfragekorb ist noch leer.</p>
          <small>Wählen Sie oben Produkte aus, um ein Angebot anzufordern.</small>
        </div>
      `;
    } else {
      let html = '';

      cart.forEach((item, index) => {
        html += `
          <div class="cart-item">
            <div>
              <div class="cart-item-title">${item.title}</div>
              <div class="qty-picker" style="margin-top: 0.4rem;">
                <button class="qty-btn cart-qty-minus" data-index="${index}">-</button>
                <input type="text" class="qty-input cart-qty-input" data-index="${index}" value="${item.qty}" inputmode="numeric">
                <button class="qty-btn cart-qty-plus" data-index="${index}">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-index="${index}" title="Entfernen">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        `;
      });

      cartItemsBody.innerHTML = html;

      cartItemsBody.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
          input.value = input.value.replace(/[^0-9]/g, '');
          const idx = e.target.getAttribute('data-index');
          const val = parseInt(input.value) || 0;
          if (val > 0) {
            cart[idx].qty = val;
            const updatedTotal = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCountBadge.innerText = updatedTotal;
            if (cartDrawerTotalCount) cartDrawerTotalCount.innerText = `${updatedTotal} Artikel`;
          }
        });

        input.addEventListener('blur', (e) => {
          const idx = e.target.getAttribute('data-index');
          if (!input.value || parseInt(input.value) < 1) {
            cart[idx].qty = 1;
          }
          updateCartUI();
        });
      });

      cartItemsBody.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          updateCartUI();
        };
      });

      cartItemsBody.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart[idx].qty += 1;
          updateCartUI();
        };
      });

      cartItemsBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          updateCartUI();
        };
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. WEITER ZUR KASSE BUTTON IN CART DRAWER
     ------------------------------------------------------------------------ */
  const cartWeiterBtn = document.getElementById('cartWeiterBtn');
  if (cartWeiterBtn) {
    cartWeiterBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist noch leer. Bitte wählen Sie zuerst Produkte aus.');
        return;
      }
      closeCart();
      openCheckoutView();
    });
  }

  /* ------------------------------------------------------------------------
     7.5 OFFICIAL CHECKOUT VIEW LOGIC (MATCHING EVENTNIGHT.DE/CHECKOUT/)
     ------------------------------------------------------------------------ */
  const checkoutView = document.getElementById('checkoutView');
  const backFromCheckoutBtn = document.getElementById('backFromCheckoutBtn');
  const checkoutTableBody = document.getElementById('checkoutTableBody');
  const officialCheckoutForm = document.getElementById('officialCheckoutForm');
  const checkoutSuccessAlert = document.getElementById('checkoutSuccessAlert');

  function openCheckoutView(pushState = true) {
    if (!checkoutView) return;

    // Render cart items in checkout summary table
    if (cart.length === 0) {
      checkoutTableBody.innerHTML = `
        <tr>
          <td colspan="2" style="text-align: center; color: #777; padding: 2rem;">
            Ihr Anfragekorb ist noch leer. Wählen Sie erst Produkte aus.
          </td>
        </tr>
      `;
    } else {
      checkoutTableBody.innerHTML = cart.map(item => `
        <tr>
          <td style="display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem 1rem;">
            <img src="${item.img || 'images/Eventnight-Logo-ausgeschnitten.png'}" alt="${item.title}" style="width: 44px; height: 44px; object-fit: contain; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 4px; padding: 2px; flex-shrink: 0;">
            <strong style="font-size: 0.92rem; color: #111;">${item.title}</strong>
          </td>
          <td style="text-align: center; font-weight: 800; color: #111; font-size: 1rem;">&times; ${item.qty}</td>
        </tr>
      `).join('');
    }

    if (cartView) cartView.style.display = 'none';
    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'none';
    checkoutView.style.display = 'block';
    updateNavbarMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'checkout' }, '', '#checkout');
    }
  }

  // Delivery address toggler
  const chkDeliveryAddressContainer = document.getElementById('chkDeliveryAddressContainer');
  const chkLieferStrasse = document.getElementById('chk_liefer_strasse');
  const chkLieferPlz = document.getElementById('chk_liefer_plz');
  const chkLieferOrt = document.getElementById('chk_liefer_ort');

  document.querySelectorAll('input[name="chk_logistik"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (chkDeliveryAddressContainer) {
        if (e.target.value === 'lieferung') {
          chkDeliveryAddressContainer.style.display = 'block';
          if (chkLieferStrasse) chkLieferStrasse.required = true;
          if (chkLieferPlz) chkLieferPlz.required = true;
          if (chkLieferOrt) chkLieferOrt.required = true;
        } else {
          chkDeliveryAddressContainer.style.display = 'none';
          if (chkLieferStrasse) chkLieferStrasse.required = false;
          if (chkLieferPlz) chkLieferPlz.required = false;
          if (chkLieferOrt) chkLieferOrt.required = false;
        }
      }
    });
  });

  if (backFromCheckoutBtn) {
    backFromCheckoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  if (officialCheckoutForm) {
    officialCheckoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist leer. Wählen Sie bitte zuerst Produkte aus.');
        return;
      }

      const submitBtn = document.getElementById('chkSubmitBtn');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Anfrage wird übermittelt...';
      submitBtn.disabled = true;

      // Extract values
      const vorname = document.getElementById('chk_vorname').value;
      const nachname = document.getElementById('chk_nachname').value;
      const firma = document.getElementById('chk_firma').value || '-';
      const telefon = document.getElementById('chk_telefon').value;
      const email = document.getElementById('chk_email').value;

      const dateVon = document.getElementById('chk_miet_von').value;
      const dateBis = document.getElementById('chk_miet_bis').value;
      const formattedVon = dateVon ? dateVon.split('-').reverse().join('.') : '-';
      const formattedBis = dateBis ? dateBis.split('-').reverse().join('.') : '-';

      const logisticsOpt = document.querySelector('input[name="chk_logistik"]:checked').value;
      const eventOrt = document.getElementById('chk_event_ort').value;
      
      let deliveryAddress = '-';
      let logisticsText = 'Selbstabholung (Overath)';
      if (logisticsOpt === 'lieferung') {
        logisticsText = 'Lieferung durch EVENTNIGHT';
        const str = document.getElementById('chk_liefer_strasse').value;
        const plz = document.getElementById('chk_liefer_plz').value;
        const ort = document.getElementById('chk_liefer_ort').value;
        deliveryAddress = `${str}, ${plz} ${ort}`;
      } else {
        deliveryAddress = 'Olper Straße 33, 51491 Overath (EVENTNIGHT Gitterlager)';
      }

      setTimeout(() => {
        // Populate B2B receipt
        document.getElementById('rec_customer_name').innerText = `${vorname} ${nachname}`;
        document.getElementById('rec_company_name').innerText = firma;
        document.getElementById('rec_tel').innerText = telefon;
        document.getElementById('rec_email').innerText = email;
        document.getElementById('rec_period').innerText = `${formattedVon} bis ${formattedBis}`;
        document.getElementById('rec_logistics').innerText = logisticsText;
        document.getElementById('rec_address').innerText = deliveryAddress;
        document.getElementById('rec_event_ort').innerText = eventOrt;

        const recItemsBody = document.getElementById('recItemsBody');
        if (recItemsBody) {
          recItemsBody.innerHTML = cart.map(item => `
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 0.6rem 0; font-weight: 700; color: #111; text-align: left;">${item.title}</td>
              <td style="padding: 0.6rem 0; text-align: right; font-weight: 800; color: #111;">&times; ${item.qty}</td>
            </tr>
          `).join('');
        }

        // Hide checkout view, show success view
        if (checkoutView) checkoutView.style.display = 'none';
        const checkoutSuccessView = document.getElementById('checkoutSuccessView');
        if (checkoutSuccessView) {
          checkoutSuccessView.style.display = 'block';
        }

        // Reset state
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        cart = [];
        updateCartUI();
        officialCheckoutForm.reset();
        
        // Hide delivery address container & clear values
        if (chkDeliveryAddressContainer) {
          chkDeliveryAddressContainer.style.display = 'none';
          if (chkLieferStrasse) chkLieferStrasse.required = false;
          if (chkLieferPlz) chkLieferPlz.required = false;
          if (chkLieferOrt) chkLieferOrt.required = false;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState({ view: 'success' }, '', '#bestaetigung');
      }, 1200);
    });
  }

  // Hook back home button in success view
  const successBackHomeBtn = document.getElementById('successBackHomeBtn');
  if (successBackHomeBtn) {
    successBackHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const checkoutSuccessView = document.getElementById('checkoutSuccessView');
      if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
      showMainView();
    });
  }

  /* ------------------------------------------------------------------------
     7.6 B2B PARTNER CONTACT FORM SUBMISSION
     ------------------------------------------------------------------------ */
  const b2bPartnerContactForm = document.getElementById('b2bPartnerContactForm');
  const b2bFormSuccess = document.getElementById('b2bFormSuccess');

  if (b2bPartnerContactForm) {
    b2bPartnerContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = b2bPartnerContactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Übermittlung...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        b2bPartnerContactForm.reset();
        if (b2bFormSuccess) {
          b2bFormSuccess.style.display = 'block';
          b2bPartnerContactForm.style.display = 'none';
          setTimeout(() => {
            b2bFormSuccess.style.display = 'none';
            b2bPartnerContactForm.style.display = 'flex';
          }, 8000);
        }
      }, 1000);
    });
  }

  /* ------------------------------------------------------------------------
     8. CATEGORY FILTER TABS (FOR MAIN VIEW)
     ------------------------------------------------------------------------ */
  const catTabs = document.querySelectorAll('.cat-tab');
  const productCards = document.querySelectorAll('#mainView .product-card');

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-category');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     9. INTERACTIVE CURSOR-POSITION IMAGE ZOOM (EXCLUSIVELY FOR PRODUCT DETAIL VIEW)
     ------------------------------------------------------------------------ */
  function initImageZoomHandlers(container = document) {
    const zoomBoxes = container.querySelectorAll('.single-product-image-box');
    
    zoomBoxes.forEach(box => {
      const img = box.querySelector('img');
      if (!img) return;

      box.style.overflow = 'hidden';
      box.style.cursor = 'zoom-in';

      if (box.dataset.zoomInitialized) return;
      box.dataset.zoomInitialized = 'true';

      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2.2)';
      });

      box.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
      });
    });
  }

  // Initial call for single product detail view image
  initImageZoomHandlers();

  /* ------------------------------------------------------------------------
     10. SCROLLSPY & NAVBAR ACTIVE HIGHLIGHTING (YELLOW)
     ------------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mainSections = document.querySelectorAll('#mainView section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();

        if (mainView.style.display === 'none') {
          showMainView();
        }

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 110;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  function updateScrollSpy() {
    if (mainView.style.display === 'none') return;

    const scrollPos = window.scrollY + 180;

    mainSections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');

      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        navLinks.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${secId}`) {
            l.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();

  /* ------------------------------------------------------------------------
     11. STANDALONE CART PAGE VIEW LOGIC (#cartView)
     ------------------------------------------------------------------------ */
  const cartView = document.getElementById('cartView');
  const backFromCartBtn = document.getElementById('backFromCartBtn');
  const cartPageItemsBody = document.getElementById('cartPageItemsBody');
  const cartPageTotalCount = document.getElementById('cartPageTotalCount');
  const cartPageWeiterBtn = document.getElementById('cartPageWeiterBtn');

  function openCartView(pushState = true) {
    if (!cartView) return;

    renderCartPageUI();

    mainView.style.display = 'none';
    categoryDetailView.style.display = 'none';
    productDetailView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';
    cartView.style.display = 'block';
    updateNavbarMode(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: 'cart' }, '', '#anfragekorb');
    }
  }

  function renderCartPageUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalItems;
    if (cartPageTotalCount) cartPageTotalCount.innerText = `${totalItems} Artikel`;

    if (!cartPageItemsBody) return;

    if (cart.length === 0) {
      cartPageItemsBody.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: #F9F9F9; border-radius: var(--radius-md); border: 1px solid #E5E5E5;">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #CCC; margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #333;">Ihr Anfragekorb ist leer</h3>
          <p style="color: #777; margin-bottom: 1.5rem;">Wählen Sie unsere Mietkategorien, um Produkte hinzuzufügen.</p>
          <button class="btn btn-yellow" onclick="showMainView();"><i class="fas fa-layer-group"></i> Zu den Kategorien</button>
        </div>
      `;
    } else {
      let html = '';
      cart.forEach((item, index) => {
        html += `
          <div class="cart-page-item-card">
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div class="cart-page-item-img">
                <img src="${item.img || 'images/Eventnight-Logo-ausgeschnitten.png'}" alt="${item.title}">
              </div>
              <div>
                <div class="cart-page-item-title">${item.title}</div>
                <div style="font-size: 0.85rem; color: #666;">Artikel-ID: ${item.id}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div class="qty-picker">
                <button class="qty-btn cart-page-qty-minus" data-index="${index}">-</button>
                <input type="text" class="qty-input cart-page-qty-input" data-index="${index}" value="${item.qty}" inputmode="numeric">
                <button class="qty-btn cart-page-qty-plus" data-index="${index}">+</button>
              </div>

              <button class="cart-item-remove cart-page-item-remove" data-index="${index}" title="Entfernen" style="font-size: 1.1rem; color: #EF4444; background: none; border: none; cursor: pointer; padding: 0.5rem;">
                <i class="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
      });

      cartPageItemsBody.innerHTML = html;

      cartPageItemsBody.querySelectorAll('.cart-page-qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
          input.value = input.value.replace(/[^0-9]/g, '');
          const idx = e.target.getAttribute('data-index');
          const val = parseInt(input.value) || 0;
          if (val > 0) {
            cart[idx].qty = val;
            renderCartPageUI();
          }
        });
      });

      cartPageItemsBody.querySelectorAll('.cart-page-qty-minus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          renderCartPageUI();
        };
      });

      cartPageItemsBody.querySelectorAll('.cart-page-qty-plus').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart[idx].qty += 1;
          renderCartPageUI();
        };
      });

      cartPageItemsBody.querySelectorAll('.cart-page-item-remove').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          cart.splice(idx, 1);
          renderCartPageUI();
        };
      });
    }
  }

  if (cartHeaderBtn) {
    cartHeaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartView();
    });
  }

  if (backFromCartBtn) {
    backFromCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.back();
    });
  }

  if (cartPageWeiterBtn) {
    cartPageWeiterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert('Ihr Anfragekorb ist leer. Bitte fügen Sie erst Artikel hinzu.');
        return;
      }
      openCheckoutView();
    });
  }

  /* ------------------------------------------------------------------------
     12. HEADER MEGA DROPDOWN EVENTBEDARF CATEGORY NAVIGATION
     ------------------------------------------------------------------------ */
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const catKey = item.getAttribute('data-cat');
      openCategorySubpage(catKey);
    });
  });

  /* ------------------------------------------------------------------------
     12B. MOBILE MENU NAVIGATION DRAWER SYSTEM
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCatLinks = document.querySelectorAll('.mobile-cat-link');

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  function closeMobileMenu() {
    if (mobileMenuOverlay) {
      mobileMenuOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      // Allow default hash navigation to sections
    });
  });

  mobileCatLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const catKey = link.getAttribute('data-cat');
      openCategorySubpage(catKey);
    });
  });

  /* ------------------------------------------------------------------------
     12C. EVENT RECOMMENDATIONS SYSTEM (EVENT-TYPEN)
     ------------------------------------------------------------------------ */
  const eventTabBtns = document.querySelectorAll('.event-tab-btn');
  const eventRecommendationsGrid = document.getElementById('eventRecommendationsGrid');

  const eventRecommendationsMap = {
    festivals: ['ab1', 'ab2', 'bz1', 'bg1', 'boden1', 'zelt1'],
    konzerte: ['ab1', 'bg1', 'bg3', 'es1', 'moeb8'],
    sport: ['ab1', 'ab2', 'bz1', 'verkehr2', 'es1'],
    firmen: ['moeb1', 'moeb3', 'moeb5', 'moeb10', 'moeb11', 'kass2'],
    hochzeiten: ['moeb2', 'moeb4', 'moeb10', 'moeb12', 'zelt1'],
    stadtfeste: ['ab1', 'bz1', 'zelt1', 'moeb7', 'kass1', 'verkehr1'],
    private: ['moeb7', 'moeb8', 'zelt1', 'ab3'],
    baustellen: ['bz1', 'bz2', 'bz3', 'boden1', 'verkehr1', 'verkehr2']
  };

  function renderEventRecommendations(eventType) {
    if (!eventRecommendationsGrid) return;
    eventRecommendationsGrid.innerHTML = '';

    const pIds = eventRecommendationsMap[eventType] || [];
    const products = pIds.map(id => allProductsMap[id]).filter(Boolean);

    if (products.length === 0) {
      eventRecommendationsGrid.innerHTML = '<p style="text-align: center; color: #777; width: 100%;">Keine Empfehlungen für diesen Event-Typ gefunden.</p>';
      return;
    }

    products.forEach(item => {
      const parentCatKey = getCategoryKeyForProduct(item);
      const catDisplayName = item.categoryName || (parentCatKey === 'bauzaun' ? 'Bauzaun' : 'Absperrgitter');

      const card = document.createElement('div');
      card.className = 'product-row-card product-card';
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-title', item.title);
      card.style.background = '#FFFFFF';
      card.style.border = '2px solid #EAEAEA';
      card.style.borderRadius = 'var(--radius-md)';
      card.style.padding = '1.25rem';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';

      card.innerHTML = `
        <div style="cursor: pointer;" onclick="openSingleProductView('${item.id}')">
          <div class="product-row-img" style="height: 180px; display: flex; align-items: center; justify-content: center; background: #F9FAFB; border-radius: var(--radius-sm); margin-bottom: 1rem; overflow: hidden; padding: 0.5rem; border: 1px solid #EAEAEA;">
            <img src="${item.img}" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #888888; display: block; margin-bottom: 0.35rem;">${catDisplayName}</span>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #111; line-height: 1.3; margin-bottom: 0.5rem; height: 2.6rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.title}</h4>
          <span style="font-size: 0.8rem; color: #666; display: block; margin-bottom: 0.5rem;">Art-Nr: ${item.articleNr || 'EV-0000'}</span>
          <p style="font-size: 0.85rem; color: #555; line-height: 1.4; height: 3.8rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; margin-bottom: 1rem;">${item.description ? item.description.replace(/<[^>]*>/g, ' ') : 'Professionelles Miet-Equipment für Veranstaltungen.'}</p>
        </div>
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: space-between;">
            <div class="qty-picker" style="height: 38px;">
              <button class="qty-btn qty-minus">-</button>
              <input type="text" class="qty-input" value="${item.defaultQty || 1}" inputmode="numeric" style="width: 38px; height: 34px;">
              <button class="qty-btn qty-plus">+</button>
            </div>
            <button class="add-cart-btn" style="flex: 1; padding: 0.55rem 0.75rem; font-size: 0.88rem; height: 38px; border-radius: var(--radius-full); background: var(--brand-yellow); color: var(--dark-bg); font-weight: 700; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
              <i class="fas fa-plus"></i> In den Korb
            </button>
          </div>
          <button class="view-details-link-btn" onclick="openSingleProductView('${item.id}')" style="width: 100%; border: 1.5px solid #D6D6D6; background: #FFFFFF; color: #444; padding: 0.45rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: var(--transition);">
            Details ansehen
          </button>
        </div>
      `;

      eventRecommendationsGrid.appendChild(card);
    });

    // Wire up listeners inside dynamic cards (quantity pickers, add to cart)
    attachProductCardListeners(eventRecommendationsGrid);
  }

  // Hook up event type buttons
  eventTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventTabBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.borderColor = '#E5E7EB';
        b.style.color = '#444';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--brand-yellow)';
      btn.style.borderColor = 'var(--brand-yellow)';
      btn.style.color = 'var(--dark-bg)';

      renderEventRecommendations(btn.dataset.event);
    });
  });

  // Initialize recommendation list with 'festivals'
  renderEventRecommendations('festivals');

  /* ------------------------------------------------------------------------
     13. NATIVE BROWSER BACK / FORWARD BUTTON (POPSTATE) NAVIGATION
     ------------------------------------------------------------------------ */
  history.replaceState({ view: 'main' }, '', window.location.hash || '#start');

  window.addEventListener('popstate', (e) => {
    const state = e.state;
    const successView = document.getElementById('checkoutSuccessView');
    if (successView) successView.style.display = 'none';

    if (state && state.view === 'category' && state.catKey) {
      openCategorySubpage(state.catKey, false);
    } else if (state && state.view === 'product' && state.productId) {
      openSingleProductView(state.productId, false);
    } else if (state && state.view === 'cart') {
      openCartView(false);
    } else if (state && state.view === 'checkout') {
      openCheckoutView(false);
    } else if (state && state.view === 'success') {
      if (checkoutView) checkoutView.style.display = 'none';
      if (cartView) cartView.style.display = 'none';
      mainView.style.display = 'none';
      categoryDetailView.style.display = 'none';
      productDetailView.style.display = 'none';
      if (successView) successView.style.display = 'block';
      updateNavbarMode(true);
    } else {
      showMainView(false);
    }
  });

  window.openCartView = openCartView;
});
