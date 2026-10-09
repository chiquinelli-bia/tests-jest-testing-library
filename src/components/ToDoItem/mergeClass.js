// src/components/ToDoItem/mergeClass.js
const mergeClass = (isCompleted = false) => {
  const styles = ["todo-item"];
  if (isCompleted) {
    styles.push("completed");
  }
  return styles.join(" ");
};

export default mergeClass;
