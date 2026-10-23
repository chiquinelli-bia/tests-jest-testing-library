import FormToDo from ".";
import userEvent from "@testing-library/user-event";
import customRender from "../../helpers/renderCustom";

describe("./formToDo.js", () => {
  test("deveria renderizar o form corretamente", () => {
    const { getByRole } = customRender(<FormToDo onSubmit={() => {}}></FormToDo>, {
      selectedTodo: { description: "Um exemplo qualquer DE NOVO" },
    });

    expect(getByRole("form")).toBeInTheDocument();
  });
  test("deveria renderizar a descrição do todo selecionado", async () => {
    const funcaoSimulandoSubmit = jest.fn();
    const { getByRole } = customRender(<FormToDo onSubmit={funcaoSimulandoSubmit}></FormToDo>, {
      selectedTodo: { description: "Um exemplo qualquer DE NOVO" },
    });

    const input = getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "um novo curso para estudar");

    const button = getByRole("button", { name: /salvar item/i });
    await userEvent.click(button);

    expect(funcaoSimulandoSubmit).toHaveBeenCalled();
  });
});
