/* =========================================================
   Restaurant La Fontana — app.js
   Vanilla JS (ES6+) · i18n CA/ES · Carta amb pestanyes ·
   Smooth scroll · Reveal on scroll · Estat obert/tancat
   ========================================================= */

(() => {
  'use strict';

  /* -------------------------------------------------------
     1. Diccionari i18n (CA per defecte, ES alternatiu)
     ------------------------------------------------------- */
  const I18N = {
    ca: {
      'meta.title': "Restaurant La Fontana · Cuina italiana a L'Ametlla del Vallès",
      'meta.description': "Restaurant i pizzeria italiana a L'Ametlla del Vallès. Pastes fresques, pizzes amb massa reposada tota la nit i producte italià D.O.P. Reserves: 93 845 76 06.",

      'a11y.skip': 'Salta al contingut',
      'a11y.menu': 'Obre el menú',
      'a11y.menuClose': 'Tanca el menú',
      'a11y.tabs': 'Categories de la carta',

      'nav.home': 'Inici',
      'nav.restaurant': 'El Restaurant',
      'nav.menu': 'La Carta',
      'nav.gallery': 'Galeria',
      'nav.contact': 'Contacte',
      'nav.delivery': 'A domicili',

      'cta.book': 'Reservar taula',
      'cta.bookShort': 'Reservar',
      'cta.menu': 'Veure la carta',
      'cta.call': 'Trucar i reservar',
      'cta.menuShort': 'Carta',
      'cta.mapShort': 'Mapa',

      'hero.eyebrow': "Restaurant · Pizzeria · L'Ametlla del Vallès",
      'hero.title': 'La cuina italiana de sempre, <em>feta sense presses</em>',
      'hero.lead': "Pastes fresques, pizzes amb massa reposada tota la nit i producte italià D.O.P., al cor de L'Ametlla del Vallès.",
      'hero.deliveryTitle': 'També a domicili i per emportar',
      'hero.deliveryText': 'Truca al 93 845 76 06 i fes la comanda',

      'delivery.eyebrow': 'A domicili · Per emportar',
      'delivery.title': 'La Fontana, <em>també a casa</em>',
      'delivery.lead': "Les nostres pizzes, pastes i plats de la carta, per endur-te'ls o perquè te'ls portem a casa. Només cal una trucada.",
      'delivery.phoneLabel': 'Truca i fes la comanda',
      'delivery.call': 'Trucar ara',
      'delivery.copy': 'Copiar el número',
      'delivery.copied': 'Número copiat',
      'delivery.hours': 'Mateix horari que el restaurant.',
      'delivery.hoursLink': 'Veure horaris',
      'delivery.promoNote': 'El <strong>Dilluns boig</strong> és només al restaurant i per recollir, no a domicili.',
      'delivery.s1t': 'Tria a la carta',
      'delivery.s1d': 'Mira la carta i apunta què et ve de gust.',
      'delivery.s1l': 'Obrir la carta',
      'delivery.s2t': "Truca'ns",
      'delivery.s2d': "Al 93 845 76 06. Et confirmem l'hora i, si és a domicili, l'adreça d'entrega.",
      'delivery.s3t': 'Recull-la o te la portem',
      'delivery.s3d': 'Passa a buscar-la pel restaurant (Carrer Poeta Maragall, 1) o rep-la a casa, ben calenta.',

      'story.eyebrow': "L'essència italiana",
      'story.title': 'Receptes amb memòria, <em>producte amb nom propi</em>',
      'story.p1': 'A La Fontana cuinem com es cuina a Itàlia: amb paciència, respecte per les receptes de sempre i ingredients que parlen per si sols.',
      'story.p2': "Fem la massa de les pizzes amb farines seleccionades i la deixem reposar d'un dia per l'altre, perquè surti lleugera i aromàtica. Les pastes arriben a taula al dente, amb salses fetes al moment, i a la cuina hi trobaràs mozzarella de búfala, burrata, mortadel·la D.O. i formatges italians de denominació d'origen.",
      'story.p3': 'Tot plegat en un local renovat, càlid i acollidor, pensat per a sopars sense presses, celebracions en família o una pizza per emportar quan ve de gust.',
      'story.k1': 'Impasto',
      'story.h1': 'Reposada tota la nit',
      'story.d1': "La massa es fa el dia abans i reposa fins a l'endemà.",
      'story.k2': 'Pasta',
      'story.h2': 'Sempre al dente',
      'story.d2': 'Pasta fresca i farcida, amb salses de la casa.',
      'story.k3': 'Prodotto',
      'story.h3': 'D.O.P. italià',
      'story.d3': "Burrata, búfala, provolone i embotits d'Itàlia.",
      'story.badge': 'La massa de les nostres pizzes',

      'menu.eyebrow': 'Il Menù',
      'menu.title': 'La Carta <em>Italiana</em>',
      'menu.lead': 'Per compartir, pastes, pizzes artesanes i cuina de mercat. També per emportar i a domicili.',
      'menu.orderTitle': 'Ho vols a casa?',
      'menu.orderText': 'Fes la comanda per emportar o a domicili al 93 845 76 06.',

      'promo.day': 'Cada dilluns',
      'promo.today': 'Avui és dilluns!',
      'promo.text': 'Preu especial en una selecció de pizzes i en alguns postres, per menjar al restaurant o per recollir.',
      'promo.note': "No s'aplica a les comandes a domicili. Pregunta'ns quines pizzes i postres hi entren.",
      'menu.allergens': "Si tens alguna al·lèrgia o intolerància, demana al nostre equip la informació d'al·lèrgens de cada plat.",
      'menu.pdf': 'Descarregar la carta (PDF)',
      'menu.takeaway': 'A domicili · 93 845 76 06',
      'menu.unit': 'unitat',
      'menu.portion': 'ració',
      'menu.extrasTitle': 'Ingredients extra',
      'menu.dolciTitle': 'Dolci <em>artigianali</em>',
      'menu.dolciText': "Els postres canvien segons el dia i la temporada: tiramisú, panna cotta i altres dolços fets a casa. Pregunta al nostre equip quins tenim avui.",
      'menu.dolciCta': 'Pregunta pels postres del dia',

      'legend.v': 'Vegetarià',
      'legend.vg': 'Vegà',
      'legend.hot': 'Picant',

      'gallery.eyebrow': 'Galeria',
      'gallery.title': 'Forn, taula <em>i bona companyia</em>',
      'gallery.c1': 'Pasta al dente',
      'gallery.c2': 'Crudo',
      'gallery.c3': 'La casa',
      'gallery.c4': 'Burrata',
      'gallery.c5': 'Alla brace',
      'gallery.c6': 'Caprese',
      'gallery.alt1': 'Spaghetti amb marisc, gamba i musclos',
      'gallery.alt2': 'Carpaccio de peix amb tomàquet i julivert',
      'gallery.alt3': 'Entrada del restaurant, porta de fusta i glicina florida',
      'gallery.alt4': 'Burrata amb pesto, tomàquet sec i olives',
      'gallery.alt5': 'Entrecot a la brasa amb verdures i patata',
      'gallery.alt6': 'Caprese de tomàquet i mozzarella amb orenga',

      'reviews.eyebrow': 'Ressenyes',
      'reviews.title': 'El que diuen <em>a la taula</em>',
      'reviews.badge': 'Llegeix totes les ressenyes a Google',

      'contact.eyebrow': 'Contacte',
      'contact.title': "Vine a <em>veure'ns</em>",
      'contact.address': 'Adreça',
      'contact.phone': 'Reserves, per emportar i a domicili',
      'contact.hours': 'Horari',
      'contact.directions': 'Com arribar',
      'contact.gmaps': 'Veure a Google Maps',

      'hours.closed': 'Tancat',
      'hours.today': 'Avui',
      'status.openUntil': 'Obert ara · fins a les {time}',
      'status.opensToday': 'Ara tancat · obrim avui a les {time}',
      'status.opensOn': 'Ara tancat · obrim {day} a les {time}',
      'status.opensTomorrow': 'Ara tancat · obrim demà a les {time}',

      'day.0': 'Diumenge', 'day.1': 'Dilluns', 'day.2': 'Dimarts', 'day.3': 'Dimecres',
      'day.4': 'Dijous', 'day.5': 'Divendres', 'day.6': 'Dissabte',

      'footer.tagline': "Restaurant i pizzeria a L'Ametlla del Vallès.",
      'footer.visit': "Visita'ns",
      'footer.follow': 'Segueix-nos',
      'footer.delivery': 'A domicili i per emportar',
      'footer.rights': 'Tots els drets reservats.',
      'footer.legal': 'Avís legal',
      'footer.privacy': 'Privacitat',
      'footer.cookies': 'Cookies'
    },

    es: {
      'meta.title': "Restaurant La Fontana · Cocina italiana en L'Ametlla del Vallès",
      'meta.description': "Restaurante y pizzería italiana en L'Ametlla del Vallès. Pastas frescas, pizzas con masa reposada toda la noche y producto italiano D.O.P. Reservas: 93 845 76 06.",

      'a11y.skip': 'Saltar al contenido',
      'a11y.menu': 'Abrir el menú',
      'a11y.menuClose': 'Cerrar el menú',
      'a11y.tabs': 'Categorías de la carta',

      'nav.home': 'Inicio',
      'nav.restaurant': 'El Restaurante',
      'nav.menu': 'La Carta',
      'nav.gallery': 'Galería',
      'nav.contact': 'Contacto',
      'nav.delivery': 'A domicilio',

      'cta.book': 'Reservar mesa',
      'cta.bookShort': 'Reservar',
      'cta.menu': 'Ver la carta',
      'cta.call': 'Llamar y reservar',
      'cta.menuShort': 'Carta',
      'cta.mapShort': 'Mapa',

      'hero.eyebrow': "Restaurante · Pizzería · L'Ametlla del Vallès",
      'hero.title': 'La cocina italiana de siempre, <em>hecha sin prisas</em>',
      'hero.lead': "Pastas frescas, pizzas con masa reposada toda la noche y producto italiano D.O.P., en el corazón de L'Ametlla del Vallès.",
      'hero.deliveryTitle': 'También a domicilio y para llevar',
      'hero.deliveryText': 'Llama al 93 845 76 06 y haz tu pedido',

      'delivery.eyebrow': 'A domicilio · Para llevar',
      'delivery.title': 'La Fontana, <em>también en casa</em>',
      'delivery.lead': 'Nuestras pizzas, pastas y platos de la carta, para llevar o para que te los llevemos a casa. Solo hace falta una llamada.',
      'delivery.phoneLabel': 'Llama y haz tu pedido',
      'delivery.call': 'Llamar ahora',
      'delivery.copy': 'Copiar el número',
      'delivery.copied': 'Número copiado',
      'delivery.hours': 'Mismo horario que el restaurante.',
      'delivery.hoursLink': 'Ver horarios',
      'delivery.promoNote': 'El <strong>Dilluns boig</strong> es solo en el restaurante y para recoger, no a domicilio.',
      'delivery.s1t': 'Elige en la carta',
      'delivery.s1d': 'Mira la carta y apunta lo que te apetece.',
      'delivery.s1l': 'Abrir la carta',
      'delivery.s2t': 'Llámanos',
      'delivery.s2d': 'Al 93 845 76 06. Te confirmamos la hora y, si es a domicilio, la dirección de entrega.',
      'delivery.s3t': 'Recógelo o te lo llevamos',
      'delivery.s3d': 'Pasa a recogerlo por el restaurante (Carrer Poeta Maragall, 1) o recíbelo en casa, bien calentito.',

      'story.eyebrow': 'La esencia italiana',
      'story.title': 'Recetas con memoria, <em>producto con nombre propio</em>',
      'story.p1': 'En La Fontana cocinamos como se cocina en Italia: con paciencia, respeto por las recetas de siempre e ingredientes que hablan por sí solos.',
      'story.p2': 'Hacemos la masa de las pizzas con harinas seleccionadas y la dejamos reposar de un día para otro, para que salga ligera y aromática. Las pastas llegan a la mesa al dente, con salsas hechas al momento, y en la cocina encontrarás mozzarella de búfala, burrata, mortadela D.O. y quesos italianos con denominación de origen.',
      'story.p3': 'Todo ello en un local renovado, cálido y acogedor, pensado para cenas sin prisas, celebraciones en familia o una pizza para llevar cuando apetece.',
      'story.k1': 'Impasto',
      'story.h1': 'Reposada toda la noche',
      'story.d1': 'La masa se hace el día antes y reposa hasta el día siguiente.',
      'story.k2': 'Pasta',
      'story.h2': 'Siempre al dente',
      'story.d2': 'Pasta fresca y rellena, con salsas de la casa.',
      'story.k3': 'Prodotto',
      'story.h3': 'D.O.P. italiano',
      'story.d3': 'Burrata, búfala, provolone y embutidos de Italia.',
      'story.badge': 'La masa de nuestras pizzas',

      'menu.eyebrow': 'Il Menù',
      'menu.title': 'La Carta <em>Italiana</em>',
      'menu.lead': 'Para compartir, pastas, pizzas artesanas y cocina de mercado. También para llevar y a domicilio.',
      'menu.orderTitle': '¿Lo quieres en casa?',
      'menu.orderText': 'Haz tu pedido para llevar o a domicilio al 93 845 76 06.',

      'promo.day': 'Cada lunes',
      'promo.today': '¡Hoy es lunes!',
      'promo.text': 'Precio especial en una selección de pizzas y en algunos postres, para comer en el restaurante o para recoger.',
      'promo.note': 'No se aplica a los pedidos a domicilio. Pregúntanos qué pizzas y postres entran.',
      'menu.allergens': 'Si tienes alguna alergia o intolerancia, pide a nuestro equipo la información de alérgenos de cada plato.',
      'menu.pdf': 'Descargar la carta (PDF)',
      'menu.takeaway': 'A domicilio · 93 845 76 06',
      'menu.unit': 'unidad',
      'menu.portion': 'ración',
      'menu.extrasTitle': 'Ingredientes extra',
      'menu.dolciTitle': 'Dolci <em>artigianali</em>',
      'menu.dolciText': 'Los postres cambian según el día y la temporada: tiramisú, panna cotta y otros dulces caseros. Pregunta a nuestro equipo cuáles tenemos hoy.',
      'menu.dolciCta': 'Pregunta por los postres del día',

      'legend.v': 'Vegetariano',
      'legend.vg': 'Vegano',
      'legend.hot': 'Picante',

      'gallery.eyebrow': 'Galería',
      'gallery.title': 'Horno, mesa <em>y buena compañía</em>',
      'gallery.c1': 'Pasta al dente',
      'gallery.c2': 'Crudo',
      'gallery.c3': 'La casa',
      'gallery.c4': 'Burrata',
      'gallery.c5': 'Alla brace',
      'gallery.c6': 'Caprese',
      'gallery.alt1': 'Spaghetti con marisco, gamba y mejillones',
      'gallery.alt2': 'Carpaccio de pescado con tomate y perejil',
      'gallery.alt3': 'Entrada del restaurante, puerta de madera y glicina en flor',
      'gallery.alt4': 'Burrata con pesto, tomate seco y aceitunas',
      'gallery.alt5': 'Entrecot a la brasa con verduras y patata',
      'gallery.alt6': 'Caprese de tomate y mozzarella con orégano',

      'reviews.eyebrow': 'Reseñas',
      'reviews.title': 'Lo que dicen <em>en la mesa</em>',
      'reviews.badge': 'Lee todas las reseñas en Google',

      'contact.eyebrow': 'Contacto',
      'contact.title': 'Ven a <em>vernos</em>',
      'contact.address': 'Dirección',
      'contact.phone': 'Reservas, para llevar y a domicilio',
      'contact.hours': 'Horario',
      'contact.directions': 'Cómo llegar',
      'contact.gmaps': 'Ver en Google Maps',

      'hours.closed': 'Cerrado',
      'hours.today': 'Hoy',
      'status.openUntil': 'Abierto ahora · hasta las {time}',
      'status.opensToday': 'Ahora cerrado · abrimos hoy a las {time}',
      'status.opensOn': 'Ahora cerrado · abrimos el {day} a las {time}',
      'status.opensTomorrow': 'Ahora cerrado · abrimos mañana a las {time}',

      'day.0': 'Domingo', 'day.1': 'Lunes', 'day.2': 'Martes', 'day.3': 'Miércoles',
      'day.4': 'Jueves', 'day.5': 'Viernes', 'day.6': 'Sábado',

      'footer.tagline': "Restaurante y pizzería en L'Ametlla del Vallès.",
      'footer.visit': 'Visítanos',
      'footer.follow': 'Síguenos',
      'footer.delivery': 'A domicilio y para llevar',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.legal': 'Aviso legal',
      'footer.privacy': 'Privacidad',
      'footer.cookies': 'Cookies'
    }
  };

  /* -------------------------------------------------------
     2. La carta (transcrita de Carta-1/2/3.jpeg)
        n: nom (string = igual en tots dos idiomes, o {ca, es})
        d: descripció {ca, es} · p: preu € · t: etiquetes
        u: 'unit' | 'portion' (preu per unitat / ració)
        Etiquetes: v = vegetarià, vg = vegà, hot = picant
     ------------------------------------------------------- */
  const MENU = [
    {
      id: 'antipasti',
      it: 'Antipasti & Insalate',
      sub: { ca: 'Entrants i amanides', es: 'Entrantes y ensaladas' },
      groups: [
        {
          title: { ca: 'Entrants', es: 'Entrantes' },
          note: { ca: 'Per picar i compartir', es: 'Para picar y compartir' },
          items: [
            { n: { ca: 'Croquetes', es: 'Croquetas' }, d: { ca: 'De pernil ibèric o de pollastre rostit', es: 'De jamón ibérico o de pollo asado' }, p: 2.00, u: 'unit' },
            { n: { ca: 'Les nostres braves', es: 'Nuestras bravas' }, p: 7.80 },
            { n: { ca: 'Carpaccio de bou', es: 'Carpaccio de buey' }, d: { ca: 'Amb ruca i encenalls de parmesà', es: 'Con rúcula y virutas de parmesano' }, p: 17.90 },
            { n: { ca: 'Delícies', es: 'Delicias' }, d: { ca: 'Farcellets farcits de brie, cabra i gorgonzola amb melmelada de tomàquet', es: 'Saquitos rellenos de brie, cabra y gorgonzola con mermelada de tomate' }, p: 12.00, t: ['v'] },
            { n: { ca: 'Bombes', es: 'Bombas' }, d: { ca: 'Massa de pizza fregida farcida de pulled pork', es: 'Masa de pizza frita rellena de pulled pork' }, p: 12.00 },
            { n: { ca: 'Fletxes de pollastre', es: 'Flechas de pollo' }, d: { ca: 'Amb arrebossat de dues textures i dues salses', es: 'Con rebozado de dos texturas y dos salsas' }, p: 12.90 },
            { n: { ca: "Calamarcets a l'andalusa", es: 'Chipirones a la andaluza' }, p: 18.00 },
            { n: 'Timbal', d: { ca: "Làmines d'albergínia amb salsa de tomàquet, formatge de cabra gratinat i ametlles", es: 'Láminas de berenjena con salsa de tomate, queso de cabra gratinado y almendras' }, p: 14.50, t: ['v'] },
            { n: 'La Provoletta', d: { ca: 'Formatge provolone semifos amb focaccia', es: 'Queso provolone semifundido con focaccia' }, p: 16.00, t: ['v'] },
            { n: { ca: 'Tartar de salmó fumat', es: 'Tartar de salmón ahumado' }, d: { ca: 'Amb alvocat i tomàquet, mantega a les fines herbes i torradetes', es: 'Con aguacate y tomate, mantequilla a las finas hierbas y tostaditas' }, p: 18.50 }
          ]
        },
        {
          title: { ca: 'Les amanides', es: 'Las ensaladas' },
          items: [
            { n: 'La Burrata di Apulia', d: { ca: "Bola de mozzarella fresca d'interior cremós amb brots d'enciam, tomàquets confitats i reducció d'oli d'alfàbrega", es: 'Bola de mozzarella fresca de interior cremoso con brotes de lechuga, tomates confitados y reducción de aceite de albahaca' }, p: 14.00, t: ['v'] },
            { n: 'La Caprese', d: { ca: 'Mozzarella de búfala fresca, tomàquet de temporada laminat, olives i orenga', es: 'Mozzarella de búfala fresca, tomate de temporada laminado, aceitunas y orégano' }, p: 14.00, t: ['v'] },
            { n: 'Mixta', d: { ca: "Variat d'enciams, tomàquet xerri, ceba, pastanaga, olives, tonyina i puntes d'espàrrecs", es: 'Variado de lechugas, tomate cherry, cebolla, zanahoria, aceitunas, atún y puntas de espárragos' }, p: 10.50 },
            { n: 'Trentina', d: { ca: "Variat d'enciams, tomàquet xerri, cruixent de bacó, fruits secs i formatge de cabra amb vinagreta de nous", es: 'Variado de lechugas, tomate cherry, crujiente de bacon, frutos secos y queso de cabra con vinagreta de nueces' }, p: 14.00 },
            { n: 'Siena', d: { ca: "Variat d'enciams, tomàquet sec confitat, encenalls de foie, pernil d'ànec, nous i encenalls de parmesà amb vinagreta de mel", es: 'Variado de lechugas, tomate seco confitado, virutas de foie, jamón de pato, nueces y virutas de parmesano con vinagreta de miel' }, p: 16.00 },
            { n: 'Pisa', d: { ca: "Variat d'enciams, fruits vermells, pera i gorgonzola amb vinagreta de fruits vermells", es: 'Variado de lechugas, frutos rojos, pera y gorgonzola con vinagreta de frutos rojos' }, p: 13.50, t: ['v'] },
            { n: { ca: 'Cèsar', es: 'César' }, d: { ca: "Variat d'enciams, pollastre cruixent, encenalls de parmesà i crostons de pa amb salsa Cèsar", es: 'Variado de lechugas, pollo crujiente, virutas de parmesano y picatostes con salsa César' }, p: 15.50 },
            { n: 'Xató', d: { ca: 'Escarola, bacallà, tonyina, anxoves, olives negres i salsa xató', es: 'Escarola, bacalao, atún, anchoas, aceitunas negras y salsa xató' }, p: 15.50 }
          ]
        },
        {
          title: { ca: 'Pa i focaccia', es: 'Pan y focaccia' },
          items: [
            { n: 'Focaccia', d: { ca: "Amb oli d'oliva i herbes aromàtiques", es: 'Con aceite de oliva y hierbas aromáticas' }, p: 6.20, t: ['v'] },
            { n: { ca: 'Pa de coca torrat', es: 'Pan de coca tostado' }, p: 2.30, u: 'portion', t: ['v'] },
            { n: { ca: 'Pa de coca torrat amb tomàquet', es: 'Pan de coca tostado con tomate' }, p: 2.60, u: 'portion', t: ['v'] }
          ]
        }
      ]
    },

    {
      id: 'paste',
      it: 'Le Paste & Risotti',
      sub: { ca: 'Pastes i risottos', es: 'Pastas y risottos' },
      groups: [
        {
          title: { ca: 'Les pastes', es: 'Las pastas' },
          items: [
            { n: 'Spaghetti Frutti di Mare', d: { ca: 'Amb cloïsses, musclos, calamars, gambes i salsa marinera', es: 'Con almejas, mejillones, calamares, gambas y salsa marinera' }, p: 18.50 },
            { n: 'Spaghetti Vongole', d: { ca: 'Amb cloïsses, all i julivert', es: 'Con almejas, ajo y perejil' }, p: 17.00 },
            { n: 'Spaghetti Capriccio', d: { ca: 'Amb carn de galta amb la seva salsa i xampinyons', es: 'Con carne de carrillera en su salsa y champiñones' }, p: 18.50 },
            { n: 'Spaghetti Tartufo', d: { ca: 'Amb saltat de ceps, crema de tòfona i nata', es: 'Con salteado de boletus, crema de trufa y nata' }, p: 17.00, t: ['v'] },
            { n: 'Spaghetti', d: { ca: 'A la bolonyesa, als 4 formaggi o a la carbonara (sense nata)', es: 'A la boloñesa, a los 4 formaggi o a la carbonara (sin nata)' }, p: 15.00 },
            { n: { ca: 'Rigatoni amb calamars', es: 'Rigatoni con calamares' }, d: { ca: 'Calamars saltats amb all i julivert i tomàquet xerri', es: 'Calamares salteados con ajo y perejil y tomate cherry' }, p: 18.50 },
            { n: 'Rigatoni Portofino', d: { ca: 'Amb salsa pesto i tomàquet', es: 'Con salsa pesto y tomate' }, p: 15.00, t: ['v'] },
            { n: 'Rigatoni Pesto', d: { ca: 'Amb salsa pesto i burratina', es: 'Con salsa pesto y burratina' }, p: 16.00, t: ['v'] },
            { n: 'Garganelli Nonna', d: { ca: 'Amb salsa bolonyesa, gratinats amb formatge', es: 'Con salsa boloñesa, gratinados con queso' }, p: 16.00 },
            { n: 'Garganelli Salmone', d: { ca: 'Amb salmó fumat flamejat al rom i nata', es: 'Con salmón ahumado flambeado al ron y nata' }, p: 17.50 },
            { n: 'Garganelli Arrabbiata', d: { ca: 'Amb tomàquet xerri, all, anxoves, tàperes, bitxo i olives', es: 'Con tomate cherry, ajo, anchoas, alcaparras, guindilla y aceitunas' }, p: 15.00, t: ['hot'] },
            { n: 'Gnocchi', d: { ca: 'Amb salsa de tomàquet i emmental o amb salsa 4 formaggi', es: 'Con salsa de tomate y emmental o con salsa 4 formaggi' }, p: 15.00, t: ['v'] },
            { n: 'Lasagna', d: { ca: 'De carn o de verdures', es: 'De carne o de verduras' }, p: 16.00 },
            { n: 'Lunette', d: { ca: 'Farcides de foie amb crema de parmesà i oli de tòfona', es: 'Rellenas de foie con crema de parmesano y aceite de trufa' }, p: 19.00 },
            { n: 'Fiocchi', d: { ca: 'Farcits de pera i formatge amb crema de gorgonzola', es: 'Rellenos de pera y queso con crema de gorgonzola' }, p: 16.00, t: ['v'] },
            { n: 'Ravioloni', d: { ca: "Farcits de ricotta i espinacs amb pesto d'espinacs i ametlla", es: 'Rellenos de ricotta y espinacas con pesto de espinacas y almendra' }, p: 15.50, t: ['v'] },
            { n: 'Ravioli Funghi', d: { ca: 'Farcits de bolets amb salsa de ceps', es: 'Rellenos de setas con salsa de boletus' }, p: 16.50, t: ['v'] },
            { n: 'Raviolaccio', d: { ca: 'Farcit de carn amb salsa de tomàquet', es: 'Relleno de carne con salsa de tomate' }, p: 15.50 },
            { n: 'Bottoni', d: { ca: 'Farcits de gamba vermella amb salsa de gamba', es: 'Rellenos de gamba roja con salsa de gamba' }, p: 19.00 }
          ]
        },
        {
          title: { ca: 'Els risottos', es: 'Los risottos' },
          items: [
            { n: { ca: 'Risotto de ceps', es: 'Risotto de boletus' }, p: 18.00, t: ['v'] },
            { n: { ca: 'Risotto de gambes', es: 'Risotto de gambas' }, p: 18.00 }
          ]
        }
      ]
    },

    {
      id: 'pizze',
      it: 'Le Pizze',
      sub: { ca: 'Gourmet i de sempre', es: 'Gourmet y clásicas' },
      groups: [
        {
          title: { ca: 'Pizzes gourmet', es: 'Pizzas gourmet' },
          items: [
            { n: 'Apulia', d: { ca: 'Tomàquet, mozzarella, burrata, ruca, tomàquet sec i olivada', es: 'Tomate, mozzarella, burrata, rúcula, tomate seco y olivada' }, p: 17.50, t: ['v'] },
            { n: 'Ariccia', d: { ca: 'Tomàquet, mozzarella, porchetta (lligat de carn de porc rostida amb herbes aromàtiques) i poma caramel·litzada', es: 'Tomate, mozzarella, porchetta (rollo de cerdo asado con hierbas aromáticas) y manzana caramelizada' }, p: 18.60 },
            { n: 'Pompeia', d: { ca: "Tomàquet, mozzarella, esmicolat de confit d'ànec i figues", es: 'Tomate, mozzarella, desmigado de confit de pato e higos' }, p: 17.80 },
            { n: 'Regina', d: { ca: 'Tomàquet, mozzarella, salmó fumat, ous de guatlla i alvocat', es: 'Tomate, mozzarella, salmón ahumado, huevos de codorniz y aguacate' }, p: 18.60 },
            { n: 'Tartufata', d: { ca: 'Crema de tòfona, mozzarella, ceps i xampinyons', es: 'Crema de trufa, mozzarella, boletus y champiñones' }, p: 17.50, t: ['v'] },
            { n: 'Toscana', d: { ca: 'Tomàquet, mozzarella, mortadel·la D.O., burratina, crema i cruixent de festucs', es: 'Tomate, mozzarella, mortadela D.O., burratina, crema y crujiente de pistachos' }, p: 18.60 },
            { n: { ca: 'Vesubi', es: 'Vesubio' }, d: { ca: 'Tomàquet, mozzarella, botifarra negra, tomàquet xerri, pinyons i maionesa', es: 'Tomate, mozzarella, butifarra negra, tomate cherry, piñones y mayonesa' }, p: 17.50 },
            { n: { ca: 'Venècia', es: 'Venecia' }, d: { ca: "Tomàquet, mozzarella, pernil d'ànec, foie i tomàquet sec confitat", es: 'Tomate, mozzarella, jamón de pato, foie y tomate seco confitado' }, p: 18.60 },
            { n: 'Vulcano', d: { ca: 'Tomàquet, mozzarella, pulled pork, ceba, pebrot i la seva salsa', es: 'Tomate, mozzarella, pulled pork, cebolla, pimiento y su salsa' }, p: 17.50 }
          ]
        },
        {
          title: { ca: 'Pizzes de sempre', es: 'Pizzas de siempre' },
          items: [
            { n: 'Margherita', d: { ca: 'Tomàquet, mozzarella i orenga', es: 'Tomate, mozzarella y orégano' }, p: 12.00, t: ['v'] },
            { n: { ca: 'Margherita amb un ingredient', es: 'Margherita con un ingrediente' }, d: { ca: 'Sense orenga, amb pernil dolç, bacó, salami picant, frankfurt, funghi o tonyina', es: 'Sin orégano, con jamón dulce, bacon, salami picante, frankfurt, funghi o atún' }, p: 14.50 },
            { n: '4 Formaggi', d: { ca: 'Tomàquet, mozzarella, emmental, gorgonzola i parmesà', es: 'Tomate, mozzarella, emmental, gorgonzola y parmesano' }, p: 15.70, t: ['v'] },
            { n: '4 Stagioni', d: { ca: 'Tomàquet, mozzarella, pernil dolç, xampinyons, carxofes, salami picant i olives', es: 'Tomate, mozzarella, jamón dulce, champiñones, alcachofas, salami picante y aceitunas' }, p: 15.70 },
            { n: 'Abate', d: { ca: 'Mozzarella, pera, parmesà, gorgonzola i nous', es: 'Mozzarella, pera, parmesano, gorgonzola y nueces' }, p: 15.70, t: ['v'] },
            { n: 'Abruzzo', d: { ca: 'Tomàquet, mozzarella, tonyina, carxofes i ceba', es: 'Tomate, mozzarella, atún, alcachofas y cebolla' }, p: 15.70 },
            { n: { ca: 'Anglesa', es: 'Inglesa' }, d: { ca: 'Tomàquet, mozzarella, bacó i ou', es: 'Tomate, mozzarella, bacon y huevo' }, p: 14.90 },
            { n: 'Barbacoa', d: { ca: 'Tomàquet, mozzarella, carn de vedella i salsa barbacoa', es: 'Tomate, mozzarella, carne de ternera y salsa barbacoa' }, p: 15.70 },
            { n: 'Boscaiola', d: { ca: 'Tomàquet, mozzarella, ceps, xampinyons i emmental', es: 'Tomate, mozzarella, boletus, champiñones y emmental' }, p: 15.70, t: ['v'] },
            { n: 'Bufala', d: { ca: "Tomàquet, mozzarella de búfala fresca i oli d'alfàbrega", es: 'Tomate, mozzarella de búfala fresca y aceite de albahaca' }, p: 14.90, t: ['v'] },
            { n: 'Caliu', d: { ca: 'Tomàquet, mozzarella, patata caliu, brie, parmesà i allioli', es: 'Tomate, mozzarella, patata caliu, brie, parmesano y alioli' }, p: 15.70, t: ['v'] },
            { n: 'Capra', d: { ca: 'Tomàquet, mozzarella, ceba caramel·litzada i formatge de cabra', es: 'Tomate, mozzarella, cebolla caramelizada y queso de cabra' }, p: 15.70, t: ['v'] },
            { n: 'Carbonara', d: { ca: 'Tomàquet, mozzarella, bacó i salsa carbonara', es: 'Tomate, mozzarella, bacon y salsa carbonara' }, p: 15.70 },
            { n: 'Capricciosa', d: { ca: 'Tomàquet, mozzarella, carxofes, xampinyons i olives', es: 'Tomate, mozzarella, alcachofas, champiñones y aceitunas' }, p: 15.70, t: ['v'] },
            { n: 'Catalana', d: { ca: 'Tomàquet, mozzarella, pernil dolç, salami picant, botifarra i bacó', es: 'Tomate, mozzarella, jamón dulce, salami picante, butifarra y bacon' }, p: 15.70 },
            { n: 'Etna', d: { ca: 'Tomàquet, mozzarella, vedella, ceba, xampinyons i gorgonzola', es: 'Tomate, mozzarella, ternera, cebolla, champiñones y gorgonzola' }, p: 15.70 },
            { n: 'Fiorentina', d: { ca: 'Tomàquet, mozzarella, pollastre, ceba i salsa barbacoa', es: 'Tomate, mozzarella, pollo, cebolla y salsa barbacoa' }, p: 15.70 },
            { n: 'Fontana', d: { ca: 'Tomàquet, mozzarella, botifarra, pebrot i ceba escalivats', es: 'Tomate, mozzarella, butifarra, pimiento y cebolla asados' }, p: 14.90 },
            { n: 'Inferno', d: { ca: 'Tomàquet, mozzarella, carn de vedella, salami picant i salsa inferno', es: 'Tomate, mozzarella, carne de ternera, salami picante y salsa inferno' }, p: 15.70, t: ['hot'] },
            { n: 'Lido', d: { ca: 'Tomàquet, mozzarella, tonyina, gambes i ceba', es: 'Tomate, mozzarella, atún, gambas y cebolla' }, p: 16.90 },
            { n: 'Mallorquina', d: { ca: 'Tomàquet, mozzarella, sobrassada, ceba i mel', es: 'Tomate, mozzarella, sobrasada, cebolla y miel' }, p: 14.90 },
            { n: 'Mareggiata', d: { ca: 'Tomàquet, mozzarella, tonyina, musclos, gambes i cloïsses', es: 'Tomate, mozzarella, atún, mejillones, gambas y almejas' }, p: 16.90 },
            { n: 'Mediterranea', d: { ca: 'Tomàquet, mozzarella, tonyina, anxoves, pebrot, ceba i olives', es: 'Tomate, mozzarella, atún, anchoas, pimiento, cebolla y aceitunas' }, p: 15.70 },
            { n: 'Noruega', d: { ca: 'Tomàquet, mozzarella, salmó fumat, anxoves i tonyina', es: 'Tomate, mozzarella, salmón ahumado, anchoas y atún' }, p: 16.90 },
            { n: 'Palermo', d: { ca: 'Tomàquet, mozzarella, salami picant, formatge provolone i ceba caramel·litzada', es: 'Tomate, mozzarella, salami picante, queso provolone y cebolla caramelizada' }, p: 15.70 },
            { n: 'Parma', d: { ca: 'Tomàquet, mozzarella, pernil salat, encenalls de parmesà i ruca', es: 'Tomate, mozzarella, jamón serrano, virutas de parmesano y rúcula' }, p: 15.70 },
            { n: 'Parmigiana', d: { ca: 'Tomàquet, mozzarella, albergínia, emmental i parmesà', es: 'Tomate, mozzarella, berenjena, emmental y parmesano' }, p: 15.70, t: ['v'] },
            { n: 'Prosciutto e Funghi', d: { ca: 'Tomàquet, mozzarella, pernil dolç, xampinyons i olives', es: 'Tomate, mozzarella, jamón dulce, champiñones y aceitunas' }, p: 15.70 },
            { n: 'Stromboli', d: { ca: 'Tomàquet, mozzarella, botifarra, tomàquet fresc laminat, ceba i rocafort', es: 'Tomate, mozzarella, butifarra, tomate fresco laminado, cebolla y roquefort' }, p: 15.70 },
            { n: 'Tropical', d: { ca: 'Tomàquet, mozzarella, pernil dolç i pinya', es: 'Tomate, mozzarella, jamón dulce y piña' }, p: 14.90 },
            { n: 'Vegetal', d: { ca: 'Tomàquet, mozzarella, albergínia, carbassó, xampinyons, pebrot i olives', es: 'Tomate, mozzarella, berenjena, calabacín, champiñones, pimiento y aceitunas' }, p: 15.70, t: ['v'] },
            { n: 'Zucchini', d: { ca: 'Tomàquet, mozzarella, bacó, carbassó i formatge brie', es: 'Tomate, mozzarella, bacon, calabacín y queso brie' }, p: 15.70 },
            { n: { ca: 'Delícia Vegana', es: 'Delicia Vegana' }, d: { ca: "Tomàquet, mozzarella vegana, albergínia, ceba caramel·litzada, xerris i oli d'alfàbrega", es: 'Tomate, mozzarella vegana, berenjena, cebolla caramelizada, cherrys y aceite de albahaca' }, p: 15.90, t: ['vg'] }
          ],
          extras: [
            { p: 2.50, d: { ca: 'Prosciutto, bacó, salami picant, tonyina, carxofes, gorgonzola, rocafort, brie, cabra, mozzarella, frankfurt', es: 'Prosciutto, bacon, salami picante, atún, alcachofas, gorgonzola, roquefort, brie, cabra, mozzarella, frankfurt' } },
            { p: 3.50, d: { ca: "Pollastre, carn de vedella, botifarra, ceps, salmó, calamars, pernil salat, anxoves, pulled pork, mortadel·la, botifarra negra", es: 'Pollo, carne de ternera, butifarra, boletus, salmón, calamares, jamón serrano, anchoas, pulled pork, mortadela, butifarra negra' } },
            { p: 5.00, d: { ca: "Mozzarella de búfala, burratina, gambes, foie, pernil d'ànec, confit d'ànec", es: 'Mozzarella de búfala, burratina, gambas, foie, jamón de pato, confit de pato' } }
          ]
        }
      ]
    },

    {
      id: 'secondi',
      it: 'Secondi',
      sub: { ca: 'Peix i carn', es: 'Pescado y carne' },
      groups: [
        {
          title: { ca: 'El peix', es: 'El pescado' },
          items: [
            { n: { ca: 'Calamarcets a la planxa', es: 'Chipirones a la plancha' }, d: { ca: 'Amb all i julivert, acompanyats de patata', es: 'Con ajo y perejil, acompañados de patata' }, p: 18.00 },
            { n: { ca: 'Suprema de salmó', es: 'Suprema de salmón' }, d: { ca: 'A la planxa amb verduretes saltades amb soja', es: 'A la plancha con verduritas salteadas con soja' }, p: 19.50 },
            { n: { ca: 'Llenguado', es: 'Lenguado' }, d: { ca: 'A la planxa amb verdures', es: 'A la plancha con verduras' }, p: 21.00 }
          ]
        },
        {
          title: { ca: 'Les carns', es: 'Las carnes' },
          items: [
            { n: { ca: 'Galtes de porc', es: 'Carrilleras de cerdo' }, d: { ca: 'Filetejades a la planxa', es: 'Fileteadas a la plancha' }, p: 16.00 },
            { n: { ca: 'Peus de porc', es: 'Manitas de cerdo' }, d: { ca: "A la planxa amb picada d'ametlla", es: 'A la plancha con picada de almendra' }, p: 17.00 },
            { n: { ca: 'Galta a baixa temperatura', es: 'Carrillera a baja temperatura' }, d: { ca: 'Amb salsa de bolets i reducció de vi', es: 'Con salsa de setas y reducción de vino' }, p: 18.00 }
          ]
        }
      ]
    },

    {
      id: 'dolci',
      it: 'Dolci Artigianali',
      sub: { ca: 'Postres', es: 'Postres' },
      dolci: true
    }
  ];

  /* -------------------------------------------------------
     3. Horari (minuts des de mitjanit). 0 = diumenge
     ------------------------------------------------------- */
  const HOURS = {
    0: [[13 * 60, 16 * 60], [20 * 60, 23 * 60]],
    1: [[20 * 60, 23 * 60]],
    2: [],
    3: [[20 * 60, 23 * 60]],
    4: [[20 * 60, 23 * 60]],
    5: [[20 * 60, 23 * 60 + 30]],
    6: [[13 * 60, 16 * 60], [20 * 60, 23 * 60 + 30]]
  };

  /* -------------------------------------------------------
     Utilitats
     ------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'lafontana-lang';
  const SUPPORTED = ['ca', 'es'];

  let lang = 'ca';
  let activeTab = MENU[0].id;

  const t = (key, vars = {}) => {
    const str = I18N[lang][key] ?? I18N.ca[key] ?? key;
    return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  };
  const pick = (value) => (value && typeof value === 'object' ? value[lang] ?? value.ca : value);
  const formatPrice = (n) =>
    new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €';
  const formatTime = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ } }
  };

  /* -------------------------------------------------------
     4. Render de la carta
     ------------------------------------------------------- */
  const TAG_HTML = {
    v: () => `<span class="tag tag--v" title="${escapeHtml(t('legend.v'))}"><svg class="icon" aria-hidden="true"><use href="#i-leaf"/></svg>V</span>`,
    vg: () => `<span class="tag tag--vg" title="${escapeHtml(t('legend.vg'))}"><svg class="icon" aria-hidden="true"><use href="#i-leaf"/></svg>VG</span>`,
    hot: () => `<span class="tag tag--hot" title="${escapeHtml(t('legend.hot'))}"><svg class="icon" aria-hidden="true"><use href="#i-flame"/></svg><span class="visually-hidden">${escapeHtml(t('legend.hot'))}</span></span>`
  };

  const dishHtml = (item) => {
    const name = escapeHtml(pick(item.n));
    const desc = item.d ? `<p class="dish__desc">${escapeHtml(pick(item.d))}</p>` : '';
    const tags = (item.t ?? []).map((tag) => TAG_HTML[tag]?.() ?? '').join('');
    const unit = item.u ? `<span class="dish__unit">${escapeHtml(t(item.u === 'unit' ? 'menu.unit' : 'menu.portion'))}</span>` : '';
    return `
      <li class="dish">
        <div class="dish__head"><h4 class="dish__name">${name}</h4>${tags}</div>
        <span class="dish__price">${formatPrice(item.p)}${unit}</span>
        ${desc}
      </li>`;
  };

  const groupHtml = (group) => {
    const note = group.note ? `<p class="menu-group__note">${escapeHtml(pick(group.note))}</p>` : '';
    const extras = group.extras
      ? `<div class="extras">
           <h4 class="extras__title">${escapeHtml(t('menu.extrasTitle'))}</h4>
           ${group.extras.map((e) => `<div class="extras__row"><span>${escapeHtml(pick(e.d))}</span><strong>+ ${formatPrice(e.p)}</strong></div>`).join('')}
         </div>`
      : '';
    return `
      <section class="menu-group">
        <header class="menu-group__head">
          <h3 class="menu-group__title">${escapeHtml(pick(group.title))}</h3>
          ${note}
        </header>
        <ul class="dish-list">${group.items.map(dishHtml).join('')}</ul>
        ${extras}
      </section>`;
  };

  const dolciHtml = () => `
    <div class="dolci">
      <div class="dolci__img">
        <img src="img/tiramisu.jpg" alt="" loading="lazy" width="900" height="600">
      </div>
      <div class="dolci__body">
        <h3 class="dolci__title">${t('menu.dolciTitle')}</h3>
        <p>${escapeHtml(t('menu.dolciText'))}</p>
        <a class="btn btn--primary" href="tel:+34938457606">
          <svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>
          <span>${escapeHtml(t('menu.dolciCta'))}</span>
        </a>
      </div>
    </div>`;

  const renderMenu = () => {
    const tabsEl = $('[data-menu-tabs]');
    const panelsEl = $('[data-menu-panels]');
    if (!tabsEl || !panelsEl) return;

    tabsEl.setAttribute('aria-label', t('a11y.tabs'));

    tabsEl.innerHTML = MENU.map((cat) => {
      const selected = cat.id === activeTab;
      return `
        <button type="button" class="menu-tab" role="tab"
                id="tab-${cat.id}" aria-controls="panel-${cat.id}"
                aria-selected="${selected}" tabindex="${selected ? 0 : -1}"
                data-tab="${cat.id}">
          <span class="menu-tab__it">${escapeHtml(cat.it)}</span>
          <span class="menu-tab__local">${escapeHtml(pick(cat.sub))}</span>
        </button>`;
    }).join('');

    panelsEl.innerHTML = MENU.map((cat) => `
      <div class="menu-panel" role="tabpanel" id="panel-${cat.id}"
           aria-labelledby="tab-${cat.id}" tabindex="0" ${cat.id === activeTab ? '' : 'hidden'}>
        ${cat.dolci ? dolciHtml() : cat.groups.map(groupHtml).join('')}
      </div>`).join('');
  };

  const selectTab = (id, { focus = false, scroll = false } = {}) => {
    if (id === activeTab && !focus) return;
    activeTab = id;

    $$('.menu-tab').forEach((tab) => {
      const selected = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        if (focus) tab.focus();
        tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });

    $$('.menu-panel').forEach((panel) => {
      const show = panel.id === `panel-${id}`;
      panel.hidden = !show;
      panel.classList.remove('is-entering');
      if (show) {
        void panel.offsetWidth; // restart the animation
        panel.classList.add('is-entering');
      }
    });

    if (scroll) {
      const wrap = $('.menu__tabs-wrap');
      const top = wrap.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.5) scrollToEl($('#carta'));
    }
  };

  const initTabs = () => {
    const tabsEl = $('[data-menu-tabs]');
    if (!tabsEl) return;

    tabsEl.addEventListener('click', (e) => {
      const tab = e.target.closest('.menu-tab');
      if (tab) selectTab(tab.dataset.tab);
    });

    tabsEl.addEventListener('keydown', (e) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const ids = MENU.map((c) => c.id);
      const idx = ids.indexOf(activeTab);
      const next =
        e.key === 'ArrowRight' ? ids[(idx + 1) % ids.length] :
        e.key === 'ArrowLeft' ? ids[(idx - 1 + ids.length) % ids.length] :
        e.key === 'Home' ? ids[0] : ids[ids.length - 1];
      selectTab(next, { focus: true });
    });
  };

  /* -------------------------------------------------------
     5. i18n: aplicar idioma
     ------------------------------------------------------- */
  const applyLanguage = (next) => {
    lang = SUPPORTED.includes(next) ? next : 'ca';
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    $('meta[name="description"]')?.setAttribute('content', t('meta.description'));

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });

    $$('.lang-switch__btn').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));

    const burgerLabel = $('.burger .visually-hidden');
    if (burgerLabel) burgerLabel.textContent = t(document.body.classList.contains('nav-open') ? 'a11y.menuClose' : 'a11y.menu');

    renderMenu();
    updateOpeningStatus();
  };

  const initLanguage = () => {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    const initial = SUPPORTED.includes(fromUrl) ? fromUrl : storage.get(STORAGE_KEY) ?? 'ca';
    applyLanguage(initial);

    $$('.lang-switch__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.lang === lang) return;
        storage.set(STORAGE_KEY, btn.dataset.lang);
        applyLanguage(btn.dataset.lang);
      });
    });
  };

  /* -------------------------------------------------------
     6. Navegació: header, menú mòbil, smooth scroll, actiu
     ------------------------------------------------------- */
  const header = $('.site-header');
  const burger = $('.burger');

  const headerOffset = () => (header ? header.getBoundingClientRect().height : 0);

  const scrollToEl = (el) => {
    if (!el) return;
    const top = el.id === 'inici' ? 0 : el.getBoundingClientRect().top + window.scrollY - headerOffset() + 1;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const setNavOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    const label = $('.burger .visually-hidden');
    if (label) label.textContent = t(open ? 'a11y.menuClose' : 'a11y.menu');
  };

  const initNav = () => {
    burger?.addEventListener('click', () => setNavOpen(!document.body.classList.contains('nav-open')));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setNavOpen(false);
        burger?.focus();
      }
    });

    window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => { if (e.matches) setNavOpen(false); });

    // Smooth scroll for every in-page link
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      e.preventDefault();
      setNavOpen(false);
      scrollToEl(target);
      history.replaceState(null, '', hash);
    });

    // Header state on scroll + sticky mobile CTA
    const mobileCta = $('[data-mobile-cta]');
    const onScroll = () => {
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 24);
      mobileCta?.classList.toggle('is-visible', y > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active link
    const links = $$('.nav__links a');
    const sections = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => io.observe(s));
    }
  };

  /* -------------------------------------------------------
     7. Animacions al fer scroll (Intersection Observer)
     ------------------------------------------------------- */
  const initReveal = () => {
    const items = $$('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((el, i) => {
      // Stagger siblings inside grids (gallery, reviews)
      const parent = el.parentElement;
      if (parent?.classList.contains('bento') || parent?.classList.contains('reviews__grid')) {
        el.style.transitionDelay = `${([...parent.children].indexOf(el) % 6) * 70}ms`;
      }
      io.observe(el);
    });
  };

  /* -------------------------------------------------------
     8. Estat obert / tancat + dia actual (hora de Madrid)
     ------------------------------------------------------- */
  const madridNow = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, mins: Number(get('hour')) * 60 + Number(get('minute')) };
  };

  function updateOpeningStatus() {
    const { day, mins } = madridNow();

    $$('.hours__row').forEach((row) => {
      const isToday = Number(row.dataset.day) === day;
      row.classList.toggle('is-today', isToday);
      if (isToday) row.querySelector('dt')?.setAttribute('data-today-label', t('hours.today'));
    });

    const promo = $('[data-promo]');
    if (promo) {
      promo.classList.toggle('is-today', day === 1);
      $('[data-promo-day]', promo).textContent = t(day === 1 ? 'promo.today' : 'promo.day');
    }

    const chip = $('[data-status]');
    if (!chip) return;

    const current = HOURS[day].find(([open, close]) => mins >= open && mins < close);
    if (current) {
      chip.textContent = t('status.openUntil', { time: formatTime(current[1]) });
      chip.classList.add('is-open');
      return;
    }
    chip.classList.remove('is-open');

    const laterToday = HOURS[day].find(([open]) => open > mins);
    if (laterToday) {
      chip.textContent = t('status.opensToday', { time: formatTime(laterToday[0]) });
      return;
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (HOURS[d].length) {
        const time = formatTime(HOURS[d][0][0]);
        chip.textContent = i === 1
          ? t('status.opensTomorrow', { time })
          : t('status.opensOn', { day: t(`day.${d}`).toLowerCase(), time });
        return;
      }
    }
  }

  /* -------------------------------------------------------
     9. Carta en PDF (diàleg d'impressió → "Desa com a PDF")
     ------------------------------------------------------- */
  const initPrint = () => {
    $('[data-print-menu]')?.addEventListener('click', () => {
      $$('.reveal').forEach((el) => el.classList.add('is-visible'));
      window.print();
    });
  };

  /* -------------------------------------------------------
     10. Copiar el telèfon (útil a l'ordinador, on no es pot trucar)
     ------------------------------------------------------- */
  const initCopyPhone = () => {
    const btn = $('[data-copy-phone]');
    if (!btn) return;
    const label = $('[data-copy-label]', btn);
    const icon = $('[data-copy-icon] use', btn);
    const status = $('[data-copy-status]');
    let timer;

    const showCopied = () => {
      btn.classList.add('is-copied');
      label.textContent = t('delivery.copied');
      icon?.setAttribute('href', '#i-check');
      if (status) status.textContent = t('delivery.copied');
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.classList.remove('is-copied');
        label.textContent = t('delivery.copy');
        icon?.setAttribute('href', '#i-copy');
        if (status) status.textContent = '';
      }, 2500);
    };

    const selectNumber = () => {
      const number = $('.delivery__number');
      if (!number) return;
      const range = document.createRange();
      range.selectNodeContents(number);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };

    btn.addEventListener('click', () => {
      const value = btn.dataset.copyPhone;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(value).then(showCopied, selectNumber);
      } else {
        selectNumber();
      }
    });
  };

  /* -------------------------------------------------------
     Init
     ------------------------------------------------------- */
  const init = () => {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
    initLanguage();
    initTabs();
    initNav();
    initReveal();
    initPrint();
    initCopyPhone();
    setInterval(updateOpeningStatus, 60 * 1000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
