describe('template spec', () => {
 beforeEach(() => {
   cy.visit('/')
 })

 it('shows user the Login Page', () => { 
  cy.get('div').should('be.visible')
 })

 it('Displays Welcome Message', () => {
  cy.get('h1').contains('Welcome to Chatt-r')
 })

 it('Displays Login Page and Sign in button and opens RegisterModal on click', () => {
    cy.get('[data-testid="login-button"]').click() 
    cy.get('[data-testid="register-modal"]').should('be.visible').within(() => {
    cy.get('[data-testid="auth-form"').should('be.visible')
    })
  })

  it('Navigates to /Home when clicking Continue as Guest', () => {
    cy.get('[data-testid="login-button"]').click()
    cy.get('[data-testid="guest-login"]').click() 
    cy.url().should('include', '/Home')
  })

})