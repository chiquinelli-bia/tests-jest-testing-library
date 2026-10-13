import { render } from "@testing-library/react";
import FormToDo from ".";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("./formToDo.js", () => {
  test("deveria renderizar o form corretamente", () => {
    const { getByRole } = render(
      <TodoContext.Provider value={{ selectedTodo: { description: "Um exemplo qualquer" } }}>
        <FormToDo onSubmit={() => {}}></FormToDo>
      </TodoContext.Provider>,
    );
    expect(getByRole("form")).toBeInTheDocument();
  });
  test("deveria renderizar a descrição do todo selecionado", () => {
    const { getByRole } = render(
      <TodoContext.Provider
        value={{ selectedTodo: { description: "Um exemplo qualquer DE NOVO" } }}
      >
        <FormToDo onSubmit={() => {}}></FormToDo>
      </TodoContext.Provider>,
    );
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveValue("Um exemplo qualquer DE NOVO");
  });
});
