
import React, { useState, useCallback } from 'react';
import { LyricInput } from './components/LyricInput';
import { StoryboardView } from './components/StoryboardView';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { ToastProvider } from './components/Toast';
import { createStoryboard } from './services/geminiService';
import type { StoryboardSegment, GenerationSettings } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storyboard, setStoryboard] = useState<StoryboardSegment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStoryboard, setShowStoryboard] = useState<boolean>(false);

  const handleGenerateStoryboard = useCallback(async (lyrics: string, settings?: GenerationSettings) => {
    if (!lyrics.trim()) {
      setError("Please enter some lyrics to begin.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setStoryboard(null);
    setShowStoryboard(false);

    try {
      const result = await createStoryboard(lyrics, settings);
      setStoryboard(result);
      setShowStoryboard(true);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred. Please check the console and ensure your API key is configured correctly.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setStoryboard(null);
    setError(null);
    setShowStoryboard(false);
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans flex flex-col">
        <Header onReset={handleReset} showReset={showStoryboard || isLoading} />
        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
          {!showStoryboard && !isLoading && (
             <LyricInput onGenerate={handleGenerateStoryboard} isLoading={isLoading} />
          )}
          
          {isLoading && <Loader />}

          {error && !isLoading && (
            <div className="text-center mt-10 bg-red-900/50 border border-red-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-2">Generation Failed</h2>
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {showStoryboard && storyboard && (
            <div className="w-full max-w-5xl animate-fade-in">
              <StoryboardView storyboard={storyboard} />
            </div>
          )}
        </main>
        <footer className="text-center p-4 text-neutral-500 text-sm">
          <p>AI Director's Assistant | Powered by Gemini</p>
        </footer>
      </div>
    </ToastProvider>
  );
};

// Add fade-in animation to global styles
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default App;
