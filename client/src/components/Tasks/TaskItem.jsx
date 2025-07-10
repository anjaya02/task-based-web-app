import React from "react";
import {
  Edit,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { isTaskOverdue } from "../../utils/taskUtils";

const TaskItem = ({ task, onEdit, onDelete }) => {
  // Color mapping for task priority badges
  const getPriorityColor = (priority) => {
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

  // Icon selection based on task status
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  // Color mapping for status badges
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50";
      case "in-progress":
        return "text-blue-700 bg-blue-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  return (
    // Main card with glassmorphism effect and hover animations
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
      {/* Decorative background element for visual interest */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-10 sm:translate-x-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            {/* Task title and status section */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-900 transition-colors duration-200 truncate">
                {task.title}
              </h3>
              <span
                className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getPriorityColor(
                  task.priority
                )} shadow-sm flex-shrink-0`}
              >
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Due Date Display */}
            {task.dueDate && (
              <div
                className={`flex items-center space-x-2 mb-3 sm:mb-4 text-sm ${
                  isTaskOverdue(task)
                    ? "text-red-600 bg-red-50 px-3 py-1 rounded-lg"
                    : "text-gray-600"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                  {isTaskOverdue(task) && (
                    <span className="ml-2 font-semibold">⚠️ Overdue</span>
                  )}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <span
                    className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      task.status
                    )} shadow-sm`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Edit task"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced footer with better mobile styling */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 font-medium">
            Created{" "}
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year:
                new Date(task.createdAt).getFullYear() !==
                new Date().getFullYear()
                  ? "numeric"
                  : undefined,
            })}
          </div>

          {/* Task completion indicator */}
          <div className="flex items-center space-x-2">
            {task.status === "completed" && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span className="text-xs font-medium hidden sm:inline">
                  Done
                </span>
              </div>
            )}
            {task.priority === "high" && task.status !== "completed" && (
              <div className="flex items-center space-x-1 text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium hidden sm:inline">
                  Urgent
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
