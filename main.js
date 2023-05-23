//some variables
let board = [];
let turn = 1;
let greenCount = 0
let redCount = 0

//cached elements
const playerRedPieces = document.querySelector("#playerRedPieces");
const playerGreenPieces = document.querySelector("#playerGreenPieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board")
const winner = document.querySelector("#winner")

//initialise
function initialise () {
  board = [
    [],
    [],
    [],
    [],
    [-1,null,-1,null,-1,null,-1,null],
    [null,-1,null,-1,null,-1,null,-1],
    [-1,null,-1,null,-1,null,-1,null],
    [null,0,null,0,null,0,null,0],
    [0,null,0,null,0,null,0,null],
    [null,1,null,1,null,1,null,1],
    [1,null,1,null,1,null,1,null],
    [null,1,null,1,null,1,null,1],
    [],
    [],
    [],
    [],
  ];
  turn = 1;
  render()
}

//rendering the board and rules
function renderBoard () {
  //clear the board
  while (boardSection.firstChild) {
    boardSection.removeChild(boardSection.firstChild)
  }
  //build the board
  board.forEach ((row,rowIndex) => {
      row.forEach((column, columnIndex) => {
        const squareElement = document.createElement("div")
        boardSection.append(squareElement)
        //add square colours
        squareElement.classList.add("whiteSquare");
        if (rowIndex % 2 === 0 && columnIndex % 2 === 0) {
          squareElement.classList.remove("whiteSquare");
          squareElement.classList.add("blackSquare");
        } else if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
          squareElement.classList.remove("whiteSquare");
          squareElement.classList.add("blackSquare");
        }
        const checkerPieces = document.createElement("div")
        squareElement.append(checkerPieces)
        checkerPieces.setAttribute("row", rowIndex)
        checkerPieces.setAttribute("column", columnIndex)
        //this is to show how the board on the screen will change based on the values in the board array in javascript
        if (board[rowIndex][columnIndex] === -1) {
          checkerPieces.classList.add("redCheckersPiece")
        } else if (board[rowIndex][columnIndex] === 1) {
          checkerPieces.classList.add("greenCheckersPiece")
        } else if (board[rowIndex][columnIndex] === 0) {
          checkerPieces.classList.add("noCheckersPiece")
        } else if (board[rowIndex][columnIndex] === 3 || board[rowIndex][columnIndex] === -3) {
          checkerPieces.classList.add("optionCheckersPiece")
        } else if (board[rowIndex][columnIndex] === -2) {
          checkerPieces.classList.add("optionRedCheckersPiece")
        } else if (board[rowIndex][columnIndex] === 2) {
          checkerPieces.classList.add("optionGreenCheckersPiece")
        } 
      })
  })
}

//add event listener for the board
boardSection.addEventListener("click", handleClick)

//function to clear stuff
const clear = function () {
  //clear options
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === 3 || piece === 2 || piece === -2 || piece === -3) {
        board[rowIndex][columnIndex] = 0
      }
    })
  })
}
//function to make sure there is no existing option open
const noOption = function () {
  let count = 0
  board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === 3 || piece === -3) {
        count ++
      }
    })
  })
  return count
} 

//function to count pieces
const countPieces = function () {
  redCount = 0
  greenCount = 0
  board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === 1 || piece === 2) {
        greenCount ++
      } else if (piece === -1 || piece === -2) {
        redCount ++
      }
    })
  return greenCount, redCount
})}

//function that handles what happens what a click happens
function handleClick (e) {
  const itemClicked = e.target
  const r = parseInt(itemClicked.getAttribute("row"))
  const c = parseInt(itemClicked.getAttribute("column"))

  //movements and options
  if (turn === 1) {

    //letting the options appear
    if (board[r][c] === 1 && noOption() === 0) {
      if (board[r-1][c-1] === -1 && board[r-2][c-2] === 0) {
        //two jumps; both to the left
        if (board[r-3][c-3] === -1 && board[r-4][c-4] === 0) {
          board[r-4][c-4] = 3
        //two jumps; left followed by right
        } else if (board[r-3][c-1] === -1 && board[r-4][c] === 0) {
          board[r-4][c] = 3
        //both sides red
        } else if (board[r-1][c+1] === -1 && board[r-2][c+2] === 0) {
          board[r-2][c-2] = 3
          board[r-2][c+2] = 3
        //left side red
        } else {
          board[r-2][c-2] = 3
        }
      } else if (board[r-1][c+1] === -1 && board[r-2][c+2] === 0) {
        //two jumps; both to the right
        if (board[r-3][c+3] === -1 && board[r-4][c+4] === 0) {
          board[r-4][c+4] = 3
        //two jumps; right followed by left
        } else if (board[r-3][c+1] === -1 && board[r-4][c] === 0) {
          board[r-4][c] = 3
        //right side red
        } else {
          board[r-2][c+2] = 3
        }
      } else if (board[r-1][c-1] === 0) {
        //both sides blank
        if (board[r-1][c+1] === 0) {
          board[r-1][c-1] = 3
          board[r-1][c+1] = 3
        //left side blank
        } else {
          board[r-1][c-1] = 3
        }
      //right side blank
      } else if (board[r-1][c+1] === 0) {
        board[r-1][c+1] = 3
      }
      //selected green checker turns to optionGreen
      board[r][c] = 2

    //selecting the option
    } else if (board[r][c] === 3) {
      //two jumps; both to the left
      if (board[r+4][c+4] === 2) {
        //red pieces are removed
        board[r+1][c+1] = 0
        board[r+3][c+3] = 0
      //two jumps; both to the right
      } else if (board[r+4][c-4] === 2) {
        //red pieces are removed
        board[r+1][c-1] = 0
        board[r+3][c-3] = 0
      //two jumps; left followed by right
      } else if (board[r+4][c] === 2 && board[r+1][c-1] === -1 && board[r+3][c-1] === -1) {
        //red pieces are removed
        board[r+1][c-1] = 0
        board[r+3][c-1] = 0
      //two jumps; right followed by left
      } else if (board[r+4][c] === 2 && board[r+1][c+1] === -1 && board[r+3][c+1] === -1) {
        //red pieces are removed
        board[r+1][c+1] = 0
        board[r+3][c+1] = 0
      //left being red and was selected
      } else if (board[r+2][c+2] === 2) {
        //red piece is removed
        board[r+1][c+1] = 0
      //right being red and was selected
      } else if (board[r+2][c-2] === 2) {
        //red piece is removed
        board[r+1][c-1] = 0
      } 
      clear()
      board[r][c] = 1
      turn = -1
    
    //deselecting the piece to choose another
    } else if (board[r][c] === 2) {
      board[r][c] = 1
      clear()
    }
  } 
  
  else if (turn === -1) {

    //letting the options appear
    if (board[r][c] === -1 && noOption() === 0) {
      if (board[r+1][c-1] === 1 && board[r+2][c-2] === 0) {
        //two jumps; both to the left
        if (board[r+3][c-3] === 1 &&  board[r+4][c-4] === 0) {
          board[r+4][c-4] = -3
        //two jumps; left followed by right
        } else if (board[r+3][c-1] === 1 && board[r+4][c] === 0) {
          board[r+4][c] = -3
        //both sides green
        } else if (board[r+1][c+1] === 1 && board[r+2][c+2] === 0) {
          board[r+2][c-2] = -3
          board[r+2][c+2] = -3
        //left side green
        } else {
          board[r+2][c-2] = -3
        }
      } else if (board[r+1][c+1] === 1 && board[r+2][c+2] === 0) {
        //two jumps; both to the right
        if (board[r+3][c+3] === 1 && board[r+4][c+4] === 0) {
          board[r+4][c+4] = -3
        //two jumps; right followed by left
        } else if (board[r+3][c+1] === 1 && board[r+4][c] === 0) {
          board[r+4][c] = -3
        //right side green
        } else {
          board[r+2][c+2] = -3
        }
      } else if (board[r+1][c-1] === 0) {
        //both sides blank
        if (board[r+1][c+1] === 0) {
          board[r+1][c-1] = -3
          board[r+1][c+1] = -3
        //left side blank
        } else {
          board[r+1][c-1] = -3
        }
      //right side blank
      } else if (board[r+1][c+1] === 0) {
        board[r+1][c+1] = -3
      }
      //selected red checker turns to optionRed
      board[r][c] = -2

    // selecting the option
    } else if (board[r][c] === -3) {
      //two jumps; both to the left
      if (board[r-4][c+4] === -2) {
        //red pieces are removed
        board[r-1][c+1] = 0
        board[r-3][c+3] = 0
      //two jumps; both to the right
      } else if (board[r-4][c-4] === -2) {
        //red pieces are removed
        board[r-1][c-1] = 0
        board[r-3][c-3] = 0
      //two jumps; left followed by right
      } else if (board[r-4][c] === -2 && board[r-1][c-1] === 1 && board[r-3][c-1] === 1) {
        //red pieces are removed
        board[r-1][c-1] = 0
        board[r-3][c-1] = 0
      //two jumps; right followed by left
      } else if (board[r-4][c] === -2 && board[r-1][c+1] === 1 && board[r-3][c+1] === 1) {
        //red pieces are removed
        board[r-1][c+1] = 0
        board[r-3][c+1] = 0
      //left being green and was selected
      } else if (board[r-2][c+2] === -2) {
        //green piece is removed
        board[r-1][c+1] = 0
      //right being green and was selected
      } else if (board[r-2][c-2] === -2) {
        //green piece is removed
        board[r-1][c-1] = 0
      }
      clear()
      board[r][c] = -1
      turn = 1

    //deselecting the piece to choose another
    } else if (board[r][c] === -2) {
      board[r][c] = -1
      clear()
    }
  }
  render()
}
function renderRemaining () {
  countPieces()
  playerRedPieces.innerText = `Player Red has ${redCount} pieces remaining`
  playerGreenPieces.innerText = `Player Green has ${greenCount} pieces remaining`
}

function renderTurn () {
  if (turn === 1) {
    playerTurn.innerText = "It is currently Player Green's turn"
  } else {
    playerTurn.innerText = "It is currently Player Red's turn"
  }
}

function renderWinner () {
  if (greenCount === 0) {
    winner.innerText = "Player Red has won"
  } else if (redCount === 0) {
    winner.innerText = "Player Green has won"
  } else {
    winner.innerText = "There is no winner yet"
  }
}

function render () {
  renderBoard()
  renderRemaining()
  renderTurn()
  renderWinner()
}

initialise()


// //two jumps; both to the left
// if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-3][itemColumn-3] === "red" && board[itemRow-4][itemColumn-4] === "nothing") {
//   board[itemRow-4][itemColumn-4] = "option"
// //two jumps; both to the right
// } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing" && board[itemRow-3][itemColumn+3] === "red" && board[itemRow-4][itemColumn+4] === "nothing") {
//   board[itemRow-4][itemColumn+4] = "option"
// //two jumps; left followed by right
// } else if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-3][itemColumn-1] === "red" && board[itemRow-4][itemColumn] === "nothing") {
//   board[itemRow-4][itemColumn] = "option"
// //two jumps; right followed up left
// } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing" && board[itemRow-3][itemColumn+1] === "red" && board[itemRow-4][itemColumn] === "nothing") {
//   board[itemRow-4][itemColumn] = "option"
// //both sides red
// } else if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing") {
//   board[itemRow-2][itemColumn-2] = "option"
//   board[itemRow-2][itemColumn+2] = "option"
// //left side red
// } else if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing") {
//   board[itemRow-2][itemColumn-2] = "option"
// //right side red
// } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing") {
//   board[itemRow-2][itemColumn+2] = "option"
// //both sides blank
// } else if (board[itemRow-1][itemColumn-1] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
//   board[itemRow-1][itemColumn-1] = "option"
//   board[itemRow-1][itemColumn+1] = "option"  
// //left side blank   
// } else if (board[itemRow-1][itemColumn-1] === "nothing") {
//   board[itemRow-1][itemColumn-1] = "option"
// //right side blank
// } else if (board[itemRow-1][itemColumn+1] === "nothing") {
//   board[itemRow-1][itemColumn+1] = "option"
// } 
// //selected green checker turns to optionGreen
// board[itemRow][itemColumn] = "optionGreen"



// //two jumps; both to the left
// if (board[r+1][c-1] === "green" && board[r+2][c-2] === "nothing" && board[r+3][c-3] === "green" && board[r+4][c-4] === "nothing") {
//   board[r+4][c-4] = "option"
// //two jumps; both to the right
// } else if (board[r+1][c+1] === "green" && board[r+2][c+2] === "nothing" && board[r+3][c+3] === "green" && board[r+4][c+4] === "nothing") {
//   board[r+4][c+4] = "option"
// //two jumps; left followed by right
// } else if (board[r+1][c-1] === "green" && board[r+2][c-2] === "nothing" && board[r+3][c-1] === "green" && board[r+4][c] === "nothing") {
//   board[r+4][c] = "option"
// //two jumps; right followed up left
// } else if (board[r+1][c+1] === "green" && board[r+2][c+2] === "nothing" && board[r+3][c+1] === "red" && board[r+4][c] === "nothing") {
//   board[r+4][c] = "option"
// //both sides green
// } else if (board[r+1][c-1] === "green" && board[r+2][c-2] === "nothing" && board[r+1][c+1] === "green" && board[r+2][c+2] === "nothing") {
//   board[r+2][c-2] = "option"
//   board[r+2][c+2] = "option"
// //left side green
// } else if (board[r+1][c-1] === "green" && board[r+2][c-2] === "nothing") {
//   board[r+2][c-2] = "option"
// //right side green
// } else if (board[r+1][c+1] === "green" && board[r+2][c+2] === "nothing") {
//   board[r+2][c+2] = "option"
// //both sides blank
// } else if (board[r+1][c-1] === "nothing" && board[r+1][c+1] === "nothing") {
//   board[r+1][c-1] = "option"
//   board[r+1][c+1] = "option"  
// //left side blank   
// } else if (board[r+1][c-1] === "nothing") {
//   board[r+1][c-1] = "option"
// //right side blank
// } else if (board[r+1][c+1] === "nothing") {
//   board[r+1][c+1] = "option"
// } 
// //selected green checker turns to optionGreen
// board[r][c] = "optionRed"
