//board[row][column] - filled from top to bottom

function Position(){
	this.moves = 0;
	this.board = [[0,0,0,0,0,0,0],
    	         [0,0,0,0,0,0,0],
        	     [0,0,0,0,0,0,0],
            	 [0,0,0,0,0,0,0],
             	 [0,0,0,0,0,0,0],
             	 [0,0,0,0,0,0,0]];
	this.height = [0,0,0,0,0,0,0];
	this.pos = '';
}

Position.prototype.canPlay = function(column){ //can play in a column if height of column not yet max
	return this.height[column] < HEIGHT;
};

Position.prototype.play = function(column){ //plays a column
	this.board[this.height[column]][column] = 1 + this.moves%2; //put the current player in the board
	this.height[column]++; //increment height of that column
	this.moves++; //increment number of moves
	this.pos = this.pos + (column+1);
	//alert(this.pos);

};

Position.prototype.playString = function(string){ //plays a string of moves
	for (var i=0;i<string.length;i++){ //loop through the moves
		var column = string.charAt(i); //get the column to play
		column = column-1;
		if (column < 0 || column >=WIDTH || !this.canPlay(column) || this.isWinningMove(column)){ //can't play if given move immpossible to reach in actual game
			alert("not valid position");
			return i;
		}
		this.play(column); //play the column
	}
	return string.length;
};

Position.prototype.isWinningMove = function(column){ //check if a move is a winning one
	var current_player = 1 + this.moves%2;
	//debugger;
	if(this.height[column] >=3
		&& this.board[this.height[column]-1][column] === current_player
		&& this.board[this.height[column]-2][column] === current_player
		&& this.board[this.height[column]-3][column] === current_player)
	{
//alert("hi2");
WIN_DY=-1;
		return true;
	}

	for(var dy = -1; dy <=1;dy++){ //iterate on horizontal (dy=0) or two diagonal directions (dy = -1 or dy = 1)
		var num = 0;
		//WIN_DX = 0;
		//WIN_DY = 0;

		for(var dx = -1;dx<=1;dx+=2){
			for(var x=column+dx,y=this.height[column]+dx*dy;x>=0 && x< WIDTH && y >=0 && y< HEIGHT && this.board[y][x]===current_player;num++){
				x+=dx;
				y+=dx*dy;
			}

			if (num >=3){
				debugger;
				//alert(x+","+y);
				WIN_DX = -dx;
				WIN_DY = -dy*dx;
				WIN_X = x;
				WIN_Y = y;
				return true;
			}
		}

	}


	return false;
};


//////////////////////////////////////////NEW POSITION//////////////////////////////////////////////////

//Max int for simple bitwise operations
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers

//var MAX_SIGNED_32_BIT_INT = Math.pow(2, 31) - 1;
//var MIN_SIGNED_32_BIT_INT = ~MAX_SIGNED_32_BIT_INT;

// function Position(){
// 	this.moves = 0;
// 	this.current_position =  new Long(0,0);
// 	this.mask = new Long(0,0);
// }

// Position.prototype.canPlay = function(column){ 
	
// 	return (this.mask.and(this.top_mask(column))).isZero();
// };

// // return a bitmask containg a single 1 corresponding to the top cel of a given column
// Position.prototype.top_mask = function(column){ 
// 	var val = new Long(1,0);
// 	return (val.shiftLeft(HEIGHT-1)).shiftLeft(column*(HEIGHT+1));
// };

// Position.prototype.play = function(column){ //plays a column

//     this.current_position = this.current_position.xor(this.mask);
//     this.mask = this.mask.or(this.mask.add(this.bottom_mask(column)));
//     this.moves++;
// };

//  // return a bitmask containg a single 1 corresponding to the bottom cell of a given column
// Position.prototype.bottom_mask = function(column){ 
// 	var val = new Long(1,0);
// 	return val.shiftLeft(column*(HEIGHT+1));
// };

// Position.prototype.playString = function(string){ //plays a string of moves
// 	//debugger;
// 	for (var i=0;i<string.length;i++){ //loop through the moves
// 		var column = string.charAt(i); //get the column to play
// 		column = column-1;
// 		if (column < 0 || column >=WIDTH || !this.canPlay(column) || this.isWinningMove(column)){ //can't play if given move immpossible to reach in actual game
// 			//debugger;
// 			alert("not valid position");
// 			return i;
// 		}
// 		this.play(column); //play the column
// 	}
// 	return string.length;
// };

// Position.prototype.isWinningMove = function(column){ 
// 	pos = this.current_position;
// 	pos = pos.or(this.mask.add(this.bottom_mask(column)).and(this.column_mask(column)));
//     return this.alignment(pos);
// };

// // return a bitmask 1 on all the cells of a given column
// Position.prototype.column_mask = function(column){ 
// 	//return ((1 << HEIGHT) -1) << column*(HEIGHT+1);
// 	var val = new Long(1,0);
// 	var one = new Long(1,0);
// 	return ((val.shiftLeft(HEIGHT).subtract(one)).shiftLeft(column*(HEIGHT+1)));
// };

// Position.prototype.alignment = function(pos){ 
// 	var one = new Long(1,0);
//         // horizontal 
//         m = pos.and(pos.shiftRight(HEIGHT+1));
        
//         if (!((m.and(m.shiftRight(2*(HEIGHT+1)))).isZero())) return true;

//         // diagonal 1
//         m = pos.and(pos.shiftRight(HEIGHT));
//         if(!((m.and(m.shiftRight(2*HEIGHT))).isZero())) return true;

//         // diagonal 2 
//         m = pos.and(pos.shiftRight(HEIGHT+2));
//          if(!((m.and(m.shiftRight(2*HEIGHT+2))).isZero())) return true;

//         // vertical;
//         m = pos.and(pos.shiftRight(one));
//         if(!((m.and(m.shiftRight(2))).isZero())) return true;

//         return false;
// };

// Position.prototype.key = function(){ 
// 	var bottom = new Long(100000010000001000000100,0000100000010000001000000);
// 	return this.current_position.add(this.mask).add(bottom);
// };
