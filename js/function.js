function dropToBottom(x_pos, y_pos) {
    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. If one hasn't, return the empty position.
    for (var y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            return y;
        }
    }

    return y_pos;
}

//set the board position to the colour passed in
function addDiscToBoard(colour, x_pos, y_pos){
	board[y_pos][x_pos] = colour;
}

//loop through the board and for each position which is a disc, update the cell to match
function updateBoard(){
    for (var y = 0; y <= 5; y++) {
	    for (var x = 0; x <= 6; x++) {
	    	//alert(board[y][x]);
	        if (board[y][x] !== 0) {
	        	//alert(x + "," + y +"in here" + board[y][x]);
	            var cell = $("tr:eq(" + y + ")").find('td').eq(x);
	            cell.children('button').addClass(board[y][x]);
	        }
	    }
	}
}

function setPosition(currentPlayer, position){
	for (var i=0;i<position.length;i++){
		var x_pos = position.charAt(i);
		x_pos = x_pos-1;
		var y_pos = dropToBottom(x_pos,0);
		addDiscToBoard(currentPlayer, x_pos,y_pos);
		currentPlayer = changePlayer(currentPlayer);
	}
	return currentPlayer;
}

//swap the current player
function changePlayer(currentPlayer){
	if (currentPlayer === "red"){
		currentPlayer = "black";
	} else {
		currentPlayer = "red";
	}
	$('#player_turn').html(currentPlayer + "'s Turn");
	return currentPlayer;
}

//make sure the position chosen, doesn't have a disc
function posIsTaken(x_pos,y_pos){
	var value = board[y_pos][x_pos];
	if (value === 0){
		return false;
	} else {
		return true;
	}
}

//loop through the bard and check if every position is filled
function gameIsDraw(){
    for (var y = 0; y <= 5; y++) {
	    for (var x = 0; x <= 6; x++) {
	        if (board[y][x] == 0) {
	        	return false;
	        }
	    }
	}
	return true;
}

//check for a winner, return true if winner found, only need to check the spaces next to disc placed
function checkWinner(x_pos, y_pos){
	//check the number of dics in a row in both directions, minus one as count the disc placed twices
	var horizontalWin = leftWin(x_pos,y_pos) + rightWin(x_pos,y_pos) - 1;
	var backslashWin = upLeftWin(x_pos,y_pos) + downRightWin(x_pos,y_pos) - 1;
	var fowardslashWin = downLeftWin(x_pos,y_pos) + upRightWin(x_pos,y_pos) - 1;
	if ((verticalWin(x_pos,y_pos) === 4) || (horizontalWin === 4) || (backslashWin === 4) || (fowardslashWin === 4)){ //if any direction has 4, then winner
		return true;
	} else {
		return false;
	}

}

function verticalWin(x_pos, y_pos){
	your_move = board[y_pos][x_pos];
	below_piece = "null"; //ABOVE PIECE ALWAYS 0 - as you never have any pieces above the one you just placed

	if (y_pos != 5){
		below_piece = board[y_pos+1][x_pos];
	}

	if (below_piece === your_move){
		return verticalWin(x_pos, y_pos+1) + 1;
	}
	return 1;
}

function leftWin(x_pos, y_pos){
	your_move = board[y_pos][x_pos];
	left_piece = "null"; 

	if (x_pos != 0){
		left_piece = board[y_pos][x_pos-1];
	}

	if (left_piece === your_move){
		return leftWin(x_pos-1, y_pos) + 1;
	}
	return 1;

}

function rightWin(x_pos,y_pos){
	your_move = board[y_pos][x_pos];
	right_piece = "null"; 

	if (x_pos != 6){
		right_piece = board[y_pos][x_pos+1];
	}

	if (right_piece === your_move){
		return rightWin(x_pos+1, y_pos) + 1;
	}
	return 1;
}

function upLeftWin(x_pos,y_pos){
	your_move = board[y_pos][x_pos];
	upLeftPiece = "null"; 

	if ((x_pos != 0) && (y_pos != 0)){
		upLeftPiece = board[y_pos-1][x_pos-1];
	}

	if (upLeftPiece === your_move){
		return upLeftWin(x_pos-1, y_pos-1) + 1;
	}
	return 1;
}

function downRightWin(x_pos,y_pos){
	your_move = board[y_pos][x_pos];
	downRightPiece = "null"; 

	if ((x_pos != 6) && (y_pos != 5)){
		downRightPiece = board[y_pos+1][x_pos+1];
	}

	if (downRightPiece === your_move){
		return downRightWin(x_pos+1, y_pos+1) + 1;
	}
	return 1;
}

function upRightWin(x_pos,y_pos){
	your_move = board[y_pos][x_pos];
	upRightPiece = "null"; 

	if ((x_pos != 6) && (y_pos != 0)){
		upRightPiece = board[y_pos-1][x_pos+1];
	}

	if (upRightPiece === your_move){
		return upRightWin(x_pos+1, y_pos-1) + 1;
	}
	return 1;
}

function downLeftWin(x_pos,y_pos){
	your_move = board[y_pos][x_pos];
	downLeftPiece = "null"; 

	if ((x_pos != 0) && (y_pos != 5)){
		downLeftPiece = board[y_pos+1][x_pos-1];
	}

	if (downLeftPiece === your_move){
		return downLeftWin(x_pos-1, y_pos+1) + 1;
	}
	return 1;
}

