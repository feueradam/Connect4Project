function randomMove(){
	var x_rand = Math.floor(Math.random()*7);
	return x_rand;
}

function NegaMaxSolver(){
	this.nodeCount;
	this.solutions = [null,null,null,null,null,null,null];
}

NegaMaxSolver.prototype.solve = function(P){
	nodeCount = 0;
	nodeNum=0;
	return this.negamax(P,nodeNum);
};

NegaMaxSolver.prototype.negamax = function(P,nodeNum){
	
	//return position +=""+(0);
	nodeCount++;
	//debugger;
	if (P.moves===WIDTH*HEIGHT){
		//alert("in here " + P.moves);
		return 0;
	}

/////WORKS FOR ALL OCCASIONS OTHER THAN GOES STRAIGHT IN HERE
	for (var x=0;x<=6;x++){
		if(P.canPlay(x) && P.isWinningMove(x)){
			//debugger;
			score = Math.floor((WIDTH*HEIGHT +1 - P.moves)/2);
			//debugger;
			// if (score > this.solutions[x]){
			// 	this.solutions.splice(x,1,score);
			// }
			if(nodeCount===1){
				//debugger;
				this.solutions.splice(x,1,score);
			}
			return score;
		}
	}

	var bestScore = -WIDTH*HEIGHT;

	for (var x=0;x<=6;x++){
		if(P.canPlay(x)){
			//debugger;
			var p2 = new Position();
			
			//p2 = P;
			//p2 = Object.assign({},P);
			//p2 = JSON.parse(JSON.stringify(P));
			p2 = $.extend(true,{},P);
			p2.play(x);
			var score = -this.negamax(p2,nodeNum+1);
			
			if(score > bestScore){
				bestScore = score;
			}

		///////IF ON THE FIRST NODE then update
		if(nodeNum===0){
			//alert(nodeNum +", score:" + score + ", at:" + x +", nodeCount:" +nodeCount);
			// debugger;
			 this.solutions.splice(x,1,score);
		}

		}
	}
	return bestScore;
};

NegaMaxSolver.prototype.getNodeCount = function(){
	return this.nodeCount;
};
