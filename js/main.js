var WIDTH = 7;
var HEIGHT = 6;

var WIN_DX = 0;
var WIN_DY = 0;
var WIN_X = 0;
var WIN_Y=0;

$(document).ready(function(){
	var board = new Position(); //create the game board that is used
//	setGame(board, "11113322323");  //function to set game up to pre set state
//debugger;
//setGame(board, "2");


	$('.board button').click(function(e) { //if a button is clicked
		debugger;
		var column = $(this).closest('tr').find('td').index($(this).closest('td')); //find the column value of it
		if(!board.canPlay(column)){ //if can't play return error
			alert("Pos already taken");
			return;
		}

		checkState(board, column); //make sure no winners
		makePlay(board, column); //play the column
	});
	
	// $('.play_again').click(function(e) { //reload the page
	//         location.reload();
	// });

	// $('#player_1').click(function(e){ //toggle player 1
	// 	toggle_player1(board);
	// });

	// $('#player_2').click(function(e){ //toggle player 2
	// 	toggle_player2(board);
	// });

	$('.change-char-button.left').click(function(e){ 
		var box = $(this).parent()
		var numVal = parseInt(box.attr('data-value'));
		var char = returnCharName(numVal);


		box.removeClass(char + "-char");

		var col = box.parent();
		var char_name_div = $(col).find('#'+char+"-name");
		char_name_div.toggle();

		numVal--;
		if(numVal==0){
			numVal=4;
		}
		char =returnCharName(numVal);
		box.addClass(char+"-char")
		box.attr('data-value', numVal);

		var char_img = $(this).closest('div').find('img');
		char_img.attr('src', "img/" + char +"-img.png");

		char_name_div = $(col).find('#'+char+"-name");
		char_name_div.toggle();


	});


	$('.change-char-button.right').click(function(e){ 

		var box = $(this).parent()
		var numVal = parseInt(box.attr('data-value'));
		var char = returnCharName(numVal);

		box.removeClass(char + "-char");

				var col = box.parent();
		var char_name_div = $(col).find('#'+char+"-name");
		char_name_div.toggle();
		numVal++;
		if(numVal==5){
			numVal=1;
		}
		char =returnCharName(numVal);
		box.addClass(char+"-char")
		box.attr('data-value', numVal);

		var char_img = $(this).closest('div').find('img');
		char_img.attr('src', "img/" + char +"-img.png");

				char_name_div = $(col).find('#'+char+"-name");
		char_name_div.toggle();
	});

	$('#start_game').click(function(e){ 

		var char1 = returnCharName(parseInt($('#playerselect1').attr('data-value')));
		var char2 = returnCharName(parseInt($('#playerselect2').attr('data-value')));
		if(char1 == char2){
			alert("Error: can't have two of same char");
			return;
		}

		$('#boxplayer1').addClass(char1+"-char");
		$('#speechplayer1').addClass(char1+"-speech");

		// $('.'+char1+'-ability').toggle();
		$('#speechplayer1').find('.'+char1+'-ability').toggle();

		var char_img = $('#boxplayer1').find('img');
		char_img.attr('src', "img/" + char1 +"-img.png");

		
		$('#boxplayer2').addClass(char2+"-char");
		$('#speechplayer2').addClass(char2+"-speech");

		// $('.'+char2+'-ability').toggle();
		$('#speechplayer2').find('.'+char2+'-ability').toggle();

		char_img = $('#boxplayer2').find('img');
		char_img.attr('src', "img/" + char2 +"-img.png");


		// if(char1 == char2){
		// 	alert("Error: can't have two of same char");
		// } else{

				var current_player = 1 + board.moves%2;
				
	//var last_player = 1 + (board.moves-1)%2;
	//		alert("curr: " + current_player + " last: " + last_player);
			if ($('#boxplayer'+current_player).attr('data-value') == "ai"){
				debugger;
				solvePosition(board);
			}
			$('#boxplayer'+current_player).css("box-shadow"," 0px 0px 50px 7px #ffde03" );
			// $('#player_select_screen').toggle();
			$('#player_select_screen').attr('style','display:none !important');
			$('#game_screen').toggle();	
		// }
	});

	$('.player1-mode').click(function(e){ //toggle player 1
		toggle_player1();
	});

	$('.player2-mode').click(function(e){ //toggle player 2

		toggle_player2();
	});

	$('.undo').click(function(e){ 
		// debugger;
		var player = 1 + (board.moves-1)%2;
		if($('#boxplayer'+player).attr('data-value') == "ai"){
			debugger;
			board = undo_move(board);
		} 
		// debugger;
		board = undo_move(board);
		// debugger;
		$('.board button').unbind('click');
		$('.board button').bind('click', function(e){
			var column = $(this).closest('tr').find('td').index($(this).closest('td')); //find the column value of it
			if(!board.canPlay(column)){ //if can't play return error
				alert("Pos already taken");
				return;
			}

			checkState(board, column); //make sure no winners
			makePlay(board, column); //play the column
		});
		// debugger;
		var current_player = 1 + board.moves%2;
		if($('#boxplayer'+current_player).attr('data-value') == "ai"){
			solvePosition(board);
		} 
	});

	$('.hint').click(function(e){
		offerhint(board);
	});
});