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
    [1,null,1,null,1,null,1,null],
    [null,1,null,1,null,1,null,1],
    [1,null,1,null,1,null,1,null],
    [null,0,null,0,null,0,null,0],
    [0,null,0,null,0,null,0,null],
    [null,-1,null,-1,null,-1,null,-1],
    [-1,null,-1,null,-1,null,-1,null],
    [null,-1,null,-1,null,-1,null,-1],
  ];
  turn = 1;
  winner = null;
  renderBoard()
}

initialise()

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

        //this is to show how the board on the screen will change based on the values in the board array in javascript
        if (board[rowIndex][columnIndex] === 1) {
          checkerPieces.classList.add("redCheckersPiece")
          checkerPieces.setAttribute("row", rowIndex)
          checkerPieces.setAttribute("column", columnIndex)
        } else if (board[rowIndex][columnIndex] === -1) {
          checkerPieces.classList.add("greenCheckersPiece")
          checkerPieces.setAttribute("row", rowIndex)
          checkerPieces.setAttribute("column", columnIndex)
        } else if (board[rowIndex][columnIndex] === 0) {
          checkerPieces.classList.add("noCheckersPiece")
          checkerPieces.setAttribute("row", rowIndex)
          checkerPieces.setAttribute("column", columnIndex)
        }
      })
  })
}

//add event listener for the board
boardSection.addEventListener("click", handleClick)

function handleClick (e) {
  const itemClicked = e.target
  const itemRow = parseInt(itemClicked.getAttribute("row"))
  const itemColumn = parseInt(itemClicked.getAttribute("column"))

  if (board[itemRow][itemColumn] === 1) {
    board[itemRow][itemColumn] = 0
    
  }
renderBoard()
}

