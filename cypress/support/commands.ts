export {};

interface User {
  email: string;
  username: string;
  password: string;
}
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login and get auth tokens
       * @param type - 'guest' for guest login or 'credentials' for email/password
       * @param email - Email for credential login (optional for guest)
       * @param password - Password for credential login (optional for guest)
       */
      login(type: 'guest' | 'credentials', email?: string, password?: string): Chainable;
      registerUser(user: User): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (type: 'guest' | 'credentials', email?: string, password?: string) => {
  const headers: Record<string, string> = {};
  const body: Record<string, string> = {};
  
  if (type === 'guest') {
    headers['x-login-type'] = 'guest';
  } else {
    if (!email || !password) {
      throw new Error('Email and password are required for credential login');
    }
    body.email = email;
    body.password = password;
  }

  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/login',
    headers,
    body: type === 'credentials' ? body : undefined,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      const csrfToken = response.headers['x-csrf-token'];
      if (csrfToken) {
        Cypress.env('csrfToken', csrfToken);
      }
      
      cy.log(`Successfully logged in as ${type === 'guest' ? 'guest' : email}`);
    } else {
      cy.log(`Login failed with status: ${response.status}`);
      cy.log(response.body.message || 'Unknown error');
    }
  });
});

Cypress.Commands.add('registerUser', (user: User) => {
  cy.get('.login-btn').click()
  cy.get('[data-testid="register-button"]').click()
  cy.get('input[name="signup-username"]').type(user.username)
  cy.get('input[name="signup-email"]').type(user.email)
  cy.get('input[name="signup-password"]').type(user.password)
  cy.intercept('POST', '/api/auth/register', {
    statusCode: 200,
    body: {
      username: user.username,
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
})