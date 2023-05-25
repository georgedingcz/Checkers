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
    [-1,null,-1,null,-1,null,-1,null],
    [null,-1,null,-1,null,-1,null,-1],
    [-1,null,-1,null,-1,null,-1,null],
    [null,0,null,0,null,0,null,0],
    [0,null,0,null,0,null,0,null],
    [null,1,null,1,null,1,null,1],
    [1,null,1,null,1,null,1,null],
    [null,1,null,1,null,1,null,1],
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
        if (piece === 3) {
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
  
  function oneDiagonal (rM, cM, checkOneSpace, makeOneSpace) {
    if (game.board[r + rM][c + cM] === checkOneSpace) {
      game.board[r + rM][c + cM] = makeOneSpace
    }
  }

  function twoDiagonal (rM, cM, checkOneSpace, makeOneSpace, checkTwoSpaces, makeTwoSpaces) {
    if (game.board[r + rM][c + cM] === checkOneSpace) {
      if (game.board[r + 2*rM][c + 2*cM] === checkTwoSpaces) {
        game.board[r + rM][c + cM] = makeOneSpace
        game.board[r + 2*rM][c + 2*cM] = makeTwoSpaces
      }
    }
  }

  //movements and options
  if (game.turn === 1) {
    if (game.board[r][c] === 1) {
      antiOtherOption()

      oneDiagonal(-1,-1,0,3)
      oneDiagonal(-1,1,0,3)

      twoDiagonal(-1,-1,-1,-1,0,3)
      twoDiagonal(-1,1,-1,-1,0,3)

      game.board[r][c] = 2
    } else if (game.board[r][c] === 3) {
      if (r === 0) {
        greenReached()
      }
      oneDiagonal(1,1,2,0)
      oneDiagonal(1,-1,2,0)

      twoDiagonal(1,1,-1,0,2,0)
      twoDiagonal(1,-1,-1,0,2,0)

      game.board[r][c] = 1
      clear() 
      game.turn = -1 
    } else if (game.board[r][c] === 2) {
      game.board[r][c] = 1
      clear()
    }
  } else if (game.turn === -1) {
    if (game.board[r][c] === -1) {
      antiOtherOption()

      oneDiagonal(1,-1,0,3)
      oneDiagonal(1,1,0,3)

      twoDiagonal(1,-1,1,1,0,3)
      twoDiagonal(1,1,1,1,0,3)

      game.board[r][c] = -2
    } else if (game.board[r][c] === 3) {
      if (r === 7) {
        redReached()
      }
      oneDiagonal(-1,1,-2,0)
      oneDiagonal(-1,-1,-2,0)

      twoDiagonal(-1,1,1,0,-2,0)
      twoDiagonal(-1,-1,1,0,-2,0)

      game.board[r][c] = -1
      clear() 
      game.turn = 1
    } else if (game.board[r][c] === -2) {
      game.board[r][c] = -1
      clear()
    }
  }
  render()
}

initialise()

