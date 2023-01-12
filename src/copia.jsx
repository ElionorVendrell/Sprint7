import { useState } from "react";
import services from "../data/services.json";
import { Quantity } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  const [total, setTotal] = useState(0);

  const showContent = () => {
    const extra = services.filter((services, index) => {
      if (services.extraServices) {
        const newOption = {
          id: index,
          extraServices,
        };
        return newOption;
      }
    });
    console.log("🚀 ~ file: App.jsx:22 ~ extra ~ extra", extra);
    //const show = extra[position].extraServices;
    return extra;
  };

  const content = showContent();
  console.log("🚀 ~ file: App.jsx:29 ~ App ~ content", content);

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

    showContent();
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
                // value={id}
                onCheck={() => handleOnChange(index)}
              />
              {content.find(
                ({ id, extraServices }) => id === index && <Quantity />
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
