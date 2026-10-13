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
});
