import React, { useState } from 'react';
import type { StoryboardSegment } from '../types';
import { exportStoryboard } from '../services/exportService';
import { useToast } from './Toast';

interface ExportButtonsProps {
  storyboard: StoryboardSegment[];
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ storyboard }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const handleExport = async (format: 'json' | 'txt' | 'csv') => {
    setIsExporting(true);
    try {
      exportStoryboard(storyboard, { 
        format,
        filename: `storyboard-${new Date().toISOString().split('T')[0]}`
      });
      showToast(`Storyboard exportován jako ${format.toUpperCase()}`, 'success');
    } catch (error) {
      console.error('Export failed:', error);
      showToast('Export selhal. Zkuste to znovu.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const copyAllPrompts = async () => {
    const allPrompts = storyboard.flatMap(segment => 
      segment.shots.map(shot => shot.prompt)
    ).join('\n\n---\n\n');
    
    try {
      await navigator.clipboard.writeText(allPrompts);
      showToast('Všechny prompty zkopírovány do schránky', 'success');
    } catch (error) {
      console.error('Failed to copy prompts:', error);
      showToast('Kopírování promptů selhalo. Zkuste to znovu.', 'error');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => handleExport('json')}
        disabled={isExporting}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
      >
        Exportovat JSON
      </button>
      <button
        onClick={() => handleExport('txt')}
        disabled={isExporting}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
      >
        Exportovat text
      </button>
      <button
        onClick={() => handleExport('csv')}
        disabled={isExporting}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-50"
      >
        Exportovat CSV
      </button>
      <button
        onClick={copyAllPrompts}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
      >
        Kopírovat všechny prompty
      </button>
    </div>
  );
};
