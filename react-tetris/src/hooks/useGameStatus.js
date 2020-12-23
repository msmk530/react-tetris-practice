import { useStage, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useStage(0);
  const [rows, setRows] = useStage(0);
  const [level, setLevel] = useStage(0);

  const linePoints = [40, 100, 300, 1200];

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
