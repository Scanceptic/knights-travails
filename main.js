// establish rules of board
// dont go beyond the edges (7x7)
// can only go to [x+/-1, y+/-2] or [x+/-2, y+/-1] valid moves for knight
// for every square, there is a number of possible moves, choose a data structure that will accomodate this
// which search algorithm is best to use for this
// use the search algorithm to find the shortest path between the start and end
// output the full path - every node stopped at along the way
function knightMoves([startX, startY], [endX, endY]) {
	// build a graph of all possible moves from [startX startY] to [endX endY]?
	// edge list? adjacency matrix? adjacency list?
	// build adjacency list for each of the 64 possible start positions
	const adjacencyList = [];
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
            // push all valid moves from that square
			adjacencyList[i][j].push(
				[i + 1, j + 2],
				[i - 1, j + 2],
				[i - 1, j - 2],
				[i + 1, j - 2],
				[i + 2, j + 1],
				[i + 2, j - 1],
				[i - 2, j + 1],
				[i - 2, j - 1]
			);
		}
		// TODO: check valid moves to push
	}
	// all possible grids and their relationship to each other FROM THE PERSPECTIVE OF THE KNIGHT MOVES (L shape)
	// then find the shortest distance to endX endY
	// this is the quickest set of moves
}
