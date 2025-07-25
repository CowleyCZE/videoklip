# AI Director's Assistant: Lyric to Storyboard

An innovative application that functions as an intelligent 'director's assistant' for music video creation. It transforms song lyrics into a structured visual storyboard, generating detailed cinematic prompts for use in external AI video generation platforms.

## Features

### 🎬 Advanced Storyboard Generation
- Analyzes song lyrics for structure, emotion, and themes
- Generates detailed cinematic prompts for each lyrical line
- Creates varied visual interpretations for recurring sections (chorus, etc.)
- Supports multiple video styles and creative approaches

### ⚙️ Customizable Generation Settings
- **Creativity Levels**: Conservative, Balanced, Creative, Experimental
- **Video Styles**: Cinematic, Documentary, Artistic, Commercial, Indie
- **Color Palettes**: Vibrant, Muted, Monochrome, Warm, Cool, Natural
- **Advanced Options**: Transition suggestions, shot count control

### 📤 Export Capabilities
- **JSON Export**: Complete storyboard data for further processing
- **Text Export**: Human-readable format for scripts and planning
- **CSV Export**: Spreadsheet-compatible format for production management
- **Prompt Copying**: Quick copy of all AI prompts for batch processing

### 🎨 Enhanced User Interface
- Clean, professional dark theme
- Responsive design for desktop and mobile
- Advanced settings panel with intuitive controls
- Real-time feedback and progress indicators

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `VITE_GEMINI_API_KEY` in [.env](.env) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

## Usage Guide

### Basic Workflow
1. **Input Lyrics**: Paste your song lyrics in the text area
2. **Configure Settings** (Optional): Open advanced settings to customize generation
3. **Generate Storyboard**: Click "Generate Storyboard" to create your visual plan
4. **Export Results**: Use export buttons to save your storyboard in various formats

### Advanced Settings

#### Creativity Levels
- **Conservative**: Safe, traditional cinematographic techniques
- **Balanced**: Mix of classic and modern visual approaches  
- **Creative**: Bold, artistic visual choices
- **Experimental**: Cutting-edge, avant-garde techniques

#### Video Styles
- **Cinematic**: Professional film quality with dramatic lighting
- **Documentary**: Realistic, authentic visual approach
- **Artistic**: Stylized, expressive visual language
- **Commercial**: Polished, mainstream appeal
- **Indie**: Alternative, unconventional aesthetic

#### Color Palettes
- **Vibrant**: Bold, saturated colors
- **Muted**: Soft, understated tones
- **Monochrome**: Black and white or single color schemes
- **Warm**: Reds, oranges, and yellows
- **Cool**: Blues, greens, and purples
- **Natural**: Realistic, earth-tone colors

## Technical Details

### Architecture
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini 2.5 Flash
- **Build Tool**: Vite

### File Structure
```
├── components/          # React components
│   ├── AdvancedSettings.tsx
│   ├── ExportButtons.tsx
│   ├── LyricInput.tsx
│   ├── StoryboardView.tsx
│   └── ...
├── services/           # Business logic
│   ├── geminiService.ts
│   └── exportService.ts
├── types.ts           # TypeScript definitions
└── App.tsx           # Main application
```

## API Reference

### Gemini Integration
The application uses Google's Gemini 2.5 Flash model with structured output to ensure consistent JSON responses. The AI prompt includes detailed instructions for:
- Lyrical structure analysis
- Emotional and thematic interpretation
- Cinematic element specification
- Visual variety in recurring sections

### Export Functions
```typescript
exportStoryboard(storyboard: StoryboardSegment[], options: ExportOptions)
copyToClipboard(text: string): Promise<boolean>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
