import { useState } from "react";
import services from "../data/services.json";

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

    setTotal(totalPrice);
  };

  return (
    <div className='App'>
      <h2>Què vols fer?</h2>
      <div className='services-list'>
        {services.map(({ name, price }, index) => {
          return (
            <div key={index}>
              <input
                type='checkbox'
                id={`id-checkbox-${index}`}
                name={name}
                price={price}
                value={name}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />

              <label htmlFor={`custom-checkbox-${index}`}>
                {name} ({price}€)
              </label>
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

/* 
function App() {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  return (
    <div className='App'>
      Què vols fer?
      <div className='web'>
        <input
          type='checkbox'
          id='web'
          name='web'
          value='web'
          checked={isChecked}
          onChange={handleOnChange}
        />
        Una pàgina web (500€)
      </div>
      <div className='seo'>
        <input
          type='checkbox'
          id='seo'
          name='seo'
          value='seo'
          checked={isChecked}
          onChange={handleOnChange}
        />
        Una consultoria SEO (300€)
      </div>
      <div className='ads'>
        <input
          type='checkbox'
          id='ads'
          name='ads'
          value='ads'
          checked={isChecked}
          onChange={handleOnChange}
        />
        Una campanya de Google Ads (200€)
      </div>
    </div>
  );
} */
