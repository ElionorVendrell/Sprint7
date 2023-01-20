import { useState, useEffect } from "react";
import services from "../../data/services.json";
import { Quantity } from "./Quantity";
import { Checkbox } from "./Checkbox";
import { Border } from "../../styles/styled.js";
import Swal from "sweetalert2";

function Budget() {
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
    //ternari per saber mostrar 0 al preu total quan no hi ha més pàgines seleccionades
    const totalExtra =
      qtyLang > 1 || qtyPages > 1 ? qtyPages * qtyLang * 30 : 0;
    //ternari per indicar que si no està seleccionat el checkbox no sumi els extres
    const totalN = checkboxPrice ? totalExtra + checkboxPrice : 0;

    setTotal(totalN);
  };

  //Realitzar la funció calculateTotal quan hi hagi canvis a algun dels states indicats
  useEffect(() => {
    calculateTotal();
  }, [checkedState, qtyLang, qtyPages]);

  //Funció per obrir el modal on demana el nom del client (amb SWAL)
  //sweetalert funciona per promeses, per això hem de dir que després de posar el nom faci algo
  const saveData = () => {
    let nameClient;
    Swal.fire({
      text: "Escriu el teu nom per guardar el pressupost",
      input: "text",
      inputPlaceholder: "Escriu aquí el teu nom",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Guardar",
      confirmButtonColor: "#7393B3",
      allowEnterKey: true,
      allowEscapeKey: true,
      stopKeydownPropagation: true,
      customClass: {
        input: "inputCustom",
        popup: "popupName",
      },
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`És obligatori escriure un nom`);
          });
      },

      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      nameClient = result.value.login;
      console.log(`El nom del client és ${nameClient}`);

      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          icon: "success",
          text: "El pressupost s'ha guardat correctament",
          showConfirmButton: false,
          timer: 1500,
          position: "top",
        });
      }
      saveLocalStorage(nameClient);
    });
  };

  //Funció que guarda tot al localStorage, rep el nom del client per argument
  const saveLocalStorage = (nameClient) => {
    localStorage.setItem("Serveis seleccionats", checkedState);
    localStorage.setItem("Número de pàgines", qtyPages);
    localStorage.setItem("Número d'idiomes", qtyLang);
    localStorage.setItem("Preu total", total);
    localStorage.setItem("Nom Client", nameClient);
    localStorage.setItem("Data pressupost", newDate());
  };
  // useState de Welcome (pàgina d'inici)
  /*   const [welcome, setWelcome] = useState(true); */

  //Funció del botó start a la pàgina d'inici. Canvia l'estat de welcome i mostra la pàgina principal de l'app
  /*   const start = () => {
    setWelcome(false);
  }; */

  //Mentre welcome sigui true mostrarà la pàgina de benvinguda. Quan sigui false (amb botó start) mostrarà la pàgina principal d'app
  return (
    /* welcome === true ? (
    <Welcome start={start} />
  ) :  */ //Allò que imprimim per pantalla
    <div className='App'>
      <h2>Indica què vols pressupostar</h2>
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
                <Border key={e.id}>
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
      <button className='buttonData' onClick={saveData}>
        Guardar pressupost
      </button>
    </div>
  );
}

export default Budget;
