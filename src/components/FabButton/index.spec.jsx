import { render } from "@testing-library/react";
import { FabButton } from ".";

describe("./fabButton.js", () => {
  test("deveria renderizar o componente corretamente", () => {
    const { getByRole } = render(<FabButton onClick={() => {}}>txt simples</FabButton>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("fab");
    expect(button).toHaveTextContent("txt simples");
  });
});
