let currentTime = 0;
let simulationInterval = null;

function startSimulation() {
  currentTime = 0;
  // execute the inner function every 1000 milliseconds (1 second)
  let simulationIntervalMilliSeconds = 1000;
  simulationInterval = setInterval(function () {
    console.log("tick... " + currentTime);
    advanceSimulation(simulationIntervalMilliSeconds / 1000);
  }, simulationIntervalMilliSeconds);
}

function stopSimulation() {
  clearInterval(simulationInterval);
}

function advanceSimulation(byTime) {
  currentTime += byTime;
  let volumeFactor = perceivedAudioVolumeChangeFactor(currentTime);
  let frequencyFactor = calculateDopplerFrequencyChangeFactor(currentTime);
  setFrequencyFactor(frequencyFactor);
  setVolumeFactor(volumeFactor);
}
