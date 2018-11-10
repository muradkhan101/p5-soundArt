export class RoundBarVisualizer {
  constructor(canvas, audioAnalyzer) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.audioAnalyzer = audioAnalyzer;
    this.draw = this.draw.bind(this);
    this.drawVisual = undefined;
  }

  draw() {
    this.ctx.save();;
    let data = this.audioAnalyzer.collectData(256);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillStyle = 'rgb(61,61,61)';
    let barWidth = this.canvas.width / this.audioAnalyzer.analyzer.frequencyBinCount,
        barHeight;
    for (let i = 0; i < this.audioAnalyzer.analyzer.frequencyBinCount; ++i) {
      barHeight = this.map(data[i], 0, this.canvas.height / 2, 0, 255);
      this.ctx.fillStyle = `rgb(40, ${Math.min(data[i]/2 + 100, 254)}, 255)`;

      // const rotate = angle + Math.PI / 2;
      // const x = Math.cos(angle) * 50;
      // const y = Math.sin(angle) * 50;
      this.ctx.fillRect(10, 0, barWidth, barHeight);
      // angle += (2 * Math.PI) / this.audioAnalyzer.analyzer.frequencyBinCount
      this.ctx.rotate((Math.PI / 180) * (390 / this.audioAnalyzer.analyzer.frequencyBinCount));
    }
    this.ctx.restore();
    this.drawVisual = requestAnimationFrame(this.draw);
  }
  map(val, newMin, newMax, oldMin, oldMax) {
    let p = (val - oldMin) / (oldMax - oldMin);
    let v = (newMax - newMin) * p;
    return v + newMin;
  }
}
