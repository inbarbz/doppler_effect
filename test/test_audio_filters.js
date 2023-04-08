let recorder = null;

$("#test_tunnel_affect").on("click", function () {
  console.log("test_tunnel_affect()");
  playAudioFileFromURL("400 Hz Test Tone.mp3", true);
  audioCtx.resume();
  setTimeout(function () {
    console.log("lastNode = " + lastNode);
    recorder = new Recorder(lastNode);
    recorder.record();
  }, 2000);
  setTimeout(function () {
    recorder.stop();
    stopPlayback();
    recorder.exportWAV(
      (blob) =>
        (document.querySelector("audio").src = URL.createObjectURL(blob))
    );
  }, 5000);
});

let interval = null;

$("#test_original_sine").on("click", function () {
  console.log("test_original_sine()");
  playAudioFileFromURL("400 Hz Test Tone.mp3", false);
  audioCtx.resume();
  setTimeout(function () {
    console.log("lastNode = " + lastNode);
    recorder = new Recorder(lastNode);
    recorder.record();
  }, 2000);
  setTimeout(function () {
    recorder.stop();
    recorder.exportWAV(
      (blob) =>
        (document.querySelector("audio").src = URL.createObjectURL(blob))
    );
    clearInterval(interval);
  }, 3000);
});

$("#test_doppler_frequency_affect").on("click", function () {
  let frequencyFactor = 1.0;
  let volumeFactor = 1.0;
  console.log("test_doppler_frequency_affect()");
  playAudioFileFromURL("400 Hz Test Tone.mp3", false);
  audioCtx.resume();
  setTimeout(function () {
    console.log("lastNode = " + lastNode);
    recorder = new Recorder(lastNode);
    recorder.record();
    interval = setInterval(function () {
      setFrequencyFactor(frequencyFactor);
      setVolumeFactor(volumeFactor);
      frequencyFactor += 0.1;
      volumeFactor += 0.1;
    }, 1000);
  }, 2000);
  setTimeout(function () {
    recorder.stop();
    recorder.exportWAV(
      (blob) =>
        (document.querySelector("audio").src = URL.createObjectURL(blob))
    );
    clearInterval(interval);
    stopPlayback();
  }, 10000);
});
