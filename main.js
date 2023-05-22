let board = [];
let turn = "";
let greenCount = 0
let redCount = 0

//cached elements
const playerRedPieces = document.querySelector("#playerRedPieces");
const playerGreenPieces = document.querySelector("#playerGreenPieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board")
const winner = document.querySelector("#winner")

function initialise () {
  board = [
    [],
    [],
    ["red",null,"red",null,"red",null,"red",null],
    [null,"red",null,"red",null,"red",null,"red"],
    ["red",null,"red",null,"red",null,"red",null],
    [null,"nothing",null,"nothing",null,"nothing",null,"nothing"],
    ["nothing",null,"nothing",null,"nothing",null,"nothing",null],
    [null,"green",null,"green",null,"green",null,"green"],
    ["green",null,"green",null,"green",null,"green",null],
    [null,"green",null,"green",null,"green",null,"green"],
    [],
    [],
  ];
  turn = "Green";
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
        if (board[rowIndex][columnIndex] === "red") {
          checkerPieces.classList.add("redCheckersPiece")
        } else if (board[rowIndex][columnIndex] === "green") {
          checkerPieces.classList.add("greenCheckersPiece")
        } else if (board[rowIndex][columnIndex] === "nothing") {
          checkerPieces.classList.add("noCheckersPiece")
        } else if (board[rowIndex][columnIndex] === "option") {
          checkerPieces.classList.add("optionCheckersPiece")
        } else if (board[rowIndex][columnIndex] === "optionRed") {
          checkerPieces.classList.add("optionRedCheckersPiece")
        } else if (board[rowIndex][columnIndex] === "optionGreen") {
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
      if (piece === "option" || piece === "optionGreen" || piece === "optionRed") {
        board[rowIndex][columnIndex] = "nothing"
      }
    })
  })
}
//function to count pieces
const countPieces = function () {
  redCount = 0
  greenCount = 0
  board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === "green" || piece === "optionGreen") {
        greenCount ++
      } else if (piece === "red" || piece === "optionRed") {
        redCount ++
      }
    })
  return greenCount, redCount
})}

//function that handles what happens what a click happens
function handleClick (e) {
  const itemClicked = e.target
  const itemRow = parseInt(itemClicked.getAttribute("row"))
  const itemColumn = parseInt(itemClicked.getAttribute("column"))

  //movements and options
  if (turn === "Green") {
    //letting the options appear
    if (board[itemRow][itemColumn] === "green") {
      //both sides red
      if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing") {
        board[itemRow-2][itemColumn-2] = "option"
        board[itemRow-2][itemColumn+2] = "option"
      //left side red
      } else if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing") {
        board[itemRow-2][itemColumn-2] = "option"
      //right side red
      } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing") {
        board[itemRow-2][itemColumn+2] = "option"
      //both sides blank
      } else if (board[itemRow-1][itemColumn-1] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
        board[itemRow-1][itemColumn-1] = "option"
        board[itemRow-1][itemColumn+1] = "option"  
      //left side blank   
      } else if (board[itemRow-1][itemColumn-1] === "nothing") {
        board[itemRow-1][itemColumn-1] = "option"
      //right side blank
      } else if (board[itemRow-1][itemColumn+1] === "nothing") {
        board[itemRow-1][itemColumn+1] = "option"
      } 
      //selected green checker turns to optionGreen
      board[itemRow][itemColumn] = "optionGreen"

    // selecting the option
    } else if (board[itemRow][itemColumn] === "option") {
      //left being red and was selected
      if (board[itemRow+2][itemColumn+2] === "optionGreen") {
        //red piece is removed
        board[itemRow+1][itemColumn+1] = "nothing"
        clear()
      //right being red and was selected
      } else if (board[itemRow+2][itemColumn-2] === "optionGreen") {
        //red piece is removed
        board[itemRow+1][itemColumn-1] = "nothing"
        clear()
      //blank option on the left and was selected
      } else if (board[itemRow+1][itemColumn+1] === "optionGreen") {
        clear()
      //blank option on the right and was selected
      } else if (board[itemRow+1][itemColumn-1] === "optionGreen") {
        clear()
      }
      board[itemRow][itemColumn] = "green"
      turn = "Red"
    } else if (board[itemRow][itemColumn] === "optionGreen") {
      board[itemRow][itemColumn] = "green"
      clear()
    }
  } 
  
  else if (turn === "Red") {
    //letting the options appear
    if (board[itemRow][itemColumn] === "red") {
      if (board[itemRow+1][itemColumn-1] === "green" && board[itemRow+2][itemColumn-2] === "nothing" && board[itemRow+1][itemColumn+1] === "green" && board[itemRow+2][itemColumn+2] === "nothing") {
        board[itemRow+2][itemColumn-2] = "option"
        board[itemRow+2][itemColumn+2] = "option"
      //left side green
      } else if (board[itemRow+1][itemColumn-1] === "green" && board[itemRow+2][itemColumn-2] === "nothing") {
        board[itemRow+2][itemColumn-2] = "option"
      //right side green
      } else if (board[itemRow+1][itemColumn+1] === "green" && board[itemRow+2][itemColumn+2] === "nothing") {
        board[itemRow+2][itemColumn+2] = "option"
      //both sides blank
      } else if (board[itemRow+1][itemColumn-1] === "nothing" && board[itemRow+1][itemColumn+1] === "nothing") {
        board[itemRow+1][itemColumn-1] = "option"
        board[itemRow+1][itemColumn+1] = "option"  
      //left side blank   
      } else if (board[itemRow+1][itemColumn-1] === "nothing") {
        board[itemRow+1][itemColumn-1] = "option"
      //right side blank
      } else if (board[itemRow+1][itemColumn+1] === "nothing") {
        board[itemRow+1][itemColumn+1] = "option"
      } 
      //selected green checker turns to optionGreen
      board[itemRow][itemColumn] = "optionRed"

    // selecting the option
    } else if (board[itemRow][itemColumn] === "option") {
      //left being green and was selected
      if (board[itemRow-2][itemColumn+2] === "optionRed") {
        //green piece is removed
        board[itemRow-1][itemColumn+1] = "nothing"
        clear()
      //right being green and was selected
      } else if (board[itemRow-2][itemColumn-2] === "optionRed") {
        //green piece is removed
        board[itemRow-1][itemColumn-1] = "nothing"
        clear()
      //blank option on the left and was selected
      } else if (board[itemRow-1][itemColumn+1] === "optionRed") {
        clear()
      //blank option on the right and was selected
      } else if (board[itemRow-1][itemColumn-1] === "optionRed") {
        clear()
      }
      board[itemRow][itemColumn] = "red"
      turn = "Green"
    } else if (board[itemRow][itemColumn] === "optionRed") {
      board[itemRow][itemColumn] = "red"
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
  playerTurn.innerText = `It is currently Player ${turn}'s turn`
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




