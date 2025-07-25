
import React, { useState, useCallback } from 'react';
import type { Shot } from '../types';
import { IconClipboard } from './IconClipboard';
import { IconCheck } from './IconCheck';
import { IconImage } from './IconImage';
import { useToast } from './Toast';

interface ShotCardProps {
  shot: Shot;
  shotNumber: number;
}

export const ShotCard: React.FC<ShotCardProps> = ({ shot, shotNumber }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shot.prompt);
      setIsCopied(true);
      showToast('Prompt zkopírován do schránky', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
      showToast('Kopírování selhalo', 'error');
    }
  }, [shot.prompt, showToast]);

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 bg-neutral-800 p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-700">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-700/50 border-2 border-dashed border-neutral-600">
            <IconImage className="w-10 h-10 text-neutral-500" />
        </div>
        <p className="mt-4 text-sm text-neutral-400">Náhled obrázku</p>
        {shot.shotType && (
          <p className="mt-2 text-xs text-indigo-400 uppercase tracking-wide">{shot.shotType}</p>
        )}
      </div>
      <div className="p-6 flex-grow">
        <p className="text-lg italic text-neutral-300 mb-4">"{shot.lyrics}"</p>
        <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-mono text-sm uppercase text-indigo-400 tracking-wider">
              Prompt #{shotNumber}
            </h3>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md transition-all duration-200 ${
                isCopied 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
              }`}
            >
              {isCopied ? <IconCheck className="w-4 h-4" /> : <IconClipboard className="w-4 h-4" />}
              {isCopied ? 'Zkopírováno!' : 'Kopírovat'}
            </button>
          </div>
          <p className="font-mono text-base text-neutral-200 leading-relaxed">
            {shot.prompt}
          </p>
          {shot.cameraMovement && (
            <div className="mt-3 pt-3 border-t border-neutral-700">
              <span className="text-xs text-neutral-400 uppercase tracking-wide">Pohyb kamery: </span>
              <span className="text-xs text-purple-400">{shot.cameraMovement}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
