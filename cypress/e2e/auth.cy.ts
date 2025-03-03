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


  // it('Logs in as guest and checks the x-login-type header', () => {
     //   cy.intercept('POST', '/api/auth/login', (req) => {
     //     expect(req.headers['x-login-type']).to.equal('guest');
     //     req.reply({ fixture: 'guestLogin.json' });
     //   }).as('guestLogin');
     
     //   cy.intercept('GET', '/api/seedUser', {
     //     statusCode: 200,
     //     body: {
     //       id: '109',
     //       isGuest: true,
     //       name: 'Guest User'
     //     }
     //   }).as('getUser');
     
   
     //   cy.get('[data-testid="login-button"]').click();
     //   cy.get('[data-testid="guest-login"]').click();
     
     //   cy.wait('@guestLogin').its('response.statusCode').should('eq', 200).then(() => {
     //     cy.log('Guest login request completed');
     //   });
     
   
     //   cy.get('[data-testid="welcomeGuest"]', { timeout: 10000 })
     //     .should('be.visible')
     //     .within(() => {
     //       cy.contains('Welcome Guest!').should('be.visible');
     //       cy.contains("We're preparing your experience...").should('be.visible');
     //     });
     
     //   cy.wait('@getUser', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
     
     //   cy.url().should('include', '/Home');
     //   cy.get('[data-testid="welcome-message"]', { timeout: 10000 }).should('be.visible');
     // });

})