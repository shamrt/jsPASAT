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

var demographics_1 = {
  type: 'survey-multi-choice',
  questions: [
    ["Which year of university are you currently in?"],
    ["What is the highest level of education that you intend to complete?"],
    ["Is English your first language?"],
    ["For how many years have you been speaking English?"],
    ["What is your mother’s highest level of education?"],
  ],
  options: [
    [["1st year undergrad", "2nd year undergrad", "3rd year undergrad", "4th year undergrad", "Graduated", "Post-BA/BSc continuing"]],
    [["Bachelor's degree", "Master's degree", "PhD", "Professional degree (e.g., law)"]],
    [["Yes", "No"]],
    [["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years", "All my life"]],
    [["Less than high school", "High school", "Some college", "BA/BSc degree", "MA/MSc degree", "PhD", "Professional degree (e.g., law)", "Not applicable"]],
  ]
}
var demographics_2 = {
  type: 'survey-text',
  questions: [
    ["What is your mother's occupation?"]
  ]
}
var demographics_3 = {
  type: 'survey-multi-choice',
  questions: [
    ["What is your father’s highest level of education?"]
  ],
  options: [
    [["Less than high school", "High school", "Some college", "BA/BSc degree", "MA/MSc degree", "PhD", "Professional degree (e.g., law)", "Not applicable"]]
  ]
}
var demographics_4 = {
  type: 'survey-text',
  questions: [
    ["What is your father's occupation?"],
    ["What was your final average at the end of high school? <em>(indicate percentage; e.g., <code>75%</code>)</em>"],
    ["Estimate your current university average <em>(estimate percentage; e.g., <code>75%</code>)</em>:"],
  ]
}
var demographics_5 = {
  type: 'survey-multi-choice',
  questions: [
    ["How many <u>statistics</u> courses <strong>in university</strong> have you taken (or are currently taking)?"],
    ["How many <u>statistics</u> courses did you take <strong>in high school</strong>?"],
    ["How many years of <strong>mathematics</strong> (algebra, geometry, calculus, etc.) did you take <strong>in high school</strong>?"],
    ["How many <u>mathematics</u> courses <strong>in university</strong> have you taken (or are currently taking)?"],
    ["On a scale of 1–7, how much do you like math?"],
    ["Have you been previously diagnosed with ADD or AD/HD?"],
  ],
  options: [
    [["None", "1", "2", "3", "4", "5", "More than 5"]],
    [["None", "1", "2", "3", "4", "5", "More than 5"]],
    [["None", "1", "2", "3", "4", "More than 4"]],
    [["None", "1", "2", "3", "4", "5", "More than 5"]],
    [likert_scale_1],
    [["Yes", "No"]],
  ],
  horizontal: true
}
var demographics_6 = {
  type: 'survey-text',
  questions: [
    ["Please indicate what your current (or intended) university major is:"]
  ]
}
experiment.push(
  demographics_5,
  demographics_6
);


// add generated experiment settings to saved data
jsPsych.data.addProperties({
  participant_id: participant_id,
});


jsPsych.init({
  experiment_structure: experiment,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    console.log(jsPsych.data.displayData())
    // postDataToDb(jsPsych.data.getData(), participant_id, 'finish');
  }
});
