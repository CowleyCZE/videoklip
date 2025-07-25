
import React from 'react';
import { ShotCard } from './ShotCard';
import type { StoryboardSegment } from '../types';

interface StoryboardSectionProps {
  segment: StoryboardSegment;
}

export const StoryboardSection: React.FC<StoryboardSectionProps> = ({ segment }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 pb-2 border-b-2 border-neutral-700">
        {segment.segment}
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {segment.shots.map((shot, index) => (
          <ShotCard key={index} shot={shot} shotNumber={index + 1} />
        ))}
      </div>
    </section>
  );
};
