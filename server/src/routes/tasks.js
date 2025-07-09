import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import { taskValidation, validateRequest } from "../middleware/validation.js";

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route("/")
  .get(getTasks)
  .post(taskValidation, validateRequest, createTask);

router.get("/stats", getTaskStats);

router
  .route("/:id")
  .put(taskValidation, validateRequest, updateTask)
  .delete(deleteTask);

export default router;
