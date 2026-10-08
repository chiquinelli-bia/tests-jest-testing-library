const mergeClass = ({ isCompleteded = false }) => {
  const styles = ["todo-item"];
  if (isCompleteded) {
    styles.push("completed");
  }
  return styles.join(" ");
};

export default mergeClass;
