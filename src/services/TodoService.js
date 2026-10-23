// Substitua pela URL gerada no seu painel do MockAPI
const baseURL = "https://6adb48343b7e90b8208f9cbc.mockapi.io/todos";

export const getTodos = async () => {
  const response = await fetch(baseURL);
  if (!response.ok) throw new Error("Erro ao buscar tarefas");
  return response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Erro ao criar tarefa");
  return response.json();
};

export const updateTodo = async (todo) => {
  const response = await fetch(`${baseURL}/${todo.id}`, {
    method: "PUT", // ou "PATCH" se enviar apenas o campo alterado
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Erro ao atualizar tarefa");
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar tarefa");
  return response.json();
};
