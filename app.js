window.onload = () => {
  let audioAnalyzer,
      frequencyBarVisualizer;
  navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(src => {
    audioAnalyzer = new AudioAnalyzer(src);
    audioAnalyzer.connectNewSource().then(next => {
      frequencyBarVisualizer = new RoundBarVisualizer(document.getElementById('audioVis'), audioAnalyzer)
      frequencyBarVisualizer.draw();
    })
  })
  let fileUpload = document.getElementById('audioFile').addEventListener('change', function(e) {
    let song = e.target.files[0];
    let url = window.URL.createObjectURL(song);
    let audioSrc = document.getElementById('audioSrc');
    audioSrc.src = url;

    if (!audioAnalyzer) {
      audioAnalyzer = new AudioAnalyzer(audioSrc);
      audioAnalyzer.connectNewSource().then(next => {
        frequencyBarVisualizer = new RoundBarVisualizer(document.getElementById('audioVis'), audioAnalyzer)
        frequencyBarVisualizer.draw();
      })
    } else {
      audioAnalyzer.updateSource(audioSrc);
      audioAnalyzer.connectNewSource().then(next => {
        frequencyBarVisualizer = new RoundBarVisualizer(document.getElementById('audioVis'), audioAnalyzer)
        frequencyBarVisualizer.draw();
      })
    }
  })
}
