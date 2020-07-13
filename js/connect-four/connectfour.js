var main = function () {
	// display the gameboard when user clicks Play button
	// $('.play').click(function() {
	//   $('.gameboard').show('medium');
	// });
	let cell = (col, row) => {
		return `<div class="cell" data-col=${col} data-row=${row} data-value="open"><div class="circle"></div> </div>`
	};

	let showBoard = () => {
		for (i = 0; i < 7; i++) {
			$('.gameboard').append(`<div class="column" data-col=${i}>`)
		}

		$('.column').each(function () {
			let column = $(this).attr('data-col');
			for (i = 0; i < 6; i++) {
				$(this).append(cell(column, i));
			}
		});

		$('.gameboard').show('medium');
	};

	showBoard();

	let redColor = '#ff1a06';
	let yellowColor = '#ffc733';

	// do stuff when user clicks column
	$('.column').click(function (e) {
	    let $gameboard = $(e.target).parent();
	    let turnColor = $gameboard.attr('data-turn');
	    let cssColor = turnColor === 'red' ? redColor : yellowColor;
	    let nextCssColor = turnColor === 'yellow' ? redColor : yellowColor;
		var column = e.target.dataset.col;
        let $circle = $(`.column[data-col=${column}] div[data-value="open"]:last div.circle`);
        $circle.parent().attr('data-value', turnColor);
        let row = $circle.parent().attr('data-row');

        // if checkForWinner returns true we have a winner - show modal
        if (checkForWinner(turnColor, row, column)) {
        	setTimeout(() => {
				// window.alert(`${turnColor} wins!`);
				// modal approach
				// $('.modal-title').text('We Have a Winner!');
				$('.modal-body').append(`<p>Team <strong style = "color: ${cssColor}">${turnColor}</strong> wins!</p>`);
				$('#winnerModal').modal('show');
				return;
			}, 250);
		}
        // cycle the data-turn value on the gameboard to the other team
        let switchTo = $gameboard.attr('data-turn') === 'red' ? 'yellow' : 'red';
        $(e.target).parent().attr('data-turn', switchTo);
        $('.instructionText strong').text(switchTo).css('color', nextCssColor);
	});

	// reset the board when user closes modal
	$('.close-modal').click( () => {
		// set reds cells back to open
		$('.cell[data-value="red"]').each((index, el) => {
			$(el).attr('data-value', 'open');
		});
		// set yellow cells back to open
		$('.cell[data-value="yellow"]').each((index, el) => {
			$(el).attr('data-value', 'open');
		});
		// remove winner class from winning cells
		$('.winner').removeClass('winner');
		// start over with red team first
		$('.gameboard').attr('data-turn', 'red');
		$('.instructionText strong').text('red').css('color', '#ff1a06');
		// remove modal text
		$('.modal-body p').remove();
	});

	let checkForWinner = (turnColor, row, column) => {
		let winner = false;
		winner = checkRowOrColumnForWinner('row', row, turnColor);
		if (!winner) {
			winner = checkRowOrColumnForWinner('col', column, turnColor);
		}
		if (!winner) {
			winner = checkDiagonalsForWinner(getConnectedDiagonals(row,column), turnColor);
		}
		return winner;
	};

	let checkRowOrColumnForWinner = (rowOrColumn, rowOrColumnValue, turnColor) =>{
		let connectedCells = [];
		$(`div[data-${rowOrColumn}=${rowOrColumnValue}]`).each((index, element) => {
			($(element).attr('data-value') === turnColor) ? connectedCells.push($(element)) : connectedCells = [];
			// break out of each loop if we have a winner
			if (connectedCells.length > 3) {
				highlightWinningCells(connectedCells);
				return false;
			}
		});
		return connectedCells.length > 3;
	};

	let checkDiagonalsForWinner = (cells, turnColor) => {
		let connectedCells = [];
		for (let arr of cells) {
			for (let element of arr) {
				(element.attr('data-value') === turnColor) ? connectedCells.push($(element)) : connectedCells = [];
				// break out of this loop if we have a winner
				if (connectedCells.length > 3) {
					break;
				}
			}
			// break out of the larger loop and highlight winner if we have one
			if (connectedCells.length > 3) {
				highlightWinningCells(connectedCells);
				break;
			}
		}
		return connectedCells.length > 3;
	};

	let getConnectedDiagonals = (row, column) => {
		// both arrays of diagonal elements will start from left to right
		// asc moves up as it goes to the right and desc moves down
		// both arrays will be added to diagonal cells if we get 2 of them worth checking
		let diagonalCells = [];
		// set starting row and column for L to R desc diagonal
		let LtoR_descStartRow = row - column;
		// if < 0 set to 0
		LtoR_descStartRow = LtoR_descStartRow < 0 ? 0 : LtoR_descStartRow;
		let LtoR_descStartCol = column - row;
		// if < ) set to 0
		LtoR_descStartCol = LtoR_descStartCol < 0 ? 0 : LtoR_descStartCol;
		let LtoR_descending = [];
		// build the left to right descending diagonal array of elements
		for (i=LtoR_descStartCol; i < 7; i++) {
			let $cell = $(`div[data-col=${i}][data-row=${LtoR_descStartRow}]`);
			if ($cell.length) {
				LtoR_descending.push($cell);
			}
			LtoR_descStartRow++;
		}
		// set starting row and column for L to R asc diagonal
		let LtoR_ascStartRow = row + column;
		// if > 5 set to 5
		LtoR_ascStartRow = LtoR_ascStartRow > 5 ? 5 : LtoR_ascStartRow;
		// start column is more complicated so we'll use a switch statement
		let LtoR_ascStartCol;
		switch (row) {
			case '5':
				LtoR_ascStartCol = column;
				break;
			case '4':
				LtoR_ascStartCol = column - 1;
				// set to 0 if < 0
				LtoR_ascStartCol = LtoR_ascStartCol < 0 ? 0 : LtoR_ascStartCol;
				break;
			case '3':
				LtoR_ascStartCol = column - 2;
				// set to 0 if < 0
				LtoR_ascStartCol = LtoR_ascStartCol < 0 ? 0 : LtoR_ascStartCol;
				break;
			case '2':
				LtoR_ascStartCol = column - 3;
				// set to 0 if < 0
				LtoR_ascStartCol = LtoR_ascStartCol < 0 ? 0 : LtoR_ascStartCol;
				break;
			case '1':
				LtoR_ascStartCol = column - 4;
				// set to 0 if < 0
				LtoR_ascStartCol = LtoR_ascStartCol < 0 ? 0 : LtoR_ascStartCol;
				break;
			case '0':
				LtoR_ascStartCol = column - 5;
				// set to 0 if < 0
				LtoR_ascStartCol = LtoR_ascStartCol < 0 ? 0 : LtoR_ascStartCol;
		}
		let LtoR_ascending = [];
		// build the left to right ascending diagonal array of elements
		for (i=LtoR_ascStartCol; i < 7; i++) {
			let $cell = $(`div[data-col=${i}][data-row=${LtoR_ascStartRow}]`);
			if ($cell.length) {
				LtoR_ascending.push($cell);
				LtoR_ascStartRow--;
			}
		}
		// add the ascending diagonals to the array if length is at least 4
		if (LtoR_ascending.length > 3) {
			diagonalCells.push(LtoR_ascending);
		}
		// add the descending diagonals to the array if length is at least 4
		if (LtoR_descending.length > 3) {
			diagonalCells.push(LtoR_descending);
		}
		return diagonalCells;
	};

	let highlightWinningCells = (winningCells) => {
		winningCells.forEach((element) => {
			$(element).children().addClass('winner')//.css('border', '7px solid rgb(76, 219, 119');
		});
	};
};

$(document).ready(main);