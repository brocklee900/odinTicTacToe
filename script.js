const game = (function () {
    
    //Create GameBoard
    const gameBoard = (function () {
    	let playingBoard = ['', '', '', '', '', '', '', '', '']
        
        const printBoard = () => console.log(playingBoard);
        
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
        
        return {printBoard, updateBoard, checkGameEnd};
	})();
    
    
    //Create Players
    function makePlayer(playerMarker) {
    	const marker = playerMarker;
        let score = 0;
        
        const printStatus = () => console.log(marker, score);
        //return this player's marker
        const getMarker = () => {
        	return marker;
        }
        return { printStatus, getMarker };
    };
    
    const playerOne = makePlayer("x");
    const playerTwo = makePlayer("o");
    
    //Create GameManager
    //The GameManager will handle the gameboard and player objects so
    //that they don't need to be accessed outside of this factory function
    const gameManager = (function(gameBoard, playerOne, playerTwo) {
    	const printBoard = () => gameBoard.printBoard();
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
        	gameBoard.updateBoard(currentPlayer.getMarker(), position);
            gameBoard.printBoard();
            console.log(gameBoard.checkGameEnd());
            changeTurn();
        }
        return {playerAction};
    })(gameBoard, playerOne, playerTwo);
    
    return { gameManager };
})();

game.gameManager.playerAction(0);
game.gameManager.playerAction(2);
game.gameManager.playerAction(1);
game.gameManager.playerAction(3);
game.gameManager.playerAction(5);
game.gameManager.playerAction(4);
game.gameManager.playerAction(6);
game.gameManager.playerAction(8);
game.gameManager.playerAction(7);