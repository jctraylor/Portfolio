function makeAdder(x) {
	// parameter `x` is an inner variable

	// inner function `add()` uses `x`, so
	// it has a "closure" over it
	function add(y) {
		return y + x;
	};

	return add;
}
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

console.log('plustOne(3) returns: ' + plusOne( 3 ));		// 4  <-- 1 + 3
console.log('plustOne(41) returns: ' + plusOne( 41 ));		// 42 <-- 1 + 41
console.log('plustTen(13) returns: ' + plusTen( 13 ));		// 23 <-- 10 + 13
// plusOne( 41 );		// 42 <-- 1 + 41
//
// plusTen( 13 );		// 23 <-- 10 + 13