// Simple API utility functions to test
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const formatTaskPriority = (priority) => {
  if (!priority) return "low";
  return priority.toLowerCase();
};

export const formatTaskStatus = (status) => {
  if (!status) return "pending";
  return status.toLowerCase().replace(/-/g, " ");
};

export const isTaskOverdue = (task) => {
  if (!task.dueDate) return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  return dueDate < today && task.status !== "completed";
};

export const getTaskStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "text-green-700 bg-green-50";
    case "in-progress":
      return "text-blue-700 bg-blue-50";
    default:
      return "text-gray-700 bg-gray-50";
  }
};

export const getTaskPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50";
    case "medium":
      return "text-yellow-600 bg-yellow-50";
    case "low":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};
