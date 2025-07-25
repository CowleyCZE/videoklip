
import React from 'react';
import { StoryboardSection } from './StoryboardSection';
import type { StoryboardSegment } from '../types';

interface StoryboardViewProps {
  storyboard: StoryboardSegment[];
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({ storyboard }) => {
  return (
    <div className="w-full space-y-12">
      {storyboard.map((segment, index) => (
        <StoryboardSection key={`${segment.segment}-${index}`} segment={segment} />
      ))}
    </div>
  );
};
