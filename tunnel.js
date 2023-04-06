

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

let audioBufferSource = null;
let audioGain = null;
let audioGainValue = 0.7;

function playAudioFileFromBuffer(sample) {
    console.log("playAudioFile()");
    const source = audioCtx.createBufferSource();
    audioGain = audioCtx.createGain();
    source.buffer = sample;
    source.connect(audioGain);
    audioGain.connect(audioCtx.destination);
    audioGain.gain.setValueAtTime(audioGainValue, audioCtx.currentTime);
    source.start(0);

    return source;
}

function stopPlayback() {
    audioBufferSource.stop();
}

function setFrequencyFactor(factor) {
    console.log("setFrequencyFactor(" + factor + ")");
    audioBufferSource.playbackRate.value = factor;
}

function setVolumeFactor(factor) {
    console.log("setVolumeFactor(" + factor + ")");
    audioGain.gain.setValueAtTime(audioGainValue * factor, audioCtx.currentTime);
}

// PlaybackSpeed.oninput = () => {
//   source.playbackRate.value = PlaybackSpeed.value;
// };

// "hungarian-train-ride-59446.mp3" is a sample audio file
function playAudioFileFromURL(url) {
    loadSample(url).then((sample) => {
        console.log("playAudioFile() sample: " + sample);
        audioBufferSource = playAudioFileFromBuffer(sample);
        console.log("playAudioFile() source: " + audioBufferSource);
    });
}


