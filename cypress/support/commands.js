// Comandos personalizados (ex.: Cypress.Commands.add('login', ...))

Cypress.Commands.add('login', (user = 'standard_user', pwd = 'secret_sauce') => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(user);
    cy.get('[data-test="password"]').type(pwd);
    cy.get('[data-test="login-button"]').click();
})
