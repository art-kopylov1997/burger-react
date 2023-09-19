import userMock from "../fixtures/user.json";

const localhostUrl = "http://localhost:3000/login";

const emailInput = '[data-testid="email-input"]';
const passwordInput = '[data-testid="password-input"]';
const loginButton = '[data-testid="login-button"]';

describe("burger constructor component", () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit(localhostUrl);
    cy.intercept("GET", "api/auth/user", userMock);
  });

  it("login user", () => {
    cy.get(emailInput).type(userMock.user.email);
    cy.get(passwordInput).type(userMock.user.password);
    cy.get(loginButton).click();
  });
});
