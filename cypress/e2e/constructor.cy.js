/// <reference types="cypress" />

import ingredientsMock from "../fixtures/ingredients.json";
import orderMock from "../fixtures/order.json";
import userMock from "../fixtures/user.json";

const localhostUrl = "http://localhost:3000";

const stockIngredients = '[data-testid="stock-ingredient"]';
const closeButton = '[data-testid="modal-close-button"]';
const constructor = '[data-testid="constructor"]';
const submitButton = '[data-testid="submit-order-button"]';
const orderNumber = '[data-testid="order-number"]';

describe("burger constructor component", () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit(localhostUrl);
    cy.intercept("GET", "api/ingredients", ingredientsMock);
    cy.intercept("GET", "api/orders", orderMock);
    cy.intercept("GET", "api/auth/user", userMock).as("getUser");

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
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
  });

  it("drags and drops all ingredients to the constructor", () => {
    cy.get(stockIngredients).each((element) => {
      cy.wrap(element).trigger("dragstart");
      cy.get(constructor).trigger("drop");
    });

    cy.get(submitButton).click();
    // cy.get(orderNumber).contains(orderMock.number)
  });
});
