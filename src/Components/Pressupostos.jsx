import React from "react";

export const Pressupostos = ({
  name,
  nomPressu,
  servicesName,
  idiomes,
  pages,
  price,
  currentDate,
}) => {
  return (
    <label>
      <h3>Nom Pressupost: {nomPressu}</h3>
      <p>Nom Client: {name}</p>
      <p>Serveis contractats: {String(servicesName)}</p>
      <p>
        Número d'idiomes: {idiomes} Número de pàgines:{pages}
      </p>
      <p>Preu total: {price} €</p>
      <p>Data del pressupost: {String(currentDate.toLocaleDateString())}</p>
    </label>
  );
};
