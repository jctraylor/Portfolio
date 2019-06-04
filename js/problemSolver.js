var main = function() {
	let answerProvided = false;
	let formIsValid = false;
	let validationErrorsCount = 0;
	let $sum = $('input[name="sum"]');
	let $diff = $('input[name="diff"]');
	$sum.popover({
		trigger: 'manual',
		content: 'The sum must be a number greater than 0 and greater than the provided difference.',
		placement: 'top'
	});
	$diff.popover({
		trigger: 'manual',
		content: 'The difference must be a number greater than 0 and less than the provided sum.',
		placement: 'bottom'
	});
  // process input when submit is clicked
  $('.submit').click(function() {
	  let sum = Number($sum.val());
	  let diff = Number($diff.val());

	  validateForm(sum, diff);

	  formIsValid = validationErrorsCount == 0 ? true : false;

    if (!formIsValid) {
    	// hide/show popovers as needed
	    if ($sum.hasClass('invalid')) {
	    	$sum.popover('show');
	    }
	    else {
		    $sum.popover('hide');
	    }
	    if ($diff.hasClass('invalid')) {
		    $diff.popover('show');
	    }
	    else {
		    $diff.popover('hide');
	    }
    }
    else {
		  // determine the answer
	    let answers = getAnswers(sum, diff);
	    // form is valid, hide popovers
	    $sum.popover('hide');
	    $diff.popover('hide');
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
		$sum.focus();
	}

	function validateIndividualInput ($input) {
		// if input is empty or negative it is not valid
		numVal = Number($input.val());
		if ($input.val().length === 0 || numVal <= 0  || isNaN(numVal)) {
			$input.addClass('invalid');
			validationErrorsCount += 1;
		}
		else {
			// individual validation passes so remove red border and popover
			$input.removeClass('invalid');
		}
	}

	function validateForm (sum, diff) {
		validationErrorsCount = 0;
		validateIndividualInput($sum);
		validateIndividualInput($diff);
		if (sum <= diff) {
			$sum.addClass('invalid');
			$diff.addClass('invalid');
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