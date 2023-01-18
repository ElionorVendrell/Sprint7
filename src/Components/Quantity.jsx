import { React } from "react";
import { Button } from "../../styled";

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
        <label className="textExtras">{text}</label>
        <br></br>
        <Button onClick={() => backButton(id)}>-</Button>
        <input className ="inputForm" type='number' min='1' value={valueInput(id)} readOnly />
        <Button onClick={() => nextButton(id)}>+</Button>
      </div>
      <br></br>
    </div>
  );
};
