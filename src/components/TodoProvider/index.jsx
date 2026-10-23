import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../services/TodoService";
import { TodoContext } from "./TodoContext";

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromApi = await getTodos();
        setTodos(todosFromApi);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    fetchTodos();
  }, []);

  const upsertTodo = async (formData) => {
    if (selectedTodo) {
      const updatedTodo = {
        ...selectedTodo,
        description: formData.get("description"),
      };

      setTodos((oldState) =>
        oldState.map((item) => (item.id === selectedTodo.id ? updatedTodo : item)),
      );

      await updateTodo(updatedTodo);
    } else {
      const newTodo = {
        description: formData.get("description"),
        createdAt: new Date().toISOString(),
        completed: false,
      };

      const createdTodo = await createTodo(newTodo);
      setTodos((oldState) => [...oldState, createdTodo]);
    }

    closeTodoFormModal();
  };

  const removeTodo = async (todo) => {
    setTodos((oldState) => oldState.filter((t) => t.id !== todo.id));
    await deleteTodo(todo.id);
  };

  const toggleItemCompleted = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    setTodos((oldState) => oldState.map((item) => (item.id === todo.id ? updatedTodo : item)));

    await updateTodo(updatedTodo);
  };

  const openTodoFormModal = () => {
    setShowDialog(true);
  };

  const closeTodoFormModal = () => {
    setShowDialog(false);
    setSelectedTodo(null);
  };

  const selectTodoForEdit = (todo) => {
    setSelectedTodo(todo);
    openTodoFormModal();
  };

  return (
    <TodoContext
      value={{
        todos,
        upsertTodo,
        removeTodo,
        toggleItemCompleted,
        openTodoFormModal,
        closeTodoFormModal,
        isModalOpen: showDialog,
        selectTodoForEdit,
        selectedTodo,
      }}
    >
      {children}
    </TodoContext>
  );
};
