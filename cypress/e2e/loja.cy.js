describe('Loja virtual SauceDemo', () => {
  it('Teste 01 - Login válido', () => {
    cy.login();
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.url().should('include', '/inventory.html');
  })

  it('Teste 02 - Login inválido', () => {
    cy.login('invalid_user', 'invalid_password');
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    cy.url().should('equal', cy.config().baseUrl + '/');
  })

  it('Teste 03 - Adicionar produtos ao carrinho', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="inventory-item-name"]').eq(0).should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="inventory-item-price"]').eq(0).should('have.text', '$29.99');
    cy.get('[data-test="inventory-item-name"]').eq(1).should('have.text', 'Sauce Labs Bike Light');
    cy.get('[data-test="inventory-item-price"]').eq(1).should('have.text', '$9.99');
  })

  it('Teste 04 - Remover produto do carrinho', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 1);
    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Bike Light');
    cy.get('[data-test="inventory-item-price"]').should('have.text', '$9.99');
  })

  it('Teste 05 - Finalizar uma compra', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Mario');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.url().should('include', '/checkout-complete.html');
  })

  it('Teste 06 - Ordenação de produtos', () => {
    cy.login();
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [];
      for (const price of $prices) {
        prices.push(parseFloat(price.innerText.replace('$', '')));
      }

      const ordered = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(ordered);
    })

  })

  it('Teste 07 - Logout', () => {
    cy.login();
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.get('[data-test="login-button"]').should('have.value', 'Login');
    cy.url().should('equal', cy.config().baseUrl + '/');
  })
  
})
