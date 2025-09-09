import { useState } from "react";
import CardWrapper from "../components/CardWrapper";
import TaskInput from "../components/TaskInput";
import { showToast } from "../components/Toast";

export default function AddTaskScreen({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      showToast("Task cannot be empty", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      onAdd(newTask); // update frontend state
      setTitle("");
      showToast("Task added successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to add task", "error");
    }
  };

  return (
    <div style={styles.wrapper}>
      <CardWrapper>
        <h2 style={styles.heading}>➕ Add New Task</h2>
        <p style={styles.subHeading}>Stay productive — add your next task below</p>
        <TaskInput title={title} setTitle={setTitle} onAdd={handleAdd} />
      </CardWrapper>
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
  },
  heading: {
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
};
