import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

let sound;
let fft;
let height;
let width;

export let sketch = (p) => {
  p.preload = () => {
    sound = p.loadFile('./assets/SadMachineTone.mp3')
  }

  p.setup = () => {
    height = 400;
    width = 400;
    var canvas = p.createCanvas(height, width);
    fft = new p.FFT();

  }

  p.draw = () => {
    p.background(0);

    var spectrum = fft.analyze();
    p.noStroke();
    p.fill(0,255,0); // spectrum is green
    for (var i = 0; i< spectrum.length; i++){
      var x = p.map(i, 0, spectrum.length, 0, width);
      var h = -height + p.map(spectrum[i], 0, 255, height, 0);
      p.rect(x, height, width / spectrum.length, h )
    }

    var waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(255,0,0); // waveform is red
    p.strokeWeight(1);
    for (var i = 0; i< waveform.length; i++){
      var x = p.map(i, 0, waveform.length, 0, width);
      var y = p.map( waveform[i], -1, 1, 0, height);
      p.vertex(x,y);
    }
    p.endShape();
  }
}
