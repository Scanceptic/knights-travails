// factory func for knight moves
function createKnightMoves() {
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
	}
	// checks move is valid
	function move(oldPosition, newPosition) {
		// if move array position startX and startY includes an element with [endX, endY]
		// && if neither start or end position are above 7 or below 0 (out of board)
		if (
			adjacencyList[oldPosition[0]][oldPosition[1]].includes([
				newPosition[0],
				newPosition[1],
			]) === true &&
			(oldPosition[0],
			oldPosition[1],
			newPosition[0],
			newPosition[1] >= 0 && oldPosition[0],
			oldPosition[1],
			newPosition[0],
			newPosition[1] < 8)
		) {
			// set position
			let position = [newPosition[0], newPosition[1]];
			// move is legal, return move coords and old move
			return { position, oldPosition };
		} else {
			// else return false - invalid move
			return false;
		}
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
		const moveSquare = moveX * 8 + moveY + 1;
		const moveSquareDOM = document.getElementById(`${moveSquare}`);
		moveSquareDOM.textContent = "Knight";
		let oldPosition = [moveX, moveY];
		return oldPosition;
	}
	return { adjacencyList, move, createBoard, renderMove };
}

const submitButton = document.getElementById("submit-move");
const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
submitButton.addEventListener("click", () => {
	const endX = xInput.textContent;
	const endY = yInput.textContent;
});
