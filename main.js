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
const restart = document.querySelector("#restart")

//functions
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
  winner.innerText = "There is no winner yet"
  playerTurn.hidden = false
}

function clear () {
  //clear options
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === 3 || piece === 2 || piece === -2 || piece === -3) {
        board[rowIndex][columnIndex] = 0
      }
    })
  })
}

function antiOtherOption () {
  board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (turn === 1) {
        if (piece === 3) {
          board[rowIndex][columnIndex] = 0
        } else if (piece === 2) {
          board[rowIndex][columnIndex] = 1
        }
      } else if (turn === -1) {
        if (piece === -3) {
          board[rowIndex][columnIndex] = 0
        } else if (piece === -2) {
          board[rowIndex][columnIndex] = -1
        }
      }
    })
  })
}

function countPieces () {
  //clear the existing count so that it does not stack when I render
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

function greenReached () {
  winner.innerText = "Player Green has won"
  playerTurn.hidden = true
}

function redReached () {
  winner.innerText = "Player Red has won"
  playerTurn.hidden = true
}


//renders
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

function renderRemaining () {
  countPieces()
  playerRedPieces.innerText = `Player Red has ${redCount} pieces remaining`
  playerGreenPieces.innerText = `Player Green has ${greenCount} pieces remaining`
  if (greenCount === 0) {
    winner.innerText = "Player Red has won"
    playerTurn.hidden = true
  } else if (redCount === 0) {
    winner.innerText = "Player Green has won"
    playerTurn.hidden = true
  }
}

function renderTurn () {
  if (turn === 1) {
    playerTurn.innerText = "It is currently Player Green's turn"
  } else if (turn === -1) {
    playerTurn.innerText = "It is currently Player Red's turn"
  }
}

function render () {
  renderBoard()
  renderRemaining()
  renderTurn()
}

//add event listener for the board
boardSection.addEventListener("click", handleClick)
restart.addEventListener("click", initialise)

//handle click
function handleClick (e) {
  const itemClicked = e.target
  const r = parseInt(itemClicked.getAttribute("row"))
  const c = parseInt(itemClicked.getAttribute("column"))
  
  //movements and options
  if (turn === 1) {
  
    //letting the options appear
    if (board[r][c] === 1) {
      antiOtherOption()
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
      //game ends if one piece reached the end
      if (r === 4) {
        greenReached()
      }
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
    if (board[r][c] === -1) {
      antiOtherOption()
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
      //game ends if one piece reached the end
      if (r === 11) {
        redReached()
      }
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

initialise()


