export class AudioAnalyzer {
  constructor(source) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.source   = this.audioCtx.createMediaStreamSource(source);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.data;
  }

  collectData(size = 2048, type='b') {
    this.analyser.fftSize = 2048;
    let bufferLength = this.analyser.frequencyBinCount;
    this.data = type === 'b' ? new Uint8Array(bufferLength) : new Float32Array(bufferLength);
    if (type === 'b') this.analyser.getByteFrequencyData(this.data);
    else this.analyser.getFloatFrequencyData(this.data);
    return getData();
  }

  getData() {
    return this.data;
  }
}
