/*

----<----<--------<-----------<----------- Train
                  |
                  |
                  |
               Observer

*/

const trainDistanceMeters = 300;
const trainSpeedKmPerHour = 90; // set this ????
const trainSpeedMetersPerSecond = (trainSpeedKmPerHour * 1000) / 3600;
const observerDistanceMeters = 50;

let currentTrainDistanceMeters = trainDistanceMeters;
let currentTimeInSeconds = 0;

let trainSimulationTime = (trainDistanceMeters * 2) / trainSpeedMetersPerSecond;
console.log("**** Simulation Time = " + trainSimulationTime + " seconds ****");

function getTotalSimulationTime() {
  return trainSimulationTime;
}

// calculate the train distance at time t
function calculateTrainDistance(t) {
  let distance = trainDistanceMeters - trainSpeedMetersPerSecond * t;
  console.log(`calculateTrainDistance(${t}) = ${distance}`);
  return distance;
}

// calculate the train velocity at time t towards the observer
function calculateTrainVelocity(t) {
  currentTrainDistanceMeters = calculateTrainDistance(t);
  let tanAlpha = observerDistanceMeters / currentTrainDistanceMeters;
  let alpha = Math.atan(tanAlpha);

  // let cosAlpha = Math.cos(alpha) = trainSpeedMetersPerSecond / trainSpeedTowardTheObserverMetersPerSecond;
  let trainSpeedTowardTheObserverMetersPerSecond =
    trainSpeedMetersPerSecond * Math.cos(alpha);
  console.log(
    `calculateTrainVelocity(${t}) alpha=${alpha} Math.cos(alpha)=${Math.cos(
      alpha
    )} speed=${trainSpeedTowardTheObserverMetersPerSecond}`
  );
  return trainSpeedTowardTheObserverMetersPerSecond;
}

// calculate the doppler frequency at time t

function calculateDopplerFrequencyChangeFactor(t) {
  let trainVelocity = calculateTrainVelocity(t);
  let dopplerFrequencyChangeFactor = 343 / (343 + trainVelocity);
  return dopplerFrequencyChangeFactor;
}

function calculateTrainDistanceFromTheObserver(t) {
  let trainDistance = calculateTrainDistance(t);
  let observerDistanceFromTheTrain = Math.sqrt(
    trainDistance ** 2 + observerDistanceMeters ** 2
  );
  return observerDistanceFromTheTrain;
}

function perceivedAudioVolumeChangeFactor(t) {
  let observerDistanceFromTheTrain = calculateTrainDistanceFromTheObserver(t);
  let initialObserverDistanceFromTheTrain =
    calculateTrainDistanceFromTheObserver(0);

  let volumeChangeFactorNow =
    (initialObserverDistanceFromTheTrain ^ 2) /
    (observerDistanceFromTheTrain ^ 2);

  return volumeChangeFactorNow;
}

