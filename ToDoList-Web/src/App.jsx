import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import Header from "./components/Header";
import ToastContainerWrapper from "./components/Toast"; 

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  return (
    <Router>
      <Header />
      <ToastContainerWrapper /> {/* ✅ mount it once at the top level */}
      <Routes>
        <Route path="/" element={<HomeScreen tasks={tasks} onDelete={deleteTask} />} />
        <Route path="/add" element={<AddTaskScreen onAdd={addTask} />} />
        <Route path="/edit/:id" element={<EditTaskScreen tasks={tasks} onUpdate={updateTask} />} />
      </Routes>
    </Router>
  );
}
