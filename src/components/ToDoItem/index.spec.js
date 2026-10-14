import { render } from "@testing-library/react";
import { ToDoItem } from ".";
import { TodoContext } from "../TodoProvider/TodoContext";

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
});
