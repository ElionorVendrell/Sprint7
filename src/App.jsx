import { useState } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  const [total, setTotal] = useState(0);

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

  /* const hola = showContent();
  console.log("hola:", hola); */

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log(position);

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

  return (
    <div className='App'>
      <h2>Què vols fer?</h2>
      <div className='services-list'>
        {services.map(({ text, price, id }, index) => {
          return (
            <div key={index}>
              <Checkbox
                id={id}
                text={text}
                price={price}
                onCheck={() => handleOnChange(index)}
              />
              {extra.includes(index) && checkedState[index] && <Quantity />}
              {/* {extra === index && <Quantity />} */}
              {/* {hola === index && <Quantity />} */}
              {/* {showContent()} */}
              {/* {show.id === index && <Quantity/>} */}
              {/* {checkedState[0] && index === 0 && <Quantity />} */}
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
