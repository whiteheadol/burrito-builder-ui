describe ('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'initialFetch'
    })

    cy.intercept('POST', "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      headers: {
        'x-requested-with': 'exampleClient',
      },
      fixture: 'singleResponse'
    })

    cy.visit('http://localhost:3000/')
  });

  it('Should load a homepage showing a form and past orders', () => {
    cy.get('.page-title').should('have.text', 'Burrito Builder')
    cy.get('form').should('exist')
    cy.get('.name-input').should('exist')
    cy.get('.ing-btn').should('have.length', 12)
    cy.get('.order-info').should('have.text', 'Order: Nothing selected')
    cy.get('.sub-btn').should('have.text', 'Submit Order')

    cy.get('.order').should('have.length', 3)
    cy.get('.order').first().should('contain', 'Pat')
    cy.get('.order').first().should('contain', 'beans')
    cy.get('.order').first().should('contain', 'lettuce')
    cy.get('.order').first().should('contain', 'carnitas')
    cy.get('.order').first().should('contain', 'queso fresco')
    cy.get('.order').first().should('contain', 'jalapeno')
  });

  it('Should allow a user to submit a new order', () => {
    cy.get('input[name="name"]').type('Chama').should('have.value', 'Chama')
    cy.get('#jalapenos').click()
    cy.get('#beans').click()
    cy.get('.order-info').should('have.text', 'Order: jalapenos, beans')
    cy.get('.sub-btn').click()

    cy.get('.order').should('have.length', 4)
    cy.get('.order').last().should('contain', 'Chama')
    cy.get('.order').last().should('contain', 'jalapenos')
    cy.get('.order').last().should('contain', 'beans')

    cy.get('input[name="name"]').should('have.value', '')
  });

  it('Should not allow a user to submit an order unless they input their name and at least one ingredient', () => {
    
  })
})



// Show an error message if the user trie to submit an order that doesn't have needed data
// Should show error messages if either fetch fails
