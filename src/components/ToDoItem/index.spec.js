import { render } from "@testing-library/react";
import { ToDoItem } from ".";
import { TodoContext } from "../TodoProvider/TodoContext";
import userEvent from "@testing-library/user-event";

describe("./toDoItem.js", () => {
  test("deveria renderizar o componente corretamente", () => {
    const item = {
      description: "Aprender Jest",
      createdAt: "2026-10-14T10:00:00Z",
      completed: false,
    };

    const { getByText, getByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoItem item={item}></ToDoItem>
      </TodoContext.Provider>,
    );

    expect(getByText("Aprender Jest")).toBeInTheDocument();
    expect(getByText("14/10/2026")).toBeInTheDocument();
    expect(getByRole("checkbox")).not.toBeChecked();
  });
  test("deveria chamar a função selectTodoForEdit quando o botão de editar for clicado", async () => {
    const funcaoSimulandoSelectTodoForEdit = jest.fn();
    const item = {
      description: "Editar Jest",
      createdAt: "2026-10-14T10:00:00Z",
      completed: false,
    };

    const { getByRole } = render(
      <TodoContext.Provider value={{ selectTodoForEdit: funcaoSimulandoSelectTodoForEdit }}>
        <ToDoItem item={item}></ToDoItem>
      </TodoContext.Provider>,
    );

    const button = getByRole("button", { name: /edit/i });
    await userEvent.click(button);

    expect(funcaoSimulandoSelectTodoForEdit).toHaveBeenCalledWith(item);
  });
  test("deveria chamar a função removeTodo quando o botão de deletar for clicado", async () => {
    const funcaoSimulandoRemoveTodo = jest.fn();
    const item = {
      description: "remover Jest",
      createdAt: "2026-10-14T10:00:00Z",
      completed: false,
    };

    const { getByRole } = render(
      <TodoContext.Provider value={{ removeTodo: funcaoSimulandoRemoveTodo }}>
        <ToDoItem item={item}></ToDoItem>
      </TodoContext.Provider>,
    );

    const button = getByRole("button", { name: /delete/i });
    await userEvent.click(button);

    expect(funcaoSimulandoRemoveTodo).toHaveBeenCalledWith(item);
  });
});
