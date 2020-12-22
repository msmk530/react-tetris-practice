import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';
const StartButton = ({ callback }) => (
  <StyledStartButton onCClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
