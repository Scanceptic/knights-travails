// establish rules of board
// dont go beyond the edges (7x7)
// can only go to [x+/-1, y+/-2] or [x+/-2, y+/-1] valid moves for knight
// for every square, there is a number of possible moves, choose a data structure that will accomodate this
// which search algorithm is best to use for this
// use the search algorithm to find the shortest path between the start and end
// output the full path - every node stopped at along the way
function knightMoves() {
	// build a graph of all possible moves from [startX startY] to [endX endY]?
	// edge list? adjacency matrix? adjacency list?
	// build adjacency list for each of the 64 possible start positions
	const adjacencyList = [];
	for (let i = 0; i < 8; i++) {
		const adjacencyRow = [];
		for (let j = 0; j < 8; j++) {
			// push all valid moves from that square
			adjacencyRow.push([
				[i + 1, j + 2],
				[i - 1, j + 2],
				[i - 1, j - 2],
				[i + 1, j - 2],
				[i + 2, j + 1],
				[i + 2, j - 1],
				[i - 2, j + 1],
				[i - 2, j - 1],
			]);
		}
		adjacencyList.push(adjacencyRow);
		// TODO: check valid moves to push
	}
	// all possible grids and their relationship to each other FROM THE PERSPECTIVE OF THE KNIGHT MOVES (L shape)
	// then find the shortest distance to endX endY
	// this is the quickest set of moves
	// checks move is valid
	function move(startX, startY, endX, endY) {
		// if move array position startX and startY includes an element with [endX, endY]
		// && if neither start or end position are above 7 or below 0 (out of board)
		if (
			(adjacencyList[startX][startY].includes([endX, endY]) === true && startX,
			startY,
			endX,
			endY >= 0 && startX,
			startY,
			endX,
			endY < 8)
		) {
			// remove old position
			//adjacencyList[startX][startY]
			// add new position
			//adjacencyList[endX][endY]
			// move is legal, return move coords
			return endX, endY;
		} else {
			// else return false - invalid move
			return false;
		}
	}
	return { adjacencyList, move };
}
// creates board on DOM
function createBoard() {
	const board = document.getElementById("board");
	for (let i = 0; i < 8; i++) {
		for (let j = 1; j < 9; j++) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.id = i * 8 + j;
			board.appendChild(square);
		}
	}
}
// takes valid move from move func and renders on DOM
function renderMove(moveX, moveY) {
	const board = document.getElementById("board");
	const squares = document.querySelectorAll("square");
	const moveSquare = moveX * 8 + moveY;
	const moveSquareDOM = document.getElementById(`${moveSquare}`);
	moveSquareDOM.textContent = "Knight";
}
