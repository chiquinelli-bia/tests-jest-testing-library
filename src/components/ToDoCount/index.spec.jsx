import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToDoCount } from ".";
import { getTodos } from "../../services/TodoService";

jest.mock("../../services/TodoService");

describe("ToDoCount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve exibir a quantidade correta de tarefas cadastradas", async () => {
    getTodos.mockResolvedValueOnce([
      {
        id: 1,
        description: "Estudar React",
        completed: false,
        createdAt: "2025-08-26T10:00:00.000Z",
      },
      {
        id: 2,
        description: "Estudar Jest",
        completed: true,
        createdAt: "2025-08-27T10:00:00.000Z",
      },
    ]);

    const { container } = render(<ToDoCount />);

    expect(getTodos).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const countSpan = container.querySelector(".todo-count");
      expect(countSpan).toHaveTextContent("2");
    });
  });

  test("deve iniciar com o botão desabilitado e habilitar após carregar a contagem", async () => {
    getTodos.mockResolvedValueOnce([{ id: 1, description: "Estudar React" }]);

    const { getByRole, container } = render(<ToDoCount />);
    const button = getByRole("button", { name: /refresh/i });

    // Estado inicial
    expect(button).toBeDisabled();

    // Após o término do carregamento
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(container.querySelector(".todo-count")).toHaveTextContent("1");
    });
  });

  test("deveria atualizar o número de itens corretamente após clicar no botão de refresh", async () => {
    // 1ª chamada: montagem inicial (2 itens)
    getTodos.mockResolvedValueOnce([
      { id: 1, description: "Estudar React" },
      { id: 2, description: "Estudar Jest" },
    ]);

    // 2ª chamada: clique no refresh (3 itens)
    getTodos.mockResolvedValueOnce([
      { id: 1, description: "Estudar React" },
      { id: 2, description: "Estudar Jest" },
      { id: 3, description: "Estudar RTL" },
    ]);

    const { getByRole, container } = render(<ToDoCount />);

    // Aguarda a carga inicial
    await waitFor(() => {
      expect(container.querySelector(".todo-count")).toHaveTextContent("2");
    });

    // Clica no botão
    const button = getByRole("button", { name: /refresh/i });
    await userEvent.click(button);

    // Valida a atualização e se o serviço foi chamado duas vezes
    expect(getTodos).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(container.querySelector(".todo-count")).toHaveTextContent("3");
      expect(button).not.toBeDisabled();
    });
  });
});
