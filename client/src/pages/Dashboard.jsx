import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import TaskFilter from "../components/Tasks/TaskFilter";
import { taskAPI } from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
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
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
      setShowForm(false);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
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
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      <TaskFilter filters={filters} onFilterChange={setFilters} />

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        loading={loading}
      />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
