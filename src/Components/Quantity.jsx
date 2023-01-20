import { React, useState } from "react";
import { Button, ButtonInfo } from "../../styles/styled";
//import Info from "./Info";
import Swal from "sweetalert2";

export const Quantity = ({
  id,
  text,
  index,
  nextButton,
  backButton,
  qtyLang,
  qtyPages,
}) => {
  //useState dels dos botons d'informació
  const [modalInfoPages, setModalInfoPages] = useState(false);
  const [modalInfoLang, setModalInfoLang] = useState(false);

  const valueInput = (id) => {
    if (id === 0) {
      return qtyPages;
    }
    if (id === 1) {
      return qtyLang;
    }
  };

  // Funció per obrir la pantalla modal amb la info
  const openInfo = (id) => {
    console.log("prova openInfo", id);
    if (id === 0) {
      Swal.fire({
        text: "En aquest camp heu d'omplir el nombre de pàgines que voleu pressupostar",
        showConfirmButton: false,
        customClass: {
          popup: "customPopup",
        },
      });
    }
    if (id === 1) {
      Swal.fire({
        text: "En aquest camp heu d'omplir el nombre d'idiomes que voleu pressupostar",
        showConfirmButton: false,
        customClass: {
          popup: "customPopup",
        },
      });
    }
  };

  return (
    <div key={index}>
      <div id={id} text={text}>
        <br></br>
        <label className='textExtras'>{text}</label>
        <br></br>
        <Button onClick={() => backButton(id)}>-</Button>
        <input
          className='inputForm'
          type='number'
          min='1'
          value={valueInput(id)}
          readOnly
        />
        <Button onClick={() => nextButton(id)}>+</Button>
        <ButtonInfo onClick={() => openInfo(id)}>i</ButtonInfo>
      </div>
      <br></br>
    </div>
  );
};
