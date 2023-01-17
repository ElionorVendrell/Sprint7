import { useState, useEffect } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";
import { Border } from "../styled";
import "../app.css";

function App() {
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
    const total = totalExtra + checkboxPrice;

    setTotal(total);
  };

  //Realitzar la funció calculateTotal quan hi hagi canvis a algun dels states indicats
  useEffect(() => {
    calculateTotal();
  }, [checkedState, qtyLang, qtyPages]);

  //Allò que imprimim per pantalla
  return (
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
                <Border>
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
    </div>
  );
}

export default App;
