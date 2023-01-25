import React from "react";
import { Card } from "../../styles/styled";

export const Pressupostos = ({
  name,
  nomPressu,
  servicesName,
  idiomes,
  pages,
  price,
}) => {
  return (
    <Card key={nomPressu}>
      <label>
        <h2>Nom Pressupost:</h2>
        <h3>{nomPressu}</h3>
        <p>
          {" "}
          <b>Nom Client:</b> {name}
        </p>
        <p>
          <b>Serveis contractats:</b> {String(servicesName)}
        </p>
        <p>
          <b> Número d'idiomes:</b> {idiomes} <b> Número de pàgines: </b>
          {pages}
        </p>
        <p>
          <b>Preu total:</b> {price} €
        </p>
      </label>
    </Card>
  );
};
