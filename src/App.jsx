import { useState } from "react";
import services from "../data/services.json";
import { Quantity, input } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  //1. useState del checkbox
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  //2. useState del preu total
  const [total, setTotal] = useState(0);

  // Funció per fer  canvis en el State del checkbox
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log("position", position);

    // Funció per calcular el preu total
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
                <Quantity key={e.id} id={e.id} text={e.text} index={index} />
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
