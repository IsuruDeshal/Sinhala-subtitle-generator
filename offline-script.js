class OfflineSinhalaSTTGenerator {
    constructor() {
        this.englishTranscript = '';
        this.sinhalaTranscript = '';
        this.startTime = null;
        this.processingTimer = null;
        this.currentStage = 1;
        this.serverUrl = 'http://localhost:5000';
        
        this.initializeEventListeners();
        this.checkServerStatus();
    }

    async checkServerStatus() {
        try {
            const response = await fetch(`${this.serverUrl}/health`);
            const data = await response.json();
            
            if (data.status === 'healthy') {
                this.updateServerStatus('online', 'Server online - Ready to process videos');
            } else {
                this.updateServerStatus('warning', 'Server partially loaded - Some features may be limited');
            }
        } catch (error) {
            this.updateServerStatus('offline', 'Server offline - Please start the backend server');
            console.error('Server check failed:', error);
        }
    }

    updateServerStatus(status, message) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        statusDot.className = `status-dot ${status}`;
        statusText.textContent = message;
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const browseLink = document.getElementById('browseLink');

        // File input change event
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Browse link click
        browseLink.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop events
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            this.handleFileSelect(file);
        });

        // Download buttons
        document.getElementById('downloadEnglish').addEventListener('click', () => {
            this.downloadSRT(this.englishTranscript, 'subtitles_english.srt');
        });

        document.getElementById('downloadSinhala').addEventListener('click', () => {
            this.downloadSRT(this.sinhalaTranscript, 'subtitles_sinhala.srt');
        });

        // Process another button
        document.getElementById('processAnother').addEventListener('click', () => {
            this.resetToUpload();
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
        if (!allowedTypes.includes(file.type) && !this.isValidVideoFile(file.name)) {
            alert('Please select a valid video file (MP4, AVI, MOV, MKV, WebM)');
            return;
        }

        this.processVideo(file);
    }

    isValidVideoFile(filename) {
        const extensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
    }

    async processVideo(file) {
        try {
            // Start timing and show processing area
            this.startProcessing();
            document.getElementById('uploadArea').style.display = 'none';
            document.getElementById('processingArea').style.display = 'block';
            document.getElementById('resultsArea').style.display = 'none';

            // Stage 1: Upload (0-20%)
            this.setCurrentStage(1, 'Uploading to Server');
            this.updateProgress(0);
            this.updateProcessingStatus('Uploading video to local server...');

            // Create FormData for upload
            const formData = new FormData();
            formData.append('video', file);
            formData.append('language', 'en'); // Default to English detection

            this.updateProgress(10);

            // Stage 2: Processing (20-80%)
            this.setCurrentStage(2, 'Processing Video');
            this.updateProcessingStatus('Server is extracting audio...');
            this.updateProgress(20);

            // Send to server with progress tracking
            const response = await this.uploadWithProgress(formData);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Server error: ${response.status} - ${errorData.error || 'Unknown error'}`);
            }

            // Stage 3: Receiving Results (80-100%)
            this.setCurrentStage(3, 'Generating Subtitles');
            this.updateProcessingStatus('Receiving transcription results...');
            this.updateProgress(80);

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Processing failed');
            }

            // Store the results
            this.englishTranscript = data.english_srt;
            this.sinhalaTranscript = data.sinhala_srt;

            this.updateProgress(95);
            this.updateProcessingStatus('Finalizing subtitle files...');
            
            await this.delay(500);
            this.updateProgress(100);

            // Show results with processing info
            this.showResults(data.processing_info);

        } catch (error) {
            console.error('Error processing video:', error);
            
            let errorMessage = 'Failed to process video. ';
            if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Cannot connect to server. Please make sure the backend server is running.';
            } else if (error.message.includes('Server error')) {
                errorMessage += error.message;
            } else {
                errorMessage += error.message;
            }
            
            alert(errorMessage);
            this.resetToUpload();
        }
    }

    async uploadWithProgress(formData) {
        // Simulate progress updates during upload/processing
        const progressUpdates = [
            { progress: 25, message: 'Server extracting audio from video...' },
            { progress: 40, message: 'Running faster-whisper transcription...' },
            { progress: 60, message: 'Transcription completed, translating to Sinhala...' },
            { progress: 75, message: 'Translation completed, generating SRT files...' }
        ];

        // Start the actual upload
        const uploadPromise = fetch(`${this.serverUrl}/process-video`, {
            method: 'POST',
            body: formData
        });

        // Simulate progress updates
        let currentUpdate = 0;
        const progressInterval = setInterval(() => {
            if (currentUpdate < progressUpdates.length) {
                const update = progressUpdates[currentUpdate];
                this.updateProgress(update.progress);
                this.updateProcessingStatus(update.message);
                currentUpdate++;
            } else {
                clearInterval(progressInterval);
            }
        }, 2000); // Update every 2 seconds

        try {
            const response = await uploadPromise;
            clearInterval(progressInterval);
            return response;
        } catch (error) {
            clearInterval(progressInterval);
            throw error;
        }
    }

    startProcessing() {
        this.startTime = Date.now();
        this.currentStage = 1;
        this.updateTimer();
        this.processingTimer = setInterval(() => this.updateTimer(), 1000);
        
        // Reset all stages
        for (let i = 1; i <= 3; i++) {
            const stage = document.getElementById(`stage${i}`);
            stage.classList.remove('active', 'completed');
        }
        document.getElementById('stage1').classList.add('active');
    }

    stopProcessing() {
        if (this.processingTimer) {
            clearInterval(this.processingTimer);
            this.processingTimer = null;
        }
        
        // Mark all stages as completed
        for (let i = 1; i <= 3; i++) {
            const stage = document.getElementById(`stage${i}`);
            stage.classList.remove('active');
            stage.classList.add('completed');
        }
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timeElement = document.getElementById('processingTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    setCurrentStage(stageNumber, stageName) {
        this.currentStage = stageNumber;
        
        // Update stage indicators
        for (let i = 1; i <= 3; i++) {
            const stage = document.getElementById(`stage${i}`);
            stage.classList.remove('active');
            
            if (i < stageNumber) {
                stage.classList.add('completed');
            } else if (i === stageNumber) {
                stage.classList.add('active');
                stage.classList.remove('completed');
            } else {
                stage.classList.remove('completed');
            }
        }
    }

    updateProgress(percentage) {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (progressFill && progressPercentage) {
            const clampedPercentage = Math.min(100, Math.max(0, percentage));
            progressFill.style.width = `${clampedPercentage}%`;
            progressPercentage.textContent = `${Math.round(clampedPercentage)}%`;
        }
    }

    updateProcessingStatus(status) {
        document.getElementById('processingStatus').textContent = status;
    }

    showResults(processingInfo) {
        this.stopProcessing();
        document.getElementById('processingArea').style.display = 'none';
        document.getElementById('resultsArea').style.display = 'block';

        // Update results info
        if (processingInfo) {
            const totalTime = this.startTime ? 
                Math.round((Date.now() - this.startTime) / 1000) + ' seconds' : 
                'Unknown';
            
            document.getElementById('totalTime').textContent = totalTime;
            document.getElementById('totalSegments').textContent = processingInfo.total_segments || 'Unknown';
            document.getElementById('videoDuration').textContent = 
                processingInfo.total_duration ? 
                Math.round(processingInfo.total_duration) + ' seconds' : 
                'Unknown';
        }
    }

    resetToUpload() {
        document.getElementById('uploadArea').style.display = 'block';
        document.getElementById('processingArea').style.display = 'none';
        document.getElementById('resultsArea').style.display = 'none';
        
        // Reset timer and progress
        this.stopProcessing();
        this.updateProgress(0);
        this.startTime = null;
        
        // Reset stage indicators
        for (let i = 1; i <= 3; i++) {
            const stage = document.getElementById(`stage${i}`);
            stage.classList.remove('active', 'completed');
        }
        document.getElementById('stage1').classList.add('active');
        
        // Reset time display
        const timeElement = document.getElementById('processingTime');
        if (timeElement) {
            timeElement.textContent = '00:00';
        }

        // Clear file input
        document.getElementById('fileInput').value = '';
    }

    downloadSRT(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OfflineSinhalaSTTGenerator();
});