import { useState, useEffect } from "react";
import services from "../../data/services.json";
import { Quantity } from "./Quantity";
import { Checkbox } from "./Checkbox";
import { Border } from "../../styled";
//import { Welcome } from "./Welcome";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Budget() {
  //1. useState del checkbox
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  //2. useState del preu total
  const [total, setTotal] = useState(0);

  //3. useState per quant de pàgines i idiomes
  const [qtyPages, setQtyPages] = useState(1);
  const [qtyLang, setQtyLang] = useState(1);

  //4. useState del Preu que es mostra quan el checkbox està actiu
  const [checkboxPrice, setCheckboxPrice] = useState(0);

  // Funció per restar un número al botó dels inputs
  const backButton = (id) => {
    if (id === 0) {
      setQtyPages(qtyPages - 1);
    }
    if (qtyPages <= 1) {
      setQtyPages(1);
    }
    if (id === 1) {
      setQtyLang(qtyLang - 1);
    }
    if (qtyLang <= 1) {
      setQtyLang(1);
    }
  };

  const nextButton = (id) => {
    if (id === 0) {
      setQtyPages(qtyPages + 1);
    } else {
      setQtyLang(qtyLang + 1);
    }
  };

  // Funció per fer  canvis en el State del checkbox
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    // Funció per calcular el preu dels checkbox seleccionats
    const checkPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + services[index].price;
        }
        return sum;
      },
      0
    );
    setCheckboxPrice(checkPrice);
  };

  // Funció per calcular el preu total, suma dels checkbox + quantitats
  const calculateTotal = () => {
    const totalExtra = qtyLang * qtyPages * 30;
    const totalN = totalExtra + checkboxPrice;

    setTotal(totalN);
  };

  //Realitzar la funció calculateTotal quan hi hagi canvis a algun dels states indicats
  useEffect(() => {
    calculateTotal();
  }, [checkedState, qtyLang, qtyPages]);

  //Funció per guardar en localStorage
  const saveData = () => {
    localStorage.setItem("Serveis seleccionats", checkedState);
    localStorage.setItem("Número de pàgines", qtyPages);
    localStorage.setItem("Número d'idiomes", qtyLang);
    localStorage.setItem("Preu total", total);

    alert("Has guardat el teu pressupost correctament");
  };

  // useState de Welcome (pàgina d'inici)
  /*   const [welcome, setWelcome] = useState(true); */

  //Funció del botó start a la pàgina d'inici. Canvia l'estat de welcome i mostra la pàgina principal de l'app
  /*   const start = () => {
    setWelcome(false);
  }; */

  //Mentre welcome sigui true mostrarà la pàgina de benvinguda. Quan sigui false (amb botó start) mostrarà la pàgina principal d'app
  return (
    /* welcome === true ? (
    <Welcome start={start} />
  ) :  */ //Allò que imprimim per pantalla
    <div className='App'>
      <h2>Què vols fer?</h2>
      <div className='services-list'>
        {services.map(({ text, price, id, extraServices }, index) => {
          let show = [
            <Checkbox
              key={id}
              id={id}
              text={text}
              price={price}
              onCheck={() => handleOnChange(index)}
            />,
          ];
          if (extraServices && checkedState[index]) {
            extraServices.forEach((e) =>
              show.push(
                <Border key={e.id}>
                  <Quantity
                    key={e.id}
                    id={e.id}
                    text={e.text}
                    index={index}
                    nextButton={nextButton}
                    backButton={backButton}
                    qtyLang={qtyLang}
                    qtyPages={qtyPages}
                  />
                </Border>
              )
            );
          }
          // Retorn de la variable show
          return <div key={index}>{show}</div>;
        })}
      </div>
      <br></br>
      <div className='totalPrice'>Total {total} €</div>
      <button className='buttonData' onClick={saveData}>
        Guardar pressupost
      </button>
    </div>
  );
}

export default Budget;
