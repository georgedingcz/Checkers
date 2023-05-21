//variables
let board = [];
let turn = "";
let winner = "";

//cached elements
const player1Pieces = document.querySelector("#player1Pieces");
const player2Pieces = document.querySelector("#player2Pieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board")


//event listener
// document.querySelector("#board").addEventListener("click", handleClick)

function initialise () {
  board = [
    ["red",null,"red",null,"red",null,"red",null],
    [null,"red",null,"red",null,"red",null,"red"],
    ["red",null,"red",null,"red",null,"red",null],
    [null,"nothing",null,"nothing",null,"nothing",null,"nothing"],
    ["nothing",null,"nothing",null,"nothing",null,"nothing",null],
    [null,"green",null,"green",null,"green",null,"green"],
    ["green",null,"green",null,"green",null,"green",null],
    [null,"green",null,"green",null,"green",null,"green"],
  ];
  turn = "green";
  winner = null;
  render()
}

initialise()

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


//function that handles what happens what a click happens
function handleClick (e) {
  const itemClicked = e.target
  const itemRow = parseInt(itemClicked.getAttribute("row"))
  const itemColumn = parseInt(itemClicked.getAttribute("column"))

  //movements and options
  
  if (turn === "green") {
    //option(s) appears
    //(green) both sides
    if (board[itemRow][itemColumn] === "green" && board[itemRow-1][itemColumn-1] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
      board[itemRow-1][itemColumn-1] = "option"
      board[itemRow-1][itemColumn+1] = "option"
      board[itemRow][itemColumn] = "optionGreen"
    //(green) left side only   
    } else if (board[itemRow][itemColumn] === "green" && board[itemRow-1][itemColumn-1] === "nothing") {
      board[itemRow-1][itemColumn-1] = "option"
      board[itemRow][itemColumn] = "optionGreen"   
    //(green) right side only
    } else if (board[itemRow][itemColumn] === "green" && board[itemRow-1][itemColumn+1] === "nothing") {
      board[itemRow-1][itemColumn+1] = "option"
      board[itemRow][itemColumn] = "optionGreen"   
    } 
    //option(s) selected
    if (board[itemRow][itemColumn] === "option") {
      //there were two options and the left option was selected
      if (board[itemRow+1][itemColumn+1] === "optionGreen" && board[itemRow][itemColumn+2] === "option") {
        board[itemRow+1][itemColumn+1] = "nothing"
        board[itemRow][itemColumn+2] = "nothing"
        board[itemRow][itemColumn] = "green"
        turn = "red"
      //there were two options and the right option was selected
      } else if (board[itemRow+1][itemColumn-1] === "optionGreen" && board[itemRow][itemColumn-2] === "option") {
        board[itemRow+1][itemColumn-1] = "nothing"
        board[itemRow][itemColumn-2] = "nothing"
        board[itemRow][itemColumn] = "green"
        turn = "red"
      //only the left option was available and it was selected
      } else if (board[itemRow+1][itemColumn+1] === "optionGreen") {
        board[itemRow+1][itemColumn+1] = "nothing"
        board[itemRow][itemColumn] = "green"
        turn = "red"
      //only the right option was available and it was selected
      } else if (board[itemRow+1][itemColumn-1] === "optionGreen") {
        board[itemRow+1][itemColumn-1] = "nothing"
        board[itemRow][itemColumn] = "green"
        turn = "red"
      }
    }
  } else if (turn === "red") {
    //option(s) appears
    //(red) both sides
    if (board[itemRow][itemColumn] === "red" && board[itemRow+1][itemColumn-1] === "nothing" && board[itemRow+1][itemColumn+1] === "nothing") {
      board[itemRow+1][itemColumn-1] = "option"
      board[itemRow+1][itemColumn+1] = "option"
      board[itemRow][itemColumn] = "optionRed"
    //(red) left side only   
    } else if (board[itemRow][itemColumn] === "red" && board[itemRow+1][itemColumn-1] === "nothing") {
      board[itemRow+1][itemColumn-1] = "option"
      board[itemRow][itemColumn] = "optionRed"   
    //(red) right side only
    } else if (board[itemRow][itemColumn] === "red" && board[itemRow+1][itemColumn+1] === "nothing") {
      board[itemRow+1][itemColumn+1] = "option"
      board[itemRow][itemColumn] = "optionRed"   
    } 
    //option(s) selected
    if (board[itemRow][itemColumn] === "option") {
      //there were two options and the left option was selected
      if (board[itemRow-1][itemColumn+1] === "optionRed" && board[itemRow][itemColumn+2] === "option") {
        board[itemRow-1][itemColumn+1] = "nothing"
        board[itemRow][itemColumn+2] = "nothing"
        board[itemRow][itemColumn] = "red"
        turn = "green"
      //there were two options and the right option was selected
      } else if (board[itemRow-1][itemColumn-1] === "optionRed" && board[itemRow][itemColumn-2] === "option") {
        board[itemRow-1][itemColumn-1] = "nothing"
        board[itemRow][itemColumn-2] = "nothing"
        board[itemRow][itemColumn] = "red"
        turn = "green"
      //only the left option was available and it was selected
      } else if (board[itemRow-1][itemColumn+1] === "optionRed") {
        board[itemRow-1][itemColumn+1] = "nothing"
        board[itemRow][itemColumn] = "red"
        turn = "green"
      //only the right option was available and it was selected
      } else if (board[itemRow-1][itemColumn-1] === "optionRed") {
        board[itemRow-1][itemColumn-1] = "nothing"
        board[itemRow][itemColumn] = "red"
        turn = "green"
      }
    }
  }
  //(green) what happens when the option is selected
  // if (board[itemRow][itemColumn] === "option") {
  //   //there were two options and the left option was selected
  //   if (board[itemRow+1][itemColumn+1] === "optionGreen" && board[itemRow][itemColumn+2] === "option") {
  //     board[itemRow+1][itemColumn+1] = "nothing"
  //     board[itemRow][itemColumn+2] = "nothing"
  //     board[itemRow][itemColumn] = "green"
  //   //there were two options and the right option was selected
  //   } else if (board[itemRow+1][itemColumn-1] === "optionGreen" && board[itemRow][itemColumn-2] === "option") {
  //     board[itemRow+1][itemColumn-1] = "nothing"
  //     board[itemRow][itemColumn-2] = "nothing"
  //     board[itemRow][itemColumn] = "green"
  //   //only the left option was available and it was selected
  //   } else if (board[itemRow+1][itemColumn+1] === "optionGreen") {
  //     board[itemRow+1][itemColumn+1] = "nothing"
  //     board[itemRow][itemColumn] = "green"
  //   //only the right option was available and it was selected
  //   } else if (board[itemRow+1][itemColumn-1] === "optionGreen") {
  //     board[itemRow+1][itemColumn-1] = "nothing"
  //     board[itemRow][itemColumn] = "green"
  //   }
  // }

  //(red) what happens when the option is selected
  // if (board[itemRow][itemColumn] === "option") {
  //   //there were two options and the left option was selected
  //   if (board[itemRow-1][itemColumn+1] === "optionRed" && board[itemRow][itemColumn+2] === "option") {
  //     board[itemRow-1][itemColumn+1] = "nothing"
  //     board[itemRow][itemColumn+2] = "nothing"
  //     board[itemRow][itemColumn] = "red"
  //   //there were two options and the right option was selected
  //   } else if (board[itemRow-1][itemColumn-1] === "optionRed" && board[itemRow][itemColumn-2] === "option") {
  //     board[itemRow-1][itemColumn-1] = "nothing"
  //     board[itemRow][itemColumn-2] = "nothing"
  //     board[itemRow][itemColumn] = "red"
  //   //only the left option was available and it was selected
  //   } else if (board[itemRow-1][itemColumn+1] === "optionRed") {
  //     board[itemRow-1][itemColumn+1] = "nothing"
  //     board[itemRow][itemColumn] = "red"
  //   //only the right option was available and it was selected
  //   } else if (board[itemRow-1][itemColumn-1] === "optionRed") {
  //     board[itemRow-1][itemColumn-1] = "nothing"
  //     board[itemRow][itemColumn] = "red"
  //   }
  // }




  render()
}

function renderRedRemaining () {
}

function renderGreenRemaining () {
}

function render () {
  renderBoard()
  renderRedRemaining()
  renderGreenRemaining()
}

render()

