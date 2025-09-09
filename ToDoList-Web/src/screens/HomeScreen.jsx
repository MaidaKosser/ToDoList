import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { showToast } from "../components/Toast";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load tasks", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task via backend
const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");

    const data = await res.json(); // { _id: "...", message: "Task deleted successfully" }

    setTasks((prev) => prev.filter((t) => t._id !== data._id)); // remove from frontend state
    showToast("Task deleted successfully!", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to delete task", "error");
  }
};



  // Add new task via backend
  const handleAdd = async () => {
    if (!newTask.trim()) {
      showToast("Task cannot be empty", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });

      if (!res.ok) throw new Error("Failed to add task");
      const addedTask = await res.json();

      setTasks((prev) => [...prev, addedTask]);
      setNewTask(""); // clear input
      showToast("Task added successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to add task", "error");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.header}>✅ To-Do List</h1>
        <p style={styles.subHeader}>Manage your daily tasks efficiently</p>

        <div style={styles.addTaskRow}>
          <input
            type="text"
            placeholder="Enter new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAdd} style={styles.addBtn}>Add</button>
        </div>

         {tasks.length === 0 ? (
  <p style={styles.noTask}>No tasks found. Add one above!</p>
) : (
  tasks.map((task) => (
    <div
      key={task._id}
      style={styles.taskCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = styles.taskCardHover.boxShadow;
        e.currentTarget.style.transform = styles.taskCardHover.transform;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = styles.taskCard.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <span style={styles.taskTitle}>{task.title}</span>
      <button
        onClick={() => handleDelete(task._id)}
        style={styles.deleteBtn}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = styles.deleteBtnHover.background)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = styles.deleteBtn.background)
        }
      >
        Delete
      </button>
    </div>
  ))
)}

      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
    padding: "40px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "50px 40px",
    width: "100%",
    maxWidth: "700px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    borderTop: "6px solid #25d8fcff",
  },
  header: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#333",
    textAlign: "center",
  },
  subHeader: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
    textAlign: "center",
  },
  addTaskRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  addBtn: {
    background: "rgba(28, 179, 28, 0.67)",
    color: "#fffffeff",
    border: "none",
    padding: "14px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  addBtnHover: {
    background: "#6a11cb",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    marginBottom: "15px",
    borderRadius: "15px",
    background: "#edededff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  taskCardHover: {
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transform: "translateY(-2px)",
  },
  taskTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    wordBreak: "break-word",
  },
  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  deleteBtnHover: {
    background: "#e63946",
  },
  noTask: {
    fontSize: "16px",
    color: "#888",
    textAlign: "center",
    marginTop: "20px",
  },
};
