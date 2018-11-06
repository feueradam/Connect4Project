

// //check for a winner, return true if winner found, only need to check the spaces next to disc placed
// function checkWinner(x_pos, y_pos){
// 	//check the number of dics in a row in both directions, minus one as count the disc placed twices
// 	var horizontalWin = leftWin(x_pos,y_pos) + rightWin(x_pos,y_pos) - 1;
// 	var backslashWin = upLeftWin(x_pos,y_pos) + downRightWin(x_pos,y_pos) - 1;
// 	var fowardslashWin = downLeftWin(x_pos,y_pos) + upRightWin(x_pos,y_pos) - 1;
// 	if ((verticalWin(x_pos,y_pos) === 4) || (horizontalWin === 4) || (backslashWin === 4) || (fowardslashWin === 4)){ //if any direction has 4, then winner
// 		return true;
// 	} else {
// 		return false;
// 	}

// }

// function verticalWin(x_pos, y_pos){
// 	your_move = board[y_pos][x_pos];
// 	below_piece = "null"; //ABOVE PIECE ALWAYS 0 - as you never have any pieces above the one you just placed

// 	if (y_pos != 5){
// 		below_piece = board[y_pos+1][x_pos];
// 	}

// 	if (below_piece === your_move){
// 		return verticalWin(x_pos, y_pos+1) + 1;
// 	}
// 	return 1;
// }

// function leftWin(x_pos, y_pos){
// 	your_move = board[y_pos][x_pos];
// 	left_piece = "null"; 

// 	if (x_pos != 0){
// 		left_piece = board[y_pos][x_pos-1];
// 	}

// 	if (left_piece === your_move){
// 		return leftWin(x_pos-1, y_pos) + 1;
// 	}
// 	return 1;

// }

// function rightWin(x_pos,y_pos){
// 	your_move = board[y_pos][x_pos];
// 	right_piece = "null"; 

// 	if (x_pos != 6){
// 		right_piece = board[y_pos][x_pos+1];
// 	}

// 	if (right_piece === your_move){
// 		return rightWin(x_pos+1, y_pos) + 1;
// 	}
// 	return 1;
// }

// function upLeftWin(x_pos,y_pos){
// 	your_move = board[y_pos][x_pos];
// 	upLeftPiece = "null"; 

// 	if ((x_pos != 0) && (y_pos != 0)){
// 		upLeftPiece = board[y_pos-1][x_pos-1];
// 	}

// 	if (upLeftPiece === your_move){
// 		return upLeftWin(x_pos-1, y_pos-1) + 1;
// 	}
// 	return 1;
// }

// function downRightWin(x_pos,y_pos){
// 	your_move = board[y_pos][x_pos];
// 	downRightPiece = "null"; 

// 	if ((x_pos != 6) && (y_pos != 5)){
// 		downRightPiece = board[y_pos+1][x_pos+1];
// 	}

// 	if (downRightPiece === your_move){
// 		return downRightWin(x_pos+1, y_pos+1) + 1;
// 	}
// 	return 1;
// }

// function upRightWin(x_pos,y_pos){
// 	your_move = board[y_pos][x_pos];
// 	upRightPiece = "null"; 

// 	if ((x_pos != 6) && (y_pos != 0)){
// 		upRightPiece = board[y_pos-1][x_pos+1];
// 	}

// 	if (upRightPiece === your_move){
// 		return upRightWin(x_pos+1, y_pos-1) + 1;
// 	}
// 	return 1;
// }

// function downLeftWin(x_pos,y_pos){
// 	your_move = board[y_pos][x_pos];
// 	downLeftPiece = "null"; 

// 	if ((x_pos != 0) && (y_pos != 5)){
// 		downLeftPiece = board[y_pos+1][x_pos-1];
// 	}

// 	if (downLeftPiece === your_move){
// 		return downLeftWin(x_pos-1, y_pos+1) + 1;
// 	}
// 	return 1;
// }

function toggle_player1(position){
	if($("#player_1").html() == "Player 1 - Player") { //if 1 is player - turn to computer - make sure 2 is player - can't have two comps
    	$("#player_1").html("Player 1 - Computer");
    	$("#player_1").val("ai");
    	$("#player_2").html("Player 2 - Player");
    	$("#player_2").val("play");
    	solvePosition(position);
  	} else {
  		$("#player_1").html("Player 1 - Player");
  		$("#player_1").val("play");
  	}
}

function toggle_player2(position){
	if($("#player_2").html() == "Player 2 - Player") {
    	$("#player_2").html("Player 2 - Computer");
    	$("#player_2").val("ai");
    	$("#player_1").html("Player 1 - Player");
    	$("#player_1").val("play");
    	solvePosition(position);
  	} else {
  		$("#player_2").html("Player 2 - Player");
  		$("#player_2").val("play");
  	}
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
//debugger;
    for (var i = 1; i < arr.length; i++) {
    	if (arr[i] != null){
	        if (arr[i] > max || max === null) {
	            maxIndex = i;
	            max = arr[i];
	        }
    	}
    }

    return maxIndex;
}

function setGame(position, string){
	position.playString(string);
	for (var y = 0; y <= 5; y++) {
	    for (var x = 0; x <= 6; x++) {
	        if (position.board[y][x] !== 0) {
	        	if (position.board[y][x] === 1){		        		
	        		player = "red";
	        	} else {
	        		player = "black";
	        	}
	        
	        	y_new = 5-y;
	            var cell = $("tr:eq(" + y_new + ")").find('td').eq(x);
	            cell.children('button').addClass(player);
	        }
	    }
	}

	var current_player = 1 + position.moves%2;
	if(current_player === 1){
		playerName = "Red";
	} else {
		playerName = "Black";
	}
	$('#player_turn').html(playerName + "'s Turn");
}

function solvePosition(position){
	var current_player = 1 + position.moves%2;
	//alert("CurrentPlayer:" + current_player);
	var current_player_action = $("#player_"+current_player).val();


	if(current_player_action==="ai"){
		// alert("helo");
		// alert(postest.moves);
		//alert(current_player +" makes move");
		var solver = new NegaMaxSolver();
		var weak = false;
		solver.solve(position,weak);
		//alert(solver.solve(position));
		//alert(solver.solutions);
		for(var i=0;i<solver.solutions.length;i++){
			$('#sol'+i).html(solver.solutions[i]);
		}

		//alert("index: "+ indexOfMax(solver.solutions));
		column = indexOfMax(solver.solutions);

		checkState(position, column);
		makePlay(position, column);
	}
}	

function checkState(position, column){

	if(position.isWinningMove(column)){
		alert("winner");
		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');
	}else if (position.moves+1===WIDTH*HEIGHT){
		alert("draw");
		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');
	}

}

function makePlay(position, column){

	position.play(column);

	//update board
	row = position.height[column]-1;
    if (position.board[row][column] === 1){
		player = "red";
	} else {
		player = "black";
	}

	row = 5-row;
	var cell = $("tr:eq(" + row + ")").find('td').eq(column);
	cell.children('button').addClass(player);

	var current_player = 1 + position.moves%2;
	if(current_player === 1){
		playerName = "Red";
	} else {
		playerName = "Black";
	}

	$('#player_turn').html(playerName + "'s Turn");
}