import type { StoryboardSegment } from '../types';

export interface ExportOptions {
  format: 'json' | 'txt' | 'csv';
  includeTimestamps?: boolean;
  filename?: string;
}

export const exportStoryboard = (storyboard: StoryboardSegment[], options: ExportOptions): void => {
  const { format, filename = 'storyboard' } = options;
  
  let content: string;
  let mimeType: string;
  let extension: string;

  switch (format) {
    case 'json':
      content = JSON.stringify(storyboard, null, 2);
      mimeType = 'application/json';
      extension = 'json';
      break;
    
    case 'txt':
      content = formatAsText(storyboard);
      mimeType = 'text/plain';
      extension = 'txt';
      break;
    
    case 'csv':
      content = formatAsCsv(storyboard);
      mimeType = 'text/csv';
      extension = 'csv';
      break;
    
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  downloadFile(content, `${filename}.${extension}`, mimeType);
};

const formatAsText = (storyboard: StoryboardSegment[]): string => {
  return storyboard.map(segment => {
    const segmentTitle = `${segment.segment}\n${'='.repeat(segment.segment.length)}\n`;
    const shots = segment.shots.map((shot, index) => 
      `Shot ${index + 1}:\nLyrics: "${shot.lyrics}"\nPrompt: ${shot.prompt}\n`
    ).join('\n');
    return segmentTitle + shots;
  }).join('\n\n');
};

const formatAsCsv = (storyboard: StoryboardSegment[]): string => {
  const headers = 'Segment,Shot Number,Lyrics,Prompt\n';
  const rows = storyboard.flatMap(segment => 
    segment.shots.map((shot, index) => 
      `"${segment.segment}","${index + 1}","${shot.lyrics.replace(/"/g, '""')}","${shot.prompt.replace(/"/g, '""')}"`
    )
  ).join('\n');
  return headers + rows;
};

const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
