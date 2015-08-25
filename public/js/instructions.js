// jsPsych blocks
// --------------

var instructions = [];

var instructionBlock = function(text, practice_button) {
var proceed_text = "<p>Press enter to proceed.</p>";
if (practice_button) {
  proceed_text = "<button type='button' id='ready-to-practice'>I'm ready to practice adding up numbers</button>"
}

var text_block = {
  type: "text",
  text: "<p>" + text + "</p>" + proceed_text,
  cont_key: 13
};
instructions.push(text_block);
}


instructionBlock("<p>This is a <strong>working memory task</strong>. In this working memory task, you will be presented with a series of single or double digit numbers on the computer screen.</p>");

instructionBlock("<p>These numbers will be presented at the rate of one every 3 seconds. After you see the first two numbers, add them up, and enter the correct number on the computer keyboard.</p>");

instructionBlock("<p>When you see the next number, add it to the one you saw on the computer screen right before it. Continue to add the next number to each preceding one.</p>");

instructionBlock("<p>Remember, you are not being asked to give a running total, but rather the sum of the last two numbers that were shown on the computer screen.</p>");

instructionBlock("<p>For example, if the first two numbers were <code>5</code> and <code>7</code>, you would type <code class='typed'>12</code>.</p> <p>If the next number was <code>3</code>, you would type <code class='typed'>10</code> because you would add <code>7</code> from the previous screen and <code>3</code>, the most recent number presented.</p> <p>Then if the next number was <code>2</code>, you would type <code class='typed'>5</code> because you would add <code>3</code> from the previous screen and <code>2</code>, the most recent number presented.</p>");

instructionBlock("<p>This is a challenging task. If you lose your place, just jump right back in. Watch for two numbers in a row and add them up and keep going.</p> <p>At several points in the task you will pause briefly to report your experience and then continue with the task.</p> <p>First lets just practice adding up the numbers as they are presented.</p>", true)


jsPsych.init({
experiment_structure: instructions,
display_element: $('#jspsych-target')
});


// jQuery
// ------

$(document).on('click', '#ready-to-practice', function() {
window.location='practice';
});
