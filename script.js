
const game = (function () {
    
    //Create GameBoard
    const gameBoard = (function () {
    	let playingBoard = ['', '', '', '', '', '', '', '', ''];
        
        const getBoard = () =>  {
            return playingBoard;
        }
        
        //Check board for tie game
        const checkGameTie = () => {
        	return playingBoard.includes('') ? false : true;
        }
        
        //Check board to see if a player has won the game
        const checkGameWin = () => {
        	//Rows
        	if (playingBoard[0] != '' && playingBoard[0] == playingBoard[1] && playingBoard[1] == playingBoard[2]) {
            	return true;
            } else if (playingBoard[3] != '' && playingBoard[3] == playingBoard[4] && playingBoard[4] == playingBoard[5]) {
            	return true;
            } else if (playingBoard[6] != '' && playingBoard[6] == playingBoard[7] && playingBoard[7] == playingBoard[8]) {
            	return true;
            //Columns
            } else if (playingBoard[0] != '' && playingBoard[0] == playingBoard[3] && playingBoard[3] == playingBoard[6]) {
            	return true;
            } else if (playingBoard[1] != '' && playingBoard[1] == playingBoard[4] && playingBoard[4] == playingBoard[7]) {
            	return true;
            } else if (playingBoard[2] != '' && playingBoard[2] == playingBoard[5] && playingBoard[5] == playingBoard[8]) {
            	return true;
            } else if (playingBoard[0] != '' && playingBoard[0] == playingBoard[4] && playingBoard[4] == playingBoard[8]) {
            	return true;
			} else if (playingBoard[2] != '' && playingBoard[2] == playingBoard[4] && playingBoard[4] == playingBoard[6]) {
            	return true;
			} else {
            	return false;
            }
        }
        
        //Check if the Game has ended
        //1 if a player won, 0 if the game is in progress, -1 if its a tie
        const checkGameEnd = () => {
        	if (checkGameWin()) {
            	return 1;
            } else if (checkGameTie()) {
            	return -1;
            } else {
            	return 0;
            }
        }
        
        //Update Board when player makes a move
        const updateBoard = (marker, position) => {
        	if (playingBoard[position] == '') {
            	playingBoard[position] = marker;
            }
        }

        //Clear game board to restart the game
        const clearBoard = () => {
            playingBoard = ['', '', '', '', '', '', '', '', ''];
        }
        
        return {getBoard, checkGameEnd, updateBoard, clearBoard};
	})();
    
    
    //Create Players
    function makePlayer(playerMarker) {
    	const marker = playerMarker;

        //return this player's marker
        const getMarker = () => {
        	return marker;
        }
        return { getMarker };
    };
    
    const playerOne = makePlayer("x");
    const playerTwo = makePlayer("o");
    
    //Create GameManager
    //The GameManager will handle the gameboard and player objects so
    //that they don't need to be accessed outside of this factory function
    const gameManager = (function(gameBoard, playerOne, playerTwo) {
        let currentPlayer = playerOne;
        
        //Switch between the two players' turn
        const changeTurn = () => {
        	if (currentPlayer == playerOne) {
            	currentPlayer = playerTwo;
            } else {
            	currentPlayer = playerOne;
            }
        }
        
        //Execute a player's action and update board
        const playerAction = (position) => {
            let marker = currentPlayer.getMarker();
            if (gameBoard.checkGameEnd() != 1) {
                gameBoard.updateBoard(marker, position);
                changeTurn();
            }
            return [gameBoard.getBoard(), gameBoard.checkGameEnd(), marker];
        }

        //Reset the game
        const resetGame = () => {
            gameBoard.clearBoard();
            currentPlayer = playerOne;
        }

        return {playerAction, resetGame};
    })(gameBoard, playerOne, playerTwo);
    
    return { gameManager };
})();

const gameDisplay = document.querySelector("#gameContainer");
gameDisplay.addEventListener("click", (e) => {
    let endText = document.querySelector("#results");

    if (endText.textContent == "") {
        results = game.gameManager.playerAction(+e.target.id);
        let board = results[0];
        let cells = gameDisplay.children;

        cells[+e.target.id].firstElementChild.textContent = board[+e.target.id];

        if (results[1] == -1) {
            endText.textContent = "Tie Game!";
        } else if (results[1] == 1) {
            endText.textContent = `Player ${results[2]} wins!`;
        }
    }
});

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", (e) => {
    let cells = gameDisplay.children;
    for (let cell of cells) {
        cell.firstElementChild.textContent = "";
    }
    document.querySelector("#results").textContent = "";
    game.gameManager.resetGame();
});

