import { useState } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  const [total, setTotal] = useState(0);

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

    /*  const showContent = (position) => {
      const extra = services.filter((service) => service.extraServices);
      const show = extra[position].extraServices;
      console.log(show);
    };
    showContent(position); */
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
                id={index}
                text={text}
                price={price}
                value={id}
                onCheck={() => handleOnChange(index)}
              />
              {checkedState[0] && index === 0 && <Quantity />}
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
