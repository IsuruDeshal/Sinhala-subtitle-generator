/**
 * API Configuration Template
 * 
 * IMPORTANT SECURITY NOTES:
 * 1. This is a TEMPLATE file - DO NOT commit actual API keys to Git
 * 2. Copy this file to 'api-config.js' and add your real keys there
 * 3. The actual 'api-config.js' is git-ignored for security
 * 4. Never share your API keys publicly
 */

const API_CONFIG = {
    // OpenAI Configuration
    openai: {
        apiKey: 'YOUR_OPENAI_API_KEY_HERE', // Format: sk-...
        model: {
            whisper: 'whisper-1',
            gpt: 'gpt-4'
        }
    },

    // Google Gemini Configuration
    gemini: {
        apiKey: 'YOUR_GEMINI_API_KEY_HERE', // Format: AIza...
        model: 'gemini-2.0-flash-exp'
    },

    // Speechmatics Configuration
    speechmatics: {
        apiKey: 'YOUR_SPEECHMATICS_API_KEY_HERE', // Format: RT1a...
        endpoint: 'https://asr.api.speechmatics.com/v2'
    },

    // LibreTranslate Configuration
    libretranslate: {
        server: 'https://libretranslate.com', // Default server
        // Alternative servers:
        // 'https://translate.argosopentech.com'
        // 'https://translate.terraprint.co'
        // 'http://localhost:5000' // For self-hosted
        apiKey: null // Not required for public servers
    }
};

// Export for use in your application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
