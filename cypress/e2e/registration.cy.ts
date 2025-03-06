describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/')
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
  it.only('Should allow the user to create an account with a username', () => {
    cy.intercept('POST', '/api/auth/register', {
      fixture: 'registerUser',
      statusCode: 200
    }).as('registerUser')
    cy.intercept('POST', '/api/auth/login',{
      fixture: 'registerUserLogin',
      statusCode: 200
    }).as('loginRequest');
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('input[name="signup-username"]').type('test-user')
    cy.get('input[name="signup-email"]').type('email@email.com')
    cy.get('input[name="signup-password"]').type('password')
    cy.get('[data-testid="signup-button"]').click();
    cy.wait('@registerUser');
    cy.fixture('registerUser').then((fixture) => {
      cy.login('credentials', fixture.email, fixture.password).then(() => {
        cy.visit('/Home');
        cy.url().should('include', '/Home');
      });
    })
  })
})