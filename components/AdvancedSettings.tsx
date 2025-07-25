import React from 'react';
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
        <span className="text-lg font-medium text-neutral-200">Pokročilé nastavení</span>
        <span className={`transform transition-transform ${isVisible ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isVisible && (
        <div className="mt-4 p-6 bg-neutral-800/50 border border-neutral-700 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Úroveň kreativity
            </label>
            <select
              value={settings.creativityLevel}
              onChange={(e) => handleSettingChange('creativityLevel', e.target.value as GenerationSettings['creativityLevel'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="conservative">Konzervativní - Bezpečné, tradiční přístupy</option>
              <option value="balanced">Vyvážený - Mix klasického a moderního</option>
              <option value="creative">Kreativní - Odvážné, umělecké volby</option>
              <option value="experimental">Experimentální - Moderní, avantgardní</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Styl videa
            </label>
            <select
              value={settings.videoStyle}
              onChange={(e) => handleSettingChange('videoStyle', e.target.value as GenerationSettings['videoStyle'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="cinematic">Filmový - Profesionální kvalita filmu</option>
              <option value="documentary">Dokumentární - Realistický, autentický</option>
              <option value="artistic">Umělecký - Stylizovaný, expresivní</option>
              <option value="commercial">Komerční - Uhlazeným mainstream</option>
              <option value="indie">Nezávislý - Alternativní, nekonvenční</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Barevná paleta
            </label>
            <select
              value={settings.colorPalette}
              onChange={(e) => handleSettingChange('colorPalette', e.target.value as GenerationSettings['colorPalette'])}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="vibrant">Zářivé - Výrazné, sytě barvy</option>
              <option value="muted">Tlumené - Jemné, nenápadné tóny</option>
              <option value="monochrome">Monochromní - Černobílé</option>
              <option value="warm">Teplé - Červené, oranžové, žluté</option>
              <option value="cool">Studené - Modré, zelené, fialové</option>
              <option value="natural">Přírodní - Zemité tóny, realistické</option>
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
              <span className="ml-2 text-sm text-neutral-300">Zahrnout návrhy přechodů</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Max záběrů na segment: {settings.maxShotsPerSegment}
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
