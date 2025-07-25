
import React from 'react';
import { IconMovie } from './IconMovie';
import { IconRefresh } from './IconRefresh';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header className="bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <IconMovie className="w-8 h-8 text-indigo-400" />
          <h1 className="text-xl md:text-2xl font-bold text-neutral-100 tracking-tight">
            AI Asistent režiséra
          </h1>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white transition-all duration-200"
            title="Začít znovu"
          >
            <IconRefresh className="w-4 h-4" />
            <span className="hidden sm:inline">Nový storyboard</span>
          </button>
        )}
      </div>
    </header>
  );
};
