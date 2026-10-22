describe("deveria excluir um item", () => {
  it("excluir-item", function () {
    cy.visit("http://localhost:5173/");
    cy.contains("Aprendendo Cypress", { timeout: 600 })
      .parent()
      .find('[aria-label="delete"]')
      .click();
    cy.contains("Aprendendo Cypress", { timeout: 600 }).should("not.exist");
  });
});
