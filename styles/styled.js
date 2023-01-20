import styled from "styled-components";

export const Button = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 0.2rem;
  border: none;
  background-color: orange;
  margin: 0.3rem;
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;

  &:hover {
    color: orange;
    background: rgba(255, 255, 255, 0.87);
    border: 1px solid orange;
  }
`;
export const Border = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-right: 10%;
  padding: 2vh;
  border: 2px solid #242424;
  border-radius: 10px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  min-width: 122px;
`;

export const Start = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: orange;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  height: 30px;
  weight: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.87);
    border: 1px solid orange;
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
export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContenedorModal = styled.div`
  max-width: 600px;
  min-height: 30px;
  background: white;
  position: relative;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

export const ButtonClose = styled.button`
  display: flex;
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  font-size: 20px;
  color: orange;
  cursor: pointer;

  &:hover {
    color: #2e518b;
  }
`;
