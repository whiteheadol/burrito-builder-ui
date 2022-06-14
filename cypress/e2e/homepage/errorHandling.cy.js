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
  
})
