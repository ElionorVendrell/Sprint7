import { useState } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  //useState del checkbox per saber si està actiu o no
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  const [total, setTotal] = useState(0);

  // Array i funció per comprovar quins serveis tenen servei extra i guardar el seu index a l'array extra.
  const extra = [];
  const showContent = () => {
    const result = services.filter((service, index) => {
      if (service.extraServices) {
        extra.push(index);
        console.log("extra dins funció:", extra);
      }
    });
    return result;
  };
  showContent();

  // Funció per fer  canvis en el State del checkbox, el passa de false a true o viceversa.
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
    /* showContent();
    console.log("extra fora funció:", extra); */
    setTotal(totalPrice);
  };

  //Allò que imprimim per pantalla, passem la resta de components que necessitem
  // component Checkbox, component Quantity --> els hi passem les props aquí (especificades en el constructor del component)
  return (
    <div className='App'>
      <h2>Què vols fer?</h2>
      <div className='services-list'>
        {/* fem un map de services perquè ho imprimeixi tantes vegades com serveis hi hagi i, li passem el valor de les props */}
        {services.map(({ text, price, id }, index) => {
          return (
            <div key={index}>
              <Checkbox
                id={id}
                text={text}
                price={price}
                onCheck={() => handleOnChange(index)}
              />
              {/* Aquí li diem si el array extra té un element com el index i a més el checkedState també està en la posició 
              del index, aleshores que ens mostri el component Quantity, just sota del Checkbox (així s'obra sota del que seleccionem)*/}
              {extra.includes(index) && checkedState[index] && (
                <Quantity
                  id={extra[index]}
                  text={services[index].extraServices[0]}
                  // (!!) hauria d'imprimir tants text com extraServices tingui
                />
              )}
            </div>
          );
        })}
      </div>
      <br></br>
      <div className='totalPrice'>Total {total} €</div>
    </div>
  );
}

export default App;
