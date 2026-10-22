describe("deveria editar um item", () => {
  it("editar-item", function () {
    cy.visit("http://localhost:5173/");
    cy.contains("Aprendendo Cypress", { timeout: 6000 })
      .parente()
      .find('[aria-label="edit"]')
      .click();
    cy.get('input[name="description"]').click().clear().type("Atualizando cypress");
    cy.get('button[type="submit"]').click();
    cy.contains("Atualizando cypress", { timeout: 6000 });
  });
});
