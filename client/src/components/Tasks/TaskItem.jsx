import React from "react";
import { Edit, Trash2, Clock, AlertCircle, CheckCircle } from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(task.status)}
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status.replace("-", " ")}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskItem;
