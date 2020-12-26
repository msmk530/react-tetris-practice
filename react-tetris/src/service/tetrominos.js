import { TetrominoColor } from '../util/color';

export const TETROMINOS = {
  0: { shape: [[0]], color: '0,0,0' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: TetrominoColor.I,
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: TetrominoColor.J,
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: TetrominoColor.L,
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: TetrominoColor.O,
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: TetrominoColor.S,
  },
  T: {
    shape: [
      [0, 0, 0],
      ['T', 'T', 'T'],
      [0, 'T', 0],
    ],
    color: TetrominoColor.T,
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: TetrominoColor.Z,
  },
};

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';

  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];

  return TETROMINOS[randTetromino];
};
