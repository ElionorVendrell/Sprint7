import styled from "styled-components";

export const Button = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 0.2rem;
  border: none;
  background-color: #7393b3;
  margin: 0.3rem;
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;

  &:hover {
    color: #7393b3;
    background: rgba(255, 255, 255, 0.87);
    border: 1px solid #7393b3;
  }
`;
export const Border = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-right: 10%;
  padding: 2vh;
  border: 1px solid #2e518b;
  background-color: white;
  border-radius: 10px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  min-width: 200px;
  max-width: 200px;
`;

export const Start = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: #7393b3;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  height: 30px;
  weight: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.87);
    border: 1px solid #7393b3;
  }
`;

export const ButtonInfo = styled.button`
  border: none;
  background-color: #2e518b;
  color: #ffffff;
  text-decoration: none;
  border-radius: 50%;
  height: 1.4rem;
  width: 1.4rem;
  font-weight: bold;
  font-family: serif;
  cursor: pointer;

  &:hover {
    color: #2e518b;
    background-color: #ffffff;
    border: 1px solid #2e518b;
  }
`;
