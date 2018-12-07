function randomMove(){
	var x_rand = Math.floor(Math.random()*7);
	return x_rand;
}

function NegaMaxSolver(){
	this.nodeCount;
	this.solutions = [null,null,null,null,null,null,null];
}

NegaMaxSolver.prototype.solve = function(P,weak){
	nodeCount = 0;
	nodeNum=0;
	if(weak){
		return this.negamax(P,nodeNum,-1,1);
	} else{
		return this.negamax(P,nodeNum,-WIDTH*HEIGHT/2,WIDTH*HEIGHT/2);
	}
	
};

NegaMaxSolver.prototype.negamax = function(P,nodeNum,alpha,beta){
	
	//return position +=""+(0);
	nodeCount++;
	columnOrder = [3,2,4,1,5,0,6];

	//debugger;
	if (P.moves===WIDTH*HEIGHT){
		//alert("in here " + P.moves);
		return 0;
	}

	for (var x=0;x<=6;x++){
		if(P.canPlay(x) && P.isWinningMove(x)){
			score = Math.floor((WIDTH*HEIGHT +1 - P.moves)/2);
			if(nodeCount===1){
				this.solutions.splice(x,1,score);
			}
			//debugger;
			return score;
		}
	}

	var max = Math.floor((WIDTH*HEIGHT-1-P.moves)/2);
	if(beta > max) {
        beta = max;                     // there is no need to keep beta above our max possible score.
        if(alpha >= beta) {
        	return beta;  // prune the exploration if the [alpha;beta] window is empty.
        }
    }

	//var bestScore = -WIDTH*HEIGHT;

	for (var x=0;x<=6;x++){

		//if(P.canPlay(x)){
			//alert("x is: " + x + " columnOrder is: " + columnOrder[x]);
			if(P.canPlay(columnOrder[x])){
			//debugger;
			var p2 = new Position();
	
			p2 = $.extend(true,{},P);
			//p2.play(x);
			p2.play(columnOrder[x]);
			var score = -this.negamax(p2,nodeNum+1,-beta,-alpha);
			
			// if(score > bestScore){
			// 	bestScore = score;
			// }

			if(score >= beta){

				if(nodeNum===0){
					//alert("could be better move: alpha cut off investigate later");
					//alert(nodeNum +", score:" + score + ", at:" + x +", nodeCount:" +nodeCount);
					// debugger;
					 //this.solutions.splice(x,1,score);
					 this.solutions.splice(columnOrder[x],1,score);
				}

				return score;
			}

			if (score > alpha){
				alpha = score;
			}

			if(nodeNum===0){
				if(x===6){
					debugger;
				}
				//alert(nodeNum +", score:" + score + ", at:" + x +", nodeCount:" +nodeCount);
			// debugger;
				//this.solutions.splice(x,1,score);
				this.solutions.splice(columnOrder[x],1,score);
			}
		}
	}
	return alpha;
};

NegaMaxSolver.prototype.getNodeCount = function(){
	return this.nodeCount;
};
