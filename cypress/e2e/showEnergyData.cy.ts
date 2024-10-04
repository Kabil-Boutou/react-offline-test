describe('spec show energy mix', () => {
  it('data api and showed data should be equal', () => {
    cy.intercept('/generation').as('getEnergie')
    cy.visit('http://localhost:8080')
    // wait for the first response to finish
    cy.wait('@getEnergie').then((intreception) => {
      const apiResponse = intreception.response.body.data.generationmix
      apiResponse.forEach((value) => {
        cy.get(`[data-testid="${value.fuel.toUpperCase()}-number"]`).should('contain.text', value.perc)
      })
    })
  })
  it('should show all the fuels in the chart', () => {
    cy.intercept('/generation').as('getEnergie')
    cy.visit('http://localhost:8080')
    // wait for the first response to finish
    cy.wait('@getEnergie').then((intreception) => {
      const apiResponse = intreception.response.body.data.generationmix
      apiResponse.forEach((value) => {
        cy.get(`[data-testid="${value.fuel}-number-chart"]`).should('exist')
      })
    })
  })
})
