import React from "react";
import { Loader2, FileText, Plus } from "lucide-react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-2xl shadow-2xl mb-6">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <p className="text-gray-700 font-semibold text-lg">
          Loading your tasks...
        </p>
        <p className="text-gray-500 text-sm mt-2">This won't take long</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20">
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center shadow-lg">
            <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          No tasks yet
        </h3>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-base sm:text-lg leading-relaxed px-4">
          Start your productivity journey! Create your first task and take
          control of your day.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-sm mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-blue-600 mb-2">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-bold text-base sm:text-lg">
              + Create Task
            </span>
          </div>
          <p className="text-blue-700 text-xs sm:text-sm">
            Click <strong>"+ Create Task"</strong> to add your first task
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Enhanced Tasks Grid with mobile-first responsive design */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
