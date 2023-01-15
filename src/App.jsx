import { useState } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  //Fem un useState del checkbox per controlar quan està actiu i quan no
  //L'iniciem en false, que serà l'estat de quan no està seleccionat
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  // Fem un useState per calcular el preu total. L'inicialitzem en 0
  const [total, setTotal] = useState(0);

  
  // Array i funció per comprovar quins serveis tenen extraServices i guardar el seu index a l'array "extra".
  //D'aquesta forma tindrem un array amb els index (les posicions) dels elements que tenen la propietat extraServices.
  //això ens servirà més endavant per comparar el index.
  const extra = [];
  const wichOne = () => {
    const result = services.filter((service, index) => {
      if (service.extraServices) {
        extra.push(index);
        console.log("extra dins funció:", extra);
      }
    });
    return result;
  };
  wichOne();

  // Funció per fer  canvis en el State del checkbox, el passa de false a true o viceversa.
  //li passem una propietat (position), que és el index que li hem enviat més abaix en el map de services.
  //li diem que si el index del checkedState i position és igual canvii l'estat del item, és a dir el false per true o viceversa.
  //Ho guardem en una nova variable perquè així assegurem que s'actualitza, per això després li passem aquesta nova variable (updatedCheckedState)
  // al set CheckedState perquè actualitzi el checkedState
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log(position);

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
    setTotal(totalPrice);
  };

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
          //Com la Key és obligatoria i no pot tenir el valor de index, li posem Math.random

          if (extraServices && checkedState[index]) {
            extraServices.forEach((e) =>
              show.push(
                <Quantity key={Math.random()} id={extra[index]} text={e} />
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
