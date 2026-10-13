import { render } from "@testing-library/react";
import { SubHeading } from ".";

describe("./SubHeading.js", () => {
  /**
   * getBy: Para elementos que DEVEM estar na tela imediatamente
   * É síncrono e "exigente": se não encontrar o elemento imediatamente, o teste falha. Use quando você tem certeza de que o elemento deve estar lá.
   *
   * NOTE: o segundo teste "está certo", mas após nosso aprendizado, sabemos que não é o ideal porque devíamos esperar o teste quebrando
   *  e não retornando null.
   */
  describe("getBy", () => {
    test("deveria renderizar o componente corretamente ", () => {
      const { getByText } = render(<SubHeading>Para Estudar</SubHeading>);
      expect(getByText("Para Estudar")).toBeInTheDocument();
    });
  });
});
