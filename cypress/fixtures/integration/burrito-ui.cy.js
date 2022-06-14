describe ('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'initialFetch'
    })

    cy.visit('http://localhost:3000/')
  });

  it('Should load a homepage showing a form and past orders', () => {
    cy.get('.page-title').should('have.text', 'Burrito Builder')
  });
})
