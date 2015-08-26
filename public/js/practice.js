// NOTE: Prompt sound used in this file is courtesy SoundBible.com - http://soundbible.com/1252-Bleep.html

var practice = [];

// // pre-block notice
// var pre_practice_block_1 = {
//   type: "text",
//   text: "<p>For practice trial #1, you will be given feedback on each item so that you know how you performed the task.</p> <p>Press <code>enter</code> when you are ready to begin.</p>",
//   cont_key: 13
// }
// practice.push(pre_practice_block_1);

// practice block 1
function beep_stimuli(num) {
  var num = (typeof num !== "undefined" && typeof num == "number" ) ? num : 10;
  var beep_stimulus = "../audio/bleep.mp3";
  var beeps = [];
  for (var i = 0; i < num; i++) {
    beeps.push(beep_stimulus);
  }
  return beeps;
}

function visual_prompt() {
  return "<h1>5</h1>"
}

var practice_block_1 = {
  type: "single-audio",
  stimuli: beep_stimuli(2),
  prompt: visual_prompt(),
  timing_response: 1000,
  timing_post_trial: 3000,
  response_ends_trial: false,
  data: { expected: 5 }
}
practice.push(practice_block_1);

jsPsych.init({
  experiment_structure: practice,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    jsPsych.data.displayData();
  }
  // on_finish: function() {
  //   window.location = 'pasat';
  // }
});
