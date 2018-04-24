export const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

export const emptySquare = square => typeof square === 'number';

export const checkWin = (board, player) => {
  const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = false;
  winCombos.forEach((win, index) => {
    if (win.every(element => plays.indexOf(element) > -1)) {
      gameWon = player;
    }
  });
  return gameWon;
};

const emptySquares = (squares) => squares.filter(s => emptySquare(s));

export const checkTie = (squares) => emptySquares(squares).length === 0;

export const minMax = (newBoard, player) => {

  const availSpots = [...emptySquares(newBoard)];

  if (checkWin(newBoard, 'X')) {
    return { score: -10 };
  } else if (checkWin(newBoard, 'O')) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    let result = null;

    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === 'O') {
      result = minMax(newBoard, 'X');
      move.score = result.score;
    } else {
      result = minMax(newBoard, 'O');
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  let bestScore;

  if (player === "O") {
    bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

export const aiMove = (squares, player) => minMax(squares, player).index; 