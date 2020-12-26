import { useState, useEffect, useCallback } from 'react';
import { ORIGINAL_GAME_SCORE_BOARD } from '../util/constant';

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = ORIGINAL_GAME_SCORE_BOARD;

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [linePoints, level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);
  return [score, setScore, rows, setRows, level, setLevel];
};
