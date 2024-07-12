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
	function move(oldPosition = [0, 1], newPosition) {
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
			// update old Position
			oldPosition = newPosition;
			// move is legal, return move coords
			return [oldPosition, newPosition];
		} else {
			// else return false - invalid move
			console.log("Invalid move");
			return false;
		}
	}
	// renders board on DOM
	// board is re-rendered after every move so no need to delete old content
	function renderBoard(position = [0, 1]) {
		const board = document.getElementById("squares");
		for (let i = 0; i < 8; i++) {
			for (let j = 1; j < 9; j++) {
				const square = document.createElement("div");
				square.classList.add("square");
				square.id = i * 8 + j;
				board.appendChild(square);
				if (
					position &&
					position[0] * 8 + position[1] + 1 === parseInt(square.id)
				) {
					square.textContent = "Knight";
					square.classList.add("knight");
				}
			}
		}
	}
	return { adjacencyList, move, renderBoard };
}

const knightMoves = createKnightMoves();
knightMoves.renderBoard();

const submitButton = document.getElementById("submit-move");
const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
submitButton.addEventListener("click", () => {
	const endX = xInput.textContent;
	const endY = yInput.textContent;
	const position = knightMoves.move(undefined, [endX, endY]);
	// update old position
	oldPosition = position[0];
	// render new position
	knightMoves.renderBoard(position[1]);
});
