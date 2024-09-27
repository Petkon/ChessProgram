const app = () => {
  const board = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");

  let currentPlayer = "X";

  function handleCellClick(event) {
    const cell = event.target;

    if (isValidMove(cell)) {
      makeMove(cell);
      if (checkWin()) {
        announceWinner();
        resetBoard();
      } else if (isDraw()) {
        alert("It's a draw!");
        resetBoard();
      } else {
        changePlayer();
      }
    }
  }

  function makeMove(cell) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function isValidMove(cell) {
    return cell.textContent === "";
  }

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentPlayer);
      });
    });
  }

  function isDraw() {
    return [...cells].every((cell) => cell.textContent !== "");
  }

  function resetBoard() {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });
    currentPlayer = "X";
  }
  function announceWinner() {
    alert(`Winner is ${currentPlayer} congratgs!`);
  }

  board.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {
      handleCellClick(event);
    }
  });
};

window.addEventListener("load", app);
