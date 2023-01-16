import { React, useState } from "react";

//Hem creat el component Quantity, fem el constructor amb les props que necessita
//En el return mostrem com s'haurà d'imprimir
export const input = [[], []];
export const Quantity = ({ id, text, index }) => {
  // Fem el useState per controlar quan canvia el número de pàgines i d'idiomes en el input
  // dels extraServices. L'inicialitzem en 0.
  const [quantity, setQuantity] = useState(1);
  console.log("console quantity", quantity);

  return (
    <div key={index}>
      <div id={id} text={text}>
        <br></br>
        <label>{text}</label>
        <br></br>
        <input
          type='number'
          min='0'
          onChange={(event) => {
            setQuantity(event.target.value);
            const value = quantity * event.target.value;
            input[id] = event.target.value;
            console.log(input);
            console.log("id", id);
          }}
        />
      </div>
      <br></br>
    </div>
  );
};

/*
  2.CALCULAR EL PREU TOTAL AMB ELS EXTRES:

S'ha de sumar el següent amb el preu que teniem a la pàgina d'inici: 
preu total = qtyPag * qtyLang * 30; 
  */
