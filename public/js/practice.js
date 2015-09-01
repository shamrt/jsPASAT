// NOTE: Prompt sound used in this file is courtesy SoundBible.com - http://soundbible.com/1252-Bleep.html

var beep = new Howl({urls: ['../audio/bleep.mp3', '../audio/bleep.ogg']});
var practice = [];

// practice block 1 notice
var practice_block_1_notice = {
  type: "text",
  text: "<p>For practice trial #1, you will be given feedback on each item so that you know how you performed the task.</p> <p>Press the <code>enter</code> key when you are ready to begin.</p>",
  cont_key: 13
}
practice.push(practice_block_1_notice);


// practice blocks setup
var digit_keycodes = (_.range(48, 58)).concat(_.range(96, 106));
var block_1_stimuli = [9, 1, 3, 5, 2, 6];
var block_2_stimuli = [6, 4, 5, 7, 2, 8, 4, 5, 9, 3, 6, 9, 2, 7, 3, 8];


// practice block 2 instructions
var practice_block_2_instructions = {
  type: "instructions",
  pages: [
    "Good. OK, you are getting the hang of it. Do you have any questions?",

    "Now we are going to try some more practice but this time the numbers will be presented at a rate of 1 every 3 seconds and the program will not wait for you to give the answer before presenting the next number. Also, you will be asked to report on your experience. This is how the procedure will work when you start the experiment in a moment. Lets practice all of that now, just as it will be in the experiment..."
  ],
  show_clickable_nav: true,
  allow_backward: false
}
practice.push(practice_block_2_instructions);


// practice block 2
var practice_block_2 = {
  type: "multi-stim-multi-response",
  stimuli: createStimuli(block_2_stimuli),
  choices: [digit_keycodes, digit_keycodes],
  is_html: true,
  timing_stim: [1000],
  timing_response: 4000,
  response_ends_trial: false,
  data: {block_stimuli: block_2_stimuli},
  on_finish: function() {
    jsPsych.data.addDataToLastTrial(addTrialResults())
    console.log(jsPsych.data.getLastTrialData())
  }
}
practice.push(fixation_trial);
practice.push(practice_block_2);


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
