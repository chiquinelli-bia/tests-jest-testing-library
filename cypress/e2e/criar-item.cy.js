describe("deveria criar um item", () => {
  it("deveria criar um item", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#root button.fab").click();
    cy.get('#root [name="description"]').click();
    cy.get('#root [name="description"]').type("Aprendendo Cypress");
    cy.get("button.btn[type='submit']").click();
    cy.contains("Aprendendo Cypress", { timeout: 5000 });
  });
});
