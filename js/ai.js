function randomMove(){
	var x_rand = Math.floor(Math.random()*7);
	return x_rand;
}

function NegaMaxSolver(){
	this.nodeCount;
}

NegaMaxSolver.prototype.solve = function(position){
	nodeCount = 0;
	return this.negamax(position);
};

NegaMaxSolver.prototype.negamax = function(position){
	//return position +=""+(0);
	nodeCount++;
	if (gameIsDraw()){
		return 0;
	}

	for (var x=0;x<=6;x++){
		y = dropToBottom(x, 0);
		if(!posIsTaken(x,y) && checkWinner(x,y)){
			return (7*7 - position.length)/2;
		}
	}

	var bestScore = -6*7;

	for (var x=0;x<=6;x++){
		y = dropToBottom(x, 0);
		if(!posIsTaken(x,y)){
			position2 = position;
			
			var score = -negamax(position2);
			if(score > bestScore){
				bestScore = score;
			}
		}
	}
	return bestScore;



	     //  for(int x = 0; x < Position::WIDTH; x++) // check if current player can win next move
      //   if(P.canPlay(x) && P.isWinningMove(x)) 
      //     return (Position::WIDTH*Position::HEIGHT+1 - P.nbMoves())/2;

      // int bestScore = -Position::WIDTH*Position::HEIGHT; // init the best possible score with a lower bound of score.
      
      // for(int x = 0; x < Position::WIDTH; x++) // compute the score of all possible next move and keep the best one
      //   if(P.canPlay(x)) {
      //     Position P2(P);
      //     P2.play(x);               // It's opponent turn in P2 position after current player plays x column.
      //     int score = -negamax(P2); // If current player plays col x, his score will be the opposite of opponent's score after playing col x
      //     if(score > bestScore) bestScore = score; // keep track of best possible score so far.
      //   }

      // return bestScore;
};

NegaMaxSolver.prototype.getNodeCount = function(){
	return this.nodeCount;
};
