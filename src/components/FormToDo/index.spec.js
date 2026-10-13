import { render } from "@testing-library/react";
import FormToDo from ".";
import { TodoContext } from "../TodoProvider/TodoContext";
import userEvent from "@testing-library/user-event";

describe("./formToDo.js", () => {
  test("deveria renderizar o form corretamente", () => {
    const { getByRole } = render(
      <TodoContext.Provider value={{ selectedTodo: { description: "Um exemplo qualquer" } }}>
        <FormToDo onSubmit={() => {}}></FormToDo>
      </TodoContext.Provider>,
    );
    expect(getByRole("form")).toBeInTheDocument();
  });
  test("deveria renderizar a descrição do todo selecionado", async () => {
    const funcaoSimulandoSubmit = jest.fn();
    const { getByRole } = render(
      <TodoContext.Provider
        value={{ selectedTodo: { description: "Um exemplo qualquer DE NOVO" } }}
      >
        <FormToDo onSubmit={funcaoSimulandoSubmit}></FormToDo>
      </TodoContext.Provider>,
    );

    const input = getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "um novo curso para estudar");

    const button = getByRole("button", { name: /salvar item/i });
    await userEvent.click(button);

    expect(funcaoSimulandoSubmit).toHaveBeenCalled();
  });
});
