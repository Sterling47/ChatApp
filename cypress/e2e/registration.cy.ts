describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/')
  })
  it('Should see username, email, and password fields for signup', () => {
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('input[name="signup-username"').should('exist')
    cy.get('input[name="signup-email"').should('exist')
    cy.get('input[name="signup-password"').should('exist')
  })
  it('Should return an error if email or password fields are empty on submit', () => {
    cy.get('.login-btn').click()
    cy.get('[data-testid="register-button"]').click()
    cy.get('[data-testid="signup-button"]').click()
    cy.get('[data-test="email-error"]').should('be.visible');
    cy.get('[data-test="password-error"]').should('be.visible');
  })
})