// NOTE: Prompt sound used in this file is courtesy SoundBible.com - http://soundbible.com/1252-Bleep.html

var beep = new Howl({urls: ['../audio/bleep.mp3', '../audio/bleep.ogg']});
var practice = [];

// practice block 1 notice
var practice_block_1_notice = {
  type: "text",
  text: "<p>For the first practice block, you will be given feedback after each item so that you know how you performed the task.</p> <p>Press the <code>enter</code> key when you are ready to begin.</p>",
  cont_key: 13
}
practice.push(practice_block_1_notice);


// practice block 1
var block_1_stimuli = [9, 1, 3, 5, 2, 6];
var practice_block_1 = createPasatBlock(block_1_stimuli, true);
practice.push(fixation_trial);
practice.push(practice_block_1);


// practice block 2 instructions
var practice_block_2_instructions = {
  type: "instructions",
  pages: [
    "<p>Good. OK, you should be getting the hang of it.</p> <p>Before continuing, let the experimenter know if you have any questions.</p>",

    "<p>Now we are going to try some more practice but this time the numbers will be presented at a rate of 1 every 4 seconds. Also, you will be asked to report on your experience. This is how the procedure will work when you start the experiment in a moment.</p> <p>Let's practice all of that now, just as it will be in the experiment...</p>"
  ],
  show_clickable_nav: true,
  allow_backward: false
}
practice.push(practice_block_2_instructions);


// practice block 2
var block_2_stimuli = [6, 4, 5, 7, 2, 8, 4, 5, 9, 3, 6, 9, 2, 7, 3, 8];
var practice_block_2 = createPasatBlock(block_2_stimuli);
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
