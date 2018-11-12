
class AudioAnalyzer {
  constructor(source) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyzer = this.audioCtx.createAnalyser();
    this.audioSource = source;
    this.connectNewSource = this.connectNewSource.bind(this);
    
    this.source = undefined;
    this.data = undefined;
  }

  connectNewSource() {
    const source = this.audioSource;
    return new Promise((resolve, reject) => {
      // Set up audio input
      if (source instanceof HTMLElement) {
        this.source = this.audioCtx.createMediaElementSource(source);
        this.analyzer.connect(this.audioCtx.destination);
      } else {
        this.source = this.audioCtx.createMediaStreamSource(source);
      }
      // Pass data through analyzer
      this.source.connect(this.analyzer);
      resolve(true);
    })
  }

  collectData(size = 2048, type='b') {
    this.analyzer.fftSize = size;
    let bufferLength = this.analyzer.frequencyBinCount;
    this.data = type === 'b' ? new Uint8Array(bufferLength) : new Float32Array(bufferLength);
    if (type === 'b') this.analyzer.getByteFrequencyData(this.data);
    else this.analyzer.getFloatFrequencyData(this.data);
    return this.getData();
  }

  updateSource(src) {
    this.audioSource = src;
  }
  getData() {
    return this.data;
  }
}
