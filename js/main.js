var WIDTH = 7;
var HEIGHT = 6;

$(document).ready(function(){
	var board = new Position();
	setGame(board, "271713432331713132");
	// for(i=0;i<WIDTH;i++){
	// 	val = 3 + (1-2*(i%2))*Math.floor((i+1)/2);
	// 	alert("i: " + i + " value: " + val);
	// }


	$('.board button').click(function(e) {
		var column = $(this).closest('tr').find('td').index($(this).closest('td'));
		if(!board.canPlay(column)){
			alert("Pos already taken");
			return;
		}

		checkState(board, column);
		makePlay(board, column);
	});
	
	$('.play_again').click(function(e) {
	        location.reload();
	});

	$('#player_1').click(function(e){
		toggle_player1(board);
	});

	$('#player_2').click(function(e){
		toggle_player2(board);
	});
});