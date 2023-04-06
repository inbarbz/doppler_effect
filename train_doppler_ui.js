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

$("#start_simulation_id").on("click", function () {
  running_simulation = true;
  playAudioFileFromURL(selected_train_audio_file);
  startSimulation();
  // start the CSS annimation of the train
  $("#train_div_id").addClass("train_animation");
});

$("#stop_simulation_id").on("click", function () {
  running_simulation = false;
  stopPlayback();
  stopSimulation();
  // stop the CSS annimation of the train
  $("#train_div_id").removeClass("train_animation");
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
    playAudioFileFromURL_annoucement("Mind the Gap London Underground.mp3");
  }
});
