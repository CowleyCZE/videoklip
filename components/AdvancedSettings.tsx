import React, { useState } from 'react';
import type { GenerationSettings } from '../types';

interface AdvancedSettingsProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  onSettingsChange,
  isVisible,
  onToggle
}) => {
  const handleSettingChange = <K extends keyof GenerationSettings>(
    key: K,
    value: GenerationSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="w-full max-w-2xl mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-750 transition-colors"
      >
        <span className="text-lg font-medium text-neutral-200">Advanced Settings</span>
        <span className={`transform transition-transform ${isVisible ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isVisible && (
        <div className="mt-4 p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Creativity Level
            </label>
            <select
              value={settings.creativityLevel}
              onChange={(e) => handleSettingChange('creativityLevel', e.target.value as GenerationSettings['creativityLevel'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="conservative">Conservative - Safe, traditional approaches</option>
              <option value="balanced">Balanced - Mix of classic and modern</option>
              <option value="creative">Creative - Bold, artistic choices</option>
              <option value="experimental">Experimental - Cutting-edge, avant-garde</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Video Style
            </label>
            <select
              value={settings.videoStyle}
              onChange={(e) => handleSettingChange('videoStyle', e.target.value as GenerationSettings['videoStyle'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="cinematic">Cinematic - Professional film quality</option>
              <option value="documentary">Documentary - Realistic, authentic</option>
              <option value="artistic">Artistic - Stylized, expressive</option>
              <option value="commercial">Commercial - Polished, mainstream</option>
              <option value="indie">Indie - Alternative, unconventional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Color Palette
            </label>
            <select
              value={settings.colorPalette}
              onChange={(e) => handleSettingChange('colorPalette', e.target.value as GenerationSettings['colorPalette'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="vibrant">Vibrant - Bold, saturated colors</option>
              <option value="muted">Muted - Soft, understated tones</option>
              <option value="monochrome">Monochrome - Black and white</option>
              <option value="warm">Warm - Reds, oranges, yellows</option>
              <option value="cool">Cool - Blues, greens, purples</option>
              <option value="natural">Natural - Earth tones, realistic</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.includeTransitions}
                onChange={(e) => handleSettingChange('includeTransitions', e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-neutral-700 border-neutral-600 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-neutral-300">Include transition suggestions</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Max Shots per Segment: {settings.maxShotsPerSegment}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              value={settings.maxShotsPerSegment}
              onChange={(e) => handleSettingChange('maxShotsPerSegment', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>3</span>
              <span>15</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
