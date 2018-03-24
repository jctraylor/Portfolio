var main = function() {
$(function(){
  var cities = [
  			"London",
    		"Tokyo",
    		"Phuket",
    		"Beijing",
    		"Moscow",
    		"Paris",
    		"Barcelona",
    		"Venice",		  
  ];
 
 $('input').autocomplete({source: cities});   
});
};
 
$(document).ready(main);