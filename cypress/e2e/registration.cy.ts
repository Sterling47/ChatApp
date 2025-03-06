import { generateUniqueUser } from "cypress/fixtures/user"
describe('registration spec', () => {
  beforeEach(() =>{
    cy.visit('/')
    cy.task('cleanupTestUsers').then((deletedCount) => {
      cy.log(`Deleted ${deletedCount} test users`);
    });
  })
  it('Should see username, email, and password fields for signup', () => {
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('input[name="signup-username"]').should('exist')
    cy.get('input[name="signup-email"]').should('exist')
    cy.get('input[name="signup-password"]').should('exist')
  })
  it('Should return an error if email or password fields are empty on submit', () => {
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('[data-testid="signup-button"]').click()
    cy.get('[data-test="email-error"]').should('be.visible');
    cy.get('[data-test="password-error"]').should('be.visible');
  })
  it('Should allow the user to create an account without a username', () => {
    const user = generateUniqueUser()
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('input[name="signup-email"]').type(user.email)
    cy.get('input[name="signup-password"]').type(user.password)
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {
        email: user.email,
        password: user.password
      }
    }).as('registerUser');
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        email: user.email,
        password: user.password
      }
    }).as('loginUser');
    cy.get('[data-testid="signup-button"]').click();
    cy.wait('@registerUser');
    cy.login('credentials', user.email, user.password).then(() => {
      cy.url().should('include','Home')
    });
    cy.get('h2').should('have.text','Lets get set up!')
  })
  it('Should allow the user to create an account with a username', () => {
    const user = generateUniqueUser()
    cy.registerUser(user)
    cy.login('credentials', user.email, user.password).then(() => {
      cy.url().should('include','Home')
    });
    cy.get('h2').should('have.text','Lets get set up!')
  })
  it('Should allow the user to change their username after registering', () => {
    const user = generateUniqueUser()
    cy.registerUser(user)
    cy.login('credentials', user.email, user.password).then(() => {
      cy.url().should('include','Home')
    });
    cy.get('[data-testid="create-username"]').type('changeUser')
    cy.get('[data-testid="create-username-submit"]').click()
    cy.get('#username').should('have.text','changeUser')
  })
})