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


function addTrialResults() {
  var expected,
      response,
      correct,
      current_trial = jsPsych.data.getLastTrialData(),
      current_index = current_trial.trial_index;

  // nothing expected on first trial
  if (current_index != 0) {
    var previous_index = current_index - 1,
        current_value = current_trial.block_stimuli[current_index],
        previous_value = current_trial.block_stimuli[previous_index];

    // expected (correct) response for the last trial
    expected = current_value + previous_value;

    // response given in the last trial
    var key_presses = eval(current_trial.key_press);
    var digit_presses = [];
    for (var i = 0; i < key_presses.length; i++) {
      var key_press = key_presses[i];
      if (key_press !== -1) {
        // normalize keycode from numpad to numrow
        if (key_press >= 96 && key_press <= 105) {
          key_press = key_press - 48;
        }

        var digit = String.fromCharCode(key_press);
        digit_presses.push(digit);
      }
    }
    response = parseInt(digit_presses.join(''));

    // was the response given as expected (correct)?
    correct = (expected === response) ? true : false;
  }

  return {
    expected: expected,
    response: response,
    correct: correct
  }
}


function createStimuli(trials) {
  var stimuli = [];
  for (var i = 0; i < trials.length; i++) {
    var trial_stimuli = [];
    trial_html = "<h1>" + trials[i] + "</h1><script>beep.play()</script>";
    trial_stimuli.push(trial_html);
    stimuli.push(trial_stimuli);
  }
  console.log(stimuli)
  return stimuli;
}


// fixation stimulation
var fixation_cross = "<h3>+</h3>";
var fixation_trial = {
  type: 'single-stim',
  stimuli: ['+'],
  is_html: true,
  timing_response: 2000,
  timing_post_trial: 500,
  choices: 'none'
}
practice.push(fixation_trial)


// block setup
var digit_keycodes = (_.range(48, 58)).concat(_.range(96, 106));
var block_stimuli = [9, 1, 3, 5, 2, 6];


// practice block 1
var practice_block_1 = {
  type: "multi-stim-multi-response",
  stimuli: createStimuli(block_stimuli),
  choices: [digit_keycodes, digit_keycodes],
  // prompt: "<div style='position:relative; bottom:20px'>+</div>",
  is_html: true,
  timing_stim: [1000],
  timing_response: 4000,
  response_ends_trial: false,
  data: {block_stimuli: block_stimuli},
  on_finish: function() {
    jsPsych.data.addDataToLastTrial(addTrialResults())
    console.log(jsPsych.data.getLastTrialData())
  }
}
practice.push(practice_block_1);


jsPsych.init({
  experiment_structure: practice,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    console.log(jsPsych.data.displayData())
  }
  // on_finish: function() {
  //   window.location = 'pasat';
  // }
});
