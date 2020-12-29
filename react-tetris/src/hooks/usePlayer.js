import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../service/tetrominos';
import { checkCollision } from '../service/gameHelpers';
import { STAGE_WIDTH } from '../util/constant';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index]),
    );

    if (dir > 0) {
      return rotatedTetro.map((row) => row.reverse());
    }
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)); // shallow copy를 위함
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const rotatedPos = clonedPlayer.pos.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = rotatedPos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
