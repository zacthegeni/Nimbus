describe('nimbus app', () => {
  it('loads', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Tags');
  });
});
