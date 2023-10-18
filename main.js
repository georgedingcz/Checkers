//piece constants for readability
const empty = 0;
const greenPiece = 1;
const redPiece = -1;
const greenOption = 2;
const redOption = -2;
const optionalMove = 3;

//game
const game = {
  board: [],
  greenCount: 0,
  redCount: 0,
  turn: 0,
};
//cached elements
const playerRedPieces = document.querySelector("#playerRedPieces");
const playerGreenPieces = document.querySelector("#playerGreenPieces");
const playerTurn = document.querySelector("#playerTurn");
const boardSection = document.querySelector("#board");
const winner = document.querySelector("#winner");
const restart = document.querySelector("#restart");
//functions
//to initialise
function initialise() {
  game.board = [
    [],
    [],
    [redPiece, null, redPiece, null, redPiece, null, redPiece, null],
    [null, redPiece, null, redPiece, null, redPiece, null, redPiece],
    [redPiece, null, redPiece, null, redPiece, null, redPiece, null],
    [null, empty, null, empty, null, empty, null, empty],
    [empty, null, empty, null, empty, null, empty, null],
    [null, greenPiece, null, greenPiece, null, greenPiece, null, greenPiece],
    [greenPiece, null, greenPiece, null, greenPiece, null, greenPiece, null],
    [null, greenPiece, null, greenPiece, null, greenPiece, null, greenPiece],
    [],
    [],
  ];
  game.turn = 1;
  render();
  winner.innerText = "";
  playerTurn.hidden = false;
}
//to clear alternative options
function clear() {
  //clear options
  game.board.forEach(function (boardRow, rowIndex) {
    boardRow.forEach(function (piece, columnIndex) {
      switch (piece) {
        case optionalMove:
        case greenOption:
        case redOption:
          game.board[rowIndex][columnIndex] = empty;
          break;
      }
    });
  });
}
//to restore state of existing checked piece
function antiOtherOption() {
  game.board.forEach(function (boardRow, rowIndex) {
    boardRow.forEach(function (piece, columnIndex) {
      if (game.turn === 1) {
        if (piece === optionalMove) {
          game.board[rowIndex][columnIndex] = empty;
        } else if (piece === greenOption) {
          game.board[rowIndex][columnIndex] = greenPiece;
        }
      } else if (game.turn === -1) {
        if (piece === optionalMove) {
          game.board[rowIndex][columnIndex] = empty;
        } else if (piece === redOption) {
          game.board[rowIndex][columnIndex] = redPiece;
        }
      }
    });
  });
}
//when green piece reaches the opposite end
function greenReached() {
  winner.innerText = "Player Green has won";
  playerTurn.hidden = true;
}
//when red piece reaches the opposite end
function redReached() {
  winner.innerText = "Player Red has won";
  playerTurn.hidden = true;
}
//renders
//render the board
function renderBoard() {
  //clear the board
  while (boardSection.firstChild) {
    boardSection.removeChild(boardSection.firstChild);
  }
  //build the board
  game.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const squareElement = document.createElement("div");
      boardSection.append(squareElement);
      //add square colours
      squareElement.classList.add("whiteSquare");
      if (rowIndex % 2 === 0 && columnIndex % 2 === 0) {
        squareElement.classList.remove("whiteSquare");
        squareElement.classList.add("blackSquare");
      } else if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
        squareElement.classList.remove("whiteSquare");
        squareElement.classList.add("blackSquare");
      }
      const checkerPieces = document.createElement("div");
      squareElement.append(checkerPieces);
      checkerPieces.setAttribute("row", rowIndex);
      checkerPieces.setAttribute("column", columnIndex);
      //add piece colours
      if (game.board[rowIndex][columnIndex] === redPiece) {
        checkerPieces.classList.add("redCheckersPiece");
      } else if (game.board[rowIndex][columnIndex] === greenPiece) {
        checkerPieces.classList.add("greenCheckersPiece");
      } else if (game.board[rowIndex][columnIndex] === empty) {
        checkerPieces.classList.add("noCheckersPiece");
      } else if (game.board[rowIndex][columnIndex] === optionalMove) {
        checkerPieces.classList.add("optionCheckersPiece");
      } else if (game.board[rowIndex][columnIndex] === redOption) {
        checkerPieces.classList.add("optionRedCheckersPiece");
      } else if (game.board[rowIndex][columnIndex] === greenOption) {
        checkerPieces.classList.add("optionGreenCheckersPiece");
      }
    });
  });
}
//render remaining pieces
function renderRemaining() {
  game.redCount = 0;
  game.greenCount = 0;
  game.board.forEach(function (boardRow) {
    boardRow.forEach(function (piece) {
      switch (piece) {
        case greenPiece:
        case greenOption:
          game.greenCount++;
          break;
        case redPiece:
        case redOption:
          game.redCount++;
          break;
      }
    });
  });
  playerRedPieces.innerText = `:${game.redCount}`;
  playerGreenPieces.innerText = `:${game.greenCount}`;
  return game.redCount, game.greenCount;
}
//render player turn
function renderTurn() {
  if (game.turn === 1) {
    playerTurn.innerText = "Player Green's turn";
  } else if (game.turn === -1) {
    playerTurn.innerText = "Player Red's turn";
  }
}
//render winner
function renderWinner() {
  if (game.greenCount === 0) {
    winner.innerText = "Player Red has won";
    playerTurn.hidden = true;
  } else if (game.redCount === 0) {
    winner.innerText = "Player Green has won";
    playerTurn.hidden = true;
  }
}
//to render all at once
function render() {
  renderBoard();
  renderRemaining();
  renderTurn();
  renderWinner();
}
//add event listener for the board
boardSection.addEventListener("click", handleClick);
restart.addEventListener("click", initialise);
//handle click
function handleClick(e) {
  const itemClicked = e.target;
  const r = parseInt(itemClicked.getAttribute("row"));
  const c = parseInt(itemClicked.getAttribute("column"));
  //to check and change one square diagonally away
  function oneSquareDiagonal(rM, cM, checkOneSpace, makeOneSpace) {
    if (game.board[r + rM][c + cM] === checkOneSpace) {
      game.board[r + rM][c + cM] = makeOneSpace;
    }
  }
  //to check and change two squares diagonally away
  function twoSquaresDiagonal(
    rM,
    cM,
    checkOneSpace,
    makeOneSpace,
    checkTwoSpaces,
    makeTwoSpaces
  ) {
    if (game.board[r + rM][c + cM] === checkOneSpace) {
      if (game.board[r + 2 * rM][c + 2 * cM] === checkTwoSpaces) {
        game.board[r + rM][c + cM] = makeOneSpace;
        game.board[r + 2 * rM][c + 2 * cM] = makeTwoSpaces;
      }
    }
  }
  //movements and options
  if (game.turn === 1) {
    //to show options
    if (game.board[r][c] === greenPiece) {
      antiOtherOption();

      oneSquareDiagonal(redPiece, redPiece, empty, optionalMove);
      oneSquareDiagonal(redPiece, greenPiece, empty, optionalMove);

      twoSquaresDiagonal(
        redPiece,
        redPiece,
        redPiece,
        redPiece,
        empty,
        optionalMove
      );
      twoSquaresDiagonal(
        redPiece,
        greenPiece,
        redPiece,
        redPiece,
        empty,
        optionalMove
      );
      game.board[r][c] = greenOption;
      //to choose an option
    } else if (game.board[r][c] === optionalMove) {
      if (r === 2) {
        greenReached();
      }
      oneSquareDiagonal(greenPiece, greenPiece, greenOption, empty);
      oneSquareDiagonal(greenPiece, redPiece, greenOption, empty);

      twoSquaresDiagonal(
        greenPiece,
        greenPiece,
        redPiece,
        empty,
        greenOption,
        empty
      );
      twoSquaresDiagonal(
        greenPiece,
        redPiece,
        redPiece,
        empty,
        greenOption,
        empty
      );

      game.board[r][c] = greenPiece;
      clear();
      game.turn = -1;
      //to uncheck a piece
    } else if (game.board[r][c] === greenOption) {
      game.board[r][c] = greenPiece;
      clear();
    }
  } else if (game.turn === -1) {
    //to show options
    if (game.board[r][c] === redPiece) {
      antiOtherOption();

      oneSquareDiagonal(greenPiece, redPiece, empty, optionalMove);
      oneSquareDiagonal(greenPiece, greenPiece, empty, optionalMove);

      twoSquaresDiagonal(
        greenPiece,
        redPiece,
        greenPiece,
        greenPiece,
        empty,
        optionalMove
      );
      twoSquaresDiagonal(
        greenPiece,
        greenPiece,
        greenPiece,
        greenPiece,
        empty,
        optionalMove
      );

      game.board[r][c] = redOption;
      //to choose an option
    } else if (game.board[r][c] === optionalMove) {
      if (r === 9) {
        redReached();
      }
      oneSquareDiagonal(redPiece, greenPiece, redOption, empty);
      oneSquareDiagonal(redPiece, redPiece, redOption, empty);

      twoSquaresDiagonal(
        redPiece,
        greenPiece,
        greenPiece,
        empty,
        redOption,
        empty
      );
      twoSquaresDiagonal(
        redPiece,
        redPiece,
        greenPiece,
        empty,
        redOption,
        empty
      );

      game.board[r][c] = redPiece;
      clear();
      game.turn = 1;
      //to uncheck a piece
    } else if (game.board[r][c] === redOption) {
      game.board[r][c] = redPiece;
      clear();
    }
  }
  render();
}
//initialise the game
initialise();
