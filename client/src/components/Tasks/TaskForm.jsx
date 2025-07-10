import React, { useState } from "react";
import { X, CheckSquare, Target, Flag, Calendar } from "lucide-react";

const TaskForm = ({ task, onSubmit, onCancel }) => {
  // Safe date formatting helper
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.warn("Invalid date format:", dateString);
      return "";
    }
  };

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    status: task?.status || "pending",
    dueDate: formatDateForInput(task?.dueDate),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate due date if provided
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Due date cannot be in the past");
        return;
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {task ? "Edit Task" : "Create New Task"}
                </h3>
                <p className="text-blue-100 text-sm">
                  {task ? "Update task details" : "Add a new task"}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Target className="h-4 w-4 text-blue-600" />
              <span>Task Title *</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title..."
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white resize-none"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add details (optional)..."
            />
          </div>

          {/* Priority and Status in Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Flag className="h-4 w-4 text-blue-600" />
                <span>Priority</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="high">🔴 High Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="low">🟢 Low Priority</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <CheckSquare className="h-4 w-4 text-blue-600" />
                <span>Status</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="pending">📋 Pending</option>
                <option value="in-progress">⚡ In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Due Date (Optional)</span>
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white"
              value={formData.dueDate}
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
