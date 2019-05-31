var main = function() {
  // process input when submit is clicked
  $('.submit').click(function() {
    // $('.answer-value').show('medium');
    let sum = Number($('input[name="sum"').val());
    let diff = Number($('input[name="diff"').val());
    if (sum <= 0 || diff <= 0) {
	    alert('You must provide a number greater than zero for both difference and sum. Please enter valid values.')
    }
    else if (sum <= diff) {
	    alert('The difference cannot be greater than or equal to the sum. Please enter valid values.')
    }
    else {
	    let answers = getAnswers(sum, diff);
	    if (answers.length) {
		    alert(`The smaller number is ${answers[0]}\nThe larger number is ${answers[1]}`);
	    }
	    else {
	      alert('I\'m sorry, I don\'t think there is a valid solution!');
      }
    }
  });

  function getAnswers (sum, diff) {
    let possibleValues = [];
    let winners = [];
    for (let i = 1; i <= sum; i++) {
      possibleValues.push(i);
    }
    possibleValues.forEach(function (num, index, arr) {
      if (num + arr[index+diff] === sum) {
        winners = [num, arr[index+diff]];
      }
    });
    return winners.sort();

  }
};
 
$(document).ready(main);