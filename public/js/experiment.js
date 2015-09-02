/**
 * Experiment view blocks for jsPASAT
 */
var
  experiment = [],
  participant_id = getParticipantId();

// prospective survey notice and questions
var prospective_survey_text = "<p>Before we begin, we would like to know what you <strong>expect to experience</strong> on this <strong>working memory task</strong>. The <strong>working memory task</strong> that will follow is identical to the practice trial you have just completed, although it will be longer, approximately 5-10 minutes.</p>";
var prospective_survey_notice = createTextBlock(prospective_survey_text);
experiment.push(prospective_survey_notice);

var prospective_survey = {
    type: 'survey-likert',
    questions: [
      ["In light of your experience so far, how much do you anticipate <strong><u>enjoying</u></strong> the <strong>working memory task</strong>?"],
      ["In light of your experience so far, how well do you <strong><u>anticipate performing</strong></u> during the <strong>working memory task</strong>?"],
      ["In light of your experience so far, how much <strong><u>mental effort</strong></u> do you expect will be required to complete the <strong>working memory task</strong>?"],
      ["In light of your experience so far, how much <strong><u>mental fatigue</strong></u> do you expect to have while completing the <strong>working memory task</strong>?"],
    ],
    labels: [
      [likert_scale_1], [likert_scale_2], [likert_scale_1], [likert_scale_1]],
    intervals: [[7], [7], [7], [7]]
}
experiment.push(prospective_survey);


// pre-experiment notice
var experiment_notice_text = "<p>This was an overview of the task, and you have completed the practice trials.</p> <p>The <strong>working memory</strong> task that will follow is identical to the practice trial you have just completed, altogether it will be 5-10 minutes long.</p> <p>Remember, if you get lost, just jump back in because we can’t stop the experiment once it has started. At several points in the task you will pause briefly to report your experience and then continue with the task.</p> <p>The <strong>working memory</strong> task will now begin.";
var experiment_notice = createTextBlock(experiment_notice_text);
experiment.push(experiment_notice);


// generate the experiment blocks
var condition = generateCondition();
var pasat = generateRandomBlocks(condition);
experiment = experiment.concat(pasat.formatted_stimuli);


// add generated experiment settings to saved data
jsPsych.data.addProperties({
  condition: condition,
  block_order: pasat.block_types,
  participant_id: participant_id,
});


jsPsych.init({
  experiment_structure: experiment,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    postDataToDb(jsPsych.data.getData(), participant_id, 'finish');
  }
});
