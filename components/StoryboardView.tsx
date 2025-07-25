
import React from 'react';
import { StoryboardSection } from './StoryboardSection';
import { ExportButtons } from './ExportButtons';
import type { StoryboardSegment } from '../types';

interface StoryboardViewProps {
  storyboard: StoryboardSegment[];
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({ storyboard }) => {
  const totalShots = storyboard.reduce((sum, segment) => sum + segment.shots.length, 0);
  const totalSegments = storyboard.length;

  return (
    <div className="w-full space-y-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-200 mb-2">Your Storyboard</h2>
        <p className="text-neutral-400">
          {totalSegments} segments • {totalShots} shots
        </p>
        <div className="mt-4">
          <ExportButtons storyboard={storyboard} />
        </div>
      </div>
      
      {storyboard.map((segment, index) => (
        <StoryboardSection key={`${segment.segment}-${index}`} segment={segment} />
      ))}
    </div>
  );
};
