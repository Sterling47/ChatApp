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

  // it('Logs in as guest and checks the x-login-type header', () => {
  //   cy.intercept('POST', '/api/auth/login', (req) => {
  //     expect(req.headers['x-login-type']).to.equal('guest');
  //     req.reply({ fixture: 'guestLogin.json' });
  //   }).as('guestLogin');
  //   cy.get('[data-testid="login-button"]').click();
  //   cy.get('[data-testid="guest-login"]').click();
  //   cy.wait('@guestLogin').its('response.statusCode').should('eq', 200);
  //   cy.url().should('include', '/Home');
  // });
  
  it.only('should login as a guest user', () => {
    let csrfToken: string | string[];
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      headers: {
        'x-login-type': 'guest'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Logged in as guest');
      csrfToken = response.headers['x-csrf-token'];
      expect(csrfToken).to.exist;
      cy.visit('/Home');
      cy.url().should('include', '/Home');
    });
  });
})