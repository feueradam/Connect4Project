var WIDTH = 7;
var HEIGHT = 6;

$(document).ready(function(){
	var board = new Position(); //create the game board that is used
	//setGame(board, "37313333717124171162542");  //function to set game up to pre set state
//debugger;
//setGame(board, "2");

//var longVal = new Long(1, 0);
//alert(longVal.toString());


//n = 3;
//alert(n.toString(2));



	$('.board button').click(function(e) { //if a button is clicked
		var column = $(this).closest('tr').find('td').index($(this).closest('td')); //find the column value of it
		if(!board.canPlay(column)){ //if can't play return error
			alert("Pos already taken");
			return;
		}

		checkState(board, column); //make sure no winners
		makePlay(board, column); //play the column
	});
	
	$('.play_again').click(function(e) { //reload the page
	        location.reload();
	});

	$('#player_1').click(function(e){ //toggle player 1
		toggle_player1(board);
	});

	$('#player_2').click(function(e){ //toggle player 2
		toggle_player2(board);
	});
});