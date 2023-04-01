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

$("#start_simulation_id").on("click", function () {
  playAudioFileFromURL(selected_train_audio_file);
  startSimulation();
});

$("#stop_simulation_id").on("click", function () {
  stopPlayback();
  stopSimulation();
});
