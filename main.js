const emptyBoard = [
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
]

const board = document.querySelector("#board")

function renderBoard () {
  emptyBoard.forEach ((row,i) => {
      row.forEach((square, index) => {
        const squareElement = document.createElement("div")
        board.append(squareElement)
        squareElement.classList.add("whiteSquare");
        if (i % 2 === 0 && index % 2 === 0) {
          squareElement.classList.add("blackSquare");
        }  
        if (i % 2 !== 0 && index % 2 !== 0) {
          squareElement.classList.add("blackSquare");
        }
      })
  })

}
renderBoard()