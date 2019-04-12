
var solutions = [];
var continueGame = 1;

function toggle_player1(){
	//alert($("#player1-mode").html());
	if($("#player1-mode").html() == "Player 1 - human") { //if 1 is player - turn to computer - make sure 2 is player - can't have two comps
    	$("#player1-mode").html("Player 1 - ai");
    	//$("#player_1").val("ai");
    	$('#boxplayer1').attr('data-value','ai');

    	if($("#player2-mode").html() == "Player 2 - ai") {
			$('.char-ability-2').toggle();
			$('#speechplayer2').toggle();
    	}

    	$("#player2-mode").html("Player 2 - human");
    	//$("#player_2").val("play");
    	$('#boxplayer2').attr('data-value','play');
    	//solvePosition(position);

    	$('.char-ability-1').toggle();

    	$('#speechplayer1').toggle();


    	
  	} else {
  		$("#player1-mode").html("Player 1 - human");
  		//$("#player_1").val("play");
  		$('#boxplayer1').attr('data-value','play');
		$('.char-ability-1').toggle();
		$('#speechplayer1').toggle();
  	}

}

function toggle_player2(){
	if($("#player2-mode").html() == "Player 2 - human") {
    	$("#player2-mode").html("Player 2 - ai");
    	//$("#player_2").val("ai");
    	$('#boxplayer2').attr('data-value','ai');

    	if($("#player1-mode").html() == "Player 1 - ai") {
			$('.char-ability-1').toggle();
			$('#speechplayer1').toggle();
    	}
    	
    	$("#player1-mode").html("Player 1 - human");
    	//$("#player_1").val("play");
    	$('#boxplayer1').attr('data-value','play');
    	//solvePosition(position);
    	$('.char-ability-2').toggle();
    	$('#speechplayer2').toggle();
  	} else {
  		$("#player2-mode").html("Player 2 - human");
  		//$("#player_2").val("play");
  		$('#boxplayer2').attr('data-value','play');
  		$('.char-ability-2').toggle();
  		$('#speechplayer2').toggle();
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

function maxValueNot100(arr){
    if (arr.length === 0) { //return error if array length 0
        return -1;
    }

    //current max at index 0
    var max = -100;
    for (var i = 0; i < arr.length; i++) { //loop through array
    	if (arr[i] != null){
	        if ((arr[i] > max || max === null) && (arr[i] != 100)) { //if the value at index greater than current max or if max is currently null, update
	            max = arr[i];
	        }
    	}
    }

    return max;
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
					player = returnCharName(parseInt($('#playerselect1').attr('data-value')));
				} else {
					player = returnCharName(parseInt($('#playerselect2').attr('data-value')));
				}


	        
	        	y_new = 5-y;
	            var cell = $("tr:eq(" + y_new + ")").find('td').eq(x);
	            cell.children('button').addClass(player);
	        }
	    }
	}

}

function offerhint(position){
	var json = solutions[position.moves];
  	if(json === undefined || json.pos !== position.pos) { 
    	compute_solution(position);
    	return;
  	}
  	var column = indexOfMaxNot100(json.score);

  	var row = position.height[column];
	row = 5-row;
	var cell = $("tr:eq(" + row + ")").find('td').eq(column);
	cell.children('button').addClass('hintcell');
	// debugger;
	var timesRun = 0;
	var flashInterval = setInterval(function(){
		$('.hintcell').fadeTo(100, 0.3, function() { 
			$(this).fadeTo(500, 1.0); });
		timesRun++;
		if(timesRun==3){
			clearInterval(flashInterval);
			cell.children('button').removeClass('hintcell');
		}
	},600);

	$('.hintcell').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0)});	

}


function solvePosition(position){ //function to solve a position given
	var current_player = 1 + position.moves%2;
	// var current_player_action = $("#player_"+current_player).val();
	var current_player_action = $('#boxplayer'+current_player).attr('data-value');
	if(current_player_action==="ai"){ //only do if AI selected 
		// $('#player_turn').html("Computing Move...");
		//debugger;
		$('.board button').unbind('click');
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
		
  		var bestValForOpponent = -parseInt(maxValueNot100(json.score));
		var movesToWin;
		var html;
		//debugger;
		if(bestValForOpponent > 0){
			movesToWin = Math.floor((45-position.moves)/2)- bestValForOpponent;
			html="You Beat Hulk in " + movesToWin + " \n moves... HULK SMASH";
		} else if (bestValForOpponent < 0) {
			//movesToWin = -bestValForOpponent - 22;
			movesToWin = Math.floor((44-position.moves)/2)+ bestValForOpponent;
			//alert("loses");
			html="HULK win in " + movesToWin + " moves... PUNY HUMAN";
		} else {
			html = "Draw... ";
		}
		 $('.hulk-ability').html(html);
		
		 if(continueGame==1){
			$('.board button').bind('click', function(e){
				debugger;
				var column = $(this).closest('tr').find('td').index($(this).closest('td')); //find the column value of it
				if(!position.canPlay(column)){ //if can't play return error
					$('#posAlreadyTakenModal').modal('show');
					return;
				}

				checkState(position, column); //make sure no winners
				makePlay(position, column); //play the column
			});
		}

	} else {
	// 	for(var i=0;i<7;i++){ //update solutions 
	// 		 $('#sol'+i).html(json.score[i]);
	// 	}
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

		var c = parseInt(WIN_X);
		var hc = parseInt(WIN_Y);

		if(WIN_DX == 0){
			
			for(var i=0;i<4;i++){
			
				c = parseInt(column)
				hc = parseInt(position.height[column]);
				var winRow = hc+i*(WIN_DY);
			
				winRow = 5-winRow;
				var cell = $("tr:eq(" + winRow + ")").find('td').eq(c);
				
				cell.children('button').addClass('win');
			}
		} else {
			for(var i=1;i<5;i++){
				var winColumn = c+i*WIN_DX;
				var winRow = hc+i*WIN_DY;
		
				winRow = 5-winRow;
				var cell = $("tr:eq(" + winRow + ")").find('td').eq(winColumn);
				
				cell.children('button').addClass('win');
			}
		}

		debugger;
		$('.board button').unbind('click');

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



			var current_player = 1 + position.moves%2;
			var last_player = 1 + (position.moves-1)%2;

			
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #64DD17" );

			//AI Winning messages
			$('#speechplayer'+current_player).find('.ironman-ability').text("Good Game... You Put Up A Damn Good Fight!");
			$('#speechplayer'+current_player).find('.cap-ability').text("Close One Soldier! Better Luck Next Time!");
			$('#speechplayer'+current_player).find('.thor-ability').text("By Odin's Might I Have Won!");
			$('#speechplayer'+current_player).find('.hulk-ability').text("HULK SMASH PUNY HUMAN");

			//AI losing messages
			$('#speechplayer'+last_player).find('.ironman-ability').text("Amazing, You Managed It! How Did You Do It?");
			$('#speechplayer'+last_player).find('.cap-ability').text("Good Job Soldier! A Deserved Win!");
			$('#speechplayer'+last_player).find('.thor-ability').text("You Are The Worthy Ruler of Asgard...");
			$('#speechplayer'+last_player).find('.hulk-ability').text("HULK NOT LIKE");

			// $('#speechtext').unbind('click');


	}else if (position.moves+1===WIDTH*HEIGHT){
		continueGame = 0;
					var current_player = 1 + position.moves%2;
			var last_player = 1 + (position.moves-1)%2;
		// alert("draw");
		$('.board button').unbind('click');

		// $('#player_turn').html("Game has Ended in a Draw!");
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow","" );

			//AI Drawing messages
			$('#speechplayer'+current_player).find('.ironman-ability').text("Almost... Maybe Next Time!");
			$('#speechplayer'+current_player).find('.cap-ability').text("Try Again and Who Knows!");
			$('#speechplayer'+current_player).find('.thor-ability').text("By Odin's Might You Almost Won!");
			$('#speechplayer'+current_player).find('.hulk-ability').text("YOU ALMOST BEAT HULK");
			$('#speechplayer'+last_player).find('.ironman-ability').text("Almost... Maybe Next Time!");
			$('#speechplayer'+last_player).find('.cap-ability').text("Try Again and Who Knows!");
			$('#speechplayer'+last_player).find('.thor-ability').text("By Odin's Might You Almost Won!");
			$('#speechplayer'+last_player).find('.hulk-ability').text("YOU ALMOST BEAT HULK");
	}

}

function makePlay(position, column){ //make the move on the board
	$('.solutions').hide();
	//Only do if AI player is Cap
	var last_player = 1 + (position.moves+1)%2;
	var current_player = 1 + position.moves%2;
	// alert(last_player);
	var last_player_action = $('#boxplayer'+last_player).attr('data-value');
	if(last_player_action==="ai"){ //only do if AI selected 
		// $('#player_turn').html("Computing Move...");
		//debugger;
		// $('.board button').unbind('click');
		// alert("hi");

		if($('.cap-ability').is(":visible")){
			var json = solutions[position.moves];
		  	if(json === undefined || json.pos !== position.pos) { 
		    	compute_solution(position);
		    	return;
		  	}
			for(var i=0;i<7;i++){ //update solutions 
				 $('#sol'+i).html(json.score[i]);
			}
		  	//var column = indexOfMaxNot100(json.score);
		  	var bestVal = parseInt(maxValueNot100(json.score));
		  	var colVal = json.score[column];
		  	if(colVal != bestVal){
		  		//alert("not optimal");
		  		var bestColumn = indexOfMaxNot100(json.score);
		  		var capHTML = "";
		  		switch(current_player){
		  			case 1:
		  				capHTML += "As you made the first move - <b> You should win everytime! </b> Heres how I think you can improve <br>";
		  				break;
		  			case 2:
		  				capHTML += "As you made the second move - <b> You will lose everytime </b> - espically against our AI! Heres how I think you can improve though <br>";
		  		}
		  		capHTML += "You went in column: <b>" + (column + 1) + "</b>, but I think the best move for you was is in column: <b>" + (bestColumn+1) + "</b><br> <br>";
		//   		  		var bestValForOpponent = -parseInt(maxValueNot100(json.score));
				
				capHTML += capMessage(position, json, colVal, current_player, bestColumn, bestVal);

		  		capHTML += "Look under each column to see the assigned score for each row for your last move! <br>"
		  		capHTML += "The score can be thought of as the number of stones from the end of the game for you to win"
		  		$('#capTeach').find('.modal-body').html(capHTML);

		  		$('.cap-ab').show();
		  	} else {
		  		$('.cap-ab').hide();
		  	}
  		}
	}

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

	if(continueGame==1){
			$('#boxplayer'+(last_player)).css("box-shadow","" );
			$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );
			// $('#player_turn').html(playerName + "'s Turn");
			solvePosition(position);
	}
}

function capMessage(position, json, colVal, current_player, bestColumn, bestVal){
	var capHTML ="";
	var movesToWin;
	debugger;
	if(colVal > 0){
		movesToWin = Math.floor((45-position.moves)/2)- colVal;
		
		switch (movesToWin){
			case 1:
				capHTML += "If you had gone in that column you could have won! <br>";
				break;
			case 2:
				capHTML += "If you had gone in that column you could have forced a win in " + movesToWin + " moves! <br>";
				break;
		}
	} else if (colVal < 0) {
		
		movesToWin = Math.floor((44-position.moves)/2)+ colVal;
		switch (movesToWin){
			case 1:
				capHTML += "You had to go in that column to block the opponent! <br>";
				break;
			case 2:
				capHTML += "If you had gone in that column you could have forced a win in " + movesToWin + " moves! <br>";
				break;
		}
	} else if (colVal == 0) {
		if(bestVal > 0){
			movesToWin = Math.floor((45-position.moves)/2)- bestVal;
		} else {
			movesToWin = Math.floor((44-position.moves)/2)+ bestVal;
		}
		switch (movesToWin){
			case 1:
			case 2:
				capHTML += "You just forced a draw. <br>";
				capHTML += "If you had gone in that column you could have forced a win in " + movesToWin + " moves! <br> <br>";
				break;
		}


	}

	if (capHTML == ""){
		if(bestColumn == 3) {
			capHTML += "Look At the Middle Column! <b>Control of the middle is important! </b><br>"
			capHTML += "As having disks in the middle mean you can make connections in any direction! <br> <br>";
		} else {
			switch(current_player){
				case 1:
				//	if(bestColumn == 2 || bestColumn == 4) {
						capHTML += "As the first player you should be trying to create scenarios where your final move for a 4 in a row is on <b>odd rows </b>! Ie. the first row, third row etc <br>";
						capHTML += "This gives you the best chance to win the game later on<br>";
						capHTML += "Due to this you should also try and stop the opponent having a winning move on an even row! <br><br>";
				//	}
					
					break;
				case 2:
					//if(bestColumn == 1 || bestColumn == 5) {
						capHTML += "As the second player you should be trying to create scenarios where your final move for a 4 in a row is on <b>even rows </b>! Ie. the second row, fourth row etc <br>";
						capHTML += "This gives you the best chance to win the game later on<br>";
						capHTML += "Due to this you should also try and stop the opponent having a winning move on an odd row! <br><br>";
				//	}
					break;
			}

		}
		
		capHTML += "Can you see why? It's important to try and create threats but also block potential opponent moves <br><br>";	
	}

	return capHTML;
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

function undo_move(position){
	if(position.moves > 0){
	//	alert(position.pos);
		var new_pos = position.pos.substring(0,position.pos.length-1);
	//	alert(new_pos);
		clearBoard(position);
		
		new_position = new Position();
		
		setGame(new_position, new_pos);


		//Update the current player
		
		var current_player = 1 + new_position.moves%2;
		var last_player = 1 + (position.moves)%2;
		//alert(current_player);
		//alert(last_player);
		$('#boxplayer'+(last_player)).css("box-shadow","" );
		$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );

		
		return new_position;
	} else {

		return position;
	}
}

function clearBoard(position){
	for (var y = 0; y <= 5; y++) {
	    for (var x = 0; x <= 6; x++) {
	        if (position.board[y][x] !== 0) {        
	        	y_new = 5-y;
	            var cell = $("tr:eq(" + y_new + ")").find('td').eq(x);
	            cell.children('button').removeClass();
	        }
	    }
	}
}

function restartSameChars(position){
	debugger;
	clearBoard(position);
	new_position = new Position();
	setGame(new_position, "");
	$('#boxplayer2').css("box-shadow","" );
	$('#boxplayer1').css("box-shadow"," 0px 0px 50px 7px #ffde03" );
	continueGame = 1;
	$('.ironman-ability').text("Hello Sir... Do you want to UNDO your last move? ");
	$('.thor-ability').text("By the Power of Mjolnir... <br> I allow you a HINT");
	$('.hulk-ability').text("HULK SMASH");
	$('.cap-ability').text("I have your back! I'll let you know if you can improve!");

	$('.solutions').hide();
    $('#abilityplayer1').hide();
    $('#abilityplayer2').hide();

    WIN_DX = 0;
	WIN_DY = 0;
	WIN_X = 0;
	WIN_Y=0;


	return new_position;
}

function setgamemodal(position){

		setgame = $('#sgameposition').val();
		clearBoard(position);
		new_position = new Position();
		setGame(new_position, setgame);
	

		var current_player = 1 + new_position.moves%2;
		
		//alert(current_player);
		//alert(last_player);
		$('#boxplayer1').css("box-shadow","" );
		$('#boxplayer2').css("box-shadow","" );
		$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );
		continueGame = 1;
		return new_position;	

}

function validateSetGameModal(){
	setgame = $('#sgameposition').val();
	new_position = new Position();
	return new_position.playString(setgame);
}