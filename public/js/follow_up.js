/**
 * Experiment view blocks for jsPASAT
 */
var
  experiment = [],
  participant_id = getParticipantId();

// prospective survey notice and questions
var task_complete_text = "<p><strong>Now you have completed the working memory task.</strong></p> <p>Next you will be asked a series of follow-up questions.</p>";
var task_complete_notice = createTextBlock(task_complete_text);
experiment.push(task_complete_notice);

var demographics_questions = [];
{
    type: 'survey-likert',
    questions: [
      [
        "Which year of university are you currently in?",
        "What is the highest level of education that you intend to complete?"
      ],
      [
        "Is English your first language?",
        "If no, for how many years have you been speaking English?"
      ]
    ],
    labels: [
      [
        [
          "1st year undergrad",
          "2nd year undergrad",
          "3rd year undergrad",
          "4th year undergrad",
          "Graduated",
          "Post-BA/BSc continuing",
        ],
        [
          "Bachelor's degree",
          "Master's degree",
          "PhD degree",
          "Professional degree (e.g., law)",
        ]
      ],
      [likert_scale_2]
    ],
    intervals: [[6, 4], [7], [7], [7], [7]]
}
experiment.push(prospective_survey);


// pre-experiment notice
var experiment_notice_text = "<p>This was an overview of the task, and you have completed the practice trials.</p> <p>The <strong>working memory</strong> task that will follow is identical to the practice trial you have just completed, altogether it will be 5-10 minutes long.</p> <p>Remember, if you get lost, just jump back in because we can’t stop the experiment once it has started. At several points in the task you will pause briefly to report your experience and then continue with the task.</p> <p>The <strong>working memory</strong> task will now follow.";
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
