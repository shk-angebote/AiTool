import { ContentFormat, GeneratedContentItem, GeneratorParams } from '../types';
import heroVerticalImg from '../assets/images/vertical_hero_cyber_maurer_1793867811534.jpg';
import trackVerticalImg from '../assets/images/vertical_baustella_suno_cover_1793867814888.jpg';
import memeVerticalImg from '../assets/images/vertical_meme_sora_pfusch_1793867813711.jpg';

export const HERO_VERTICAL_URL = heroVerticalImg;
export const TRACK_VERTICAL_URL = trackVerticalImg;
export const MEME_VERTICAL_URL = memeVerticalImg;

export const QUICK_TOPICS = [
  {
    label: '9:16 AI-Video: Baustella Mega-Drop',
    prompt: 'Komplett KI-generiertes 9:16 Musikvideo zu „Baustella – Silikon und Bauschaum“: Eine 80 Meter hohe goldene Silikonkartusche schwebt über einer Wolkenkratzer-Baustelle und füllt einen Krater mit leuchtendem Bauschaum.',
    trade: 'Trockenbau & Fugen-Mechatronik',
    tone: '100% Technologischer Overkill',
    includeTrack: true,
  },
  {
    label: 'Cyber-Bauherr mit Quanten-Laser',
    prompt: 'Surrealer 9:16 KI-Sketch: Bauherr Thorsten schwebt im weißen Cyber-Anzug mit 400 grünen Laser-Wasserwaagen durch den Rohbau und reklamiert 0,02 Nanometer Abweichung.',
    trade: 'Cyber-Rohbau & Statik-Illusion',
    tone: 'Surreale Sora/Midjourney-Satire',
    includeTrack: false,
  },
  {
    label: 'Kathedrale aus PU-Bauschaum (9:16 Meme)',
    prompt: 'Eine komplette freischwebende Ziegelwand samt Kupferrohren wird in 50 Metern Höhe nur von einer barocken Skulptur aus gelbem Bauschaum und Panzertape gehalten.',
    trade: 'SHK & Bauschaum-Architektur',
    tone: 'Selbstironisch & Übertrieben',
    includeTrack: true,
  },
  {
    label: 'Mecha-Azubi sucht WLAN-Kabel & Lufthaken',
    prompt: 'Ein hochmoderner Androiden-Azubi im 1. Lehrjahr steht ratlos vor einem schwebenden Stahlträger, weil der Altgeselle ihm befohlen hat, die Siemens-Lufthaken nachzuölen.',
    trade: 'KI-Azubi vs. Altgeselle',
    tone: 'Brutal ehrlicher Baustellen-Humor',
    includeTrack: false,
  },
  {
    label: 'Freitag 12:30 Uhr in Lichtgeschwindigkeit',
    prompt: 'Punkt 12:30 Uhr am Freitag durchbrechen alle Handwerker auf dem Gerüst gleichzeitig die Schallmauer Richtung Feierabend, während die Kelle noch in Zeitlupe fällt.',
    trade: 'Alle Gewerke (AI-Overkill)',
    tone: 'Feierbare KI-Hymne (Baustella-Vibe)',
    includeTrack: true,
  },
  {
    label: '„Den Rest macht der Maler“ – Endstufe',
    prompt: 'Elektriker haben mit einem Orbital-Bohrhammer die halbe Fassade weggesprengt und kleben einen kleinen gelben Post-it Zettel an das Loch: „Den Rest macht der Maler“.',
    trade: 'Elektro & Laser-Schlitzfräse',
    tone: 'Surreale Sora/Midjourney-Satire',
    includeTrack: false,
  },
];

export const INITIAL_CONTENT_ITEMS: GeneratedContentItem[] = [
  {
    id: 'preset-baustella-ai-video',
    format: 'song_teaser',
    title: 'Baustella – Silikon und Bauschaum (9:16 AI Music Video Teaser)',
    trade: 'Trockenbau & Fugen-Mechatronik',
    tone: '100% Technologischer Overkill',
    createdAt: 'Vor 1 Std.',
    aspectRatio: '9:16',
    hook: 'Wenn der Spalt im Rohbau so groß ist, dass selbst die KI drei Dosen Bauschaum extra rendern muss!',
    durationSeconds: 20,
    soundSuggestion: 'HandwerkerAI – Baustella (Silikon & Bauschaum) [Suno v4 128 BPM Festival-Drop]',
    songDetails: {
      trackReference: 'Baustella – Silikon und Bauschaum',
      bpm: 128,
      beatStyle: 'KI-generierter Stadion-Schlager-Rap mit Druckluftnagler-Kick, fettem Sub-Bass & Männerchor',
      sunoStylePrompt: '128 BPM German party construction anthem, heavy industrial synth bass, pneumatic nail gun percussion, ironic male craftsman vocals, stadium choir chorus, high-energy festival drop',
      verseLines: [
        'Kein echter Stein, kein echter Staub – wir rendern uns den Jahresurlaub!',
        'Vier Meter Spalt im Penthouse-Dach, der Statik-Rechner wird schon schwach!',
        'Doch Meister-KI lädt das Modell, die goldene Presse feuert schnell,',
        'Dreihundert Bar im Hochformat – heute wird geschäumt im Großformat!'
      ],
      chorusLines: [
        'Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!',
        'Oh Baustella, mein Herz schlägt im Akkord,',
        'Mit Silikon und Bauschaum retten wir jeden Tatort!',
        'Was nicht passt, wird zugeschäumt – genau so hat die KI’s geträumt!'
      ],
      videoAction: 'Vertikaler 9:16 Kamerafahrt-Schuss von unten nach oben: Im unteren Drittel dirigiert der Handwerker im Exoskelett, in der Bildmitte stehen zwei gigantische 30-Meter-Kartuschen auf einem Beton-Podest, und im oberen Drittel explodiert beim Refrain-Drop eine goldene Bauschaum-Wolke in den Nachthimmel.',
      keyframePrompt916: 'Surreal 9:16 vertical music video keyframe of a colossal monument made of a metallic gold silicone cartridge and a giant pressurized can of yellow polyurethane construction foam erupting like golden clouds over a brutalist concrete festival stage, construction cranes with concert spotlights in the background, hyper-detailed 8k CGI render --ar 9:16 --style raw --v 6.1'
    },
    caption: '100% KI-generiert, 100% Baustellen-Realität: Wie viele Dosen Bauschaum braucht ihr für diesen Spalt? Sound an!',
    hashtags: ['HandwerkerAI', 'Baustella', 'SilikonUndBauschaum', 'AIMusicVideo', 'SoraAI', 'Baustellenhumor', 'Shorts'],
    isFavorite: true,
  },
  {
    id: 'preset-916-sora-script',
    format: 'script',
    title: 'Sora 9:16 Sketch: Bauherr Thorsten & der Quanten-Laser',
    trade: 'Cyber-Rohbau & Statik-Illusion',
    tone: 'Surreale Sora/Midjourney-Satire',
    createdAt: 'Vor 3 Std.',
    aspectRatio: '9:16',
    hook: 'Montag 07:01 Uhr: Bauherr Thorsten schwebt mit 120 grünen Kreuzlinienlasern vom Himmel herab.',
    durationSeconds: 24,
    soundSuggestion: 'KI-Voiceover (Trockener Altgeselle) + Cyberpunk-Polka Beat',
    scenes: [
      {
        timecode: '0:00 – 0:04',
        visual: '9:16 Vertikal-Frame: Oben schweben gigantische Betonkräne in den Wolken, in der Mitte steht ein tiefenentspannter Altgeselle im High-Vis-Exoskelett mit dampfendem Mettbrötchen, unten läuft das grüne Laser-Raster über seine Stahlkappenschuhe.',
        aiVideoPrompt916: 'Vertical 9:16 smartphone fullscreen video, low-angle shot of a weathered German master craftsman in a futuristic high-vis exosuit holding a thermos and onion mett roll on a floating skyscraper construction site, hundreds of green laser level beams scanning the concrete floor, golden hour volumetric dust, hyper-realistic Sora AI render --ar 9:16 --style raw --v 6.1',
        audioOrDialogue: 'KI-Voiceover (trocken): „Montag, 7 Uhr 1. Keine echte Baustelle weit und breit, aber Bauherr Thorsten hat sich am Sonntag einen Quanten-Laser auf Wish bestellt.“',
        onScreenText: 'POV: Bauherr hat Sonntag YouTube geschaut'
      },
      {
        timecode: '0:04 – 0:11',
        visual: '9:16 Vertikal-Schnitt: Im oberen Bilddrittel schwebt Bauherr Thorsten im schneeweißen Anzug an einer Drohne herab, im Zentrum hält er eine riesige neon-grüne Hologramm-Wasserwaage an eine völlig krumme Ziegelwand.',
        aiVideoPrompt916: 'Vertical 9:16 shot, pedantic client in white suit hovering via personal drone next to a crooked brick wall high in the sky, projecting a giant glowing holographic spirit level showing 0.03mm deviation, surreal AI comedy aesthetic, 8k --ar 9:16 --style raw --v 6.1',
        audioOrDialogue: 'Bauherr (KI-Stimme, überkorrekt): „Meister! Im Haustechnik-Forum steht, 0,03 Nanometer Abweichung im 48. Stock mindern den Wiederverkaufswert!“',
        onScreenText: '„Im Forum stand aber 0,03 Nanometer!“'
      },
      {
        timecode: '0:11 – 0:18',
        visual: '9:16 Extreme Close-Up: Oben das stoische Gesicht des Altgesellen, in der Mitte lädt er eine vergoldete Zwillings-Kartuschenpresse durch wie im Actionfilm, unten glüht das Manometer auf 500 Bar.',
        aiVideoPrompt916: 'Vertical 9:16 dramatic close-up of a cybernetic German craftsman cocking a glowing solid-gold dual silicone caulking gun with a pressure gauge hitting 500 bar, cinematic sparks and golden dust, 8k IMAX --ar 9:16 --style raw --v 6.1',
        audioOrDialogue: 'Altgeselle: „Thorsten. Wir sind hier auf HandwerkerAI. Was die Physik nicht hält, übernimmt ab 7 Uhr 15 die Kartusche.“',
        onScreenText: 'Physik ist optional. Bauschaum ist Gesetz.'
      },
      {
        timecode: '0:18 – 0:24',
        visual: '9:16 Finale: Von unten nach oben schäumt eine gigantische Welle aus goldenem PU-Schaum die komplette schiefe Fassade in ein barockes Schloss um, während der Beat von „Baustella“ eskaliert.',
        aiVideoPrompt916: 'Vertical 9:16 wide-to-tall shot, a massive wave of golden expanding polyurethane foam transforming a crooked concrete building into a baroque palace in 2 seconds, construction workers celebrating on scaffolding below, confetti and lasers --ar 9:16 --style raw --v 6.1',
        audioOrDialogue: 'KI-Chor (Refrain): „Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!“',
        onScreenText: 'Den Rest rendert der Maler.'
      }
    ],
    caption: 'Wenn der Bauherr wieder mit dem Laser im Rohbau steht, hilft nur noch 500 Bar KI-Bauschaum! Markiert euren Lieblings-Bauleiter.',
    hashtags: ['HandwerkerAI', 'Baustella', 'AIComedy', 'Midjourney916', 'Bauherr', 'DenRestMachtDerMaler'],
    isFavorite: true,
  },
  {
    id: 'preset-916-meme-cathedral',
    format: 'image_idea',
    title: '9:16 AI-Meme: Die tragende Bauschaum-Kathedrale',
    trade: 'SHK & Bauschaum-Architektur',
    tone: 'Selbstironisch & Übertrieben',
    createdAt: 'Vor 4 Std.',
    aspectRatio: '9:16',
    hook: 'Wenn im Leistungsverzeichnis steht: „Befestigung bauseits nach Ermessen des Monteurs“.',
    imageIdea: {
      topText: 'STATIKER: „DAS ROHR DARF AUF KEINEN FALL DIE WAND BELASTEN!“',
      bottomText: 'ICH NACH 14 DOSEN KI-BAUSCHAUM UND 3 ROLLEN PANZERTAPE:',
      verticalComposition: 'Oberes Drittel: Eine monumentale, wie der Kölner Dom geformte Kathedrale aus gelbem Bauschaum und silbernem Panzertape am Kranhaken. Bildmitte: Die frei in der Luft hängende Ziegelwand samt Kupferrohren. Unteres Drittel: Ein tiefenentspannter Handwerker auf seiner Werkzeugkiste beim Kaffeetrinken.',
      visualDescription: 'Surreale 9:16 Vollbild-Szene auf einer nächtlichen Großbaustelle: Eine komplette Ziegelmauer mit Heizungsrohren schwebt frei in der Luft, gehalten von einer gigantischen, gotischen Kathedrale aus ausgehärtetem gelbem PU-Schaum und Panzertape, während der Monteur unten völlig unbeeindruckt aus dem Thermobecher trinkt.',
      aiImagePrompt: 'Absurd surreal 9:16 vertical AI scene on a German construction site where an entire crooked brick wall and copper piping system is held floating in mid-air by a gigantic ornate cathedral-like sculpture of hardened yellow expanding polyurethane foam and silver duct tape, while an unbothered craftsman sips coffee from a thermos in the foreground, dramatic work-lamp lighting, 8k photorealistic render --ar 9:16 --style raw --v 6.1',
      previewImageUrl: MEME_VERTICAL_URL,
    },
    caption: 'DIN-Normen sind auch nur unverbindliche Empfehlungen, solange noch Druck auf der Schaumdose ist. Hält das bis zur Abnahme?',
    hashtags: ['HandwerkerAI', 'SilikonUndBauschaum', 'PfuschAmBau', 'AIArt', '916Vertical', 'SHK'],
    isFavorite: true,
  },
  {
    id: 'preset-916-hooks-pack',
    format: 'sayings',
    title: '5 virale 9:16 Text-Hooks & Lyrics für AI-Reels',
    trade: 'Alle Gewerke (AI-Overkill)',
    tone: 'Brutal ehrlicher Baustellen-Humor',
    createdAt: 'Gestern',
    aspectRatio: '9:16',
    hook: 'Sofort zündende On-Screen-Hooks für die ersten 1,5 Sekunden im 9:16 Vollbild.',
    sayings: [
      {
        quote: '„Wir haben keine echte Baustelle – aber unser KI-Pfusch hält trotzdem länger als dein Neubau.“',
        context: 'Perfekter Kanal-Opener für TikTok/Shorts mit schnellem 9:16 Zoom-Effekt.',
        visualBgPrompt916: 'Vertical 9:16 shot of a futuristic hologram brick wall glitching into yellow polyurethane foam on a high-rise roof, dramatic neon work lights --ar 9:16 --style raw --v 6.1'
      },
      {
        quote: '„Wo Silikon und Bauschaum an ihre Grenzen stoßen, beginnt die Zuständigkeit des Malers.“',
        context: 'Hook-Zeile passend zum Beat-Drop von „Baustella – Silikon und Bauschaum“.',
        visualBgPrompt916: 'Vertical 9:16 portrait of a painter standing in front of a 10-meter crater in a concrete wall holding a tiny 2cm paintbrush, epic cinematic lighting --ar 9:16 --style raw --v 6.1'
      },
      {
        quote: '„Selbst ChatGPT weigert sich auszurechnen, warum der Elektriker seinen Kabelschrott nie zusammenkehrt.“',
        context: 'Garantierter Kommentar-Magnet für jedes Gewerke-Battle im Hochformat.',
        visualBgPrompt916: 'Vertical 9:16 surreal scene of a glowing AI supercomputer melting down next to a mountain of colorful copper wire scraps on a dusty floor, broom untouched in a glass museum case --ar 9:16 --style raw --v 6.1'
      },
      {
        quote: '„Drei Mal im Prompt abgeschnitten und immer noch zu kurz gerendert!“',
        context: 'Selbstironischer AI-Handwerker-Spruch für Holzbau- & Tischler-Clips.',
        visualBgPrompt916: 'Vertical 9:16 shot of a laser circular saw cutting a glowing timber beam in mid-air while a master carpenter checks a holographic folding ruler --ar 9:16 --style raw --v 6.1'
      },
      {
        quote: '„Freitag 12:30 Uhr: Das einzige bekannte Phänomen im Universum, das schneller ist als Lichtgeschwindigkeit.“',
        context: 'Jeden Freitag ab 11:30 Uhr als 9:16 Story/Reel mit Baustella-Sound posten.',
        visualBgPrompt916: 'Vertical 9:16 motion-blur action shot of construction workers leaving supersonic warp trails across a scaffolding tower towards a glowing beer garden below --ar 9:16 --style raw --v 6.1'
      }
    ],
    caption: 'Welcher Spruch kommt als Nächstes in den Suno-Generator? Schreibt eure besten Baustellen-Weisheiten in die Kommentare!',
    hashtags: ['HandwerkerAI', 'Baustellensprüche', 'Baustella', 'ReelsDE', 'Handwerk', 'AIHumor'],
    isFavorite: false,
  }
];

/**
 * Local 9:16 AI Mastermind Fallback Engine for static hosting (e.g., GitHub Pages)
 * where the Express /api/generate server is not running.
 */
export function generateOffline916Content(params: GeneratorParams): GeneratedContentItem {
  const { format, trade, tone, topicPrompt, includeBaustellaTrack } = params;
  const cleanTopic = topicPrompt.trim() || `Surrealer 9:16 KI-Overkill im Bereich ${trade}`;
  const shortTopic = cleanTopic.length > 52 ? `${cleanTopic.slice(0, 52)}...` : cleanTopic;

  const sound = includeBaustellaTrack
    ? 'HandwerkerAI – Baustella (Silikon & Bauschaum) [128 BPM AI-Drop]'
    : 'KI-Voiceover (Trockener Altgeselle) + Industrial Techno Bass';

  const baseItem = {
    id: `local-${Date.now()}`,
    format: format as ContentFormat,
    trade,
    tone,
    createdAt: 'Gerade eben',
    aspectRatio: '9:16' as const,
    soundSuggestion: sound,
  };

  if (format === 'script') {
    return {
      ...baseItem,
      title: `9:16 AI-Sketch: ${shortTopic}`,
      hook: `Stopp! Wenn bei „${trade}“ plötzlich 800 Bar KI-Bauschaum und Laser-Technik auf echte Baustellen-Logik treffen!`,
      durationSeconds: 24,
      scenes: [
        {
          timecode: '0:00 – 0:04',
          visual: `9:16 Vertikal-Eröffnung: Oben kreisen futuristische Lastendrohnen mit Betonfertigteilen, in der Mitte steht der Altgeselle im High-Vis-Exoskelett vor dem Problem (${cleanTopic}), unten qualmt die Kaffeetasse im Laser-Raster.`,
          aiVideoPrompt916: `Vertical 9:16 smartphone fullscreen video, surreal high-tech German construction site (${trade}), master craftsman in rugged high-vis exosuit looking unimpressed at ${cleanTopic}, green laser level grid, volumetric golden dust, Sora 8k render --ar 9:16 --style raw --v 6.1`,
          audioOrDialogue: `KI-Voiceover (trocken): „Pass auf. Im Lehrbuch steht, das geht technisch nicht. Auf unserer KI-Baustelle heißt das: Halt mal kurz mein Mettbrötchen.“`,
          onScreenText: `${trade}: Erwartung vs. KI-Realität`,
        },
        {
          timecode: '0:04 – 0:11',
          visual: '9:16 Vertikal-Zoom: Im oberen Drittel klappt ein riesiges Hologramm-Bauplan-Display auf, in der Mitte schüttelt der Azubi-Roboter den Kopf, unten blinkt die rote Warnlampe „DIN-Norm überlastet“.',
          aiVideoPrompt916: `Vertical 9:16 shot, humanoid apprentice robot holding a glowing spirit level next to an absurd construction gap, giant red holographic warning sign above, hyper-detailed CGI comedy --ar 9:16 --style raw --v 6.1`,
          audioOrDialogue: 'KI-Azubi: „Meister, laut Berechnung fehlen hier 14 Zentimeter Tragwerk!“ – Altgeselle: „14 Zentimeter? Das ist im Rohbau quasi Presspassung!“',
          onScreenText: '14 cm Spalt = Quasi Presspassung',
        },
        {
          timecode: '0:11 – 0:18',
          visual: '9:16 Action-Shot von unten nach oben: Der Meister aktiviert zwei synchronisierte Mega-Kartuschenpressen auf seinen Schultern, goldener PU-Schaum schießt vertikal durchs gesamte 9:16 Bild.',
          aiVideoPrompt916: `Vertical 9:16 low-angle epic action shot, German craftsman firing shoulder-mounted golden silicone and polyurethane foam cannons straight up into a skyscraper structure, sparks and golden clouds --ar 9:16 --style raw --v 6.1`,
          audioOrDialogue: includeBaustellaTrack
            ? 'Beat-Drop setzt voll ein: „Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!“'
            : 'Altgeselle: „Zwei Lagen Bauschaum, eine Naht Silikon – und den Rest macht der Maler im Frühjahr!“',
          onScreenText: 'Silikon & Bauschaum regeln die Statik',
        },
        {
          timecode: '0:18 – 0:24',
          visual: '9:16 Finale: Oben leuchtet das fertige Prunk-Bauwerk aus Gold-Schaum im Feuerwerk, unten klappen alle Handwerker synchron um Punkt 12:30 Uhr den Zollstock zu.',
          aiVideoPrompt916: `Vertical 9:16 grand finale, monumental golden polyurethane foam architecture gleaming in sunset above scaffolding, construction crew celebrating with thermoses below, 8k IMAX --ar 9:16 --style raw --v 6.1`,
          audioOrDialogue: 'Chor: „Oh Baustella, mein Herz schlägt im Akkord – mit Silikon und Bauschaum retten wir jeden Tatort!“',
          onScreenText: 'Abnahme bestanden · schönes Wochenende!',
        },
      ],
      caption: `100 % KI-Overkill zum Thema „${shortTopic}“! Wer auf eurer Baustelle würde das genau so abnehmen?`,
      hashtags: ['HandwerkerAI', 'Baustella', '916Vertical', 'SoraAI', 'SilikonUndBauschaum', 'Baustellenhumor'],
    };
  }

  if (format === 'song_teaser') {
    return {
      ...baseItem,
      title: `Baustella AI-Remix: ${shortTopic}`,
      hook: `Neue 9:16 KI-Hymne für ${trade} – dreht die Makita-Box auf 110 Dezibel!`,
      durationSeconds: 22,
      songDetails: {
        trackReference: 'Baustella – Silikon und Bauschaum (9:16 Overkill Remix)',
        bpm: 130,
        beatStyle: `130 BPM ${tone} · Industrial-Bassdrum, Druckluft-Tacker & Stadion-Chor`,
        sunoStylePrompt: `130 BPM German party construction anthem, heavy festival synth bass, pneumatic nail gun rhythm, ironic male craftsman AI vocals, massive stadium chorus, high energy drop`,
        verseLines: [
          `Bei ${trade} glüht heute der Prozessor heiß,`,
          `Wir rendern die Fuge in Gold und in Weiß!`,
          `Kein Ziegel im Lot, doch der Laser zeigt Grün,`,
          `Weil über dem Gerüst schon die Bauschaum-Wolken blühn!`,
        ],
        chorusLines: [
          'Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!',
          'Oh Baustella, mein Herz schlägt im Akkord,',
          'Mit Silikon und Bauschaum retten wir jeden Tatort!',
          'Was nicht passt, wird zugeschäumt – genau so hat die KI’s geträumt!',
        ],
        videoAction: `Vertikales 9:16 Musikvideo: Unten steht die Kolonne im Neon-Warnwesten-Look, in der Mitte pulsiert ein riesiger Subwoofer aus Porenbeton, und oben regnet es im Takt goldene Silikonspitzen vom Kran.`,
        keyframePrompt916: `Surreal 9:16 vertical music video stage on a futuristic German skyscraper construction site (${trade}), giant subwoofer built from concrete blocks and golden silicone cartridges, cranes shooting laser beams into night sky, 8k CGI --ar 9:16 --style raw --v 6.1`,
      },
      caption: `Wenn „Baustella – Silikon und Bauschaum“ auf ${trade} läuft, hält sogar die Dampfsperre von alleine! Welches Gewerk braucht eine eigene Strophe?`,
      hashtags: ['HandwerkerAI', 'Baustella', 'SilikonUndBauschaum', 'SunoAI', 'HandwerkerSong', 'ReelsDE'],
    };
  }

  if (format === 'image_idea') {
    return {
      ...baseItem,
      title: `9:16 AI-Meme: ${shortTopic}`,
      hook: `Visueller 9:16 Schock-Moment für ${trade} – 100 % KI-gerendert.`,
      imageIdea: {
        topText: `BAULEITER: „WIR HALTEN UNS STRIKT AN DEN PLAN!“`,
        bottomText: `${trade.toUpperCase()} NACH 20 DOSEN KI-BAUSCHAUM:`,
        verticalComposition: `Oberes Drittel: Gigantische schwebende Konstruktion aus goldenem PU-Schaum und Laserlinien (Safe-Zone für Top-Text). Bildmitte: Absurde Hauptszene (${cleanTopic}). Unteres Drittel: Tiefenentspannter Handwerker mit Zollstock und Kaffee (Safe-Zone für Bottom-Text).`,
        visualDescription: `Surreale 9:16 Fullscreen-Aufnahme: ${cleanTopic} – dargestellt als völlig übertriebenes Meisterwerk aus leuchtendem Bauschaum, Chrom-Panzertape und schwebenden Gerüstteilen in 8K-Kinooptik.`,
        aiImagePrompt: `Absurd surreal 9:16 vertical AI scene of ${cleanTopic} on a futuristic German construction site (${trade}), monumental sculpture of yellow expanding polyurethane foam and chrome duct tape holding heavy building elements in mid-air, calm craftsman drinking coffee in foreground, dramatic halogen work lights, 8k photorealistic render --ar 9:16 --style raw --v 6.1`,
        previewImageUrl: MEME_VERTICAL_URL,
      },
      caption: `Kopiert euch den 9:16 Prompt oder teilt das Bild direkt in die Baustellen-Gruppe! Wer erkennt seine letzte Baustelle wieder?`,
      hashtags: ['HandwerkerAI', 'Midjourney916', 'BaustellenMeme', 'SilikonUndBauschaum', 'PfuschAmBau', 'Handwerk'],
    };
  }

  // format === 'sayings'
  return {
    ...baseItem,
    title: `5 virale 9:16 Hooks: ${shortTopic}`,
    hook: `Knackige 9:16 On-Screen-Sprüche für ${trade} (${tone}).`,
    sayings: [
      {
        quote: `„Auf unserer KI-Baustelle gilt: Wo kein Träger ist, wird einer aus Bauschaum gerendert!“`,
        context: `Perfekter 2-Sekunden-Opener für ${trade} im 9:16 Vollbild.`,
        visualBgPrompt916: `Vertical 9:16 shot of a glowing golden polyurethane foam beam supporting a concrete ceiling on a high-tech construction site --ar 9:16 --style raw --v 6.1`,
      },
      {
        quote: `„Das ist nicht schief – das ist ein dynamisches 9:16 Gefälle für schnelleren Feierabend!“`,
        context: 'Konter-Spruch, wenn der Bauherr mit der Laser-Wasserwaage auftaucht.',
        visualBgPrompt916: `Vertical 9:16 surreal tilted construction corridor with green laser lines curving like a rollercoaster, dramatic lighting --ar 9:16 --style raw --v 6.1`,
      },
      {
        quote: `„Silikon macht das schon – und wenn nicht, drehen wir einfach den Bass von Baustella lauter!“`,
        context: 'Ideales Text-Overlay direkt auf den Refrain-Drop von Baustella.',
        visualBgPrompt916: `Vertical 9:16 close-up of a vibrating construction site Bluetooth speaker surrounded by floating silicone cartridges and dust --ar 9:16 --style raw --v 6.1`,
      },
      {
        quote: `„Wir pfuschen hier nicht – wir betreiben experimentelle 8K-Spaltmaß-Optimierung!“`,
        context: 'Für Vorher/Nachher-Clips mit völlig übertriebenen KI-Animationen.',
        visualBgPrompt916: `Vertical 9:16 futuristic hologram scanning a massive wall crack filled with sparkling yellow construction foam --ar 9:16 --style raw --v 6.1`,
      },
      {
        quote: `„Den Rest macht nicht mal mehr der Maler – den Rest muss das nächste KI-Update richten.“`,
        context: 'Selbstironischer Abschluss-Gag für das letzte Drittel im Reel.',
        visualBgPrompt916: `Vertical 9:16 exhausted painter looking up at a 50-meter high unfinished brutalist concrete tower in golden sunset --ar 9:16 --style raw --v 6.1`,
      },
    ],
    caption: `Welcher Spruch von 1 bis 5 gehört als Nächstes auf die Bautafel bei ${trade}?`,
    hashtags: ['HandwerkerAI', 'Baustellensprüche', 'Baustella', '916Reels', 'Handwerkerhumor', 'SilikonUndBauschaum'],
  };
}
