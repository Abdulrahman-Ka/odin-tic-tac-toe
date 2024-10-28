const GameBoard = (() => {
  const board = Array(3)
    .fill("")
    .map(() => Array(3).fill(""));

  const display = () => {
    board.forEach((row) => {
      console.log(row.map((cell) => cell || ".").join(" "));
    });
  };

  const placeMarker = (x, y, marker) => {
    if (board[x][y] === null) {
      board[x][y] = marker;
      return true;
    }
    return false;
  };

  const checkWinner = (marker) => {
    const winningCombinations = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    return winningCombinations.some((combination) => {
      const [[a, b], [c, d], [e, f]] = combination;
      return (
        this.board[a][b] === this.currentPlayer &&
        this.board[c][d] === this.currentPlayer &&
        this.board[e][f] === this.currentPlayer
      );
    });
    return { display, placeMarker, checkWinner };
  };
  return { create };
})();

const Player = (() => {
  const create = (name, marker) => {
    return { name, marker };
  };
  return { create };
})();

const Game = (() => {
  const create = (player1, player2) => {
    const board = GameBoard.create();
    const players = [player1, player2];
    let currentPlayerIndex = 0;

    const switchPlayer = () => {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const playTurn = (x, y) => {
      const currentPlayer = players[currentPlayerIndex];
      if (board.placeMarker(x, y, currentPlayer.marker)) {
        board.display();
        if (board.checkWinner(currentPlayer.marker)) {
          console.log(`${currentPlayer.name} Wins!`);
        } else {
          switchPlayer();
        }
      } else {
        console.log("Invalid move, try again.");
      }
    };
    return { playTurn };
  };
  return { create };
})();

// class TicTacToe {
//   constructor() {
//     this.board = [
//       ["", "", ""],
//       ["", "", ""],
//       ["", "", ""],
//     ];
//     this.currentPlayer = "X";
//     this.isGameOver = false;
//   }

//   printBoard() {
//     console.log(this.board.map((row) => row.join(" | ")).join("\n------\n"));
//   }

//   makeMove(row, col) {
//     if (this.isGameOver) {
//       console.log("Game is over. Start a new game!");
//       return;
//     }
//     if (this.board[row][col] === "") {
//       this.board[row][col] = this.currentPlayer;
//     } else {
//       console.log("Cell is already occupied. Choose another cell.");
//     }
//     if (this.checkWin()) {
//       this.printBoard();
//       this.isGameOver = true;
//       this.resetGame();
//     }
//     if (this.currentPlayer === "X") {
//       this.currentPlayer = "O";
//     } else {
//       this.currentPlayer = "X";
//     }
//   }

//   checkWin() {
//     const winningCombinations = [
//       [
//         [0, 0],
//         [0, 1],
//         [0, 2],
//       ],
//       [
//         [1, 0],
//         [1, 1],
//         [1, 2],
//       ],
//       [
//         [2, 0],
//         [2, 1],
//         [2, 2],
//       ],
//       [
//         [0, 0],
//         [1, 0],
//         [2, 0],
//       ],
//       [
//         [0, 1],
//         [1, 1],
//         [2, 1],
//       ],
//       [
//         [0, 2],
//         [1, 2],
//         [2, 2],
//       ],
//       [
//         [0, 0],
//         [1, 1],
//         [2, 2],
//       ],
//       [
//         [0, 2],
//         [1, 1],
//         [2, 0],
//       ],
//     ];

//     return winningCombinations.some((combination) => {
//       const [[a, b], [c, d], [e, f]] = combination;
//       return (
//         this.board[a][b] === this.currentPlayer &&
//         this.board[c][d] === this.currentPlayer &&
//         this.board[e][f] === this.currentPlayer
//       );
//     });
//   }

//   resetGame() {
//     this.board = [
//       ["", "", ""],
//       ["", "", ""],
//       ["", "", ""],
//     ];
//     this.isCurrentPlayer = "X";
//     this.isGameOver = false;
//     this.printBoard();
//   }
// }

// const game = new TicTacToe();
// game.printBoard();
