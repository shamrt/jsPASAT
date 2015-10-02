/**
 * Practice view blocks for jsPASAT
 */
var
 practice = [],
 participant_id = getParticipantId();

// practice block 1 notice
var practice_block_1_notice_text = "<p>For the first practice block, you will be given feedback after each item so that you know how you performed the task.</p>";
var practice_block_1_notice = createTextBlock(practice_block_1_notice_text);
practice.push(practice_block_1_notice);


// practice block 1
var practice_block_1 = createPasatBlock(jsPASAT['PRACTICE_BLOCK_1_STIMULI'], {
  give_feedback: true
});
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
var practice_block_2 = createPasatBlock(jsPASAT['PRACTICE_BLOCK_2_STIMULI']);
practice.push(fixation_trial);
practice.push(practice_block_2);
// note: repeats until 1/4 of problems are correctly answered, or 3 failed
// trials
var practice_block_2_attempts = 0,
    skip_experiment = true;


// post-practice notice
var post_practice_notice_text = "<p><strong>OK, that's the end of the practice block.</strong></p> <p>Do you have any questions at all? Remember, this is a challenging task. If you lose your place, just jump right back in. Watch for two numbers in a row and add them up and keep going.</p> <p>At several points in the task you will pause briefly to report your experience and then continue with the task.</p>";
var post_practice_notice = createTextBlock(post_practice_notice_text);
practice.push(post_practice_notice);


// add generated experiment settings to saved data
jsPsych.data.addProperties({
  participant_id: participant_id,
});


jsPsych.init({
  experiment_structure: practice,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    var url_params = {pid: participant_id},
        url_path = 'experiment';
    if (skip_experiment) {
      url_params = _.extend(url_params, {skip_experiment: true});
      url_path = 'follow_up';
    }
    var url = url_path + '?' + $.param(url_params);
    postDataToDb(jsPsych.data.getData(), participant_id, url);
  }
});
