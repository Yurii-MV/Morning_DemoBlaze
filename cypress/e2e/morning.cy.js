/// <reference types='cypress' />

let user;
const alertRegisterMessage = 'Sign up successful.';
const welcomeText = 'Welcome';
const productName = 'Samsung galaxy s6';
const addToCartBtn = 'Add to cart';
const messageAddToCard = 'Product added';

describe('On DemoBlaze site', () => {
  before(() => {
    cy.visit('');
    cy.task('generateUserData').then((generateUserData) => {
      user = generateUserData;
    });
  });

  it('flow register -> login -> add product to the cart', () => {
    cy.get('#signin2').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#sign-username').type(user.name);
    cy.get('#sign-password').type(user.password);
    cy.get('[onclick="register()"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains(alertRegisterMessage);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#login2').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#loginusername').type(user.name);
    cy.get('#loginpassword').type(user.password);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[onclick="logIn()"]').click();
    cy.get('#nameofuser').should('contain.text', `${welcomeText} ${user.name}`);

    cy.contains('.hrefch', productName).click();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.contains('.btn', addToCartBtn).click().then(() => {
      cy.on('window:alert', (text) => {
        expect(text).to.contains(messageAddToCard);
      });
    });
  });
});
