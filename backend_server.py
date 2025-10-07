"""
Sinhala SRT Generator - Local Backend with faster-whisper
Offline transcription and translation server
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
import logging
from datetime import datetime
import json

# Import required libraries
try:
    from faster_whisper import WhisperModel
    from moviepy.editor import VideoFileClip
    from googletrans import Translator
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Please install dependencies:")
    print("pip install faster-whisper moviepy googletrans==4.0.0-rc1")
    exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variables
whisper_model = None
translator = None

def initialize_models():
    """Initialize Whisper model and translator"""
    global whisper_model, translator
    
    try:
        logger.info("Loading Whisper model...")
        # Use 'small' model for good balance of speed and accuracy
        # Options: tiny, base, small, medium, large
        whisper_model = WhisperModel("small", device="cpu", compute_type="int8")
        logger.info("Whisper model loaded successfully")
        
        logger.info("Initializing translator...")
        translator = Translator()
        logger.info("Translator initialized successfully")
        
    except Exception as e:
        logger.error(f"Error initializing models: {e}")
        raise

def extract_audio_from_video(video_path, audio_path):
    """Extract audio from video file using moviepy"""
    try:
        logger.info(f"Extracting audio from {video_path}")
        video = VideoFileClip(video_path)
        audio = video.audio
        audio.write_audiofile(audio_path, logger=None)  # Suppress moviepy logs
        audio.close()
        video.close()
        logger.info(f"Audio extracted to {audio_path}")
        return True
    except Exception as e:
        logger.error(f"Error extracting audio: {e}")
        return False

def transcribe_audio(audio_path, language="en"):
    """Transcribe audio using faster-whisper"""
    try:
        logger.info(f"Transcribing audio: {audio_path}")
        
        segments, info = whisper_model.transcribe(
            audio_path, 
            beam_size=5,
            language=language,
            word_timestamps=True
        )
        
        result_segments = []
        for segment in segments:
            result_segments.append({
                "start": segment.start,
                "end": segment.end,
                "text": segment.text.strip()
            })
        
        logger.info(f"Transcription completed. Language: {info.language}, Segments: {len(result_segments)}")
        return result_segments
        
    except Exception as e:
        logger.error(f"Error during transcription: {e}")
        return []

def translate_to_sinhala(text):
    """Translate English text to Sinhala"""
    try:
        logger.info("Translating to Sinhala...")
        translation = translator.translate(text, src='en', dest='si')
        return translation.text
    except Exception as e:
        logger.error(f"Error during translation: {e}")
        return f"Translation error: {text}"  # Fallback to original text

def generate_srt(segments):
    """Generate SRT formatted string from segments"""
    srt_content = ""
    
    for i, segment in enumerate(segments, 1):
        start_time = format_timestamp(segment["start"])
        end_time = format_timestamp(segment["end"])
        
        srt_content += f"{i}\n"
        srt_content += f"{start_time} --> {end_time}\n"
        srt_content += f"{segment['text']}\n\n"
    
    return srt_content

def format_timestamp(seconds):
    """Format seconds to SRT timestamp format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    milliseconds = int((seconds % 1) * 1000)
    
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{milliseconds:03d}"

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "OK",
        "message": "Sinhala SRT Generator Backend",
        "version": "1.0.0",
        "models_loaded": whisper_model is not None and translator is not None
    })

@app.route('/process-video', methods=['POST'])
def process_video():
    """Main endpoint to process video and generate subtitles"""
    try:
        # Check if file is present
        if 'video' not in request.files:
            return jsonify({"error": "No video file provided"}), 400
        
        video_file = request.files['video']
        if video_file.filename == '':
            return jsonify({"error": "No video file selected"}), 400
        
        # Get language parameter (optional)
        language = request.form.get('language', 'en')
        
        logger.info(f"Processing video: {video_file.filename}")
        
        # Create temporary files
        with tempfile.TemporaryDirectory() as temp_dir:
            # Save uploaded video
            video_path = os.path.join(temp_dir, "input_video")
            video_file.save(video_path)
            
            # Extract audio
            audio_path = os.path.join(temp_dir, "audio.wav")
            if not extract_audio_from_video(video_path, audio_path):
                return jsonify({"error": "Failed to extract audio from video"}), 500
            
            # Transcribe audio
            segments = transcribe_audio(audio_path, language)
            if not segments:
                return jsonify({"error": "Failed to transcribe audio"}), 500
            
            # Translate to Sinhala
            logger.info("Translating segments to Sinhala...")
            sinhala_segments = []
            for segment in segments:
                sinhala_text = translate_to_sinhala(segment["text"])
                sinhala_segments.append({
                    "start": segment["start"],
                    "end": segment["end"],
                    "text": sinhala_text
                })
            
            # Generate SRT files
            english_srt = generate_srt(segments)
            sinhala_srt = generate_srt(sinhala_segments)
            
            logger.info("Processing completed successfully")
            
            return jsonify({
                "success": True,
                "english_segments": segments,
                "sinhala_segments": sinhala_segments,
                "english_srt": english_srt,
                "sinhala_srt": sinhala_srt,
                "processing_info": {
                    "total_segments": len(segments),
                    "total_duration": segments[-1]["end"] if segments else 0,
                    "language_detected": language
                }
            })
    
    except Exception as e:
        logger.error(f"Error processing video: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Detailed health check"""
    try:
        # Test Whisper model
        whisper_status = whisper_model is not None
        
        # Test translator
        translator_status = translator is not None
        
        return jsonify({
            "status": "healthy" if (whisper_status and translator_status) else "unhealthy",
            "services": {
                "whisper_model": "loaded" if whisper_status else "not_loaded",
                "translator": "loaded" if translator_status else "not_loaded"
            },
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    try:
        logger.info("Starting Sinhala SRT Generator Backend...")
        logger.info("Initializing models...")
        initialize_models()
        logger.info("Models initialized successfully")
        
        logger.info("Starting Flask server...")
        # Run the Flask app
        app.run(
            host='0.0.0.0',  # Allow external connections
            port=5000,
            debug=False,
            threaded=True
        )
        
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        exit(1)