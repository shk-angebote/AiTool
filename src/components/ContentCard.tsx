import React, { useState } from 'react';
import {
  Copy,
  Check,
  Star,
  Sparkles,
  Music,
  Film,
  MessageSquareQuote,
  Image as ImageIcon,
  Smartphone,
} from 'lucide-react';
import { GeneratedContentItem } from '../types';
import { MEME_VERTICAL_URL } from '../data/initialContent';

interface ContentCardProps {
  item: GeneratedContentItem;
  onToggleFavorite: (id: string) => void;
  onRemix: (item: GeneratedContentItem, instruction: string) => void;
  isRemixing: boolean;
}

const FORMAT_LABELS: Record<GeneratedContentItem['format'], string> = {
  script: '9:16 KI-Video-Skript',
  sayings: '9:16 Text-Hooks & Sprüche',
  song_teaser: 'KI-Song-Teaser & Lyrics',
  image_idea: '9:16 AI-Meme & Prompt',
};

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onToggleFavorite,
  onRemix,
  isRemixing,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const ensure916Suffix = (promptText: string) => {
    if (!promptText) return '';
    return promptText.includes('--ar 9:16')
      ? promptText
      : `${promptText.trim()} --ar 9:16 --style raw --v 6.1`;
  };

  const buildFullCopyText = () => {
    const parts: string[] = [
      `${item.title.toUpperCase()} [9:16 FULLSCREEN]`,
      `Format: ${FORMAT_LABELS[item.format]} · Schauplatz: ${item.trade} · Vibe: ${item.tone}`,
      `\n9:16 VIRAL-HOOK (0:00 - 0:02s):\n${item.hook}`,
    ];

    if (item.format === 'script' && item.scenes?.length) {
      parts.push(
        '\n9:16 KI-VIDEO-SKRIPT (SORA / RUNWAY / MIDJOURNEY):\n' +
          item.scenes
            .map(
              (s) =>
                `[${s.timecode}]\n9:16 BILD-AUFBAU: ${s.visual}\n9:16 AI-PROMPT: ${ensure916Suffix(
                  s.aiVideoPrompt916
                )}\nKI-VOCALS / TON: ${s.audioOrDialogue}\n9:16 SAFE-ZONE TEXT: ${s.onScreenText}`
            )
            .join('\n\n')
      );
    }

    if (item.format === 'sayings' && item.sayings?.length) {
      parts.push(
        '\n9:16 TEXT-HOOKS & SPRÜCHE:\n' +
          item.sayings
            .map(
              (s, idx) =>
                `${idx + 1}. ${s.quote}\n   Einsatz: ${s.context}${
                  s.visualBgPrompt916
                    ? `\n   9:16 BG-Prompt: ${ensure916Suffix(s.visualBgPrompt916)}`
                    : ''
                }`
            )
            .join('\n\n')
      );
    }

    if (item.format === 'song_teaser' && item.songDetails) {
      parts.push(
        `\nKI-SONG-TEASER (${item.songDetails.bpm} BPM – ${item.songDetails.beatStyle}):\n` +
          `SUNO / UDIO STYLE PROMPT: ${item.songDetails.sunoStylePrompt}\n\n` +
          `STROPHE:\n${item.songDetails.verseLines.join('\n')}\n\n` +
          `REFRAIN (DROP):\n${item.songDetails.chorusLines.join('\n')}\n\n` +
          `9:16 MUSIKVIDEO-ACTION: ${item.songDetails.videoAction}\n` +
          `9:16 KEYFRAME PROMPT: ${ensure916Suffix(item.songDetails.keyframePrompt916)}`
      );
    }

    if (item.format === 'image_idea' && item.imageIdea) {
      parts.push(
        `\n9:16 MEME-TEXT OBEN: ${item.imageIdea.topText}\n` +
          `9:16 MEME-TEXT UNTEN: ${item.imageIdea.bottomText}\n` +
          `VERTIKALE 9:16 ACHSE: ${item.imageIdea.verticalComposition}\n` +
          `SZENE: ${item.imageIdea.visualDescription}\n` +
          `9:16 MIDJOURNEY PROMPT: ${ensure916Suffix(item.imageIdea.aiImagePrompt)}`
      );
    }

    parts.push(
      `\nCAPTION:\n${item.caption}\n` +
        item.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join(' ')
    );

    return parts.join('\n');
  };

  const renderFormatIcon = () => {
    switch (item.format) {
      case 'script':
        return <Film className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'sayings':
        return <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'song_teaser':
        return <Music className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'image_idea':
        return <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />;
    }
  };

  return (
    <article className="bg-[#151921] border border-stone-800/90 rounded-xl p-6 flex flex-col justify-between transition-colors hover:border-stone-700">
      <div>
        {/* Unboxed Static Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
            {renderFormatIcon()}
            <span className="font-semibold text-amber-400">{FORMAT_LABELS[item.format]}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono-tabular text-stone-200">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              9:16 Vertikal
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.trade}</span>
            {item.durationSeconds ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{item.durationSeconds}s</span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span className="text-stone-500">{item.createdAt}</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            aria-label={item.isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              item.isFavorite
                ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                : 'text-stone-500 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-display font-bold tracking-tight text-stone-100 mb-3">
          {item.title}
        </h3>

        {/* Hook Callout */}
        <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4 mb-5">
          <div className="text-xs text-stone-400 mb-1">
            9:16 Fullscreen-Hook (0:00 – 0:02s)
            {item.soundSuggestion ? ` · KI-Audio: ${item.soundSuggestion}` : ''}
          </div>
          <p className="text-base font-semibold text-amber-300 leading-snug">
            „{item.hook}“
          </p>
        </div>

        {/* Format 1: 9:16 AI Video Script */}
        {item.format === 'script' && item.scenes && (
          <div className="divide-y divide-stone-800/80 border-t border-b border-stone-800/80 mb-5">
            {item.scenes.map((scene, idx) => {
              const prompt916 = ensure916Suffix(scene.aiVideoPrompt916 || scene.visual);
              return (
                <div key={idx} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 text-sm">
                  <div className="md:col-span-2 font-mono-tabular text-xs text-amber-400 pt-0.5">
                    <div>{scene.timecode}</div>
                    <div className="text-stone-500 mt-0.5">9:16 Frame</div>
                  </div>
                  <div className="md:col-span-10 space-y-2">
                    <p className="text-stone-200 leading-relaxed">
                      <span className="text-stone-500 font-medium">Vertikaler 9:16 Bildaufbau: </span>
                      {scene.visual}
                    </p>
                    <p className="text-stone-100 font-medium">
                      <span className="text-stone-500 font-normal">KI-Vocals / Audio: </span>
                      {scene.audioOrDialogue}
                    </p>
                    <p className="text-xs font-mono-tabular text-amber-300">
                      9:16 Safe-Zone Overlay: „{scene.onScreenText}“
                    </p>

                    {/* Copyable 9:16 Sora / Midjourney Prompt */}
                    <div className="bg-[#0C0E12] border border-stone-800/90 rounded-md p-2.5 flex items-start justify-between gap-3">
                      <p className="text-xs font-mono-tabular text-stone-400 line-clamp-2">
                        {prompt916}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyText(prompt916, `scene-prompt-${idx}`)}
                        className="px-2.5 py-1 text-xs font-medium text-amber-400 hover:text-amber-300 bg-stone-900 border border-stone-800 rounded transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedKey === `scene-prompt-${idx}` ? 'Kopiert!' : '9:16 Prompt'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Format 2: 9:16 Sayings & Text Hooks */}
        {item.format === 'sayings' && item.sayings && (
          <div className="divide-y divide-stone-800/80 border-t border-b border-stone-800/80 mb-5">
            {item.sayings.map((saying, idx) => {
              const bgPrompt = saying.visualBgPrompt916
                ? ensure916Suffix(saying.visualBgPrompt916)
                : '';
              return (
                <div key={idx} className="py-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-stone-100">
                        <span className="font-mono-tabular text-amber-400 mr-2">0{idx + 1}.</span>
                        {saying.quote}
                      </p>
                      <p className="text-xs text-stone-400">{saying.context}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(saying.quote, `quote-${idx}`)}
                      className="px-2.5 py-1.5 text-xs font-medium text-stone-300 hover:text-stone-100 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedKey === `quote-${idx}` ? 'Kopiert' : 'Hook kopieren'}
                    </button>
                  </div>

                  {bgPrompt && (
                    <div className="bg-[#0C0E12] border border-stone-800/80 rounded-md px-3 py-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-mono-tabular text-stone-400 truncate">
                        9:16 Visual: {bgPrompt}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(bgPrompt, `bg-prompt-${idx}`)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap shrink-0"
                      >
                        {copiedKey === `bg-prompt-${idx}` ? 'Prompt kopiert' : '9:16 BG-Prompt'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Format 3: AI Song Teaser (Suno/Udio + 9:16 Video Keyframe) */}
        {item.format === 'song_teaser' && item.songDetails && (
          <div className="space-y-4 mb-5 border-t border-b border-stone-800/80 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
              <span>Track: {item.songDetails.trackReference}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{item.songDetails.bpm} BPM</span>
              <span aria-hidden="true">·</span>
              <span>{item.songDetails.beatStyle}</span>
            </div>

            {item.songDetails.sunoStylePrompt && (
              <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-stone-400 mb-0.5">
                    Suno / Udio AI-Music Style-Prompt
                  </div>
                  <p className="text-xs font-mono-tabular text-amber-300 truncate">
                    {item.songDetails.sunoStylePrompt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(item.songDetails!.sunoStylePrompt, 'suno-style')}
                  className="px-2.5 py-1.5 text-xs font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedKey === 'suno-style' ? 'Kopiert!' : 'Suno-Prompt'}
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
                <div className="text-xs text-stone-400 mb-2 font-semibold">
                  KI-Vocals Strophe (Aufbau)
                </div>
                <div className="space-y-1 text-sm text-stone-200 leading-relaxed">
                  {item.songDetails.verseLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="bg-[#0C0E12] border border-amber-500/30 rounded-lg p-4">
                <div className="text-xs text-amber-400 mb-2 font-semibold">
                  Mitsing-Refrain (Drop)
                </div>
                <div className="space-y-1 text-sm font-semibold text-stone-100 leading-relaxed">
                  {item.songDetails.chorusLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
              <p className="text-xs text-stone-300 leading-relaxed">
                <span className="text-stone-500 font-medium">9:16 KI-Musikvideo-Szene: </span>
                {item.songDetails.videoAction}
              </p>
              {item.songDetails.keyframePrompt916 && (
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-3">
                  <p className="text-xs font-mono-tabular text-stone-400 truncate">
                    {ensure916Suffix(item.songDetails.keyframePrompt916)}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        ensure916Suffix(item.songDetails!.keyframePrompt916),
                        'song-keyframe'
                      )
                    }
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap shrink-0"
                  >
                    {copiedKey === 'song-keyframe' ? 'Kopiert!' : '9:16 Video-Prompt'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Format 4: Strict 9:16 Vertical AI Meme & Image Prompt */}
        {item.format === 'image_idea' && item.imageIdea && (
          <div className="space-y-4 mb-5 border-t border-b border-stone-800/80 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
              {/* True 9:16 Vertical Smartphone Viewport Mockup */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="w-full max-w-[230px] aspect-[9/16] relative rounded-xl overflow-hidden bg-stone-900 border border-stone-700/90 flex flex-col justify-between">
                  <img
                    src={item.imageIdea.previewImageUrl || MEME_VERTICAL_URL}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="relative z-10 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-3.5 text-center">
                    <span className="inline-block text-[10px] font-mono-tabular text-amber-400 mb-1">
                      9:16 SAFE-ZONE OBEN
                    </span>
                    <p className="font-display font-bold text-sm tracking-wide text-white uppercase leading-tight drop-shadow">
                      {item.imageIdea.topText}
                    </p>
                  </div>
                  <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 text-center">
                    <p className="font-display font-bold text-sm tracking-wide text-amber-300 uppercase leading-tight drop-shadow">
                      {item.imageIdea.bottomText}
                    </p>
                    <span className="inline-block text-[10px] font-mono-tabular text-stone-400 mt-1">
                      1080 × 1920 FULLSCREEN
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-7 flex flex-col justify-between space-y-3 bg-[#0C0E12] border border-stone-800/80 rounded-lg p-4">
                <div className="space-y-3">
                  {item.imageIdea.verticalComposition && (
                    <div>
                      <div className="text-xs text-amber-400 font-semibold mb-1">
                        Vertikale 9:16 Bild-Architektur (Oben · Mitte · Unten)
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {item.imageIdea.verticalComposition}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-stone-400 mb-1">Surreale KI-Szene</div>
                    <p className="text-sm text-stone-200 leading-relaxed">
                      {item.imageIdea.visualDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-stone-800/80">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-400 font-mono-tabular">
                      Midjourney / DALL-E 9:16 Prompt
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          ensure916Suffix(item.imageIdea!.aiImagePrompt),
                          'img-prompt'
                        )
                      }
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap shrink-0"
                    >
                      {copiedKey === 'img-prompt' ? '9:16 Prompt kopiert!' : '9:16 Prompt kopieren'}
                    </button>
                  </div>
                  <p className="text-xs font-mono-tabular text-stone-400 line-clamp-4">
                    {ensure916Suffix(item.imageIdea.aiImagePrompt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Caption & Hashtags */}
        <div className="mb-5">
          <p className="text-sm text-stone-300 mb-2">
            <span className="text-stone-500 font-medium">Caption: </span>
            {item.caption}
          </p>
          <p className="text-xs text-stone-400 font-mono-tabular">
            {item.hashtags.map((tag) => `#${tag.replace(/^#/, '')}`).join(' · ')}
          </p>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => copyText(buildFullCopyText(), 'full')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {copiedKey === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>9:16 Paket kopiert</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>9:16 Komplettpaket kopieren</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              copyText(
                `${item.caption}\n\n${item.hashtags.map((h) => `#${h.replace(/^#/, '')}`).join(' ')}`,
                'caption'
              )
            }
            className="px-3.5 py-2 text-xs font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {copiedKey === 'caption' ? 'Caption kopiert' : 'Nur Caption & Hashtags'}
          </button>
        </div>

        <button
          type="button"
          disabled={isRemixing}
          onClick={() =>
            onRemix(
              item,
              `Erstelle zu "${item.title}" eine noch surrealere, völlig übertriebene 9:16 KI-Fortsetzung (Midjourney/Sora Overkill) mit derbem Baustellen-Humor und Referenz auf Baustella – Silikon und Bauschaum.`
            )
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isRemixing ? 'Rendere 9:16 Remix...' : '9:16 Overkill-Remix'}</span>
        </button>
      </div>
    </article>
  );
};
