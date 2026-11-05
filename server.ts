import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `Du bist der kreative Mastermind hinter dem reinen AI-Handwerker-Kanal 'HandwerkerAI'.
Auf diesem Kanal existiert keine echte Baustelle – alles ist zu 100 % KI-generiert (KI-Musik via Suno/Udio, KI-Vocals, surreale Midjourney-/Sora-/Runway-Visuals, absurde KI-Sketche).
WICHTIGSTE VORGABE:
Sämtliche visuellen Beschreibungen, Bild-Prompts für Midjourney/DALL-E und Video-Skripte für Sora/Runway/Kling müssen STRIKT im vertikalen 9:16-Format (Fullscreen fürs Smartphone für TikTok, Instagram Reels und YouTube Shorts) gedacht, komponiert und aufgebaut sein!
- Denke bei jedem Bild und jeder Video-Szene in der vertikalen Achse (Oben im Frame / Zentrum / Unten im Frame unter Beachtung der TikTok/Reels Safe-Zones).
- Jeder generierte Bild- oder Video-Prompt MUSS explizit für vertikales 9:16 Vollbild formuliert sein und mit '--ar 9:16 --style raw --v 6.1' (bzw. '9:16 vertical smartphone fullscreen') enden.
- Deine Nische ist der perfekte Mix aus technologischem Overkill (Cyber-Exoskelette auf dem Rohbau, schwebende Kathedralen aus PU-Bauschaum, goldene Laser-Kartuschenpressen, KI-generierte Stadion-Bühnen zwischen Baukränen) und brutal ehrlichem, deutschem Baustellen-Humor ("Den Rest macht der Maler", "Silikon und Bauschaum", Bauherren mit 19€-Amazon-Laser, Azubi sucht Gewichte für die Wasserwaage, Freitag 12:30 Uhr fällt die Kelle).
- Der Vibe ist selbstironisch, futuristisch, absolut übertrieben und feierbar (insbesondere rund um die Kanal-Hymne 'Baustella – Silikon und Bauschaum').`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  app.post("/api/generate", async (req, res) => {
    try {
      const {
        format = "script",
        trade = "Alle Gewerke (100% AI-Overkill)",
        tone = "Futuristisch & Selbstironisch",
        topicPrompt = "",
        includeBaustellaTrack = false,
      } = req.body;

      const formatDescriptions: Record<string, string> = {
        script:
          "Ein komplett KI-animiertes 9:16 Musikvideo- oder Sketch-Skript (TikTok/Reels/Shorts, 15-30 Sek.) mit 4-5 surrealen Szenen. Jede Szene braucht Timecode, vertikale 9:16 Bildkomposition (Oben/Mitte/Unten), einen kopierfertigen Sora/Midjourney 9:16 Prompt (--ar 9:16), KI-Vocals/Dialog und 9:16 On-Screen-Text.",
        sayings:
          "5 extrem treffsichere, feierbare Text-Hooks, One-Liner oder Song-Zitate (Mix aus High-Tech-KI-Wahnsinn und hartem Baustellen-Alltag) plus jeweils ein passender 9:16 Midjourney-Hintergrund-Prompt für das Status-/Reel-Visual.",
        song_teaser:
          "Ein viraler KI-Song-Teaser & Lyrics im Stil von 'Baustella – Silikon und Bauschaum' inkl. BPM, Suno/Udio Style-Prompt, 4 Zeilen Strophe, 4 Zeilen Eskalations-Refrain, 9:16 Musikvideo-Konzept und 9:16 Keyframe-Prompt (--ar 9:16).",
        image_idea:
          "Eine absurd-surreale 9:16 Meme-Grafik-Idee für Midjourney/DALL-E: Top-Text, Bottom-Text, exakte vertikale 9:16 Bildaufteilung (Oben/Mitte/Unten für Smartphone-Fullscreen) und ein detaillierter Midjourney Prompt mit '--ar 9:16 --style raw --v 6.1'.",
      };

      const prompt = `Generiere neuen 100% KI-generierten viralen 9:16 Content für den Kanal 'HandwerkerAI'.
Gewünschtes Format: ${format} (${formatDescriptions[format] || formatDescriptions.script})
Gewerk / Surrealer AI-Schauplatz: ${trade}
Vibe / Technologischer Overkill-Grad: ${tone}
Thema / Spezial-Wunsch: ${topicPrompt ? topicPrompt : "Überrasche mich mit einer völlig übertriebenen, urkomischen Kombination aus futuristischer KI-Optik und eiskaltem deutschem Baustellen-Humor im 9:16 Hochformat."}
${
  includeBaustellaTrack || format === "song_teaser"
    ? "Baue unbedingt eine feierbare Referenz, Lyrics oder den KI-Sound von 'Baustella – Silikon und Bauschaum' ein!"
    : ""
}

Achte strikt darauf, dass ALLE visuellen Beschreibungen und Prompts im vertikalen 9:16 Smartphone-Vollbildformat aufgebaut sind.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Knackiger 9:16 Projekt-Titel",
              },
              hook: {
                type: Type.STRING,
                description:
                  "Der 2-Sekunden Viral-Hook (Text oder visueller Schockmoment im 9:16 Fullscreen)",
              },
              durationSeconds: {
                type: Type.INTEGER,
                description: "Videolänge in Sekunden (z.B. 24)",
              },
              soundSuggestion: {
                type: Type.STRING,
                description:
                  "KI-Sound / Suno-Track Vorschlag (z.B. Baustella – Silikon und Bauschaum [AI Hyper-Bass Mix])",
              },
              scenes: {
                type: Type.ARRAY,
                description:
                  "Für format='script': 4 bis 5 9:16-Szenen für KI-Video (Sora/Runway/Kling)",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timecode: { type: Type.STRING },
                    visual: {
                      type: Type.STRING,
                      description:
                        "Vertikale 9:16 Bildbeschreibung (Oben / Zentrum / Unten im Smartphone-Screen)",
                    },
                    aiVideoPrompt916: {
                      type: Type.STRING,
                      description:
                        "Kopierfertiger englischer oder deutscher Midjourney/Sora Prompt, endend auf --ar 9:16 --style raw --v 6.1",
                    },
                    audioOrDialogue: {
                      type: Type.STRING,
                      description: "KI-Voiceover, KI-Gesang oder Sound-Effekt",
                    },
                    onScreenText: {
                      type: Type.STRING,
                      description:
                        "Text-Overlay in der vertikalen Safe-Zone des 9:16 Screens",
                    },
                  },
                  required: [
                    "timecode",
                    "visual",
                    "aiVideoPrompt916",
                    "audioOrDialogue",
                    "onScreenText",
                  ],
                },
              },
              sayings: {
                type: Type.ARRAY,
                description:
                  "Für format='sayings': 5 virale Text-Hooks / Baustellen-Sprüche inkl. 9:16 Background-Prompt",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    quote: { type: Type.STRING },
                    context: { type: Type.STRING },
                    visualBgPrompt916: {
                      type: Type.STRING,
                      description:
                        "Kurzer 9:16 Midjourney-Prompt für das passende vertikale Hintergrundbild (--ar 9:16)",
                    },
                  },
                  required: ["quote", "context", "visualBgPrompt916"],
                },
              },
              songDetails: {
                type: Type.OBJECT,
                description:
                  "Für format='song_teaser': KI-Song-Teaser inkl. Suno/Udio Prompt & 9:16 Video-Prompt",
                properties: {
                  trackReference: { type: Type.STRING },
                  bpm: { type: Type.INTEGER },
                  beatStyle: { type: Type.STRING },
                  sunoStylePrompt: {
                    type: Type.STRING,
                    description:
                      "Kopierfertiger Style-Prompt für Suno / Udio (z.B. 128 BPM German Party Schlager meets Heavy Industrial Synth Bass, Male Choir, Anthemic Drop)",
                  },
                  verseLines: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  chorusLines: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  videoAction: {
                    type: Type.STRING,
                    description:
                      "Surreale KI-Musikvideo-Choreografie im vertikalen 9:16 Format",
                  },
                  keyframePrompt916: {
                    type: Type.STRING,
                    description:
                      "Midjourney/Sora 9:16 Keyframe-Prompt für das Musikvideo, endend auf --ar 9:16 --style raw --v 6.1",
                  },
                },
                required: [
                  "trackReference",
                  "bpm",
                  "beatStyle",
                  "sunoStylePrompt",
                  "verseLines",
                  "chorusLines",
                  "videoAction",
                  "keyframePrompt916",
                ],
              },
              imageIdea: {
                type: Type.OBJECT,
                description:
                  "Für format='image_idea': Surreale 9:16 Meme-Grafik mit vertikalem Aufbau und Midjourney-Prompt",
                properties: {
                  topText: { type: Type.STRING },
                  bottomText: { type: Type.STRING },
                  verticalComposition: {
                    type: Type.STRING,
                    description:
                      "Erklärung der vertikalen 9:16 Bildachse (Oberes Drittel / Mitte / Unteres Drittel)",
                  },
                  visualDescription: { type: Type.STRING },
                  aiImagePrompt: {
                    type: Type.STRING,
                    description:
                      "Detaillierter Midjourney/DALL-E Prompt für 9:16 Fullscreen, endend mit --ar 9:16 --style raw --v 6.1",
                  },
                },
                required: [
                  "topText",
                  "bottomText",
                  "verticalComposition",
                  "visualDescription",
                  "aiImagePrompt",
                ],
              },
              caption: {
                type: Type.STRING,
                description:
                  "Fertige TikTok/Reels/Shorts Caption mit Community-Trigger",
              },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "5 bis 7 passende Hashtags ohne #-Zeichen",
              },
            },
            required: ["title", "hook", "caption", "hashtags"],
          },
        },
      });

      const rawText = (response.text ?? "{}").trim();
      const parsed = JSON.parse(rawText);

      res.json({
        success: true,
        item: {
          id: `gen-${Date.now()}`,
          format,
          trade,
          tone,
          createdAt: "Gerade eben",
          aspectRatio: "9:16",
          ...parsed,
        },
      });
    } catch (error: unknown) {
      console.error("Gemini generation error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Fehler bei der 9:16 AI-Content-Generierung.";
      res.status(500).json({
        success: false,
        error: message,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HandwerkerAI 9:16 Studio running on http://localhost:${PORT}`);
  });
}

startServer();
