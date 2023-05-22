let board = [];
let turn = "";

//cached elements
const playerRedPieces = document.querySelector("#playerRedPieces");
const playerGreenPieces = document.querySelector("#playerGreenPieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board")
const winner = document.querySelector("#winner")


//event listener

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
  turn = "Green";
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
const clear = function () {
  //clear options
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === "option") {
        board[rowIndex][columnIndex] = "nothing"
      }
    })
  })
  //clear optionGreen
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === "optionGreen") {
        board[rowIndex][columnIndex] = "nothing"
      }
    })
  })
  //clear optionRed
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === "optionRed") {
        board[rowIndex][columnIndex] = "nothing"
      }
    })
  })
}

//function that handles what happens what a click happens
function handleClick (e) {
  const itemClicked = e.target
  const itemRow = parseInt(itemClicked.getAttribute("row"))
  const itemColumn = parseInt(itemClicked.getAttribute("column"))

  //movements and options
  if (turn === "Green") {
    //letting the options appear
    if (board[itemRow][itemColumn] === "green") {
      //left side red and right side blank
      if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
        board[itemRow-2][itemColumn-2] = "option"
        board[itemRow-1][itemColumn+1] = "option"
      //right side red and left side blank
      } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing" && board[itemRow-1][itemColumn-1] === "nothing") {
          board[itemRow-2][itemColumn+2] = "option"
          board[itemRow-1][itemColumn-1] = "option"
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
      //two options with left being red and right being blank; left option was selected
      if (board[itemRow+2][itemColumn+2] === "optionGreen") {
        //red piece is removed
        board[itemRow+1][itemColumn+1] = "nothing"
        clear()
      //two options with right being red and left being blank; right option was selected
      } else if (board[itemRow+2][itemColumn-2] === "optionGreen") {
        //red piece is removed
        board[itemRow+1][itemColumn-1] = "nothing"
        clear()
      //two blank options and the left was selected
      } else if (board[itemRow+1][itemColumn+1] === "optionGreen" && board[itemRow][itemColumn+2] === "option") {
        clear()
      //two blank options and the right was selected
      } else if (board[itemRow+1][itemColumn-1] === "optionGreen" && board[itemRow][itemColumn-2] === "option") {
        clear()
      //only blank left option was available and it was selected
      } else if (board[itemRow+1][itemColumn+1] === "optionGreen") {
        clear()
      //only blank right option was available and it was selected
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
      //left side green and right side blank
      if (board[itemRow+1][itemColumn-1] === "green" && board[itemRow+2][itemColumn-2] === "nothing" && board[itemRow+1][itemColumn+1] === "nothing") {
        board[itemRow+2][itemColumn-2] = "option"
        board[itemRow+1][itemColumn+1] = "option"
      //right side green and left side blank
      } else if (board[itemRow+1][itemColumn+1] === "green" && board[itemRow+2][itemColumn+2] === "nothing" && board[itemRow+1][itemColumn-1] === "nothing") {
          board[itemRow+2][itemColumn+2] = "option"
          board[itemRow+1][itemColumn-1] = "option"
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
      //two options with left being green and right being blank; left option was selected
      if (board[itemRow-2][itemColumn+2] === "optionRed") {
        //green piece is removed
        board[itemRow-1][itemColumn+1] = "nothing"
        clear()
      //two options with right being green and left being blank; right option was selected
      } else if (board[itemRow-2][itemColumn-2] === "optionRed") {
        //green piece is removed
        board[itemRow-1][itemColumn-1] = "nothing"
        clear()
      //two blank options and the left was selected
      } else if (board[itemRow-1][itemColumn+1] === "optionRed" && board[itemRow][itemColumn+2] === "option") {
        clear()
      //two blank options and the right was selected
      } else if (board[itemRow-1][itemColumn-1] === "optionRed" && board[itemRow][itemColumn-2] === "option") {
        clear()
      //only blank left option was available and it was selected
      } else if (board[itemRow-1][itemColumn+1] === "optionRed") {
        clear()
      //only blank right option was available and it was selected
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
function renderRedRemaining () {
  let redCount = 0
  board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === "red") {
        redCount ++
      }
    })
    return redCount
  })
  playerRedPieces.innerText = `Player Red has ${redCount} pieces remaining`
}

function renderGreenRemaining () {
  let greenCount = 0
  board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === "green") {
        greenCount ++
      }
    })
    return greenCount
  })
  playerGreenPieces.innerText = `Player Green has ${greenCount} pieces remaining`
}

function renderTurn () {
  playerTurn.innerText = `It is currently Player ${turn}'s turn`
}

// function renderWinner () {
//   if ()
// }

function render () {
  renderBoard()
  renderRedRemaining()
  renderGreenRemaining()
  renderTurn()
}




// if (turn === "Green" && board[itemRow][itemColumn] === "optionGreen") {
//   console.log("lets see")
//   board[itemRow][itemColumn] = "green"
//   console.log(board[itemRow])
//   // board.forEach(function (boardRow){
//   //   boardRow.forEach(function(piece) {
//   //     if (piece === "option") {
//   //       piece = "nothing"
//   //     }
//   //   })
//   // })
// }
// //green's turn
// //showing options of selected piece
// if (turn === "Green" && board[itemRow][itemColumn] === "green") {
//   //option(s) appears
//   //left side red and right side blank
//   if (board[itemRow-1][itemColumn-1] === "red" && board[itemRow-2][itemColumn-2] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
//     board[itemRow-2][itemColumn-2] = "option"
//     board[itemRow-1][itemColumn+1] = "option"
//   //right side red and left side blank
//   } else if (board[itemRow-1][itemColumn+1] === "red" && board[itemRow-2][itemColumn+2] === "nothing" && board[itemRow-1][itemColumn-1] === "nothing") {
//     board[itemRow-2][itemColumn+2] = "option"
//     board[itemRow-1][itemColumn-1] = "option"
//   //both sides blank
//   } else if (board[itemRow-1][itemColumn-1] === "nothing" && board[itemRow-1][itemColumn+1] === "nothing") {
//     board[itemRow-1][itemColumn-1] = "option"
//     board[itemRow-1][itemColumn+1] = "option"  
//   //left side blank   
//   } else if (board[itemRow-1][itemColumn-1] === "nothing") {
//     board[itemRow-1][itemColumn-1] = "option"
//   //right side blank
//   } else if (board[itemRow-1][itemColumn+1] === "nothing") {
//     board[itemRow-1][itemColumn+1] = "option" 
//   } 
//   //selected green checker turns to optionGreen
//   board[itemRow][itemColumn] = "optionGreen"
// }

// //green's turn
// //option selected
// if (turn === "Green" && board[itemRow][itemColumn] === "option") {
//   console.log("test")
//   //two options with left being red and right being blank; left option was selected
//   if (board[itemRow+2][itemColumn+2] === "optionGreen" && board[itemRow+1][itemColumn+3] === "option") {
//     board[itemRow+2][itemColumn+2] = "nothing"
//     board[itemRow+1][itemColumn+3] = "nothing"
//     //red piece is removed
//     board[itemRow+1][itemColumn+1] = "nothing"
//   //two options with right being red and left being blank; right option was selected
//   } else if (board[itemRow+2][itemColumn-2] === "optionGreen" && board[itemRow+1][itemColumn-3] === "option") {
//     board[itemRow+2][itemColumn-2] = "nothing"
//     board[itemRow+1][itemColumn-3] = "nothing"
//     //red piece is removed
//     board[itemRow+1][itemColumn-1] = "nothing"
//   //two blank options and the left was selected
//   }else if (board[itemRow+1][itemColumn+1] === "optionGreen" && board[itemRow][itemColumn+2] === "option") {
//     board[itemRow+1][itemColumn+1] = "nothing"
//     board[itemRow][itemColumn+2] = "nothing"
//   //two blank options and the right was selected
//   } else if (board[itemRow+1][itemColumn-1] === "optionGreen" && board[itemRow][itemColumn-2] === "option") {
//     board[itemRow+1][itemColumn-1] = "nothing"
//     board[itemRow][itemColumn-2] = "nothing"
//   //only blank left option was available and it was selected
//   } else if (board[itemRow+1][itemColumn+1] === "optionGreen") {
//     board[itemRow+1][itemColumn+1] = "nothing"
//   //only blank right option was available and it was selected
//   } else if (board[itemRow+1][itemColumn-1] === "optionGreen") {
//     board[itemRow+1][itemColumn-1] = "nothing"
//   }
//   //selected option turns to green
//   board[itemRow][itemColumn] = "green" 
//   //change turn to red
//   turn = "Red"   
// }



// //red's turn
// //showing options of selected piece
// if (turn === "Red" && board[itemRow][itemColumn] === "red") {
//   //option(s) appears
//   //left side green and right side blank
//   if (board[itemRow+1][itemColumn-1] === "green" && board[itemRow+2][itemColumn-2] === "nothing" && board[itemRow+1][itemColumn+1] === "nothing") {
//     board[itemRow+2][itemColumn-2] = "option"
//     board[itemRow+1][itemColumn+1] = "option"
//   //right side green and left side blank 
//   } else if (board[itemRow+1][itemColumn+1] === "green" && board[itemRow+2][itemColumn+2] === "nothing" && board[itemRow+1][itemColumn-1] === "nothing") {
//     board[itemRow+2][itemColumn+2] = "option"
//     board[itemRow+1][itemColumn-1] = "option"
//   //both sides blank   
//   } else if (board[itemRow+1][itemColumn-1] === "nothing" && board[itemRow+1][itemColumn+1] === "nothing") {
//     board[itemRow+1][itemColumn-1] = "option"
//     board[itemRow+1][itemColumn+1] = "option"
//   //left side blank   
//   } else if (board[itemRow+1][itemColumn-1] === "nothing") {
//     board[itemRow+1][itemColumn-1] = "option"
//   //right side blank
//   } else if (board[itemRow+1][itemColumn+1] === "nothing") {
//     board[itemRow+1][itemColumn+1] = "option"
//   } 
//   //selected red checker turns to optionRed
//   board[itemRow][itemColumn] = "optionRed"   
// }
// //red's turn
// //option selected
// if (turn === "Red" && board[itemRow][itemColumn] === "option") {
//   //two options with left being green and right being blank; left option was selected
//   if (board[itemRow-2][itemColumn+2] === "optionRed" && board[itemRow-1][itemColumn+3] === "option") {
//     board[itemRow-2][itemColumn+2] = "nothing"
//     board[itemRow-1][itemColumn+3] = "nothing"
//     //green piece is removed
//     board[itemRow-1][itemColumn+1] = "nothing"
//   //two options with right being green and left being blank; right option was selected
//   } else if (board[itemRow-2][itemColumn-2] === "optionRed" && board[itemRow-1][itemColumn-3] === "option") {
//     board[itemRow-2][itemColumn-2] = "nothing"
//     board[itemRow-1][itemColumn-3] = "nothing"
//     //green piece is removed
//     board[itemRow-1][itemColumn-1] = "nothing"
//   //two options and the left option was selected
//   } else if (board[itemRow-1][itemColumn+1] === "optionRed" && board[itemRow][itemColumn+2] === "option") {
//     board[itemRow-1][itemColumn+1] = "nothing"
//     board[itemRow][itemColumn+2] = "nothing"
//   //two options and the right option was selected
//   } else if (board[itemRow-1][itemColumn-1] === "optionRed" && board[itemRow][itemColumn-2] === "option") {
//     board[itemRow-1][itemColumn-1] = "nothing"
//     board[itemRow][itemColumn-2] = "nothing"
//   //only the left option was available and it was selected
//   } else if (board[itemRow-1][itemColumn+1] === "optionRed") {
//     board[itemRow-1][itemColumn+1] = "nothing"
//   //only the right option was available and it was selected
//   } else if (board[itemRow-1][itemColumn-1] === "optionRed") {
//     board[itemRow-1][itemColumn-1] = "nothing"
//   }
//   //selected option turns to red
//   board[itemRow][itemColumn] = "red" 
//   //change turn to green
//   turn = "Green" 
// }


    // board.forEach(function (boardRow){
    //   boardRow.forEach(function(piece) {
    //     if (piece === "option") {
    //       piece = "nothing"
    //     }
    //   })
    // })