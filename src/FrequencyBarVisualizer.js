export class FrequencyBarVisualizer {
  constructor(canvas, audioAnalyzer) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.audioAnalyzer = audioAnalyzer;
    this.drawVisual;
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.drawVisual = requestAnimationFrame(this.draw);
    let data = this.audioAnalyzer.collectData();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'rgb(61,61,61)';
    let barWidth = this.canvas.width / this.audioAnalyzer.analyzer.frequencyBinCount,
        barHeight,
        x        = 0;

    for (let i = 0; i < this.audioAnalyzer.analyzer.frequencyBinCount; ++i) {
      barHeight = data[i]/2;
      this.ctx.fillStyle = `rgb(40, ${Math.min(barHeight + 100, 255)}, 255)`;
      this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 1;
    }
  }
}
