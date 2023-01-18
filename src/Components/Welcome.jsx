import React from "react";
import { Start } from "../../styled";

export const Welcome = ({ start }) => {
  return (
    <>
      <p>Fes click per començar</p>
      <Start onClick={start}>Comença</Start>
    </>
  );
};
