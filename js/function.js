
var solutions = [];
var continueGame = 1;

function toggle_player1(){
	//alert($("#player1-mode").html());
	if($("#player1-mode").html() == "Player 1 - human") { //if 1 is player - turn to computer - make sure 2 is player - can't have two comps
    	$("#player1-mode").html("Player 1 - ai");
    	//$("#player_1").val("ai");
    	$('#boxplayer1').attr('data-value','ai');
    	$("#player2-mode").html("Player 2 - human");
    	//$("#player_2").val("play");
    	$('#boxplayer2').attr('data-value','play');
    	//solvePosition(position);
  	} else {
  		$("#player1-mode").html("Player 1 - human");
  		//$("#player_1").val("play");
  		$('#boxplayer1').attr('data-value','play');

  	}

}

function toggle_player2(){
	if($("#player2-mode").html() == "Player 2 - human") {
    	$("#player2-mode").html("Player 2 - ai");
    	//$("#player_2").val("ai");
    	$('#boxplayer2').attr('data-value','ai');
    	$("#player1-mode").html("Player 1 - human");
    	//$("#player_1").val("play");
    	$('#boxplayer1').attr('data-value','play');
    	//solvePosition(position);
  	} else {
  		$("#player2-mode").html("Player 2 - human");
  		//$("#player_2").val("play");
  		$('#boxplayer2').attr('data-value','play');
  	}
}

// function toggle_player1(position){
// 	if($("#player_1").html() == "Player 1 - Player") { //if 1 is player - turn to computer - make sure 2 is player - can't have two comps
//     	$("#player_1").html("Player 1 - Computer");
//     	//$("#player_1").val("ai");
//     	$('#boxplayer1').attr('data-value','ai');
//     	$("#player_2").html("Player 2 - Player");
//     	//$("#player_2").val("play");
//     	$('#boxplayer2').attr('data-value','play');
//     	solvePosition(position);
//   	} else {
//   		$("#player_1").html("Player 1 - Player");
//   		//$("#player_1").val("play");
//   		$('#boxplayer1').attr('data-value','play');
//   	}
// }

// function toggle_player2(position){
// 	if($("#player_2").html() == "Player 2 - Player") {
//     	$("#player_2").html("Player 2 - Computer");
//     	//$("#player_2").val("ai");
//     	$('#boxplayer2').attr('data-value','ai');
//     	$("#player_1").html("Player 1 - Player");
//     	//$("#player_1").val("play");
//     	$('#boxplayer1').attr('data-value','play');
//     	solvePosition(position);
//   	} else {
//   		$("#player_2").html("Player 2 - Player");
//   		//$("#player_2").val("play");
//   		$('#boxplayer2').attr('data-value','play');
//   	}
// }

function indexOfMaxNot100(arr) { //find the index of the largest value in array - no inbuilt function
    if (arr.length === 0) { //return error if array length 0
        return -1;
    }

    //current max at index 0
    var max = -100;
    var maxIndex = 0;
//debugger;
    for (var i = 0; i < arr.length; i++) { //loop through array
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
	var last_player = 1 + (position.moves-1)%2;
	$('#boxplayer'+(last_player)).css("box-shadow","" );
	$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );

	// if(current_player === 1){
	// 	playerName = "Red";
	// } else {
	// 	playerName = "Black";
	// }
	// $('#player_turn').html(playerName + "'s Turn");
}


function solvePosition(position){ //function to solve a position given
	var current_player = 1 + position.moves%2;
	// var current_player_action = $("#player_"+current_player).val();

	var current_player_action = $('#boxplayer'+current_player).attr('data-value');
	if(current_player_action==="ai"){ //only do if AI selected 
		// $('#player_turn').html("Computing Move...");
		//debugger;
		// $('.board button').unbind('click');
		// $('.board button').bind('click');
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
		continueGame = 0;
		//alert("winner. dx: " + WIN_DX + " dy: " + WIN_DY);
		var c = parseInt(column);
		var hc = parseInt(position.height[column]);
		//alert("col :" + c + " height: " + hc);
		//alert(c+ 1*WIN_DX);
		//alert(hc + 1 * (WIN_DX*WIN_DY));
		//WORKS JUST WITHOUT STARIGHT DOWN CASE WHERE DX=0
		//alert("0: " + (c+ 0*WIN_DX) + "," + (hc + 0 * (WIN_DX*WIN_DY)) + " | 1: " + (c+ 1*WIN_DX) + "," + (hc + 1 * (WIN_DX*WIN_DY)) +  " | 2: " + (c+ 2*WIN_DX) + "," + (hc + 2 * (WIN_DX*WIN_DY)) + " | 3: " + (c+ 3*WIN_DX) + "," + (hc +3 * (WIN_DX*WIN_DY))); 
		
		if(WIN_DX == 0){
			//alert("hi");
			for(var i=0;i<4;i++){
				//var winColumn = c+i*WIN_DX;
				var winRow = hc+i*(WIN_DY);
			//	alert(winRow +","+winColumn);
	//debugger;
				winRow = 5-winRow;
				var cell = $("tr:eq(" + winRow + ")").find('td').eq(c);
				//cell.children('button').removeClass();
				cell.children('button').addClass('win');
			}
		} else {
			for(var i=0;i<4;i++){
				var winColumn = c+i*WIN_DX;
				var winRow = hc+i*(WIN_DX*WIN_DY);
				//alert(x +","+y);
	//debugger;
				winRow = 5-winRow;
				var cell = $("tr:eq(" + winRow + ")").find('td').eq(winColumn);
				//cell.children('button').removeClass();
				cell.children('button').addClass('win');
			}
		}

		//$('.win').effect("pulsate", {times:5}, 3000 );
	//	for(var i=0;i<5;i++){
		var timesRun = 0;
	var flashInterval = setInterval(function(){
		$('.win').fadeTo(100, 0.3, function() { 
			$(this).fadeTo(500, 1.0); });
		timesRun++;
		if(timesRun==9){
			clearInterval(flashInterval);
		}
	},600);

	$('.win').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0)});	
			//delay(100);
		//}

	// 	setInterval(function(){
	// //$('.char').css({opacity: 0});
	// 		$('.win').animate({opacity: 1}, 2000 );
	// 		$('.win').animate({opacity: 0}, 2000 );
	// 	},1000);



		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');

			var current_player = 1 + position.moves%2;
			var last_player = 1 + (position.moves-1)%2;
			// if(current_player === 1){
			// 	playerName = "Red";
			// } else {
			// 	playerName = "Black";
			// }

		// $('#player_turn').html(playerName + " has Won!");
			//var current_player = 1 + position.moves%2;
			
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #64DD17" );

	}else if (position.moves+1===WIDTH*HEIGHT){
		continueGame = 0;
					var current_player = 1 + position.moves%2;
			var last_player = 1 + (position.moves-1)%2;
		// alert("draw");
		$('.board button').unbind('click');
		$('#player_1').unbind('click');
		$('#player_2').unbind('click');

		// $('#player_turn').html("Game has Ended in a Draw!");
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow","" );
	}

}

function makePlay(position, column){ //make the move on the board

	position.play(column); //play the column

	//update board
	row = position.height[column]-1;
    if (position.board[row][column] === 1){
		player = returnCharName(parseInt($('#playerselect1').attr('data-value')));
	} else {
		player = returnCharName(parseInt($('#playerselect2').attr('data-value')));
	}

	row = 5-row;
	var cell = $("tr:eq(" + row + ")").find('td').eq(column);
	cell.children('button').addClass(player);

	//update player

	var current_player = 1 + position.moves%2;
	var last_player = 1 + (position.moves-1)%2;

	// if(current_player === 1){
	// 	playerName = "Red";
	// } else {
	// 	playerName = "Black";
	// }
	// currentText = $('#player_turn').html();
	if(continueGame==1){
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );
			// $('#player_turn').html(playerName + "'s Turn");
			solvePosition(position);
	}
}

function changeCharRight(box){
//box.css("color", "white");
//alert("hi");
}

function returnCharName(id){
		var char;
		switch(id){
			case 1:
			char = "ironman";
			break;
			case 2:
			char = "cap";
			break;
			case 3:
			char = "thor";
			break;
			case 4:
			char = "hulk";
			break;
		}

		return char;
}