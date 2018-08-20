var main = function() {
  // display the gameboard when user clicks Play button
  $('.play').click(function() {
    $('.gameboard').show('medium');
  });

  // do stuff when user clicks column
  $('.column').click(function(e) {
    var column = e.target.dataset.col;
    $(e.target).addClass('.circle');
  });
};
 
$(document).ready(main);