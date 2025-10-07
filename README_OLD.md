# 🎬 Sinhala SRT Generator

A web application that generates subtitles in both English and Sinhala from video files using OpenAI's Whisper and GPT APIs.

## Features

- **Drag & Drop Interface**: Easy file upload with drag and drop functionality
- **Multiple Video Formats**: Supports MP4, AVI, MOV, MKV files up to 5GB
- **FFmpeg Integration**: Real audio extraction using FFmpeg.wasm in the browser
- **Dual Language Output**: Generates subtitles in both English and Sinhala
- **OpenAI Integration**: Uses Whisper for transcription and GPT-4 for translation
- **Progress Tracking**: Real-time progress updates during audio extraction
- **SRT Format**: Downloads standard SRT subtitle files

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Upload Video**: 
   - Drag and drop your video file onto the upload area, or
   - Click "browse files" to select a video file
3. **Wait for Processing**: The app will:
   - Initialize FFmpeg in the browser
   - Extract high-quality audio from your video using FFmpeg
   - Transcribe the audio to English using OpenAI Whisper
   - Translate the English text to Sinhala using GPT-4
4. **Download Subtitles**: Once processing is complete, download both:
   - English SRT file
   - Sinhala SRT file

## Supported File Formats

- **MP4** (.mp4)
- **AVI** (.avi) 
- **MOV** (.mov)
- **MKV** (.mkv)

**Maximum file size**: 5GB

## Technical Details

### APIs and Libraries Used
- **FFmpeg.wasm**: Client-side video processing and audio extraction
- **OpenAI Whisper API**: For audio transcription to English
- **OpenAI GPT-4 API**: For English to Sinhala translation

### Audio Processing
The application uses FFmpeg.wasm to:
- Extract audio from video files in the browser
- Convert audio to optimal format for Whisper (16kHz WAV, mono)
- Process various video formats without server-side dependencies

### Files Structure
```
srt1/
├── index.html          # Main HTML file
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## API Configuration

The OpenAI API key is already configured in the application. The app uses:
- **Whisper Model**: `whisper-1` for audio transcription
- **GPT Model**: `gpt-4` for translation to Sinhala

## Browser Compatibility

This application works in modern web browsers that support:
- File API
- Fetch API
- ES6+ JavaScript features
- WebAssembly (for FFmpeg.wasm)
- SharedArrayBuffer (required for FFmpeg.wasm)

**Important**: Some browsers may require specific headers for SharedArrayBuffer support. For local testing, you may need to serve the files through a local server.

Recommended browsers:
- Chrome 79+ (with appropriate flags if needed)
- Firefox 79+ (with appropriate settings if needed)
- Safari 14+
- Edge 79+

## Limitations

1. **Internet Connection**: Requires active internet connection for OpenAI API calls and FFmpeg.wasm loading
2. **File Size**: Maximum 5GB video file size
3. **Processing Time**: Larger files will take longer to process (FFmpeg + API calls)
4. **Browser Memory**: Large videos may require significant browser memory for processing
5. **API Costs**: Uses OpenAI APIs which may incur costs based on usage
6. **Browser Support**: Requires modern browsers with WebAssembly and SharedArrayBuffer support

## Troubleshooting

### Common Issues

1. **"Please select a valid video file"**
   - Ensure your file is in MP4, AVI, MOV, or MKV format

2. **"File size exceeds 5GB limit"**
   - Compress your video or use a smaller file

3. **Processing fails**
   - Check your internet connection
   - Ensure the OpenAI API key is valid and has sufficient credits
   - Try refreshing the page to reload FFmpeg
   - Check browser console for FFmpeg-related errors

4. **FFmpeg loading issues**
   - Ensure you have a stable internet connection
   - Try serving the files through a local HTTP server
   - Check if your browser supports WebAssembly and SharedArrayBuffer

### Error Handling

The application includes fallback demo data if API calls fail, so you can test the interface even without a working API connection. FFmpeg errors are handled gracefully with user-friendly error messages.

## Development Notes

- The app is client-side only (no backend server required)
- FFmpeg.wasm handles real audio extraction in the browser
- Translation quality depends on GPT-4's Sinhala language capabilities
- SRT timing is preserved from the original Whisper transcription
- Progress tracking shows FFmpeg extraction progress in real-time

## Local Development

For local development, you may need to serve the files through an HTTP server due to browser security restrictions with WebAssembly:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server package)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Future Enhancements

- Add support for more video formats
- Implement chunked processing for very large files
- Add progress bars with estimated time remaining
- Support for batch processing multiple files
- Add preview functionality for generated subtitles
- Optimize FFmpeg settings for faster processing
- Add subtitle timing adjustment tools