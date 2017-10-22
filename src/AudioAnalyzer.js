import { Observable } from 'rxjs/Observable';

export class AudioAnalyzer {
  constructor(source) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyzer = this.audioCtx.createAnalyser();
    this.source;
    this.data;

    this.observable = Observable.create(obs => {
      // Set up audio input
      this.source = this.audioCtx.createMediaElementSource(source);

      // Pass data through analyzer
      this.source.connect(this.analyzer);
      this.analyzer.connect(this.audioCtx.destination);
      obs.next({done: true})
    });
  }

  collectData(size = 2048, type='b') {
    this.analyzer.fftSize = 2048;
    let bufferLength = this.analyzer.frequencyBinCount;
    this.data = type === 'b' ? new Uint8Array(bufferLength) : new Float32Array(bufferLength);
    if (type === 'b') this.analyzer.getByteFrequencyData(this.data);
    else this.analyzer.getFloatFrequencyData(this.data);
    return this.getData();
  }

  getData() {
    return this.data;
  }
}
