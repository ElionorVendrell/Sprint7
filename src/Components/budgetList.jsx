export const BudgetList = class {
  name;
  nomPressu;
  servicesName;
  idiomes;
  pages;
  price;
  currentDate;
  constructor(
    name,
    nomPressu,
    servicesName,
    idiomes,
    pages,
    price,
    currentDate
  ) {
    this.name = name;
    this.nomPressu = nomPressu;
    this.servicesName = servicesName;
    this.idiomes = idiomes;
    this.pages = pages;
    this.price = price;
    this.currentDate = currentDate;
  }
};
