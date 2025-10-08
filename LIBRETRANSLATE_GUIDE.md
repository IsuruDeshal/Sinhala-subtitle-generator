# 🌍 LibreTranslate Integration Guide

## What is LibreTranslate?

**LibreTranslate** is a **free and open-source** machine translation API that allows you to translate text between languages without any API keys or usage limits. It's completely self-hosted and privacy-focused!

### ✨ Key Benefits:
- ✅ **100% FREE** - No API keys required
- ✅ **No Usage Limits** - Unlimited translations
- ✅ **Privacy-First** - Your data stays private
- ✅ **Open Source** - Fully transparent code
- ✅ **Self-Hostable** - Run your own server

---

## 🚀 How to Use LibreTranslate in This App

### Option 1: Use Public Servers (Easiest)

1. **Select LibreTranslate** from the AI Provider dropdown
2. **Choose a server** from the list:
   - **libretranslate.com** - Official server (Most reliable)
   - **translate.argosopentech.com** - Argos Translate server
   - **translate.terraprint.co** - Community server
3. **Upload your video** - No API key needed!

### Option 2: Use Custom Server

If you have your own LibreTranslate server:

1. **Select LibreTranslate** from the dropdown
2. **Choose "Custom Server URL"**
3. **Enter your server URL** (e.g., `http://localhost:5000`)
4. **Upload your video**

### Option 3: Self-Host LibreTranslate (Advanced)

For maximum privacy and unlimited use, host your own server!

---

## 🏗️ Setting Up Your Own LibreTranslate Server

### Prerequisites:
- Python 3.8 or higher
- 2GB+ RAM
- Internet connection (for initial setup)

### Installation Methods:

#### Method 1: Using Docker (Recommended)

```bash
# Pull the Docker image
docker pull libretranslate/libretranslate

# Run the server
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

Your server will be available at: `http://localhost:5000`

#### Method 2: Using pip

```bash
# Install LibreTranslate
pip install libretranslate

# Run the server
libretranslate --host 0.0.0.0 --port 5000
```

#### Method 3: From Source

```bash
# Clone the repository
git clone https://github.com/LibreTranslate/LibreTranslate.git
cd LibreTranslate

# Install dependencies
pip install -e .

# Run the server
libretranslate --host 0.0.0.0 --port 5000
```

### Advanced Configuration:

```bash
# Run with specific languages only (faster loading)
libretranslate --load-only en,si

# Run with API keys (optional, for rate limiting)
libretranslate --api-keys

# Run with frontend enabled
libretranslate --frontend-language-source en --frontend-language-target si
```

---

## ⚙️ Server Options

### Default Configuration:
- **Host**: `0.0.0.0` (accessible from network)
- **Port**: `5000`
- **Languages**: All available languages

### Custom Configuration:

```bash
libretranslate \
  --host 0.0.0.0 \
  --port 5000 \
  --load-only en,si \
  --threads 4 \
  --suggestions
```

### Configuration File (Optional):

Create `app/config.json`:

```json
{
  "host": "0.0.0.0",
  "port": 5000,
  "char_limit": 5000,
  "req_limit": 100,
  "batch_limit": 10,
  "ga_id": "",
  "frontend_language_source": "en",
  "frontend_language_target": "si",
  "load_only": ["en", "si"]
}
```

---

## 🌐 Public LibreTranslate Servers

### Official Servers:
1. **https://libretranslate.com** 
   - Maintained by the LibreTranslate team
   - Most reliable and up-to-date
   - May have rate limits during high traffic

2. **https://translate.argosopentech.com**
   - Community-maintained
   - Good alternative option
   - Supports multiple languages

3. **https://translate.terraprint.co**
   - Another community server
   - Usually stable and fast

### ⚠️ Important Notes:
- Public servers may have **rate limits**
- Response times may vary based on **server load**
- For heavy usage, consider **self-hosting**
- Always respect server **terms of service**

---

## 🔧 How This App Uses LibreTranslate

### Workflow:

1. **Video Upload** → Your video file
2. **Audio Extraction** → FFmpeg extracts audio
3. **Transcription** → Uses OpenAI Whisper (fallback to demo)
4. **Translation** → **LibreTranslate** translates to Sinhala
5. **SRT Generation** → Creates subtitle files

### Why OpenAI for Transcription?
LibreTranslate is a **translation-only** service. For audio transcription, the app uses:
- OpenAI Whisper API (if available)
- Demo transcription (as fallback)

### Translation Process:
```javascript
English Text → LibreTranslate Server → Sinhala Translation
```

---

## 📊 Performance Comparison

| Feature | LibreTranslate | OpenAI | Gemini | Speechmatics |
|---------|---------------|--------|--------|--------------|
| **Cost** | FREE | $0.10-0.30/hr | FREE/Low | $1.80/hr |
| **API Key** | None | Required | Required | Required |
| **Translation Quality** | Good | Excellent | Very Good | N/A |
| **Speed** | Fast | Very Fast | Very Fast | Very Fast |
| **Privacy** | Excellent | Good | Good | Good |
| **Self-Hosting** | ✅ Yes | ❌ No | ❌ No | ❌ No |

---

## 🐛 Troubleshooting

### Issue: "Failed to connect to server"
**Solutions:**
- Check if the server URL is correct
- Ensure the server is running
- Try a different public server
- Check your internet connection

### Issue: "Translation taking too long"
**Solutions:**
- Public servers may be slow during peak hours
- Try a different server
- Consider self-hosting for faster response

### Issue: "Sinhala translation not working"
**Solutions:**
- Ensure the server supports Sinhala (`si` language code)
- Some servers may have limited language support
- Try the official server: `https://libretranslate.com`

### Issue: "Rate limit exceeded"
**Solutions:**
- Wait a few minutes before trying again
- Use a different public server
- Self-host your own server for unlimited use

---

## 🔐 Privacy & Security

### Why LibreTranslate is Privacy-Friendly:
- ✅ **No tracking** - Doesn't collect user data
- ✅ **No API keys** - No account needed
- ✅ **Open source** - Transparent code
- ✅ **Self-hostable** - Complete control over data

### Self-Hosting Benefits:
- Your video never leaves your network
- Complete privacy for sensitive content
- No usage limits or throttling
- Full control over the translation process

---

## 📚 Additional Resources

### Official Documentation:
- **Website**: [libretranslate.com](https://libretranslate.com)
- **GitHub**: [github.com/LibreTranslate/LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)
- **API Docs**: [libretranslate.com/docs](https://libretranslate.com/docs)

### Community:
- **Forum**: [community.libretranslate.com](https://community.libretranslate.com)
- **Discord**: Join via GitHub page
- **Issues**: Report bugs on GitHub

### Docker Hub:
- **Image**: [hub.docker.com/r/libretranslate/libretranslate](https://hub.docker.com/r/libretranslate/libretranslate)

---

## 💡 Tips for Best Results

1. **Use Official Server** for most reliable results
2. **Self-Host** for heavy usage and maximum privacy
3. **Test Multiple Servers** to find the fastest one for you
4. **Keep Server Updated** if self-hosting
5. **Monitor Performance** and switch servers if needed

---

## 🆚 When to Use LibreTranslate?

### Choose LibreTranslate if:
- ✅ You want a **completely FREE** solution
- ✅ You don't want to create API accounts
- ✅ **Privacy** is your top priority
- ✅ You're processing **sensitive content**
- ✅ You want to **self-host** everything
- ✅ You're on a **zero budget**

### Choose Other Providers if:
- ❌ You need the **absolute best** translation quality (OpenAI)
- ❌ You want **guaranteed uptime** (Paid services)
- ❌ You need **enterprise support**
- ❌ You're doing **commercial work** requiring top quality

---

## 📞 Support

For LibreTranslate-specific issues:
- **LibreTranslate**: [github.com/LibreTranslate/LibreTranslate/issues](https://github.com/LibreTranslate/LibreTranslate/issues)

For app-specific issues:
- **Email**: inboxtoisuru@gmail.com
- **Phone**: +94767794217
- **GitHub**: [IsuruDeshal/Sinhala-subtitle-generator](https://github.com/IsuruDeshal/Sinhala-subtitle-generator)

---

**Made with ❤️ by R.A. Isuru Deshal**

*Supporting open-source translation for everyone!* 🌍
