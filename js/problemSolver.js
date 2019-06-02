var main = function() {
	$('input[name="sum"]').popover({
		trigger: 'manual',
		content: 'The sum must be a number greater than 0 and greater than the provided difference.',
		placement: 'top'
	});
	$('input[name="diff"]').popover({
		trigger: 'manual',
		content: 'The difference must be a number greater than 0 and less than the provided sum.',
		placement: 'bottom'
	});
	let answerProvided = false;
	let formIsValid = false;
	let validationErrorsCount = 0;
  // process input when submit is clicked
  $('.submit').click(function() {
	  let sum = Number($('input[name="sum"]').val());
	  let diff = Number($('input[name="diff"]').val());

	  validateForm(sum, diff);

	  formIsValid = validationErrorsCount == 0 ? true : false;

    if (formIsValid) {
		  // determine the answer
	    let answers = getAnswers(sum, diff);
	    if (answers.length) {
		    answerProvided = true;
		    // alert(`The smaller number is ${answers[0]}\nThe larger number is ${answers[1]}`);
		    $('.modal-title').text('Here Is Your Answer!');
		    $('.modal-body').append(`<p>The larger number is: ${answers[0]}<br>The smaller number is: ${answers[1]}</p>`);
	    }
	    else {
	      // alert('I\'m sorry, I don\'t think there is a valid solution!');
		    $('.modal-title').text('Double Check Provided Values!');
		    $('.modal-body').append('<p>I was unable to find a valid solution! Are you trying to trick me?</p>');
      }
	    $('#myModal').modal('show');
    }
  });

  // reset page and modal content when modal is closed (only reset page content if valid
	$('.close-modal').click(function () {
		// need to reset button state somewhere in here too - it's active state after being clicked
		clearModalContent();
		if (answerProvided) {
			resetInputs();
		}
		$('#myModal').modal('hide');
	});

	function clearModalContent () {
		$('.modal-body').children().remove();
		$('.modal-title').text('');
	}

	function resetInputs () {
		$('input').val('');
		answerProvided = false;
	}

	function validateIndividualInput (selector) {
		// if input is empty or negative it is not valid
		numVal = Number($(selector).val());
		if ($(selector).val().length == 0 || numVal <= 0  || isNaN(numVal)) {
			$(selector).addClass('invalid');
			$(selector).popover('show');
			// if any input is invalid the form is invalid
			validationErrorsCount += 1;
		}
		else {
			// individual validation passes so remove red border and popover
			$(selector).removeClass('invalid');
			$(selector).popover('hide');
		}
	}

	function validateForm (sum, diff) {
		// validationErrorsCount = 0;
		validateIndividualInput('input[name="sum"]');
		validateIndividualInput('input[name="diff"]');
		if (sum <= diff) {
			$('input[name="sum"]').addClass('invalid');
			$('input[name="diff"]').addClass('invalid');
			$('input[name="sum"]').popover('show');
			$('input[name="diff"]').popover('show');
			validationErrorsCount += 1;
		}
	}

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
    return winners.sort(function (a, b) {
    	return b-a;
    });

  }

};
 
$(document).ready(main);