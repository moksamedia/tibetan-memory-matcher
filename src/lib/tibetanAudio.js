import { Client } from "@gradio/client";

class TibetanAudioService {
  constructor() {
    this.client = null;
    this.audioCache = new Map(); // Cache audio by text
    this.connecting = false;
    this.connectionPromise = null;
    this.audioContext = null;
  }

  getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  async padAudioWithSilence(audioUrl, paddingMs = 300) {
    try {
      // Fetch the audio file
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Decode the audio data
      const audioContext = this.getAudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Calculate new buffer length (original + padding)
      const paddingSamples = Math.floor((paddingMs / 1000) * audioBuffer.sampleRate);
      const newLength = audioBuffer.length + paddingSamples;

      // Create a new buffer with extra length
      const paddedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        newLength,
        audioBuffer.sampleRate
      );

      // Copy original audio data to new buffer
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const originalData = audioBuffer.getChannelData(channel);
        const paddedData = paddedBuffer.getChannelData(channel);
        paddedData.set(originalData, 0);
        // The rest is already zeros (silence)
      }

      // Convert buffer back to blob
      const wav = this.audioBufferToWav(paddedBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      const paddedUrl = URL.createObjectURL(blob);

      return paddedUrl;
    } catch (error) {
      console.error("Error padding audio:", error);
      // If padding fails, return original URL
      return audioUrl;
    }
  }

  // Convert AudioBuffer to WAV format
  audioBufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;

    const data = [];
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const intSample = Math.max(-1, Math.min(1, sample));
        data.push(intSample < 0 ? intSample * 0x8000 : intSample * 0x7FFF);
      }
    }

    const dataLength = data.length * bytesPerSample;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
      view.setInt16(offset, data[i], true);
      offset += 2;
    }

    return arrayBuffer;
  }

  async connect() {
    if (this.client) return this.client;

    if (this.connecting) {
      return this.connectionPromise;
    }

    this.connecting = true;
    this.connectionPromise = Client.connect("aipmtdd/tibetan-tts-service")
      .then(client => {
        this.client = client;
        this.connecting = false;
        return client;
      })
      .catch(error => {
        this.connecting = false;
        this.connectionPromise = null;
        throw new Error(`Failed to connect to TTS service: ${error.message}`);
      });

    return this.connectionPromise;
  }

  async generateAudio(text) {
    if (!text || text.trim() === '') {
      throw new Error("Text cannot be empty");
    }
    console.log("Generating audio for text:", text);

    // Check cache first
    if (this.audioCache.has(text)) {
      return this.audioCache.get(text);
    }

    try {
      // Ensure connection
      await this.connect();

      // Generate audio using the first endpoint
      const result = await this.client.predict("/generate_tibetan_speech", {
        text: text
      });

      // result.data is [audioData, statusString]
      const [audioData, status] = result.data;

      if (!audioData || !audioData.url) {
        throw new Error(`Audio generation failed: ${status || 'Unknown error'}`);
      }

      // Original audio URL
      const originalUrl = audioData.url;

      // Pad audio with 300ms of silence at the end
      const paddedUrl = await this.padAudioWithSilence(originalUrl, 300);

      // Cache the result with padded URL
      const audioResult = {
        url: paddedUrl,
        status: status,
        text: text
      };

      this.audioCache.set(text, audioResult);

      return audioResult;
    } catch (error) {
      console.error("Error generating audio:", error);
      throw new Error(`Failed to generate audio: ${error.message}`);
    }
  }

  async playAudio(text) {
    const audioResult = await this.generateAudio(text);

    // Create and play audio element
    const audio = new Audio(audioResult.url);

    // Set preload to ensure full audio is buffered
    audio.preload = 'auto';

    // Ensure audio doesn't get cut off
    audio.preservesPitch = true;

    await audio.play();

    return audio;
  }

  clearCache() {
    // Revoke all blob URLs to free memory
    for (const [text, audioResult] of this.audioCache.entries()) {
      if (audioResult.url && audioResult.url.startsWith('blob:')) {
        URL.revokeObjectURL(audioResult.url);
      }
    }
    this.audioCache.clear();
  }

  getCacheSize() {
    return this.audioCache.size;
  }
}

// Export singleton instance
export const tibetanAudio = new TibetanAudioService();

// Also export the class for custom instances
export { TibetanAudioService };
