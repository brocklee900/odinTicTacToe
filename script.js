const game = (function () {
    
    //Create GameBoard
    const gameBoard = (function () {
    	let playingBoard = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
        
        const printBoard = () => console.log(playingBoard);
        //Update Board when player makes a move
        const updateBoard = (marker, position) => {
        	playingBoard[position] = marker;
        }
        return {printBoard, updateBoard};
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
            changeTurn();
        }
        return {playerAction};
    })(gameBoard, playerOne, playerTwo);
    
    return { gameManager };
})();

game.gameManager.playerAction(1);
game.gameManager.playerAction(5);
game.gameManager.playerAction(4);
game.gameManager.playerAction(8);