#APP

```js
// Importem tot el que utilitzarem
import { useState } from "react";
import services from "../data/services.json";
import { Quantity, input } from "./Components/Quantity";
import { Checkbox } from "./Components/Checkbox";

function App() {

  ### useStates dels components
  //1. Fem un useState del checkbox per controlar quan està actiu i quan no
  //L'iniciem en false, que serà l'estat de quan no està seleccionat
  const [checkedState, setCheckedState] = useState(
    new Array(services.length).fill(false)
  );
  //2. Fem un useState per calcular el preu total, el que es mostrarà per pantalla.
  // L'inicialitzem en 0
  const [total, setTotal] = useState(0);

  //3. useState per saber quantes pàgines volen, l'inicialitzem en 1, perquè després
  // l'haurem de multiplicar. Si és 0 ens donarà 0. I sempre ha d'haver una pàgina i un idioma com a mínim si
  // demanen el pressu d'una pàgina web.
  const [qtyPages, setQtyPages] = useState(1);
  //4. useState per saber quants idiomes volen. Fem el mateix que amb el useState anterior
  //i l'inicialitzem amb 1.
  const [qtyLang, setQtyLang] = useState(1);

  //5. useState del Preu que es mostra quan el checkbox està actiu (sense els extres, només quan
  // es selecciona un element a través del checkbox)
  const [checkboxPrice, setCheckboxPrice] = useState(0);


  ### Funcions
  // Funció per restar un número al botó dels inputs.
  //Aquesta funció la cridarem des del botó que tenim al component Quantity, a través de les props.
  // La funció varia el useState del qtyPages o del qtyLang segons el id que rebi.
  //El id vindrà perquè el tenim posat al services.json dins els extres, i el component Quantity està fent un forEach a tots
  // els elements d'aquest. De cada element agafa el id, que coincideix per posició en el primer que s'imprimeix i l'utilitzem
  // per dir-li que si el id és 0 (el primer element) sigui qtyPages i si és 1 (el segon element) faci el canvi a qtyLang
  const backButton = (id) => {
    if (id === 0) {
      setQtyPages(qtyPages - 1);
    }
    if (qtyPages <= 1) {
      setQtyPages(1); //--> Indiquem que mai sigui menor a 1, ja que no pot demanar un pressu per 0 pàgines web ni 0 idiomes.
    }
    if (id === 1) {
      setQtyLang(qtyLang - 1);
    }
    if (qtyLang <= 1) {
      setQtyLang(1);
    }
  };

  // Funció per sumar un número al botó dels inputs
  //El mateix que la funció anterior però per sumar un número, ja que és el botó
  //de "+", l'anterior és per restar.
  const nextButton = (id) => {
    if (id === 0) {
      setQtyPages(qtyPages + 1);
    } else {
      setQtyLang(qtyLang + 1);
    }
  };

  // Funció per fer  canvis en el State del checkbox, el passa de false a true o viceversa.
  //li passem una propietat (position), que és el index que li hem enviat més abaix en el map de services.
  //li diem que si el index del "checkedState" i "position" és igual, canvii l'estat del "item", és a dir el false per true o viceversa.
  //Ho guardem en una nova variable (updatedCheckedState) perquè així assegurem que s'actualitza, per això després li passem aquesta nova variable (updatedCheckedState) al set CheckedState perquè actualitzi el checkedState
  const handleOnChange = (position) => {
    //Fem un map al checkedState per esbrinar quin item és i anar canviant el seu estat
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    // Ara fem un reduce d'aquesta variable on hem guardat l'estat de checkedState i li diem que si el estat actual és "true", ens sumi el preu del element actual. És a dir, ens calcula el preu total únicament dels elements seleccionats, sense els extra.
    const checkPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + services[index].price;
        }
        return sum;
      },
      0
    );

    //Mostrem només el preu dels checkbox seleccionats
    //Li diem que canvi l'estat de setCheckboxPrice i li posi el valor de la constant que acabem
    //de definir
    setCheckboxPrice(checkPrice);
  };

  //Calculem el total sumant els useStates i actualitzem l'estat amb "setTotal" per el "total" que és la suma de tot
  const calculateTotal = () => {
    const totalExtra = qtyLang * qtyPages * 30;
    const total = totalExtra + checkboxPrice;

    setTotal(total);
  };

  //Utilitzem useEffect perquè s'executi la funció calculateTotal()
  //sempre que hi hagi un canvi als estats de "checkedState", al "qtyLang" o al "qtyPages"
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
