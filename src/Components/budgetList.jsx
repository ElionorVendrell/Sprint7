export const BudgetList = class {
  name;
  nomPressu;
  services;
  idiomes;
  pages;
  price;
  currentDate;
  constructor(name, nomPressu, services, idiomes, pages, price, currentDate) {
    this.name = name;
    this.nomPressu = nomPressu;
    this.services = services;
    this.idiomes = idiomes;
    this.pages = pages;
    this.price = price;
    this.currentDate = currentDate;
  }
};
