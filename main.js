//game
const game = {
  board: [],
  greenCount: 0,
  redCount: 0,
}

//cached elements
const playerRedPieces = document.querySelector("#playerRedPieces");
const playerGreenPieces = document.querySelector("#playerGreenPieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board")
const winner = document.querySelector("#winner")
const restart = document.querySelector("#restart")

//functions
function initialise () {
  game.board = [
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
  game.turn = 1;
  render()
  winner.innerText = ""
  playerTurn.hidden = false
}

function clear () {
  //clear options
  game.board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (piece === 3 || piece === 2 || piece === -2 || piece === -3) {
        game.board[rowIndex][columnIndex] = 0
      }
    })
  })
}

function antiOtherOption () {
  game.board.forEach(function (boardRow, rowIndex){
    boardRow.forEach(function(piece, columnIndex) {
      if (game.turn === 1) {
        if (piece === 3) {
          game.board[rowIndex][columnIndex] = 0
        } else if (piece === 2) {
          game.board[rowIndex][columnIndex] = 1
        }
      } else if (game.turn === -1) {
        if (piece === -3) {
          game.board[rowIndex][columnIndex] = 0
        } else if (piece === -2) {
          game.board[rowIndex][columnIndex] = -1
        }
      }
    })
  })
}

function countPieces () {
  //clear the existing count so that it does not stack when I render
  game.redCount = 0
  game.greenCount = 0
  game.board.forEach(function (boardRow){
    boardRow.forEach(function(piece) {
      if (piece === 1 || piece === 2) {
        game.greenCount ++
      } else if (piece === -1 || piece === -2) {
        game.redCount ++
      }
    })
  return game.greenCount, game.redCount
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
  game.board.forEach ((row,rowIndex) => {
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
        if (game.board[rowIndex][columnIndex] === -1) {
          checkerPieces.classList.add("redCheckersPiece")
        } else if (game.board[rowIndex][columnIndex] === 1) {
          checkerPieces.classList.add("greenCheckersPiece")
        } else if (game.board[rowIndex][columnIndex] === 0) {
          checkerPieces.classList.add("noCheckersPiece")
        } else if (game.board[rowIndex][columnIndex] === 3 || game.board[rowIndex][columnIndex] === -3) {
          checkerPieces.classList.add("optionCheckersPiece")
        } else if (game.board[rowIndex][columnIndex] === -2) {
          checkerPieces.classList.add("optionRedCheckersPiece")
        } else if (game.board[rowIndex][columnIndex] === 2) {
          checkerPieces.classList.add("optionGreenCheckersPiece")
        } 
      })
  })
}

function renderRemaining () {
  countPieces()
  playerRedPieces.innerText = `:${game.redCount}`
  playerGreenPieces.innerText = `:${game.greenCount}`
  if (game.greenCount === 0) {
    winner.innerText = "Player Red has won"
    playerTurn.hidden = true
  } else if (game.redCount === 0) {
    winner.innerText = "Player Green has won"
    playerTurn.hidden = true
  }
}

function renderTurn () {
  if (game.turn === 1) {
    playerTurn.innerText = "Player Green's turn"
  } else if (game.turn === -1) {
    playerTurn.innerText = "Player Red's turn"
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
  if (game.turn === 1) {
 
    //letting the options appear
    if (game.board[r][c] === 1) {
      antiOtherOption()
      if (game.board[r-1][c-1] === -1 && game.board[r-2][c-2] === 0) {
        //two jumps; both to the left
        if (game.board[r-3][c-3] === -1 && game.board[r-4][c-4] === 0) {
          game.board[r-4][c-4] = 3
        //two jumps; left followed by right
        } else if (game.board[r-3][c-1] === -1 && game.board[r-4][c] === 0) {
          game.board[r-4][c] = 3
        //both sides red
        } else if (game.board[r-1][c+1] === -1 && game.board[r-2][c+2] === 0) {
          game.board[r-2][c-2] = 3
          game.board[r-2][c+2] = 3
        //left side red
        } else {
          game.board[r-2][c-2] = 3
        }
      } else if (game.board[r-1][c+1] === -1 && game.board[r-2][c+2] === 0) {
        //two jumps; both to the right
        if (game.board[r-3][c+3] === -1 && game.board[r-4][c+4] === 0) {
          game.board[r-4][c+4] = 3
        //two jumps; right followed by left
        } else if (game.board[r-3][c+1] === -1 && game.board[r-4][c] === 0) {
          game.board[r-4][c] = 3
        //right side red
        } else {
          game.board[r-2][c+2] = 3
        }
      } else if (game.board[r-1][c-1] === 0) {
        //both sides blank
        if (game.board[r-1][c+1] === 0) {
          game.board[r-1][c-1] = 3
          game.board[r-1][c+1] = 3
        //left side blank
        } else {
          game.board[r-1][c-1] = 3
        }
      //right side blank
      } else if (game.board[r-1][c+1] === 0) {
        game.board[r-1][c+1] = 3
      }
      //selected green checker turns to optionGreen
      game.board[r][c] = 2

    //selecting the option
    } else if (game.board[r][c] === 3) {
      //game ends if one piece reached the end
      if (r === 4) {
        greenReached()
      }
      //two jumps; both to the left
      if (game.board[r+4][c+4] === 2) {
        //red pieces are removed
        game.board[r+1][c+1] = 0
        game.board[r+3][c+3] = 0
      //two jumps; both to the right
      } else if (game.board[r+4][c-4] === 2) {
        //red pieces are removed
        game.board[r+1][c-1] = 0
        game.board[r+3][c-3] = 0
      //two jumps; left followed by right
      } else if (game.board[r+4][c] === 2 && game.board[r+1][c-1] === -1 && game.board[r+3][c-1] === -1) {
        //red pieces are removed
        game.board[r+1][c-1] = 0
        game.board[r+3][c-1] = 0
      //two jumps; right followed by left
      } else if (game.board[r+4][c] === 2 && game.board[r+1][c+1] === -1 && game.board[r+3][c+1] === -1) {
        //red pieces are removed
        game.board[r+1][c+1] = 0
        game.board[r+3][c+1] = 0
      //left being red and was selected
      } else if (game.board[r+2][c+2] === 2) {
        //red piece is removed
        game.board[r+1][c+1] = 0
      //right being red and was selected
      } else if (game.board[r+2][c-2] === 2) {
        //red piece is removed
        game.board[r+1][c-1] = 0
      } 
      clear()
      game.board[r][c] = 1
      game.turn = -1
    
    //deselecting the piece to choose another
    } else if (game.board[r][c] === 2) {
      game.board[r][c] = 1
      clear()
    }
  } 
  
  else if (game.turn === -1) {

    //letting the options appear
    if (game.board[r][c] === -1) {
      antiOtherOption()
      if (game.board[r+1][c-1] === 1 && game.board[r+2][c-2] === 0) {
        //two jumps; both to the left
        if (game.board[r+3][c-3] === 1 &&  game.board[r+4][c-4] === 0) {
          game.board[r+4][c-4] = -3
        //two jumps; left followed by right
        } else if (game.board[r+3][c-1] === 1 && game.board[r+4][c] === 0) {
          game.board[r+4][c] = -3
        //both sides green
        } else if (game.board[r+1][c+1] === 1 && game.board[r+2][c+2] === 0) {
          game.board[r+2][c-2] = -3
          game.board[r+2][c+2] = -3
        //left side green
        } else {
          game.board[r+2][c-2] = -3
        }
      } else if (game.board[r+1][c+1] === 1 && game.board[r+2][c+2] === 0) {
        //two jumps; both to the right
        if (game.board[r+3][c+3] === 1 && game.board[r+4][c+4] === 0) {
          game.board[r+4][c+4] = -3
        //two jumps; right followed by left
        } else if (game.board[r+3][c+1] === 1 && game.board[r+4][c] === 0) {
          game.board[r+4][c] = -3
        //right side green
        } else {
          game.board[r+2][c+2] = -3
        }
      } else if (game.board[r+1][c-1] === 0) {
        //both sides blank
        if (game.board[r+1][c+1] === 0) {
          game.board[r+1][c-1] = -3
          game.board[r+1][c+1] = -3
        //left side blank
        } else {
          game.board[r+1][c-1] = -3
        }
      //right side blank
      } else if (game.board[r+1][c+1] === 0) {
        game.board[r+1][c+1] = -3
      }
      //selected red checker turns to optionRed
      game.board[r][c] = -2

    // selecting the option
    } else if (game.board[r][c] === -3) {
      //game ends if one piece reached the end
      if (r === 11) {
        redReached()
      }
      //two jumps; both to the left
      if (game.board[r-4][c+4] === -2) {
        //red pieces are removed
        game.board[r-1][c+1] = 0
        game.board[r-3][c+3] = 0
      //two jumps; both to the right
      } else if (game.board[r-4][c-4] === -2) {
        //red pieces are removed
        game.board[r-1][c-1] = 0
        game.board[r-3][c-3] = 0
      //two jumps; left followed by right
      } else if (game.board[r-4][c] === -2 && game.board[r-1][c-1] === 1 && game.board[r-3][c-1] === 1) {
        //red pieces are removed
        game.board[r-1][c-1] = 0
        game.board[r-3][c-1] = 0
      //two jumps; right followed by left
      } else if (game.board[r-4][c] === -2 && game.board[r-1][c+1] === 1 && game.board[r-3][c+1] === 1) {
        //red pieces are removed
        game.board[r-1][c+1] = 0
        game.board[r-3][c+1] = 0
      //left being green and was selected
      } else if (game.board[r-2][c+2] === -2) {
        //green piece is removed
        game.board[r-1][c+1] = 0
      //right being green and was selected
      } else if (game.board[r-2][c-2] === -2) {
        //green piece is removed
        game.board[r-1][c-1] = 0
      }
      clear()
      game.board[r][c] = -1
      game.turn = 1

    //deselecting the piece to choose another
    } else if (game.board[r][c] === -2) {
      game.board[r][c] = -1
      clear()
    }
  }
  render()
}

initialise()


