import React from "react";

// Creem el component Checkbox, aquí fem el constructor i la "plantilla" (dins el return) de com es veurà en el HTML
export const Checkbox = ({ index, text, id, price, onCheck, checkedState }) => {
  return (
    <div key={index}>
      <div>
        <input
          type='checkbox'
          id={id}
          text={text}
          price={price}
          checked={checkedState}
          onChange={() => onCheck(index)}
        />
        <label>
          {text} ({price}€)
        </label>
      </div>
    </div>
  );
};
