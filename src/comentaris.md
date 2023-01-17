#APP

```js
import { useState } from "react";
import services from "../data/services.json";
import { Quantity, input } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {

  ### USESTATE
  //Fem un useState del checkbox per controlar quan està actiu i quan no
  //L'iniciem en false, que serà l'estat de quan no està seleccionat
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  // Fem un useState per calcular el preu total. L'inicialitzem en 0
  const [total, setTotal] = useState(0);

  // useState per quant de pàgines
  const [qtyPages, setQtyPages] = useState(1);
  // useState per quant d'idiomes
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

  // Funció per sumar un número al botó dels inputs

  const nextButton = (id) => {
    if (id === 0) {
      setQtyPages(qtyPages + 1);
    } else {
      setQtyLang(qtyLang + 1);
    }
  };

  // Funció per fer  canvis en el State del checkbox, el passa de false a true o viceversa.
  //li passem una propietat (position), que és el index que li hem enviat més abaix en el map de services.
  //li diem que si el index del checkedState i position és igual canvii l'estat del item, és a dir el false per true o viceversa.
  //Ho guardem en una nova variable perquè així assegurem que s'actualitza, per això després li passem aquesta nova variable (updatedCheckedState)
  //al set CheckedState perquè actualitzi el checkedState
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log("position", position);

    // Calcular el preu total, fa la suma dels serveis, quan es selecciona el checkbox
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + services[index].price;
        }
        return sum;
      },
      0
    );

    //mostrem només el preu dels checkbox seleccionats
    setCheckboxPrice(checkPrice);
  };

  //Calculem el total sumant els useStates i el passem per el total
  const calculateTotal = () => {
    const totalExtra = qtyLang * qtyPages * 30;
    const total = totalExtra + checkboxPrice;

    setTotal(total);
  };

  //useEffect perquè s'executi la funció calculateTotal sempre que hi hagi un canvi al checkedState, al qtyLang o al qtyPages
  useEffect(() => {
    calculateTotal();
  }, [checkedState, qtyLang, qtyPages]);

  //Allò que imprimim per pantalla, passem la resta de components que necessitem
  // component Checkbox, component Quantity --> els hi passem les props aquí (especificades en el constructor del component)
  return (
    <div className='App'>
      <h2>Què vols fer?</h2>
      <div className='services-list'>
        {/* fem un map de services perquè ho imprimeixi tantes vegades com serveis hi hagi i, li passem el valor de les props */}
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

          //Aquí li diem que si existeix la propietat extraServices en el element que estigui passant en el map a services i a més,
          //el checkedState està en la posició número igual a l'índex, que faci un forEach dels elements d'extraServices. És a dir,
          //que faci un push de cada un dels elements. El push que fa és el component Quantity, per tant, ens mostra dos vegades aquest
          //component, cada un per cada volta que fa. El valor el passem amb la e i amb index, que seràn les props del component Quantity.
          //Per cada volta tindran un valor diferent.

          if (extraServices && checkedState[index]) {
            extraServices.forEach((e) =>
              show.push(
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
              )
            );
          }
          // Aquí diem que ens retorni la variable show que hem creat anteriorment, és a dir, que ens mostri al html el que hem definit que haurà d'imprimir
          return <div key={index}>{show}</div>;
        })}
      </div>
      <br></br>
      <div className='totalPrice'>Total {total} €</div>
    </div>
  );
}

export default App;
```

#QUANTITY COMPONENT

```js
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
```
