# 🎬 Sinhala SRT Generator

**Upload any video and get Sinhala subtitles instantly with your choice of AI provider!**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/IsuruDeshal/Sinhala-subtitle-generator)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- **🤖 Multiple AI Providers**: Choose between OpenAI, Google Gemini, Speechmatics, or LibreTranslate
- **🌐 Two Versions Available**: Online (API-based) and Offline (Local processing)
- **🎯 Dual Language Output**: Generates subtitles in both English and Sinhala
- **📹 Multiple Formats**: Supports MP4, AVI, MOV, MKV, WebM
- **🚀 Real-time Progress**: Beautiful progress tracking with time estimates
- **💰 Flexible Options**: Choose the AI provider that fits your budget - including FREE options!
- **🔒 Privacy**: Choose between cloud processing or local processing

## 🤖 Supported AI Providers

### OpenAI (Whisper & GPT-4)
- ✅ High accuracy transcription
- ✅ Excellent translation quality
- ✅ Well-established API
- 💰 Pay-per-use pricing (~$0.10-0.30/hour)

### Google Gemini 2.5
- ✅ Fast processing
- ✅ Competitive pricing
- ✅ Latest AI technology
- 💰 FREE tier available

### Speechmatics
- ✅ Enterprise-grade accuracy
- ✅ Real-time transcription support
- ✅ Professional features
- 💰 Subscription-based pricing

### LibreTranslate ⭐ NEW
- ✅ **100% FREE** - No API keys required
- ✅ Open-source and privacy-focused
- ✅ Self-hostable for unlimited use
- ✅ No usage limits
- 💰 **Completely FREE!**
- 💰 Free tier available

### Speechmatics
- ✅ Real-time transcription
- ✅ Enterprise-grade accuracy
- ✅ Multi-language support
- 💰 Subscription-based pricing

## 🌟 Two Versions to Choose From

### 🌐 Online Version (`index.html`)
- **✅ Quick Setup**: Just open and use
- **✅ No Installation**: Works directly in browser
- **✅ Multi-Provider Support**: OpenAI, Gemini, Speechmatics, or LibreTranslate
- **✅ FREE Option**: LibreTranslate requires no API key!
- **✅ Flexible Costs**: Choose provider based on budget
- **❌ API Key Required**: For OpenAI, Gemini, and Speechmatics only

### 🏠 Offline Version (`index-offline.html`)
- **✅ Completely Free**: No API costs after setup
- **✅ Full Privacy**: All processing stays on your machine
- **✅ No File Limits**: Process any size video
- **✅ Professional Quality**: Same accuracy as OpenAI Whisper
- **❌ Setup Required**: Need to install Python and dependencies

## 🚀 Quick Start

### Online Version - FREE Option (Recommended for Beginners!)

#### Use LibreTranslate (100% FREE, No API Key Required!)
1. Open `index.html` in your browser
2. Select **"LibreTranslate"** from the provider dropdown
3. Choose a public server (e.g., libretranslate.com)
4. Upload video and get subtitles - **Completely FREE!**

📖 **Full Guide**: See [LIBRETRANSLATE_GUIDE.md](LIBRETRANSLATE_GUIDE.md) for setup instructions

### Online Version - Premium Providers

#### Use OpenAI, Gemini, or Speechmatics
1. Open `index.html` in your browser
2. Select your AI provider from the dropdown
3. Enter your API key for the selected provider
4. Upload video and get subtitles!

**Getting API Keys:**
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Google Gemini**: [ai.google.dev](https://ai.google.dev/)
- **Speechmatics**: [portal.speechmatics.com](https://portal.speechmatics.com/)

📖 **Full Guide**: See [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md) for detailed setup

### Offline Version (One-time Setup)
1. **Install Python 3.8+** from [python.org](https://python.org)
2. **Install Dependencies**: 
   ```bash
   pip install -r requirements.txt
   ```
3. **Start Server**: 
   ```bash
   python backend_server.py
   ```
   Or double-click: `start-offline-server.bat`
4. **Open Interface**: `index-offline.html` in browser
5. **Upload and Process**: Drag & drop your video!

## 📋 Detailed Setup (Offline Version)

### Prerequisites
- Python 3.8 or higher
- 4GB+ RAM (for AI models)
- 1GB+ free disk space

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/IsuruDeshal/Sinhala-subtitle-generator.git
cd Sinhala-subtitle-generator

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the backend server
python backend_server.py

# 4. Open index-offline.html in your browser
```

### Windows Quick Start
1. Download/clone this repository
2. Double-click `start-offline-server.bat`
3. Open `index-offline.html` in your browser
4. Upload videos and get subtitles!

## 🎯 How It Works

### Online Version Workflow
```
📹 Video Upload → ☁️ OpenAI Whisper → 🤖 GPT-4 Translation → 📄 SRT Files
```

### Offline Version Workflow
```
📹 Video Upload → 🎵 Audio Extraction → 🤖 Local Whisper → 🔄 Translation → 📄 SRT Files
```

## 🖼️ Screenshots

### Upload Interface
- Beautiful drag & drop interface
- Support for multiple video formats
- Real-time file validation

### Processing View
- Live progress tracking with percentages
- Processing time display
- Stage indicators (Audio → Transcription → Translation)

### Results
- Download both English and Sinhala SRT files
- Processing statistics
- Option to process another video

## 📁 Project Structure

```
Sinhala-subtitle-generator/
├── 🌐 Online Version
│   ├── index.html              # Main web interface
│   ├── script.js              # OpenAI API integration
│   └── styles.css             # Shared styling
├── 🏠 Offline Version
│   ├── index-offline.html     # Offline web interface
│   ├── offline-script.js      # Local server communication
│   ├── backend_server.py      # Python Flask server
│   ├── requirements.txt       # Python dependencies
│   └── start-offline-server.bat # Windows quick start
├── 📚 Documentation
│   ├── README.md              # This file
│   ├── OFFLINE_SETUP.md       # Detailed offline setup
│   └── start-server.html      # Server setup guide
└── 🎨 Assets
    └── styles.css             # Beautiful UI styling
```

## ⚙️ Configuration

### Online Version Setup
1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Edit `script.js` line 3:
   ```javascript
   this.apiKey = 'your-openai-api-key-here';
   ```

### Offline Version Customization
Edit `backend_server.py` to change:
- **Whisper Model**: Line 31 (`tiny`, `base`, `small`, `medium`, `large`)
- **Server Port**: Line 230 (default: 5000)
- **Translation Service**: Line 85 (currently Google Translate)

## 🔧 Troubleshooting

### Common Issues

**"Server offline" in browser**
- Ensure Python server is running
- Check if port 5000 is available
- Try `python backend_server.py`

**"Module not found" errors**
```bash
pip install --upgrade -r requirements.txt
```

**Slow processing**
- Use smaller Whisper model (`tiny` or `base`)
- Ensure sufficient RAM available
- Close unnecessary applications

**FFmpeg errors**
- Windows: Download from [ffmpeg.org](https://ffmpeg.org)
- macOS: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

## 🌍 Language Support

- **Input**: Auto-detects language or specify language code
- **Transcription**: High-quality English transcription
- **Translation**: Professional Sinhala translation
- **Output**: Standard SRT format for both languages

## 🎯 Use Cases

- **Content Creators**: Add Sinhala subtitles to videos
- **Educational Content**: Make videos accessible in Sinhala
- **Business**: Localize video content for Sri Lankan audience
- **Personal**: Add subtitles to family videos
- **Accessibility**: Help hearing-impaired Sinhala speakers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact & Support

**Developer**: R.A. Isuru Deshal  
**Phone**: +94767794217  
**Email**: inboxtoisuru@gmail.com  

For issues, questions, or feature requests, please:
1. Open an issue on GitHub
2. Contact via email
3. WhatsApp: +94767794217

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for Whisper and GPT-4 models
- **faster-whisper** for efficient local processing
- **MoviePy** for video processing
- **Flask** for the web server
- **Google Translate** for translation services

## ⭐ Star This Repository

If this project helped you, please give it a star! ⭐

---

**Made with ❤️ for the Sinhala community**