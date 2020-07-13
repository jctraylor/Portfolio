// function number2words(n, existingString = ''){
// 	if (typeof n !== 'number' || n < 0 || n > 999999) {
// 		return 'NaN';
// 	}
// 	else {
// 		let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
// 		let tens = ['','','twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
// 		let order = ['zeros','ones','tens','hundred', 'thousand', 'hundred thousand'];
// 		let nArray = n.toString().split('');
// 		let numLength = nArray.length;
//
// 		let buildString = existingString;
//
// 		switch (numLength) {
// 			case 1:
// 			case 2:
// 				// the number is less than 100
// 				// if it's less than twenty grab the text for it from numbers array
// 				if (n < 20) {
// 					buildString += numbers[n];
// 				}
// 				// it's an even multiple of ten so add the value from tens array
// 				else {
// 					buildString += tens[nArray[0]];
// 					// if not divisible by 10 add '-' and the ones value to the string
// 					if (n % 10 > 0) {
// 						buildString += `-${numbers[nArray[1]]}`;
// 					}
// 				}
// 				break;
// 			case 3:
// 				// the number is between 100 and 999
// 				// add the first stringified number to the string
// 				buildString += `${numbers[nArray[0]]} ${order[numLength]}`;
// 				if (n % 100 > 0) {
// 					buildString += ' ';
// 					return number2words(Number(nArray.slice(1,3).join('')), buildString);
// 				}
// 				break;
// 			case 4:
// 				// this number is between 1,000 and 9,999
// 				// add the first stringified number to the string
// 				buildString += `${numbers[nArray[0]]} ${order[numLength]}`;
// 				if (n % 1000 > 0) {
// 					buildString += ' ';
// 					return number2words(Number(nArray.slice(1,4).join('')), buildString)
// 				}
// 		}
// 		return buildString;
// 	}
// }

function number2words(n, existingString = '', noMoreZeroes=false){
	if (typeof n !== 'number' || n < 0 || n > 999999) {
		return 'NaN';
	}
	else {
		let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
		let tens = ['','','twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
		let order = ['zeros','ones','tens','hundred', 'thousand', 'hundred thousand'];
		let nArray = n.toString().split('');
		let numLength = nArray.length;

		let buildString = existingString;

		while (nArray.length) {
			// if the current number is a zero and the full number isn't 0 drop that from the array and call the function again
			if (nArray[0] === 0 && noMoreZeros) {
				return number2words(Number(nArray.slice(1,nArray.length).join('')), buildString, true);
			}
			// if it's less than twenty grab the text for it from numbers array
			if ((n === 0 && !noMoreZeroes) || (n > 0 && n < 20)) {
				buildString += numbers[n];
				// clear array contents and you're done
				nArray = [];
			}
			else if (n < 100) {
				buildString += tens[nArray[0]];
				// if not divisible by 10 add '-' and the ones value to the string
				if (n % 10 > 0) {
					buildString += `-${numbers[nArray[1]]}`;
				}
				nArray = [];
			}
			else {
				// the number is between 100 and 999,999
				// add the first stringified number to the string
				if (n < 10000) {
					buildString += `${numbers[nArray[0]]} ${order[numLength]}`;
				}
				else if (n < 100000) {
					// we need a value from the tens array
					if (nArray[0] >= 2) {
						buildString += `${tens[nArray[0]]}`
					}
					else if (nArray[0] === '1') {
						buildString += `${numbers[Number(nArray.slice(0,2).join(''))]} thousand `;
						return number2words(Number(nArray.slice(2,nArray.length).join('')), buildString, true);
					}
					if (n % 10000 === 0 || nArray[1] === '0') {
						buildString += ` ${order[numLength-1]}`;// ${order[numLength-1]}`
					}
				}
				else {
					if (nArray[1] === '0' || nArray[2] === '0') {
						buildString += `${numbers[nArray[0]]} ${order[nArray.length-1]} `;
						return number2words(Number(nArray.slice(2,nArray.length).join('')), buildString, true);
					}
					else {
						buildString += `${numbers[nArray[0]]} ${order[nArray.length-3]}`;
					}
				}
				if (n % Math.pow(10, numLength-1) > 0) {
					lastStringInTens = tens.findIndex((el)=> {return el === buildString.split(/\W/g).pop()});
					buildString += lastStringInTens < 0 ? ' ' : '-';
					return number2words(Number(nArray.slice(1,nArray.length).join('')), buildString, true);
				}
				nArray =[];
			}
		}
		return buildString.trim();
	}
}

console.log(number2words(211627));