import { AudioAnalyzer } from './src/AudioAnalyzer';
import { FrequencyBarVisualizer } from './src/FrequencyBarVisualizer';

window.onload = () => {
  let audioAnalyzer,
      frequencyBarVisualizer;
  let fileUpload = document.getElementById('audioFile').addEventListener('change', function(e) {
    if (frequencyBarVisualizer && frequencyBarVisualizer.drawVisual) cancelAnimationFrame(frequencyBarVisualizer.drawVisual) 
    let song = e.target.files[0];
    let url = window.URL.createObjectURL(song);
    let audioSrc = document.getElementById('audioSrc');
    audioSrc.src = url;

    audioAnalyzer = new AudioAnalyzer(audioSrc);
    audioAnalyzer.observable.subscribe(next => {
      frequencyBarVisualizer = new FrequencyBarVisualizer(document.getElementById('audioVis'), audioAnalyzer)
      frequencyBarVisualizer.draw();
    })
  })
}
