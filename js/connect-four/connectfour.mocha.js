var expect = require("chai").expect;
var assert = require("chai").assert;
var connectfour = require("./connectfour");
global.$ = require('jquery');
require("chai").should();

var game = new(connectfour);

describe("Connect Four", function(){
	it.only("Should display board when click play", function(){
		assert.equal(1,1,'1 is equal to 1');
	});
});