
export interface Shot {
  lyrics: string;
  prompt: string;
}

export interface StoryboardSegment {
  segment: string;
  shots: Shot[];
}
