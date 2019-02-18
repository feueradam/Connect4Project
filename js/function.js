
var solutions = [];

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

function indexOfMaxNot100(arr) { //find the index of the largest value in array - no inbuilt function
    if (arr.length === 0) { //return error if array length 0
        return -1;
    }

    //current max at index 0
    var max = -100;
    var maxIndex = 0;
//debugger;
    for (var i = 1; i < arr.length; i++) { //loop through array
    	if (arr[i] != null){
	        if ((arr[i] > max || max === null) && (arr[i] != 100)) { //if the value at index greater than current max or if max is currently null, update
	            maxIndex = i;
	            max = arr[i];
	        }
    	}
    }

    return maxIndex;
}

function setGame(position, string){ //function to set game to pre set states
	position.playString(string); //play the moves on the board
	//debugger;
	
	//update the board
	//alert(string.toString(2));
	//alert(position.key());

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

	//Update the current player
	var current_player = 1 + position.moves%2;
	if(current_player === 1){
		playerName = "Red";
	} else {
		playerName = "Black";
	}
	$('#player_turn').html(playerName + "'s Turn");
}


function solvePosition(position){ //function to solve a position given
	var current_player = 1 + position.moves%2;
	var current_player_action = $("#player_"+current_player).val();

	if(current_player_action==="ai"){ //only do if AI selected 
		$('#player_turn').html("Computing Move...");
		//debugger;
		//$('.board button').unbind('click');
		//$('.board button').bind('click');
	}

	var json = solutions[position.moves];
  	if(json === undefined || json.pos !== position.pos) { //TODO check != ??
    	compute_solution(position);
    	return;
  	}

	if(current_player_action==="ai"){ //only do if AI selected
   		var column = indexOfMaxNot100(json.score);
    	checkState(position, column); //check what happens when column played
		makePlay(position, column); //make the move
	} else {
		for(var i=0;i<7;i++){ //update solutions (CURRENTLY NOT WORKING CORRECTLY)
			$('#sol'+i).html(json.score[i]);
		}
	}
}	

function compute_solution(position){
  $.getJSON("https://connect4.gamesolver.org/solve", {pos: position.pos}, function(json) {
      solutions[json.pos.length] = json;
      solvePosition(position);
      });
}

function checkState(position, column){ //checks what happens when column played

	if(position.isWinningMove(column)){
		alert("winner");
		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');

			var current_player = 1 + position.moves%2;
			if(current_player === 1){
				playerName = "Red";
			} else {
				playerName = "Black";
			}

		$('#player_turn').html(playerName + " has Won!");

	}else if (position.moves+1===WIDTH*HEIGHT){
		alert("draw");
		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');

		$('#player_turn').html("Game has Ended in a Draw!");
	}

}

function makePlay(position, column){ //make the move on the board

	position.play(column); //play the column

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

	//update player
	var current_player = 1 + position.moves%2;
	if(current_player === 1){
		playerName = "Red";
	} else {
		playerName = "Black";
	}
	currentText = $('#player_turn').html();
	if((currentText.indexOf("Won") < 0) && (currentText.indexOf("Draw") < 0)){
		
		$('#player_turn').html(playerName + "'s Turn");
			solvePosition(position);
	}
	

}