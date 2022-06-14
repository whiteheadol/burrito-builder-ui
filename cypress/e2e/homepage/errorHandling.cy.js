describe ('Burrito Builder fetch error handling', () => {

  it('Should see an error message if the initial fetch fails', () => {
    cy.intercept('GET', "http://localhost:3001/api/v1/orders", {
      statusCode: 500,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'initialFetch'
    })
    cy.visit('http://localhost:3000/')

    cy.get('.load-error').should('have.text', 'Oh no! There was a problem loading the data. Please try again later.')
  });

  it('Should see an error message if the form POST fails', () => {
    cy.intercept('POST', "http://localhost:3001/api/v1/orders", {
      statusCode: 500,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'singleResponse'
    })
    cy.visit('http://localhost:3000/')

    cy.get('input[name="name"]').type('Chama').should('have.value', 'Chama')
    cy.get('#jalapenos').click()
    cy.get('#beans').click()
    cy.get('.order-info').should('have.text', 'Order: jalapenos, beans')
    cy.get('.sub-btn').click()

    cy.get('.post-error').should('have.text', 'Oh no! There was a problem submitting your order. Please try again later!')
  });

})
