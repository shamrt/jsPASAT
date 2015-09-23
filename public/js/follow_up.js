/**
 * Experiment view blocks for jsPASAT
 */
var
  follow_up = [],
  participant_id = getParticipantId();

// post-survey notice
var task_complete_text = "<p><strong>Now you have completed the working memory task.</strong></p> <p>Next you will be asked a series of follow-up questions.</p>";
var task_complete_notice = createTextBlock(task_complete_text);
follow_up.push(task_complete_notice);


// post-survey demographics questions
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
    ["What was your final average at the end of high school?<br><em>(percentage; e.g., <code>75%</code>)</em>"],
    ["Estimate your current university average<br><em>(estimate percentage; e.g., <code>75%</code>)</em>:"],
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
    [jsPASAT['LIKERT_SCALE_1']],
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
follow_up.push(
  demographics_1,
  demographics_2,
  demographics_3,
  demographics_4,
  demographics_5,
  demographics_6
);


// prospective questions notice
var prospective_survey_text = "<p>Now we are going to ask you some questions about <strong>the working memory task</strong> you completed previously – that is, the task where numbers were presented to you on a computer screen one at a time and you had to add them up.</p>";
var prospective_survey_notice = createTextBlock(prospective_survey_text);
follow_up.push(prospective_survey_notice);


// prospective questions
var prospective_survey_questions = {
  type: 'survey-multi-choice',
  questions: [
    ["On this <strong>working memory task</strong>, what was your <u><strong>total amount of mental effort</strong></u>?"],
    ["On this <strong>working memory task</strong>, what was your total amount of <u><strong>discomfort or distress</strong></u>?"],
    ["How much did you <u><strong>enjoy</u></strong> doing this <strong>working memory task</strong>?"],
    ["How well did you <u><strong>perform</u></strong> on the <strong>working memory task</strong>?"],
    ["How much <u><strong>mental fatigue</u></strong> did you have during the <strong>working memory task</strong>?"],
    ["How <u><strong>satisfied</u></strong> are you with your performance on the <strong>working memory task</strong>?"],
    ["How willing would you be to do <strong><u>another</u> working memory task</strong> right now?"],
  ],
  options: [
    [jsPASAT['LIKERT_SCALE_1']],
    [jsPASAT['LIKERT_SCALE_1']],
    [jsPASAT['LIKERT_SCALE_1']],
    [jsPASAT['LIKERT_SCALE_2']],
    [jsPASAT['LIKERT_SCALE_1']],
    [["1<br>Not at all<br>satisfied", "2", "3", "4", "5", "6", "7<br>Completely<br>satisfied"]],
    [["1<br>Not at all<br>willing", "2", "3", "4", "5", "6", "7<br>Definitely<br>willing"]],
  ],
  required: [
    [true],
    [true],
    [true],
    [true],
    [true],
    [true],
    [true],
  ],
  horizontal: true
}
follow_up.push(prospective_survey_questions);


// add generated experiment settings to saved data
jsPsych.data.addProperties({
  participant_id: participant_id,
});


jsPsych.init({
  experiment_structure: follow_up,
  display_element: $('#jspsych-target'),
  on_finish: function() {
    postDataToDb(jsPsych.data.getData(), participant_id, 'finish');
  }
});
