
import React, { useState } from 'react';

interface LyricInputProps {
  onGenerate: (lyrics: string) => void;
  isLoading: boolean;
}

export const LyricInput: React.FC<LyricInputProps> = ({ onGenerate, isLoading }) => {
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(lyrics);
  };

  return (
    <div className="w-full max-w-2xl text-center mt-10 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Transform Lyrics into Cinema</h2>
      <p className="text-lg text-neutral-400 mb-8">
        Paste your song lyrics below. Our AI will analyze the structure, emotion, and themes to create a cinematic storyboard for your music video.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="[Verse 1]
In the still of the night, a single light flickers
A memory fades, like a long lost picture
...
[Chorus]
Oh, we're chasing echoes in the rain
Trying to feel something, to ease the pain"
          className="w-full h-64 p-4 rounded-lg bg-neutral-800 border-2 border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 resize-none text-base text-neutral-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !lyrics.trim()}
          className="mt-6 w-full md:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-500 disabled:bg-neutral-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-600/30"
        >
          {isLoading ? 'Analyzing...' : 'Generate Storyboard'}
        </button>
      </form>
    </div>
  );
};
