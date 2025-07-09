import mongoose from "mongoose";

// Task schema with comprehensive validation and indexing
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Every task must belong to a user
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Database indexes for optimal query performance
taskSchema.index({ user: 1, createdAt: -1 }); // User tasks sorted by date
taskSchema.index({ user: 1, status: 1 }); // Filter by status
taskSchema.index({ user: 1, priority: 1 }); // Filter by priority

export default mongoose.model("Task", taskSchema);
