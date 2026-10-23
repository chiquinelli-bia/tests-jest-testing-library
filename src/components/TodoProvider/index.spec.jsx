import { render, waitFor } from "@testing-library/react";
import { TodoProvider } from ".";
import { getTodos } from "../../services/TodoService";
import { act } from "react";

jest.mock("../../services/TodoService");

describe("ToDoProvider", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test("deveria renderizar o provider corretamente buscando os todos ao montar", async () => {
    render(<TodoProvider />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(getTodos).toHaveBeenCalled();
    });
  });
});
