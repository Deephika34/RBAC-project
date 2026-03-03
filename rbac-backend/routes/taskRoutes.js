const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const checkPermission = require("../middleware/permissionMiddleware");

const Task = require("../models/Task");

// ================= CREATE TASK =================
router.post("/", verifyToken, checkPermission(["admin", "user"]), async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// ================= READ TASKS =================
router.get("/", verifyToken, checkPermission(["admin", "user"]), async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// ================= UPDATE TASK =================
router.put("/:id", verifyToken, checkPermission(["admin", "user"]), async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// ================= DELETE TASK (ADMIN ONLY) =================
router.delete("/:id", verifyToken, checkPermission(["admin"]), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;