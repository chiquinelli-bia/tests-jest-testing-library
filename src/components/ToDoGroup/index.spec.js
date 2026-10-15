import { render } from "@testing-library/react";
import ToDoGroup from ".";

describe("./ToDoGroup.js", () => {
  test("deveria renderizar o componente corretamente", () => {
    const { getByText, queryAllByRole } = render(<ToDoGroup todos={[]} heading="Teste" />);
    expect(getByText("Teste")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });
});
