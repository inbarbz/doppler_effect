/*

----<----<--------<-----------<----------- Train
                  |
                  |
                  |
               Observer

*/

const trainDistanceMeters = 300;
const trainSpeedKmPerHour = 60; // set this ????
const trainSpeedMetersPerSecond = (trainSpeedKmPerHour * 1000) / 3600;
const observerDistanceMeters = 50;

let currentTrainDistanceMeters = 1000;
let currentTimeInSeconds = 0;

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
// f' = f ( v + v_r ) / ( v + v_s )
// f'/f = 343 / ( 343 + v_s )
// v_r = observer velocity (which is 0)
// v_s = train velocity
// v is the speed of sound waves in the medium (343 m/s in air)
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
