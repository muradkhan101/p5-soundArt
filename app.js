import { AudioAnalyzer } from './src/AudioAnalyzer';
import { FrequencyBarVisualizer } from './src/FrequencyBarVisualizer';

window.onload = () => {
  let fileUpload = document.getElementById('audioFile').addEventListener('change', function(e) {
    let song = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(song);
    fileReader.onload = (ev) => {
      console.log(ev);
      console.log(ev.target.result);
    }
  })
}
