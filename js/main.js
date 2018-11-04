var currentPlayer = "red";
var position = "";
var AI = 0;
$(document).ready(function(){
	//var solver = new NegaMaxSolver();
	currentPlayer = setPosition(currentPlayer, position);
	updateBoard();
	
	$('.board button').click(function(e) {

		var y_pos = $('.board tr').index($(this).closest('tr'));
		var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));
		// 0,0 at top
		//x goes across
		//y goes down

		//make the y position the bottom value
		y_pos = dropToBottom(x_pos, y_pos);
		//if position taken alert
		if (posIsTaken(x_pos,y_pos)){
			alert("Postion already Taken. Please make another choice");
			return;
		}
		var gameOver = gameUpdate(x_pos,y_pos);

		if(AI && !gameOver){
			var x_rand;
			var y_rand;
			do{
				x_rand = randomMove();
				y_rand = dropToBottom(x_rand, 0);
			}while(posIsTaken(x_rand,y_rand))
		
			//alert(x_rand + "," +y_rand);
			gameUpdate(x_rand,y_rand);
		}	

	});

	$('.play_again').click(function(e) {
        location.reload();
    });
});

//update the board, add disc and check for winner
//return if the game is over
function gameUpdate(x_pos, y_pos){

		position +=""+(x_pos+1); //use sequence of columns played to code any valid position
		//add the disk to board
		addDiscToBoard(currentPlayer,x_pos, y_pos);

		//update
		updateBoard();

		
		// //check if winner
		if (checkWinner(x_pos, y_pos)){
		 	alert("winner for: " + currentPlayer);
		 	$('.board button').unbind('click');
			return 1;
		} else if (gameIsDraw()){
			alert("draw");
			$('.board button').unbind('click');
			return 1;
		}

		// //change player
		currentPlayer = changePlayer(currentPlayer);
		return 0;

}