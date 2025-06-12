const game = (function () {
    
    //Create GameBoard
    const gameBoard = (function () {
    	let playingBoard = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
        ];
        
        const printBoard = () => console.log(playingBoard);
        return {printBoard};
	})();
    
    
    //Create Players
    function makePlayer(playerMarker) {
    	const marker = playerMarker;
        let score = 0;
        
        const printStatus = () => console.log(marker, score);
        const addScore = () => score++;
        return {printStatus, addScore};
    };
    
    const playerOne = makePlayer("x");
    const playerTwo = makePlayer("o");
    
    //Create GameManager
    const gameManager = (function(gameBoard) {
    	const printBoard = () => gameBoard.printBoard();
        return {printBoard};
    })(gameBoard);
    
    return { gameBoard, playerOne, playerTwo, gameManager };

})();

game.gameBoard.printBoard();
game.playerOne.printStatus();
game.playerOne.addScore();
game.playerOne.printStatus();
game.playerTwo.printStatus();
game.playerTwo.addScore();
game.playerTwo.addScore();
game.playerTwo.printStatus();
game.gameManager.printBoard();