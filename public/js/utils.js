// Reuseable stimuli
// ------------------------

// fixation stimulus
var fixation_cross = "<h1>+</h1>";
var fixation_trial = {
  type: 'single-stim',
  stimuli: ['+'],
  is_html: true,
  timing_response: 2000,
  timing_post_trial: 500,
  choices: 'none'
}


// Functions
// ------------------------

// add results data to the last trial
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

  var trial_results = {
    expected: expected,
    response: response,
    correct: correct
  }
  return trial_results;
}


// display trial feedback, based on response judgement
function displayTrialFeedback(trial_data) {
  if (typeof trial_data.correct !== "undefined") {
    var feedback_text = trial_data.correct ? "Correct!" : "Incorrect";
    var feedback_class = trial_data.correct ? "correct" : "incorrect";
    var feedback_html = '<h3 class="'+feedback_class+'">'+feedback_text+'</h3>';

    // show feedback
    $('#jspsych-feedback').html(feedback_html);
    // hide feedback
    window.setTimeout(function() {
      $('#jspsych-feedback').empty();
    }, 800);
  }
}


// create a block of trials
function createPasatBlock(stimuli, give_feedback) {
  var digit_keycodes = (_.range(48, 58)).concat(_.range(96, 106));
  var give_feedback = (typeof give_feedback === "undefined") ? false : give_feedback;

  var block = {
    type: "multi-stim-multi-response",

    stimuli: formatBlockStimuli(stimuli),
    is_html: true,
    choices: [digit_keycodes, digit_keycodes],

    timing_stim: [1000],
    timing_response: 4000,

    data: {block_stimuli: stimuli},
    on_finish: function() {
      jsPsych.data.addDataToLastTrial(addTrialResults())
      var trial_data = jsPsych.data.getLastTrialData();
      if (give_feedback) {
        displayTrialFeedback(trial_data);
      }
    }
  }

  if (give_feedback) {
    block['response_ends_trial'] = false;
    block['timing_post_trial'] = 1000;
  } else {
    block['response_ends_trial'] = true;
  }

  return block;
}


// create a formatted list of trial stimuli for a block
function formatBlockStimuli(trials) {
  var stimuli = [];
  for (var i = 0; i < trials.length; i++) {
    var trial_stimuli = [];
    trial_html = "<h1>" + trials[i] + "</h1><script>beep.play()</script>";
    trial_stimuli.push(trial_html);
    stimuli.push(trial_stimuli);
  }
  return stimuli;
}
