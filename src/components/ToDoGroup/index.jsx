import { SubHeading } from "../SubHeading";
import { ToDoItem } from "../ToDoItem";
import { ToDoList } from "../ToDoList";

const ToDoGroup = ({ todos, heading }) => {
  const RenderContent = () => {
    if (todos.length === 0) {
      return <p style={{ color: "red" }}>Nenhum item encontrado</p>;
    }

    return (
      <ToDoList>
        {todos.map(function (t) {
          return <ToDoItem key={t.id} item={t} />;
        })}
      </ToDoList>
    );
  };
  return (
    <>
      <SubHeading>{heading}</SubHeading>
      <RenderContent />
    </>
  );
};

export default ToDoGroup;
