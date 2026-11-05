/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Square,
  Search,
  Copy,
  Check,
  Film,
  MessageSquareQuote,
  Music,
  Image as ImageIcon,
  Shuffle,
  Volume2,
  AlertCircle,
  Smartphone,
} from 'lucide-react';
import { ContentFormat, GeneratedContentItem } from './types';
import {
  HERO_VERTICAL_URL,
  TRACK_VERTICAL_URL,
  QUICK_TOPICS,
  INITIAL_CONTENT_ITEMS,
  generateOffline916Content,
} from './data/initialContent';
import { ContentCard } from './components/ContentCard';
import { baustellaBeat } from './utils/baustellaAudio';

const TRADES = [
  'Alle Gewerke (AI-Overkill)',
  'Trockenbau & Fugen-Mechatronik',
  'SHK & Bauschaum-Architektur',
  'Elektro & Laser-Schlitzfräse',
  'Maler & Endgegner-Spachtel',
  'Cyber-Rohbau & Statik-Illusion',
  'KI-Azubi vs. Altgeselle',
  'Bauherr mit Quanten-Wasserwaage',
];

const TONES = [
  '100% Technologischer Overkill',
  'Surreale Sora/Midjourney-Satire',
  'Brutal ehrlicher Baustellen-Humor',
  'Feierbare KI-Hymne (Baustella-Vibe)',
  'Selbstironisch & Übertrieben',
];

const FORMAT_OPTIONS: { id: ContentFormat; label: string; sub: string }[] = [
  {
    id: 'script',
    label: '9:16 KI-Video-Skript',
    sub: 'Sora/Runway-Szenen, Timecodes & Prompts',
  },
  {
    id: 'image_idea',
    label: '9:16 AI-Meme & Grafik',
    sub: 'Midjourney --ar 9:16 Prompt & Overlays',
  },
  {
    id: 'song_teaser',
    label: 'KI-Song & Lyrics',
    sub: 'Suno/Udio Prompt, Strophe & Drop',
  },
  {
    id: 'sayings',
    label: '9:16 Text-Hooks & Sprüche',
    sub: '5 virale One-Liner + 9:16 BG-Prompts',
  },
];

export default function App() {
  const [items, setItems] = useState<GeneratedContentItem[]>(() => {
    try {
      const saved = localStorage.getItem('handwerkerai_items_916_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_CONTENT_ITEMS;
  });

  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('script');
  const [selectedTrade, setSelectedTrade] = useState<string>('Alle Gewerke (AI-Overkill)');
  const [selectedTone, setSelectedTone] = useState<string>('100% Technologischer Overkill');
  const [topicPrompt, setTopicPrompt] = useState<string>('');
  const [includeBaustellaTrack, setIncludeBaustellaTrack] = useState<boolean>(true);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [remixingId, setRemixingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | ContentFormat | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isPlayingBeat, setIsPlayingBeat] = useState<boolean>(false);
  const [copiedLyrics, setCopiedLyrics] = useState<boolean>(false);
  const [copiedSunoPrompt, setCopiedSunoPrompt] = useState<boolean>(false);

  const generatorRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('handwerkerai_items_916_v3', JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  useEffect(() => {
    return () => {
      baustellaBeat.stop();
    };
  }, []);

  const handleToggleBeat = () => {
    const nowPlaying = baustellaBeat.start(() => setIsPlayingBeat(false));
    setIsPlayingBeat(nowPlaying);
  };

  const scrollToGenerator = (presetFormat?: ContentFormat, presetTopic?: string) => {
    if (presetFormat) setSelectedFormat(presetFormat);
    if (presetTopic !== undefined) setTopicPrompt(presetTopic);
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGenerate = async (overrideParams?: {
    format?: ContentFormat;
    trade?: string;
    tone?: string;
    topicPrompt?: string;
    includeBaustellaTrack?: boolean;
  }) => {
    setErrorMessage(null);
    setIsGenerating(true);

    const payload = {
      format: overrideParams?.format ?? selectedFormat,
      trade: overrideParams?.trade ?? selectedTrade,
      tone: overrideParams?.tone ?? selectedTone,
      topicPrompt: overrideParams?.topicPrompt ?? topicPrompt,
      includeBaustellaTrack:
        overrideParams?.includeBaustellaTrack ?? includeBaustellaTrack,
    };

    try {
      const response = await fetch('./api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data?.success && data?.item) {
          setItems((prev) => [data.item, ...prev]);
          setActiveFilter('all');
          return;
        }
      }

      // Static Hosting / GitHub Pages Fallback when backend route is not present
      const fallbackItem = generateOffline916Content(payload);
      setItems((prev) => [fallbackItem, ...prev]);
      setActiveFilter('all');
    } catch {
      // Seamless fallback on static hosts (GitHub Pages) where ./api/generate is unreachable
      const fallbackItem = generateOffline916Content(payload);
      setItems((prev) => [fallbackItem, ...prev]);
      setActiveFilter('all');
    } finally {
      setIsGenerating(false);
      setRemixingId(null);
    }
  };

  const handleRemix = async (item: GeneratedContentItem, instruction: string) => {
    setRemixingId(item.id);
    await handleGenerate({
      format: item.format,
      trade: item.trade,
      tone: item.tone,
      topicPrompt: instruction,
      includeBaustellaTrack: true,
    });
  };

  const handleToggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleRandomSurprise = () => {
    const randomTopic =
      QUICK_TOPICS[Math.floor(Math.random() * QUICK_TOPICS.length)];
    setSelectedTrade(randomTopic.trade);
    setSelectedTone(randomTopic.tone);
    setTopicPrompt(randomTopic.prompt);
    setIncludeBaustellaTrack(randomTopic.includeTrack);
    handleGenerate({
      format: selectedFormat,
      trade: randomTopic.trade,
      tone: randomTopic.tone,
      topicPrompt: randomTopic.prompt,
      includeBaustellaTrack: randomTopic.includeTrack,
    });
  };

  const copyBaustellaHook = () => {
    const hookText = `Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!\nOh Baustella, mein Herz schlägt im Akkord,\nMit Silikon und Bauschaum retten wir jeden Tatort!\nWas nicht passt, wird zugeschäumt – genau so hat die KI’s geträumt!`;
    navigator.clipboard.writeText(hookText);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 1800);
  };

  const copyBaustellaSunoPrompt = () => {
    const sunoText = `128 BPM German party construction anthem, heavy industrial synth bass, pneumatic nail gun percussion, ironic male craftsman AI vocals, stadium choir chorus, festival drop --ar 9:16`;
    navigator.clipboard.writeText(sunoText);
    setCopiedSunoPrompt(true);
    setTimeout(() => setCopiedSunoPrompt(false), 1800);
  };

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'favorites' && !item.isFavorite) return false;
    if (
      activeFilter !== 'all' &&
      activeFilter !== 'favorites' &&
      item.format !== activeFilter
    ) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inHook = item.hook.toLowerCase().includes(q);
      const inTrade = item.trade.toLowerCase().includes(q);
      const inCaption = item.caption.toLowerCase().includes(q);
      return inTitle || inHook || inTrade || inCaption;
    }
    return true;
  });

  return (
    <div id="top" className="min-h-screen bg-[#0C0E12] text-stone-100 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#0C0E12]/95 backdrop-blur border-b border-stone-800/90">
        <div className="max-w-[1360px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (single text element, one line) */}
          <a
            href="#top"
            className="text-2xl font-display font-bold tracking-tight text-stone-100 whitespace-nowrap shrink-0"
          >
            HandwerkerAI
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-400">
            <a
              href="#werkstatt"
              className="hover:text-stone-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              9:16 Prompt-Schmiede
            </a>
            <a
              href="#baustella"
              className="hover:text-stone-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              AI-Song Labor
            </a>
            <a
              href="#baukasten"
              className="hover:text-stone-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overkill-Vorlagen
            </a>
            <a
              href="#archiv"
              className="hover:text-stone-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              9:16 Archiv
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToGenerator('script')}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Neuer 9:16 AI-Drop
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-10 space-y-16">
        {/* Hero Section: 2-Column Split + Full-Width 4-Column Metric Row Below */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Mastermind Identity & Direct Action */}
            <div className="lg:col-span-8 bg-[#151921] border border-stone-800/90 rounded-xl p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium">
                  <span>100% KI-Generiert</span>
                  <span aria-hidden="true">·</span>
                  <span>Striktes 9:16 Smartphone-Vollbild</span>
                  <span aria-hidden="true">·</span>
                  <span>Midjourney · Sora · Suno Workflow</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-stone-100 leading-[1.05]">
                  Keine echte Baustelle. 100 % KI-Overkill &amp; ehrlicher Bau-Humor im 9:16 Format.
                </h1>

                <p className="text-base text-stone-300 leading-relaxed max-w-[68ch]">
                  Willkommen im Mastermind-Deck von <strong className="text-stone-100">HandwerkerAI</strong>.
                  Hier wird kein echter Ziegel gemauert – wir kombinieren surreale
                  Midjourney-/Sora-Visuals und KI-generierte Party-Vocals wie{' '}
                  <em className="text-amber-300 not-italic">„Baustella – Silikon und Bauschaum“</em> mit
                  brutal ehrlicher Baustellen-Satire. Jedes Skript, jeder Bild-Prompt
                  und jedes Meme ist kompromisslos auf <strong className="text-stone-100">vertikales 9:16 Fullscreen</strong> (TikTok,
                  Reels &amp; Shorts) programmiert.
                </p>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToGenerator('script')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>9:16 KI-Skript &amp; Prompts bauen</span>
                </button>

                <button
                  type="button"
                  onClick={handleRandomSurprise}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  <Shuffle className="w-4 h-4 text-amber-400" />
                  <span>Zufälliger 9:16 Overkill-Drop</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic 9:16 Vertical Smartphone Stage */}
            <div className="lg:col-span-4 bg-[#151921] border border-stone-800/90 rounded-xl p-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[270px] aspect-[9/16] relative rounded-xl overflow-hidden border border-stone-700 bg-stone-900 flex flex-col justify-between">
                <img
                  src={HERO_VERTICAL_URL}
                  alt="9:16 KI-Keyvisual: Cyber-Baumeister mit goldener Silikonpresse und Mikrofon"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 bg-gradient-to-b from-black/85 via-black/30 to-transparent p-3.5 flex items-center justify-between text-[11px] font-mono-tabular text-amber-300">
                  <span>9:16 FULLSCREEN</span>
                  <span>--ar 9:16</span>
                </div>
                <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4">
                  <div className="text-xs text-amber-300 mb-1">
                    100% AI-Visual · Sora / Midjourney
                  </div>
                  <p className="text-base font-display font-bold text-white leading-snug">
                    „Physik ist auf unserer KI-Baustelle optional – Hauptsache der Bauschaum glänzt in 8K!“
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Metric & Format Specification Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-5">
              <div className="text-xs text-stone-400 mb-1">Seitenverhältnis-Garantie</div>
              <div className="text-xl font-display font-bold text-amber-400 font-mono-tabular">
                Strikt 9:16 (1080 × 1920)
              </div>
              <div className="text-xs text-stone-400 mt-1">
                TikTok · Instagram Reels · YouTube Shorts
              </div>
            </div>

            <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-5">
              <div className="text-xs text-stone-400 mb-1">Produktions-Pipeline</div>
              <div className="text-xl font-display font-bold text-stone-100">
                100 % KI-Generiert
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Midjourney v6.1 · Sora · Suno · Udio
              </div>
            </div>

            <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-5">
              <div className="text-xs text-stone-400 mb-1">Offizielle Kanal-Hymne</div>
              <div className="text-xl font-display font-bold text-stone-100">
                Baustella (128 BPM)
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Silikon &amp; Bauschaum AI-Anthem
              </div>
            </div>

            <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-5">
              <div className="text-xs text-stone-400 mb-1">Bereite 9:16 Pakete</div>
              <div className="text-xl font-display font-bold text-stone-100 font-mono-tabular">
                {items.length} Vertikal-Konzepte
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Inklusive `--ar 9:16` Copy-Prompts
              </div>
            </div>
          </div>
        </section>

        {/* Interactive 9:16 AI Content Generator ("9:16 Prompt-Schmiede") */}
        <section id="werkstatt" ref={generatorRef} className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800/90 pb-4">
            <div>
              <div className="text-xs text-amber-400 font-medium mb-1">
                01. Vertikale 9:16 KI-Content-Maschine
              </div>
              <h2 className="text-3xl font-display font-bold text-stone-100">
                HandwerkerAI 9:16 Skript-, Prompt- &amp; Lyrics-Generator
              </h2>
            </div>
            <p className="text-sm text-stone-400 max-w-md">
              Jeder Output liefert vertikale Bildkompositionen (Oben/Mitte/Unten) und kopierfertige `--ar 9:16` Prompts für Midjourney, Sora &amp; Suno.
            </p>
          </div>

          <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-6 md:p-8 space-y-6">
            {/* Step 1: Content Format Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-stone-300">
                1. Welches 9:16 KI-Format soll gerendert werden?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {FORMAT_OPTIONS.map((opt) => {
                  const active = selectedFormat === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedFormat(opt.id)}
                      className={`text-left p-4 rounded-lg border transition-colors ${
                        active
                          ? 'bg-amber-500/10 border-amber-400 text-stone-100'
                          : 'bg-[#0C0E12] border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-stone-100 whitespace-nowrap shrink-0">
                          {opt.label}
                        </span>
                        {opt.id === 'script' && <Film className="w-4 h-4 text-amber-400 shrink-0" />}
                        {opt.id === 'sayings' && (
                          <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        {opt.id === 'song_teaser' && (
                          <Music className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        {opt.id === 'image_idea' && (
                          <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{opt.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Surreal AI Trade & Overkill Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="trade-select"
                  className="block text-xs font-semibold text-stone-300"
                >
                  2. Gewerk / Surrealer KI-Schauplatz
                </label>
                <select
                  id="trade-select"
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full bg-[#0C0E12] border border-stone-800 rounded-lg px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-400"
                >
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tone-select"
                  className="block text-xs font-semibold text-stone-300"
                >
                  3. Technologischer Overkill &amp; Humor-Vibe
                </label>
                <select
                  id="tone-select"
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value)}
                  className="w-full bg-[#0C0E12] border border-stone-800 rounded-lg px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-400"
                >
                  {TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Situation / Prompt + Quick Topics */}
            <div id="baukasten" className="space-y-3 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="topic-input"
                  className="block text-xs font-semibold text-stone-300"
                >
                  4. Absurde 9:16 KI-Szene, Baustellen-Gag oder Song-Idee (optional)
                </label>
                <span className="text-xs text-stone-400">
                  Oder 9:16 Overkill-Vorlage wählen:
                </span>
              </div>

              {/* Interactive Quick-Topic Buttons */}
              <div className="flex flex-wrap gap-2">
                {QUICK_TOPICS.map((qt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setTopicPrompt(qt.prompt);
                      setSelectedTrade(qt.trade);
                      setSelectedTone(qt.tone);
                      setIncludeBaustellaTrack(qt.includeTrack);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-stone-100 bg-[#0C0E12] hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {qt.label}
                  </button>
                ))}
              </div>

              <textarea
                id="topic-input"
                rows={3}
                value={topicPrompt}
                onChange={(e) => setTopicPrompt(e.target.value)}
                placeholder="z.B. Ein gigantischer goldener Bagger aus Bauschaum schwebt im 9:16 Format über der Autobahn, während der Altgeselle im Exoskelett erklärt, dass der Maler den Rest verspachtelt..."
                className="w-full bg-[#0C0E12] border border-stone-800 rounded-lg p-4 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Step 4: Baustella Toggle & Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-800/80">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeBaustellaTrack}
                  onChange={(e) => setIncludeBaustellaTrack(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
                <span className="text-sm text-stone-300">
                  KI-Hymne <strong className="text-amber-300">„Baustella – Silikon und Bauschaum“</strong> als Audio-Drop &amp; Visuelles Leitmotiv einbauen
                </span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleGenerate()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>
                    {isGenerating
                      ? 'Rendere 9:16 KI-Konzept...'
                      : '9:16 AI-Content & Prompts generieren'}
                  </span>
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-950/40 border border-red-800/80 rounded-lg p-4 flex items-center gap-3 text-sm text-red-200">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </section>

        {/* Featured 9:16 AI Music Video & Song Deck: "Baustella – Silikon und Bauschaum" */}
        <section id="baustella" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800/90 pb-4">
            <div>
              <div className="text-xs text-amber-400 font-medium mb-1">
                02. KI-Musik &amp; 9:16 Musikvideo-Labor
              </div>
              <h2 className="text-3xl font-display font-bold text-stone-100">
                AI-Hymne: „Baustella – Silikon und Bauschaum“ (9:16 Video-Deck)
              </h2>
            </div>
            <p className="text-sm text-stone-400">
              100 % KI-Vocals, 128 BPM Synth-Bass &amp; surreale 9:16 Stadion-Visuals.
            </p>
          </div>

          <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 9:16 Vertical Music Video Poster + Synth Beat Player */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#0C0E12] border border-stone-800/80 rounded-xl p-5">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-full max-w-[230px] aspect-[9/16] relative rounded-xl overflow-hidden border border-stone-700 bg-stone-900">
                  <img
                    src={TRACK_VERTICAL_URL}
                    alt="9:16 KI-Musikvideo Keyframe: Baustella – Silikon und Bauschaum"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-tabular text-amber-300 bg-black/70 px-2 py-1 rounded">
                    <span>9:16 AI-VIDEO</span>
                    <span>128 BPM</span>
                  </div>
                </div>

                <div className="w-full text-left">
                  <div className="text-xs text-stone-400 font-mono-tabular">
                    Suno / Udio AI-Track · 9:16 Sora-Stage
                  </div>
                  <h3 className="text-2xl font-display font-bold text-stone-100 mt-0.5">
                    Baustella – Silikon und Bauschaum
                  </h3>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-800/80 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleToggleBeat}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isPlayingBeat
                      ? 'bg-red-500 text-white hover:bg-red-400'
                      : 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                  }`}
                >
                  {isPlayingBeat ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>128-BPM AI-Beat stoppen</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>128-BPM AI-Beat abspielen</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFormat('song_teaser');
                    setIncludeBaustellaTrack(true);
                    handleGenerate({
                      format: 'song_teaser',
                      trade: selectedTrade,
                      tone: 'Feierbare KI-Hymne (Baustella-Vibe)',
                      topicPrompt:
                        'Schreibe eine völlig abgedrehte neue KI-Strophe + Mitsing-Refrain für "Baustella – Silikon und Bauschaum" inklusive Suno-Style-Prompt und surrealer 9:16 Sora-Musikvideo-Choreografie.',
                      includeBaustellaTrack: true,
                    });
                    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={isGenerating}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Neue AI-Strophe &amp; 9:16 Video generieren</span>
                </button>
              </div>
            </div>

            {/* Official Hook Lyrics, Suno Prompt & 9:16 Video Concept */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-stone-400">
                    Offizieller KI-Refrain &amp; Suno-Audio-Prompt · Optimiert für 9:16 Musikvideos
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={copyBaustellaSunoPrompt}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-300 hover:text-amber-300 whitespace-nowrap shrink-0"
                    >
                      {copiedSunoPrompt ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Suno-Prompt kopiert</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Suno Style-Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={copyBaustellaHook}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 whitespace-nowrap shrink-0"
                    >
                      {copiedLyrics ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Lyrics kopiert</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Lyrics kopieren</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#0C0E12] border border-stone-800/80 rounded-xl p-6 space-y-2">
                  <p className="text-lg sm:text-xl font-display font-bold text-amber-300 tracking-wide">
                    „Bauschaum rein, Silikon drüber – schon ist der Pfusch vorüber!
                  </p>
                  <p className="text-lg sm:text-xl font-display font-bold text-stone-100 tracking-wide">
                    Oh Baustella, mein Herz schlägt im Akkord,
                  </p>
                  <p className="text-lg sm:text-xl font-display font-bold text-stone-100 tracking-wide">
                    Mit Silikon und Bauschaum retten wir jeden Tatort!
                  </p>
                  <p className="text-lg sm:text-xl font-display font-bold text-amber-300 tracking-wide">
                    Was nicht passt, wird zugeschäumt – genau so hat die KI’s geträumt!“
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
                    <div className="text-xs text-amber-400 font-semibold mb-1">
                      9:16 Szene 1: Der 10-Meter-Krater
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Oben schwebt ein Helikopter mit einer 5-Tonnen-Silikonkartusche, unten im 9:16 Frame steht der Polier und winkt gelassen ein: „Noch zwei Millimeter!“
                    </p>
                  </div>

                  <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
                    <div className="text-xs text-amber-400 font-semibold mb-1">
                      9:16 Szene 2: Bauschaum-Vulkan
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Vertikaler Kameraschwenk: Aus einem verpfuschten Sicherungskasten quillt golden glitzernder PU-Schaum wie ein Geysir bis unter die Wolkenkratzer-Decke.
                    </p>
                  </div>

                  <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
                    <div className="text-xs text-amber-400 font-semibold mb-1">
                      9:16 Szene 3: Cyber-Rave am Gerüst
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Auf einem 100 Meter hohen Baugerüst tanzen 50 KI-Handwerker mit leuchtenden grünen Kreuzlinienlasern im Takt zum Baustella-Bassdrop.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-stone-400">
                  Alle generierten Musikvideo-Skripte enthalten fertige `--ar 9:16` Prompts für Midjourney &amp; Sora.
                </div>
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => {
                    setSelectedFormat('script');
                    setIncludeBaustellaTrack(true);
                    handleGenerate({
                      format: 'script',
                      trade: selectedTrade,
                      tone: '100% Technologischer Overkill',
                      topicPrompt:
                        'Komplett KI-animiertes 9:16 Musikvideo-Skript zum Song "Baustella – Silikon und Bauschaum" mit 4 surrealen Sora/Midjourney-Szenen im Hochformat.',
                      includeBaustellaTrack: true,
                    });
                    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  9:16 AI-Musikvideo-Skript generieren
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Feed & Archive ("9:16 Archiv") */}
        <section id="archiv" ref={archiveRef} className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800/90 pb-4">
            <div>
              <div className="text-xs text-amber-400 font-medium mb-1">
                03. 100% KI-Content-Bibliothek (9:16 Format)
              </div>
              <h2 className="text-3xl font-display font-bold text-stone-100">
                HandwerkerAI 9:16 Archiv ({filteredItems.length})
              </h2>
            </div>

            {/* Interactive Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="9:16 Prompt, Gewerk suchen..."
                  className="bg-[#151921] border border-stone-800 rounded-lg pl-9 pr-3.5 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 w-52"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-[#151921] border border-stone-800 rounded-lg overflow-x-auto">
                {[
                  { id: 'all', label: 'Alle 9:16' },
                  { id: 'script', label: 'AI-Skripte' },
                  { id: 'image_idea', label: '9:16 Memes' },
                  { id: 'song_teaser', label: 'Song-Teaser' },
                  { id: 'sayings', label: 'Text-Hooks' },
                  { id: 'favorites', label: 'Favoriten' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveFilter(tab.id as 'all' | ContentFormat | 'favorites')
                    }
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeFilter === tab.id
                        ? 'bg-amber-400 text-stone-950 font-semibold'
                        : 'text-stone-400 hover:text-stone-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Skeleton when generating */}
          {isGenerating && (
            <div className="bg-[#151921] border border-amber-400/40 rounded-xl p-6 space-y-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 w-56 bg-stone-800 rounded" />
                <div className="h-4 w-20 bg-stone-800 rounded" />
              </div>
              <div className="h-7 w-2/3 bg-stone-800 rounded" />
              <div className="h-20 w-full bg-stone-900 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-stone-800 rounded" />
                <div className="h-4 w-5/6 bg-stone-800 rounded" />
              </div>
            </div>
          )}

          {/* Content Grid or Empty State */}
          {filteredItems.length === 0 ? (
            <div className="bg-[#151921] border border-stone-800/90 rounded-xl p-12 text-center space-y-4">
              <p className="text-lg font-display font-bold text-stone-200">
                Keine passenden 9:16 Konzepte in dieser Ansicht gefunden.
              </p>
              <p className="text-sm text-stone-400 max-w-md mx-auto">
                Setze den Filter zurück oder starte oben direkt einen neuen 9:16 Render-Durchlauf.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Alle anzeigen
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGenerator('script')}
                  className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Neues 9:16 Konzept bauen
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onToggleFavorite={handleToggleFavorite}
                  onRemix={handleRemix}
                  isRemixing={remixingId === item.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-stone-800/90 py-8 mt-16">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            HandwerkerAI Mastermind Studio · 100 % KI-Generiert · Striktes 9:16 Smartphone-Vollbild
          </div>
          <div className="flex items-center gap-4">
            <a href="#werkstatt" className="hover:text-stone-300 transition-colors">
              9:16 Prompt-Schmiede
            </a>
            <span aria-hidden="true">·</span>
            <a href="#baustella" className="hover:text-stone-300 transition-colors">
              Baustella AI-Song
            </a>
            <span aria-hidden="true">·</span>
            <a href="#archiv" className="hover:text-stone-300 transition-colors">
              9:16 Archiv
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
