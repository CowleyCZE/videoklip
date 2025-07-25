
export interface Shot {
  lyrics: string;
  prompt: string;
  duration?: number; // in seconds
  shotType?: 'close-up' | 'medium' | 'wide' | 'extreme-wide' | 'extreme-close-up';
  cameraMovement?: 'static' | 'pan' | 'tilt' | 'zoom' | 'dolly' | 'tracking';
  mood?: string;
}

export interface StoryboardSegment {
  segment: string;
  shots: Shot[];
  totalDuration?: number; // calculated from shots
}

export interface GenerationSettings {
  creativityLevel: 'conservative' | 'balanced' | 'creative' | 'experimental';
  videoStyle: 'cinematic' | 'documentary' | 'artistic' | 'commercial' | 'indie';
  colorPalette: 'vibrant' | 'muted' | 'monochrome' | 'warm' | 'cool' | 'natural';
  includeTransitions: boolean;
  maxShotsPerSegment: number;
}
