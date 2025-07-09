import React, { useState, useEffect } from "react";
import {
  Plus,
  LayoutDashboard,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import TaskFilter from "../components/Tasks/TaskFilter";
import ConfirmationModal from "../components/Common/ConfirmationModal";
import { taskAPI } from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: "",
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    sortBy: "createdAt",
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks(filters);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error("❌ Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
      setShowForm(false);
      toast.success("✨ Task created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to create task");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await taskAPI.updateTask(editingTask._id, taskData);
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? response.data.task : task
        )
      );
      setEditingTask(null);
      setShowForm(false);
      toast.success("✅ Task updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    setDeleteModal({
      isOpen: true,
      taskId,
      taskTitle: task?.title || "this task",
    });
  };

  const confirmDeleteTask = async () => {
    try {
      await taskAPI.deleteTask(deleteModal.taskId);
      setTasks(tasks.filter((task) => task._id !== deleteModal.taskId));
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
      toast.success("🗑️ Task deleted successfully!");
    } catch (error) {
      toast.error("❌ Failed to delete task");
    }
  };

  const cancelDeleteTask = () => {
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Enhanced Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                  <LayoutDashboard className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Task Dashboard
                </h1>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-lg">
                  Stay organized and boost your productivity 🚀
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4 mt-2 sm:mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {tasks.filter((t) => t.status === "in-progress").length}{" "}
                      active
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {tasks.filter((t) => t.status === "completed").length}{" "}
                      completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group"
            >
              <Plus className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-base sm:text-lg">Create Task</span>
            </button>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-xs sm:text-sm font-medium">
                    Total Tasks
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-900">
                    {tasks.length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-600 text-xs sm:text-sm font-medium">
                    In Progress
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-amber-900">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-amber-200 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-xs sm:text-sm font-medium">
                    Completed
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-green-900">
                    {tasks.filter((t) => t.status === "completed").length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-xs sm:text-sm font-medium">
                    High Priority
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900">
                    {tasks.filter((t) => t.priority === "high").length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-8 mb-6 sm:mb-10">
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Filter & Sort
            </h2>
          </div>
          <TaskFilter filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Tasks Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Your Tasks
              </h2>
            </div>
            {tasks.length > 0 && (
              <div className="flex items-center space-x-2 sm:ml-auto">
                <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {tasks.length} total
                </div>
                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {Math.round(
                    (tasks.filter((t) => t.status === "completed").length /
                      tasks.length) *
                      100
                  )}
                  % complete
                </div>
              </div>
            )}
          </div>
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            loading={loading}
          />
        </div>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteModal.taskTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;
