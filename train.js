// Create an AudioContext object
const audioCtx = new AudioContext();

function loadSample(url) {
  console.log("loadSample() " + url);
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      console.log("loadSample() decode buffer...");
      return audioCtx.decodeAudioData(buffer);
    });
}

let audioBufferSource_train = null;
let audioBufferSource_announcement = null;
let audioGain = null;
let audioGainValue = 0.7;

function playAudioFileFromBuffer(sample, tunnel) {
  console.log("playAudioFile()");
  const source = audioCtx.createBufferSource();
  audioGain = audioCtx.createGain();
  source.buffer = sample;

  if (tunnel) {
    const tunnelFilter = audioCtx.createConvolver();
    tunnelFilter.buffer = sample;
    console.log(
      "IN TUNNEL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    // create EQ filter
    const eqFilter = audioCtx.createBiquadFilter();
    eqFilter.type = "lowshelf";
    eqFilter.frequency.value = 500;
    eqFilter.gain.value = 6;

    // create compressor filter
    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -30;
    compressor.knee.value = 10;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    source.connect(tunnelFilter);
    tunnelFilter.connect(audioGain);
    audioGain.connect(eqFilter);
    eqFilter.connect(compressor);
    compressor.connect(audioCtx.destination);
  } else {
    source.connect(audioGain);
    audioGain.connect(audioCtx.destination);
  }
  audioGain.gain.setValueAtTime(audioGainValue, audioCtx.currentTime);
  source.start(0);

  return source;
}

function stopPlayback() {
  if (audioBufferSource_train != null) {
    audioBufferSource_train.stop();
    audioBufferSource_train.disconnect();
  }
  if (audioBufferSource_announcement != null)
    audioBufferSource_announcement.stop();

  if (audioGain != null)
    audioGain.gain.setValueAtTime(0.00000001, audioCtx.currentTime);
}

function setFrequencyFactor(factor) {
  console.log("setFrequencyFactor(" + factor + ")");
  audioBufferSource_train.playbackRate.value = factor;
}

function setVolumeFactor(factor) {
  console.log("setVolumeFactor(" + factor + ")");
  audioGain.gain.setValueAtTime(audioGainValue * factor, audioCtx.currentTime);
}

// PlaybackSpeed.oninput = () => {
//   source.playbackRate.value = PlaybackSpeed.value;
// };

// "hungarian-train-ride-59446.mp3" is a sample audio file
function playAudioFileFromURL(url, tunnel) {
  loadSample(url).then((sample) => {
    console.log("playAudioFile() sample: " + sample);
    audioBufferSource_train = playAudioFileFromBuffer(sample, tunnel);
    console.log("playAudioFile() source: " + audioBufferSource_train);
  });
}

function playAudioFileFromURL_annoucement(url) {
  loadSample(url).then((sample) => {
    console.log("playAudioFileFromURL_annoucement() sample: " + sample);
    audioBufferSource_announcement = playAudioFileFromBuffer(sample, false);
    console.log(
      "playAudioFileFromURL_annoucement() source: " +
        audioBufferSource_announcement
    );
  });
}
