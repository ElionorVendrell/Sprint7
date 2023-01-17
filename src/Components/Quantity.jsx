import { React } from "react";

export const Quantity = ({
  id,
  text,
  index,
  nextButton,
  backButton,
  qtyLang,
  qtyPages,
}) => {
  const valueInput = (id) => {
    if (id === 0) {
      return qtyPages;
    }
    if (id === 1) {
      return qtyLang;
    }
  };
  return (
    <div key={index}>
      <div id={id} text={text}>
        <br></br>
        <label>{text}</label>
        <br></br>
        <button onClick={() => backButton(id)}>-</button>
        <input type='number' min='1' value={valueInput(id)} readOnly />
        <button onClick={() => nextButton(id)}>+</button>
      </div>
      <br></br>
    </div>
  );
};
