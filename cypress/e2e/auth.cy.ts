describe('template spec', () => {
 beforeEach(() => {
   cy.visit('/')
 })

 it('shows user the Login Page', () => { 
  cy.get('div').should('be.visible')
 })

})