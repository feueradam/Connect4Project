var WIDTH = 7;
var HEIGHT = 6;

var WIN_DX = 0;
var WIN_DY = 0;

$(document).ready(function(){
	var board = new Position(); //create the game board that is used
	//setGame(board, "44444432655225212");  //function to set game up to pre set state
//debugger;
//setGame(board, "2");

	$('#boxplayer1').css("box-shadow"," 0px 0px 50px 7px #ffde03" );
	$('.board button').click(function(e) { //if a button is clicked
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
		numVal--;
		if(numVal==0){
			numVal=4;
		}
		char =returnCharName(numVal);
		box.addClass(char+"-char")
		box.attr('data-value', numVal);

		var char_img = $(this).closest('div').find('img');
		char_img.attr('src', "img/" + char +"-img.png");
	});


	$('.change-char-button.right').click(function(e){ 

		var box = $(this).parent()
		var numVal = parseInt(box.attr('data-value'));
		var char = returnCharName(numVal);


		box.removeClass(char + "-char");
		numVal++;
		if(numVal==5){
			numVal=1;
		}
		char =returnCharName(numVal);
		box.addClass(char+"-char")
		box.attr('data-value', numVal);

		var char_img = $(this).closest('div').find('img');
		char_img.attr('src', "img/" + char +"-img.png");
	});

	$('#start_game').click(function(e){ 

		var char1 = returnCharName(parseInt($('#playerselect1').attr('data-value')));
		$('#boxplayer1').addClass(char1+"-char");
		var char_img = $('#boxplayer1').find('img');
		char_img.attr('src', "img/" + char1 +"-img.png");

		var char2 = returnCharName(parseInt($('#playerselect2').attr('data-value')));
		$('#boxplayer2').addClass(char2+"-char");
		char_img = $('#boxplayer2').find('img');
		char_img.attr('src', "img/" + char2 +"-img.png");


		if(char1 == char2){
			alert("Error: can't have two of same char");
		} else{
			if ($('#boxplayer1').attr('data-value') == "ai"){
				solvePosition(board);
			}
			$('#player_select_screen').toggle();
			$('#game_screen').toggle();	
		}
	});

	$('.player1-mode').click(function(e){ //toggle player 1
		toggle_player1();
	});

	$('.player2-mode').click(function(e){ //toggle player 2

		toggle_player2();
	});
});