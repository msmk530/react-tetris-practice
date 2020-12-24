import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  outline: none;
`;

export const StyledTetris = styled.div`
  display: flex;
  justify-content: center;

  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

export const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;

  color: white;
  font-size: 1.5rem;
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;
