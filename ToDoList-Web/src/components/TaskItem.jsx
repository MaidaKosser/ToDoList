// TaskItem.js
export default function TaskItem({ task, onDelete }) {
  return (
    <li style={styles.listItem}>
      <span style={styles.taskText}>{task.title}</span>
      <button style={styles.deleteBtn} onClick={() => onDelete(task.id)}>
        🗑 Delete
      </button>
    </li>
  );
}

const styles = {
  listItem: {
    background: "#f9f9f9",
    marginBottom: "12px",
    padding: "16px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background 0.2s ease, transform 0.2s ease",
  },
  taskText: {
    fontSize: "18px",
    color: "#2c3e50",
    fontWeight: "500",
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s ease, transform 0.2s ease",
  },
};
