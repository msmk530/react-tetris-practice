import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared,
  );

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        // player의 y값이 1보다 작아진다는 건 게임판의 맨 위까지 도달했다는 것 => 게임 오버
        setGameOver(true);
        setDropTime(null);
      }

      // y축의 가장 밑에 도달하였을때 이동안하고 동결시키기

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        // left arrow
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right arrow
        movePlayer(1);
      } else if (keyCode === 40) {
        // down arrow
        dropPlayer(1);
      } else if (keyCode === 38) {
        // up arrow  1로 하면 시계방향
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={`Score : ${score}`} />
              <Display text={`Rows : ${rows}`} />
              <Display text={`Level : ${level}`} />
            </div>
          )}
          <StartButton startGame={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
