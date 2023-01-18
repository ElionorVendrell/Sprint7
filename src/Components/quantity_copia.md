import { React, useState } from "react";

//Hem creat el component Quantity, fem el constructor amb les props que necessita
//En el return mostrem com s'haurà d'imprimir
export const input = [1, 1];
export const Quantity = ({ id, text, index }) => {
  // Fem el useState per controlar quan canvia el número de pàgines i d'idiomes en el input
  // dels extraServices. L'inicialitzem en 0.
  const [quantity, setQuantity] = useState(0);
  console.log("console quantity", quantity);

  const multiplicacio = input[0] * input[1] * 30;
  console.log("preu total", multiplicacio);
  console.log("input", input);

  const backButton = () => {
    setQuantity(quantity - 1);
    if (quantity < 1) {
      setQuantity(0);
    }
  };
  const nextButton = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div key={index}>
      <div id={id} text={text}>
        <br></br>
        <label>{text}</label>
        <br></br>
        <button onClick={backButton}>-</button>
        <input
          type='number'
          min='0'
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            input[id] = e.target.value;
            console.log("console del input dins onChange", input);
            console.log("id", id);
            console.log("canvi estat onChange", quantity);
          }}
        />
        <button onClick={nextButton}>+</button>
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
