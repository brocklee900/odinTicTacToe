
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
    function makePlayer(playerName, playerMarker) {
        let name = playerName;
    	const marker = playerMarker;

        //return this player's marker
        const getMarker = () => {
        	return marker;
        }

        //return player's name
        const getName = () => {
            return name;
        }

        //Change player name
        const setName = (newName) => {
            name = newName;
        }
        return { getMarker, getName, setName };
    };
    
    const playerOne = makePlayer("Player One", "x");
    const playerTwo = makePlayer("Player Two", "o");
    
    //Create GameManager
    //The GameManager will handle the gameboard and player objects so
    //that they don't need to be accessed outside of this factory function
    const gameManager = (function(gameBoard, playerOne, playerTwo) {
        let currentPlayer = playerOne;
        let gameStatus = false;
        
        //Switch between the two players' turn
        const changeTurn = () => {
        	if (currentPlayer == playerOne) {
            	currentPlayer = playerTwo;
            } else {
            	currentPlayer = playerOne;
            }
        }

        const toggleGameStatus = () => {
            gameStatus = !gameStatus;
        }
        
        //Execute a player's action and update board
        const playerAction = (position) => {
            if (gameStatus) {
                gameBoard.updateBoard(currentPlayer.getMarker(), position);

                if (gameBoard.checkGameEnd() != 0) {
                    toggleGameStatus();
                } else {
                    changeTurn();
                }
            }
            return [gameBoard.getBoard(), gameBoard.checkGameEnd(), currentPlayer.getName()];
        }

        const startGame = () => {
            if (!gameStatus) {
                toggleGameStatus();
            }
        }

        //Reset the game
        const resetGame = () => {
            gameBoard.clearBoard();
            currentPlayer = playerOne;
            if (gameStatus) {
                toggleGameStatus();
            }
        }

        //Update player names
        const updateNames = (name1, name2) => {
            playerOne.setName(name1);
            playerTwo.setName(name2);
        }

        return {playerAction, startGame, resetGame, updateNames };
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
            endText.textContent = `${results[2]} wins!`;
        }
    }
});

document.querySelector("#start").addEventListener("click", (e) => {
    game.gameManager.startGame();
});
document.querySelector("#reset").addEventListener("click", (e) => {
    let cells = gameDisplay.children;
    for (let cell of cells) {
        cell.firstElementChild.textContent = "";
    }
    document.querySelector("#results").textContent = "";
    game.gameManager.resetGame();
});

const dialog = document.querySelector("#nameChangeDialog");
document.querySelector("#editNames").addEventListener("click", (e) => {
    dialog.showModal();
});
document.querySelector("#close").addEventListener("click", (e) => {
    dialog.close();
});
document.querySelector("#changeNames").addEventListener("click", (e) => {
    let p1 = document.querySelector("#playerOne");
    let p2 = document.querySelector("#playerTwo");

    if (p1.value == "") {
        p1.value = "Player One";
    }
    if (p2.value == "") {
        p2.value = "Player Two";
    }

    game.gameManager.updateNames(p1.value, p2.value);
    dialog.close();
});
