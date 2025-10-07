# 🎬 Sinhala SRT Generator - Offline Version Setup Guide

## ✨ What's New in the Offline Version?

- **🚫 No API Keys Required** - Works completely offline using faster-whisper
- **💰 Zero Cost** - No OpenAI API charges
- **🔒 Privacy** - All processing happens locally on your machine
- **⚡ High Quality** - Same accuracy as OpenAI Whisper
- **📏 No File Size Limits** - Process any size video file
- **🌐 Multi-language Support** - Automatic language detection

## 🚀 Quick Start

### Step 1: Install Python (if not already installed)
Download Python 3.8+ from [python.org](https://www.python.org/downloads/)

### Step 2: Install Dependencies
```bash
# Navigate to your project folder
cd "C:\Users\admin\Desktop\project\srt1"

# Install all required packages
pip install -r requirements.txt
```

### Step 3: Start the Backend Server
```bash
python backend_server.py
```

### Step 4: Open the Web Interface
Open `index-offline.html` in your web browser.

The interface will show:
- 🟢 **Green dot**: Server online and ready
- 🟡 **Yellow dot**: Server partially loaded
- 🔴 **Red dot**: Server offline

## 📋 Detailed Installation Guide

### Prerequisites
- **Python 3.8 or higher**
- **4GB+ RAM** (for faster-whisper model)
- **1GB+ free disk space** (for model downloads)

### Installation Steps

#### 1. Check Python Installation
```bash
python --version
# Should show Python 3.8.x or higher
```

#### 2. Create Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv sinhala_srt_env

# Activate virtual environment
# On Windows:
sinhala_srt_env\Scripts\activate
# On macOS/Linux:
source sinhala_srt_env/bin/activate
```

#### 3. Install Dependencies
```bash
# Install all required packages
pip install -r requirements.txt

# If you encounter issues, install individually:
pip install Flask==2.3.3
pip install flask-cors==4.0.0
pip install faster-whisper==0.10.0
pip install moviepy==1.0.3
pip install googletrans==4.0.0-rc1
```

#### 4. First Run (Model Download)
```bash
python backend_server.py
```

**Note:** On first run, faster-whisper will download the model (~140MB for 'small' model). This may take a few minutes depending on your internet connection.

## 🖥️ Usage Instructions

### Starting the Server
```bash
# Navigate to project folder
cd "C:\Users\admin\Desktop\project\srt1"

# Activate virtual environment (if using)
sinhala_srt_env\Scripts\activate

# Start server
python backend_server.py
```

You should see:
```
INFO - Starting Sinhala SRT Generator Backend...
INFO - Loading Whisper model...
INFO - Whisper model loaded successfully
INFO - Initializing translator...
INFO - Translator initialized successfully
INFO - Starting Flask server...
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://[your-ip]:5000
```

### Using the Web Interface

1. **Open Browser**: Navigate to `index-offline.html`
2. **Check Status**: Ensure green dot shows "Server online"
3. **Upload Video**: Drag & drop or browse for video file
4. **Wait for Processing**: Watch real-time progress updates
5. **Download Results**: Get both English and Sinhala SRT files

### Processing Flow

```
📹 Video Upload → 🎵 Audio Extraction → 📝 Transcription → 🔄 Translation → 📄 SRT Files
```

1. **Audio Extraction** (moviepy): Extracts WAV audio from video
2. **Transcription** (faster-whisper): Converts audio to English text
3. **Translation** (googletrans): Translates English to Sinhala
4. **SRT Generation**: Creates downloadable subtitle files

## ⚙️ Configuration Options

### Whisper Model Selection
Edit `backend_server.py` line 31 to change model:
```python
# Options: tiny, base, small, medium, large
whisper_model = WhisperModel("small", device="cpu", compute_type="int8")
```

**Model Comparison:**
- **tiny**: Fastest, lowest accuracy (~39MB)
- **base**: Good speed/accuracy balance (~74MB)
- **small**: Recommended for most use cases (~244MB)
- **medium**: Better accuracy, slower (~769MB)
- **large**: Best accuracy, slowest (~1550MB)

### Server Configuration
Edit `backend_server.py` bottom section:
```python
app.run(
    host='0.0.0.0',  # Allow external connections
    port=5000,       # Change port if needed
    debug=False,     # Set True for development
    threaded=True
)
```

## 🔧 Troubleshooting

### Common Issues

#### "Module not found" Error
```bash
# Ensure all dependencies are installed
pip install -r requirements.txt

# If specific package fails:
pip install package-name --upgrade
```

#### "Server offline" in Browser
1. Check if Python server is running
2. Verify no firewall blocking port 5000
3. Try accessing http://localhost:5000 directly

#### "FFmpeg not found" Error
```bash
# Install FFmpeg
# Windows: Download from https://ffmpeg.org/download.html
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
```

#### Slow Processing
1. Use smaller Whisper model (tiny/base)
2. Ensure sufficient RAM available
3. Close other heavy applications

#### Translation Errors
- Google Translate may have rate limits
- Check internet connection for translation service
- Transcription will still work without translation

### Performance Tips

1. **Use SSD Storage** - Faster model loading
2. **Sufficient RAM** - 4GB+ recommended
3. **Close Unnecessary Apps** - Free up system resources
4. **Stable Internet** - For initial model download and translation

## 📁 File Structure

```
srt1/
├── index-offline.html          # Offline web interface
├── offline-script.js           # Offline JavaScript logic
├── backend_server.py           # Python Flask server
├── requirements.txt            # Python dependencies
├── styles.css                  # Shared styling
├── index.html                  # Original online version
├── script.js                   # Original online JavaScript
└── README.md                   # This file
```

## 🆚 Online vs Offline Comparison

| Feature | Online Version | Offline Version |
|---------|---------------|-----------------|
| **API Key** | Required (OpenAI) | Not required |
| **Cost** | Pay per use | Free after setup |
| **Privacy** | Data sent to OpenAI | Fully local |
| **File Size Limit** | 5GB | No limit |
| **Internet Required** | Yes (always) | Only for translation |
| **Setup Complexity** | Simple | Moderate |
| **Processing Speed** | Depends on API | Depends on hardware |

## 🔄 Updates and Maintenance

### Updating Dependencies
```bash
pip install --upgrade -r requirements.txt
```

### Updating Whisper Model
Delete model cache and restart:
```bash
# Clear cache (location varies by OS)
# Windows: %USERPROFILE%\.cache\huggingface
# macOS: ~/.cache/huggingface
# Linux: ~/.cache/huggingface
```

## 🎯 Advanced Usage

### Batch Processing
The server can handle multiple simultaneous requests. You can create scripts to process multiple videos:

```python
import requests
import os

def process_video(video_path):
    with open(video_path, 'rb') as f:
        files = {'video': f}
        response = requests.post('http://localhost:5000/process-video', files=files)
        return response.json()

# Process multiple videos
video_folder = "path/to/videos"
for video_file in os.listdir(video_folder):
    if video_file.endswith(('.mp4', '.avi', '.mov', '.mkv')):
        result = process_video(os.path.join(video_folder, video_file))
        print(f"Processed {video_file}: {result['success']}")
```

### API Integration
The backend provides RESTful APIs:

```bash
# Health check
GET http://localhost:5000/health

# Process video
POST http://localhost:5000/process-video
Content-Type: multipart/form-data
Body: video file + language parameter
```

## 🎉 You're All Set!

Your offline Sinhala SRT Generator is now ready to use! 

**Benefits:**
- ✅ No internet required for processing
- ✅ No API costs
- ✅ Complete privacy
- ✅ Professional-grade accuracy
- ✅ No file size limitations

Enjoy creating subtitles offline! 🎬✨