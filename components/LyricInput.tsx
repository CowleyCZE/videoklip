
import React, { useState } from 'react';
import { AdvancedSettings } from './AdvancedSettings';
import type { GenerationSettings } from '../types';

interface LyricInputProps {
  onGenerate: (lyrics: string, settings?: GenerationSettings) => void;
  isLoading: boolean;
}

const defaultSettings: GenerationSettings = {
  creativityLevel: 'balanced',
  videoStyle: 'cinematic',
  colorPalette: 'natural',
  includeTransitions: false,
  maxShotsPerSegment: 8
};

export const LyricInput: React.FC<LyricInputProps> = ({ onGenerate, isLoading }) => {
  const [lyrics, setLyrics] = useState('');
  const [settings, setSettings] = useState<GenerationSettings>(defaultSettings);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(lyrics, settings);
  };

  return (
    <div className="w-full max-w-2xl text-center mt-10 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Přeměň texty na kino</h2>
      <p className="text-lg text-neutral-400 mb-8">
        Vložte text písně níže. Naše AI analyzuje strukturu, emoce a témata pro vytvoření filmového storyboardu pro váš hudební klip.
      </p>
      
      <AdvancedSettings
        settings={settings}
        onSettingsChange={setSettings}
        isVisible={showAdvanced}
        onToggle={() => setShowAdvanced(!showAdvanced)}
      />
      
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="[Sloka 1]
V tichu noci, jediné světlo bliká
Vzpomínka mizí, jako dávný obrázek
...
[Refrén]
Ach, honíme se za ozvěny v dešti
Snažíme se cítit něco, zmírnit bolest"
          className="w-full h-64 p-4 rounded-lg bg-neutral-800 border-2 border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 resize-none text-base text-neutral-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !lyrics.trim()}
          className="mt-6 w-full md:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-500 disabled:bg-neutral-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-600/30"
        >
          {isLoading ? 'Analyzuji...' : 'Vytvořit storyboard'}
        </button>
      </form>
    </div>
  );
};
