// TaskList.js
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p style={styles.empty}>No tasks yet 🚀</p>;
  }

  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  empty: {
    color: "#888",
    fontStyle: "italic",
    fontSize: "16px",
    textAlign: "center",
  },
};
