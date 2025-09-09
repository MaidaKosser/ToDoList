import { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import TaskEditRow from "../components/TaskEditRow";
import { showToast } from "../components/Toast";

export default function EditTaskScreen() {
  const [editedTasks, setEditedTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setEditedTasks(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load tasks", "error");
      }
    };
    fetchData();
  }, []);

  const handleChange = (id, newTitle) => {
    setEditedTasks(prev =>
      prev.map(t => (t._id === id ? { ...t, title: newTitle } : t))
    );
  };

  const handleUpdate = async (id) => {
    const task = editedTasks.find(t => t._id === id);
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

      setEditedTasks(prev =>
        prev.map(t => (t._id === id ? updatedTask : t))
      );

      showToast("Task updated successfully!", "success"); // ✅ green toast
    } catch (err) {
      console.error(err);
      showToast("Error updating task", "error");
    }
  };

  return (
    <div style={wrapperStyles}>
      <CardWrapper>
        <h2 style={headingStyles}>✏️ Edit Tasks</h2>
        <p style={subHeadingStyles}>Update your tasks quickly</p>

        {editedTasks.length === 0 ? (
          <p style={noTaskStyle}>No tasks found</p>
        ) : (
          editedTasks.map(task => (
            <TaskEditRow
              key={task._id}
              task={task}
              onChange={handleChange}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </CardWrapper>
    </div>
  );
}

const wrapperStyles = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
  padding: "40px",
};
const headingStyles = { fontSize: "28px", fontWeight: "700", color: "#2c3e50", marginBottom: "8px" };
const subHeadingStyles = { fontSize: "16px", color: "#666", marginBottom: "20px" };
const noTaskStyle = { fontSize: "16px", color: "#888", textAlign: "center", marginTop: "20px" };
