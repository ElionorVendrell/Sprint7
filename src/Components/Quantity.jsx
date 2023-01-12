import { React, useState } from "react";
/* import services from "../data/services.json"; */


//Hem creat el component Quantity, fem el constructor amb les props que necessita
//En el return mostrem com s'haurà d'imprimir
export const Quantity = ({ id, text, index }) => {
  return (
    <div key={index}>
      <div id={id} text={text}>
        <br></br>
        <label>{text}</label>
        <br></br>
        <input type='number' min='0' onChange={() => onCheck(index)} />
      </div>
      <br></br>
    </div>
  );
};

/*
  2.CALCULAR EL PREU TOTAL AMB ELS EXTRES:

S'ha de sumar el següent amb el preu que teniem a la pàgina d'inici: 
preu total = qtyPag * qtyIdiom * 30; 
  */
 

/* export const Quantity = () => {
  const [qtyPag, setQtyPag] = useState(0);

  console.log("qtyPag", qtyPag);
  const [qtyIdiom, setQtyIdiom] = useState(0);
  console.log("qtyIdiom", qtyIdiom);

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
}; */
