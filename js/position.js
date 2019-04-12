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
			//alert("not valid position");
			return false;
		}
		this.play(column); //play the column
	}
	return true;
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