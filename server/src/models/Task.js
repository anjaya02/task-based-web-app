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
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          // If dueDate is provided, it should be in the future or today
          return !value || value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Due date cannot be in the past",
      },
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
taskSchema.index({ user: 1, dueDate: 1 }); // Filter by due date

export default mongoose.model("Task", taskSchema);
