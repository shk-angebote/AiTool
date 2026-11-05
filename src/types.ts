export type ContentFormat = 'script' | 'sayings' | 'song_teaser' | 'image_idea';

export interface ScriptScene {
  timecode: string;
  visual: string;
  aiVideoPrompt916: string;
  audioOrDialogue: string;
  onScreenText: string;
}

export interface GeneratedContentItem {
  id: string;
  format: ContentFormat;
  title: string;
  trade: string;
  tone: string;
  createdAt: string;
  hook: string;
  aspectRatio: '9:16';
  // For 9:16 AI Music Video / Sketch Script
  scenes?: ScriptScene[];
  soundSuggestion?: string;
  durationSeconds?: number;
  // For Sayings / Text-Hooks & Lyrics
  sayings?: {
    quote: string;
    context: string;
    visualBgPrompt916?: string;
  }[];
  // For AI Song Teaser (Suno/Udio + 9:16 AI Video)
  songDetails?: {
    trackReference: string;
    bpm: number;
    beatStyle: string;
    sunoStylePrompt: string;
    verseLines: string[];
    chorusLines: string[];
    videoAction: string;
    keyframePrompt916: string;
  };
  // For 9:16 Surreal AI Meme / Image Idea
  imageIdea?: {
    topText: string;
    bottomText: string;
    verticalComposition: string;
    visualDescription: string;
    aiImagePrompt: string;
    previewImageUrl?: string;
  };
  caption: string;
  hashtags: string[];
  isFavorite?: boolean;
}

export interface GeneratorParams {
  format: ContentFormat;
  trade: string;
  tone: string;
  topicPrompt: string;
  includeBaustellaTrack: boolean;
}
