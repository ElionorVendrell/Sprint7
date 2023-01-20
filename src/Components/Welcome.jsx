import React from "react";
import { Link } from "react-router-dom";
import { Start } from "../../styles/styled";

const Welcome = () => {
  return (
    <>
      <p>Fes click per començar</p>
      <Start>
        <Link className="link" to='/Budget'>Comença</Link>
      </Start>
    </>
  );
};
export default Welcome;
