import { React, useState } from "react";

export const Quantity = () => {
  const [qtyPag, setQtyPag] = useState(0);

  console.log("qtyPag", qtyPag);
  const [qtyIdiom, setQtyIdiom] = useState(0);
  console.log("qtyIdiom", qtyIdiom);

  /*
  CALCULAR EL PREU TOTAL AMB ELS EXTRES:

S'ha de sumar el següent amb el preu que teniem a la pàgina d'inici: 
preu total = qtyPag * qtyIdiom * 30; 
  */

  return (
    <form>
      <br></br>
      <div>
        Número de pàgines
        <input
          type='number'
          min='0'
          onChange={(event) => setQtyPag(event.target.value)}
        />
      </div>

      <br></br>
      <div>
        Número d'idiomes
        <input
          type='number'
          min='0'
          onChange={(event) => setQtyIdiom(event.target.value)}
        />
      </div>
      <br></br>
    </form>
  );
};
