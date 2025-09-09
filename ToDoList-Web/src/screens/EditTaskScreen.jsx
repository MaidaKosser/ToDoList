import { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import { showToast } from "../components/Toast";

export default function EditTaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        // Add `editing` flag for inline editing
        const editableData = data.map(t => ({ ...t, editing: false }));
        setTasks(editableData);
      } catch (err) {
        console.error(err);
        showToast("Failed to load tasks", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleEditToggle = (id) => {
    setTasks(prev =>
      prev.map(t => (t._id === id ? { ...t, editing: !t.editing } : t))
    );
  };

  const handleChange = (id, value) => {
    setTasks(prev =>
      prev.map(t => (t._id === id ? { ...t, title: value } : t))
    );
  };

  const handleUpdate = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task.title.trim()) {
      showToast("Task cannot be empty", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task.title }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(t =>
          t._id === id ? { ...updatedTask, editing: false } : t
        )
      );
      showToast("Task updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error updating task", "error");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading tasks...</p>;

  return (
    <div style={wrapperStyles}>
      <CardWrapper>
        <h2 style={headingStyles}>✏️ Edit Tasks</h2>
        <p style={subHeadingStyles}>Click on a task to edit and then update</p>

        {tasks.length === 0 ? (
          <p style={noTaskStyle}>No tasks found</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} style={taskRowStyle}>
              {task.editing ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleChange(task._id, e.target.value)}
                  style={taskInputStyle}
                  autoFocus
                />
              ) : (
                <span
                  style={taskTitleStyle}
                  onClick={() => handleEditToggle(task._id)}
                >
                  {task.title}
                </span>
              )}
              {task.editing && (
                <button
                  style={updateBtnStyle}
                  onClick={() => handleUpdate(task._id)}
                >
                  Update
                </button>
              )}
            </div>
          ))
        )}
      </CardWrapper>
    </div>
  );
}

// ===== STYLES =====
const wrapperStyles = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
  padding: "40px",
  boxSizing: "border-box",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headingStyles = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: "8px",
  textAlign: "center",
};
const subHeadingStyles = { fontSize: "16px", color: "#666", marginBottom: "20px", textAlign: "center" };
const noTaskStyle = { fontSize: "16px", color: "#888", textAlign: "center", marginTop: "20px" };

const taskRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  marginBottom: "12px",
  borderRadius: "12px",
  background: "#f0f0f0",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const taskTitleStyle = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
  wordBreak: "break-word",
  cursor: "pointer",
  flex: 1,
};

const taskInputStyle = {
  flex: 1,
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const updateBtnStyle = {
  background: "#28a745", // green
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  marginLeft: "12px",
  transition: "all 0.2s ease",
};
