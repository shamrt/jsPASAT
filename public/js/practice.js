// NOTE: Prompt sound used in this file is courtesy SoundBible.com - http://soundbible.com/1252-Bleep.html

var beep = new Howl({urls: ['../audio/bleep.mp3', '../audio/bleep.ogg']});
var practice = [];

// // pre-block notice
// var pre_practice_block_1 = {
//   type: "text",
//   text: "<p>For practice trial #1, you will be given feedback on each item so that you know how you performed the task.</p> <p>Press <code>enter</code> when you are ready to begin.</p>",
//   cont_key: 13
// }
// practice.push(pre_practice_block_1);

// keep track of status
var current_trial_val,
    last_trial_val;


function getExpectedValue(trial_data) {
  var correct = false,
      response
}


function createStimuli(trials) {
  var stimuli = [];
  for (var i = 0; i < trials.length; i++) {
    var trial_stimuli = [];
    for (var j = 0; j < trials[i].length; j++) {
      trial_html = "<h1>" + trials[i][j] + "</h1><script>beep.play()</script>"
      trial_stimuli.push(trial_html);
    }
    stimuli.push(trial_stimuli);
  }
  return stimuli;
}


function createChoicesArray(stimuli) {
  choices = [];
  for (var i = 0; i < stimuli.length; i++) {
    choices.push(_.range(48,58));
  }
  return choices;
}


// practice block 1
var practice_block_1 = {
  type: "multi-stim-multi-response",
  stimuli: createStimuli([[9], [1], [3], [5], [2], [6]]),
  is_html: true,
  timing_response: 1000,
  timing_post_trial: 3000,
  response_ends_trial: false,
  data: { expected: 5 },
  on_finish: function() {
    console.log(jsPsych.data.getLastTrialData())
  }
}
practice_block_1['choices'] = createChoicesArray(practice_block_1['stimuli']);
console.log(practice_block_1)
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
