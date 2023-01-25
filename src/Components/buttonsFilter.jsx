import React from "react";
import { Filter } from "../../styles/styled";

export const ButtonsFilter = ({ budget }) => {
  const orderName = () => {
    const budgetListAlphabetic = budget.map((e) => e.nomPressu).sort();
    console.log(budgetListAlphabetic);
    return budgetListAlphabetic;
  };

  const orderDate = () => {
    const orderByDate = budget
      .map((e) => e)
      .sort((a, b) => {
        a.currentDate - b.currentDate;
        if (a.currentDate < b.currentDate) return 1;
        else return -1;
      });
    console.log("orderByDate", orderByDate);
  };
  const resetredOrder = () => {
    const reset = budget
      .map((e) => e)
      .sort((a, b) => {
        a.currentDate - b.currentDate;
        if (a.currentDate > b.currentDate) return 1;
        else return -1;
      });
    console.log("reset", reset);
  };

  return (
    <div>
      <Filter onClick={orderName}>Ordenar per nom</Filter>
      <Filter onClick={orderDate}>Ordenar per data</Filter>
      <Filter onClick={resetredOrder}>Restaurar ordre</Filter>
    </div>
  );
};
