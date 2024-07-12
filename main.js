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
        /*
		console.log("Current position is:");
		console.log(oldPosition);
		console.log("Submitted Move is:");
		console.log(newPosition);
        */
		// get all moves from current position
		const possibleMoves = adjacencyList[oldPosition[0]][oldPosition[1]];
        /*
		console.log("Possible moves at current position:");
		console.log(possibleMoves);
        */
		// filter for moves within the board
		const validMoves = possibleMoves.filter(
			(move) => move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7
		);
        /*
		console.log("valid moves at current position:");
		console.log(validMoves);
        */
		// if move array position startX and startY includes an element with [endX, endY]
		// && if neither start or end position are above 7 or below 0 (out of board)
		for (let i = 0; i < validMoves.length; i++) {
			/*
            console.log(`Move Attempt ${i}:`);
			console.log(newPosition);
			console.log("Valid Move to check:");
			console.log(validMoves[i]);
            */
			if (
				validMoves[i][0] === newPosition[0] &&
				validMoves[i][1] === newPosition[1]
			) {
				//console.log("Valid Move");
				// update old Position
				oldPosition = newPosition;
				// move is legal, return move coords
				return [oldPosition, newPosition];
			}
		}
		// else return false - invalid move
		//console.log("Invalid move");
		return false;
	}
	// renders board on DOM
	// board is re-rendered after every move so no need to delete old content
	function renderBoard(position = [0, 1]) {
		const squares = document.getElementById("squares");
		// clear old board
		while (squares.lastChild) {
			squares.removeChild(squares.lastChild);
		}
		for (let i = 0; i < 8; i++) {
			for (let j = 1; j < 9; j++) {
				const square = document.createElement("div");
				square.classList.add("square");
				square.id = i * 8 + j;
				// allow click to move
				square.addEventListener("click", () => {
					const position = move(oldPosition, [i, j - 1]);
					if (position) {
						// update old position
						oldPosition = position[0];
						//console.log("Old Position:");
						//console.log(oldPosition);
						// render new position
						renderBoard(position[1]);
					} else {
						//console.log("Move was Invalid, try again");
					}
				});
				squares.appendChild(square);
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
let oldPosition = [0, 1];
submitButton.addEventListener("click", () => {
	const endX = parseInt(xInput.value);
	const endY = parseInt(yInput.value);
	const position = knightMoves.move(oldPosition, [endX, endY]);
	if (position) {
		// update old position
		oldPosition = position[0];
		//console.log("Old Position:");
		//console.log(oldPosition);
		// render new position
		knightMoves.renderBoard(position[1]);
	} else {
		//console.log("Move was Invalid, try again");
	}
});
