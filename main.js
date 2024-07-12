// factory func for knight moves
function createKnightMoves() {
	// build adjacency list for each of the 64 possible start positions
	const adjacencyList = [];
	// start position
	let oldPosition = [0, 1];
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
	function move(oldPosition, newPosition, journey = false) {
		// get all moves from current position
		const possibleMoves = adjacencyList[oldPosition[0]][oldPosition[1]];
		// filter for moves within the board
		const validMoves = possibleMoves.filter(
			(move) => move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7
		);
		// if move array position startX and startY includes an element with [endX, endY]
		// && if neither start or end position are above 7 or below 0 (out of board)
		for (let i = 0; i < validMoves.length; i++) {
			if (
				validMoves[i][0] === newPosition[0] &&
				validMoves[i][1] === newPosition[1]
			) {
				// update old Position
				oldPosition = newPosition;
				// move is legal, return move coords
				return [oldPosition, newPosition];
			}
		}
		// if he's on a journey return validMoves
		if (journey === true) {
			return validMoves;
		} else {
			// else return false
			return false;
		}
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
				// show valid move on hover
				square.addEventListener("mouseover", () => {
					const validMove = move(oldPosition, [i, j - 1]);
					if (validMove) {
						square.style.backgroundColor = "#55FF55";
					} else {
						square.style.backgroundColor = "#FF5555";
					}
				});
				square.addEventListener("mouseleave", () => {
					square.style.backgroundColor = null;
				});
				// allow click to move
				square.addEventListener("click", () => {
					const position = move(oldPosition, [i, j - 1]);
					if (position) {
						// update old position
						oldPosition = position[0];
						console.log(oldPosition);
						// render new position
						renderBoard(position[1]);
					} else {
						// go on a journey
						journey(oldPosition, [i, j - 1]);
					}
				});
				squares.appendChild(square);
				if (
					position &&
					position[0] * 8 + position[1] + 1 === parseInt(square.id)
				) {
					const knightImage = document.createElement("img");
					knightImage.src = "images/knight.jpg";
					knightImage.alt = "Knight";
					knightImage.id = "knightImage";
					square.appendChild(knightImage);
					square.classList.add("knight");
				}
			}
		}
	}

	// move if invalid to take the most optimal route with pauses inbetween to show on screen
	function journey(position = oldPosition, destination) {
		try {
			console.log("Going on a journey...");
			// get all the valid moves from here
			const validMoves = move(oldPosition, destination, true);
			console.log("valid moves are:");
			console.log(validMoves);
			// attempt to journey all the moves again
			journey(validMoves, destination);
		} catch (error) {
			// watch out for recursion wooo
			console.log(error);
		}
	}

	return { move, renderBoard, journey };
}

const knightMoves = createKnightMoves();
knightMoves.renderBoard();
