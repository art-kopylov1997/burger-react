/// <reference types="cypress" />

const emailInput = '[data-testid="email-input"]';
const passwordInput = '[data-testid="password-input"]';
const loginButton = '[data-testid="login-button"]';

const stockIngredients = '[data-testid="stock-ingredient"]';
const closeButton = '[data-testid="modal-close-button"]';
const constructor = '[data-testid="constructor"]';
const submitButton = '[data-testid="submit-order-button"]';

describe("burger constructor component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("login user", () => {
    cy.visit("http://localhost:3000/login");
    cy.get(emailInput).type("rouch_16@mail.ru");
    cy.get(passwordInput).type("password");
    cy.get(loginButton).click();
  });

  it("opens and closes all the ingredients modal windows", () => {
    cy.get(stockIngredients).each((element) => {
      cy.wrap(element).click();
      cy.get(closeButton).click();
    });
  });

  it("drags and drops all ingredients to the constructor", () => {
    cy.get(stockIngredients).each((element) => {
      cy.wrap(element).trigger("dragstart");
      cy.get(constructor).trigger("drop");
    });

    cy.get(submitButton).click();
  });
});
