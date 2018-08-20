var expect = require("chai").expect;
var assert = require("chai").assert;
require("chai").should();

describe("Solution", function(){
	it("should return an anagram from a list of 1", function(){
		var result = anagrams('abba', ['baab']);
		assert.equal(result,['baab'],'anagram returned');
	});
});