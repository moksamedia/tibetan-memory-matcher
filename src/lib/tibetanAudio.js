import { Client } from "@gradio/client";

class TibetanAudioService {
  constructor() {
    this.client = null;
    this.audioCache = new Map(); // Cache audio by text
    this.connecting = false;
    this.connectionPromise = null;
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

      // Create audio blob URL
      const audioUrl = audioData.url;

      // Cache the result
      const audioResult = {
        url: audioUrl,
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
    await audio.play();

    return audio;
  }

  clearCache() {
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
