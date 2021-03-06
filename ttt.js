// const prompt = require('prompt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let boardContent, isOccupied, numSquaresFilled, winCombo, turn, status;

(function initialize() {
    turn = 0;  
    isOccupied = []; //
    boardContent = []; //
    numSquaresFilled = 0;
    winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //looping to...
    for (var i = 0; i < 9; i++) {
      isOccupied[i] = false;
      boardContent[i] = i;
    }
    printBoard();

    console.log('Please select a cell Num? '); //ask question

    rl.on('line', (answer) => {
      console.log('You have selected cell #:', answer);
      markCell(answer); 
    });  

}());

function markCell (cellNum) {
  //check if cell is occupied
  if(isOccupied[cellNum] === false) {
    //check who is playing
    if(turn % 2 === 0) boardContent[cellNum] = "X"; 
    else boardContent[cellNum] = "O"; 

    //Continue with 
    turn++;
    numSquaresFilled++;
    isOccupied[cellNum] = true;
    checkForWinners(boardContent[cellNum]);
    if(numSquaresFilled === 9) {
      console.log("Game Over");
      rl.close();
    }
    
    printBoard();

  } else {
    console.log("The cell is occupied, please select another cell");
  }
}

function checkForWinners(symbol) {

  for(let i = 0; i < winCombo.length; i++) {
    if(boardContent[winCombo[i][0]] == symbol &&
       boardContent[winCombo[i][1]] == symbol &&
       boardContent[winCombo[i][2]] == symbol) {
        console.log(symbol + " Won!");
        rl.close();
    }
  }
}


function printBoard () {
  console.log("\n" +
    boardContent[0] + "|" + boardContent[1] + "|" +  boardContent[2] + "\n" +        
    boardContent[3] + "|" + boardContent[4] + "|" +  boardContent[5] + "\n" +        
    boardContent[6] + "|" + boardContent[7] + "|" +  boardContent[8] + "\n"        
              );
}