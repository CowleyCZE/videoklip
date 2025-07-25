
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryboardSegment, GenerationSettings } from '../types';

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const storyboardSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      segment: {
        type: Type.STRING,
        description: 'The structural segment of the song (e.g., "[Verse 1]", "[Chorus]", "[Bridge]").'
      },
      shots: {
        type: Type.ARRAY,
        description: 'An array of shots for this segment.',
        items: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.STRING,
              description: 'The corresponding line or lines of lyrics for this shot.'
            },
            prompt: {
              type: Type.STRING,
              description: 'The detailed, cinematic prompt for an AI image/video generator. This prompt must be rich in visual detail.'
            }
          },
          required: ['lyrics', 'prompt']
        }
      }
    },
    required: ['segment', 'shots']
  }
};


export const createStoryboard = async (lyrics: string, settings?: GenerationSettings): Promise<StoryboardSegment[]> => {
  const systemInstruction = `You are an expert AI Director's Assistant specializing in music video creation. Your task is to transform song lyrics into a structured, cinematic storyboard. You must analyze the lyrics for structure, emotion, themes, and visual elements, and then translate these into detailed, actionable prompts for a text-to-image/video generator.`;
  
  // Build enhanced prompt based on settings
  let styleGuidance = '';
  if (settings) {
    styleGuidance = `
    **Style Guidelines:**
    - Creativity Level: ${settings.creativityLevel} - ${getCreativityDescription(settings.creativityLevel)}
    - Video Style: ${settings.videoStyle} - ${getVideoStyleDescription(settings.videoStyle)}
    - Color Palette: ${settings.colorPalette} - ${getColorPaletteDescription(settings.colorPalette)}
    - Maximum shots per segment: ${settings.maxShotsPerSegment}
    ${settings.includeTransitions ? '- Include transition suggestions between shots' : ''}
    `;
  }

  const prompt = `
    Analyze the following song lyrics and generate a complete visual storyboard.

    **Instructions:**

    1.  **Analyze and Structure:** First, segment the lyrics into their musical structure (e.g., [Intro], [Verse 1], [Chorus], [Bridge], [Outro]).
    2.  **Thematic/Emotional Analysis:** For each line or small group of lines within a segment, determine the core emotion (e.g., Melancholy, Hopeful, Angry) and key themes/concepts (e.g., Loss, Freedom, Nostalgia).
    3.  **Generate Cinematic Prompts:** Based on your analysis, create a detailed, cinematic prompt for each lyrical line or small group of lines. Each prompt must be a cohesive instruction for an AI image/video generator.
    4.  **Prompt Anatomy:** Each prompt MUST incorporate these cinematic elements:
        *   **Subject:** The main character or object.
        *   **Action:** What the subject is doing.
        *   **Scene/Setting:** The environment, time of day.
        *   **Camera:** Shot type (e.g., close-up, wide shot), angle, and movement (e.g., slow pan, static shot).
        *   **Lighting:** Description of the light (e.g., soft morning light, harsh neon, film noir shadows).
        *   **Style/Aesthetic:** The overall visual style (e.g., photorealistic, 4K, watercolor style, vintage film grain, Wes Anderson aesthetic).
    5.  **Vary the Chorus:** For recurring sections like the Chorus, you MUST create visually distinct prompts for each instance to avoid repetition. The core theme should remain, but the camera angle, shot composition, or specific action should change significantly.
    6.  **Output Format:** Your entire response must be ONLY the JSON object conforming to the provided schema. Do not include any introductory text, explanations, or markdown formatting like \`\`\`json.

    ${styleGuidance}

    **Lyrics to Analyze:**
    ---
    ${lyrics}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: storyboardSchema,
      }
    });

    const responseText = response.text.trim();
    
    // Sometimes the model might still wrap the output in markdown
    const cleanedText = responseText.startsWith('```json') 
      ? responseText.replace(/^```json\n|```$/g, '')
      : responseText;

    const parsedData: StoryboardSegment[] = JSON.parse(cleanedText);
    return parsedData;
  } catch (error) {
    console.error("Error generating storyboard:", error);
    if (error instanceof Error && error.message.includes("SAFETY")) {
      throw new Error("The generation was blocked due to safety settings. Please modify the lyrics and try again.");
    }
    throw new Error("Failed to generate storyboard from Gemini API. Check console for details.");
  }
};

// Helper functions for style descriptions
const getCreativityDescription = (level: GenerationSettings['creativityLevel']): string => {
  switch (level) {
    case 'conservative': return 'Use traditional, proven cinematographic techniques';
    case 'balanced': return 'Mix classic and modern visual approaches';
    case 'creative': return 'Employ bold, artistic visual choices';
    case 'experimental': return 'Push boundaries with avant-garde techniques';
    default: return '';
  }
};

const getVideoStyleDescription = (style: GenerationSettings['videoStyle']): string => {
  switch (style) {
    case 'cinematic': return 'Professional film quality with dramatic lighting and composition';
    case 'documentary': return 'Realistic, authentic visual approach';
    case 'artistic': return 'Stylized, expressive visual language';
    case 'commercial': return 'Polished, mainstream appeal';
    case 'indie': return 'Alternative, unconventional aesthetic';
    default: return '';
  }
};

const getColorPaletteDescription = (palette: GenerationSettings['colorPalette']): string => {
  switch (palette) {
    case 'vibrant': return 'Use bold, saturated colors';
    case 'muted': return 'Employ soft, understated tones';
    case 'monochrome': return 'Black and white or single color schemes';
    case 'warm': return 'Focus on reds, oranges, and yellows';
    case 'cool': return 'Emphasize blues, greens, and purples';
    case 'natural': return 'Use realistic, earth-tone colors';
    default: return '';
  }
};
