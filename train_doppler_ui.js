let selected_train_audio_file = "hungarian-train-ride-59446.mp3";

$("#hungarian_train_id").on("click", function () {
  selected_train_audio_file = "hungarian-train-ride-59446.mp3";
  $(this).button("toggle");
});

$("#german_train_id").on("click", function () {
  selected_train_audio_file = "hungarian-train-ride-59446.mp3";
  $(this).button("toggle");
});

$("#french_train_id").on("click", function () {
  selected_train_audio_file = "hungarian-train-ride-59446.mp3";
  $(this).button("toggle");
});

running_simulation = false;

function stopTrainAnimation() {
  $("#train_div_id").removeClass("train_animation");
}

let tunnel_timer = null;

$("#start_simulation_id").on("click", function () {
  console.log("running simulation: WITH TUNNEL!!!");
  running_simulation = true;
  if (tunnel_timer != null) clearTimeout(tunnel_timer);
  stopPlayback();
  playAudioFileFromURL(selected_train_audio_file, true);

  tunnel_timer = setTimeout(function () {
    console.log("running simulation: NO TUNNEL!!!");

    stopPlayback();
    startSimulation();
    playAudioFileFromURL(selected_train_audio_file, false);
    // start the CSS annimation of the train
    $("#train_div_id").addClass("train_animation");
  }, 3000);
});

$("#stop_simulation_id").on("click", function () {
  running_simulation = false;
  stopPlayback();
  stopSimulation();
  // stop the CSS annimation of the train
  stopTrainAnimation();
});

$("#bell_1_id").on("click", function () {
  if (running_simulation) {
    playBell(0.3, 2.0);
  }
});

$("#bell_2_id").on("click", function () {
  if (running_simulation) {
    playBell(0.3, 3.5);
  }
});

$("#mind_the_gap_id").on("click", function () {
  if (running_simulation) {
    playAudioFileFromURL_annoucement("horn.mp3");
  }
});
