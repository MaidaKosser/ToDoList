import { useState } from "react";

export default function TaskInput({ title, setTitle, onAdd }) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

    if (wordCount > 10) {
      setError("Task cannot exceed 10 words!");
    } else {
      setError("");
    }
    setTitle(value);
  };

  const handleAddClick = () => {
    const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0;

    if (!title.trim()) {
      setError("Task cannot be empty");
      return;
    }

    if (wordCount > 10) {
      setError("Task cannot exceed 10 words!");
      return; // ✅ stop add if limit exceeded
    }

    onAdd(); // only runs if no errors
    setTitle(""); // reset input
    setError(""); // clear error
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Enter your task..."
          style={styles.input}
        />
        <button onClick={handleAddClick} style={styles.addBtn}>
          Add
        </button>
      </div>
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles = {
  wrapper: { width: "100%", marginBottom: "20px" },
  inputRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    minWidth: "200px",
    maxWidth: "100%",
  },
  addBtn: {
    background: "#2ecc71",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    flex: "0 0 auto",
  },
  errorText: { color: "#e74c3c", fontSize: "14px", marginTop: "6px" },
};
