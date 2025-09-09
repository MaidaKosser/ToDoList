import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
