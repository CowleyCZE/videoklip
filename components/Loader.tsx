
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 animate-fade-in">
      <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-2xl font-semibold mt-6 text-neutral-200">Crafting your vision...</h2>
      <p className="text-neutral-400 mt-2">The AI is analyzing lyrics, themes, and cinematic potential.</p>
    </div>
  );
};
