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
      <div className="text-center py-16 sm:py-24">
        {/* Beautiful animated illustration */}
        <div className="mb-8 sm:mb-12">
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
            {/* Animated background circles */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 rounded-full opacity-30 animate-ping"></div>

            {/* Main icon container */}
            <div className="absolute inset-4 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
              <div className="relative">
                <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                {/* Floating plus icon */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1.5 shadow-lg animate-bounce">
                  <Plus className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspiring headline */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Ready to Get Things Done?
          </h3>
          <p className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto leading-relaxed px-4">
            Your productivity journey starts with a single task. Let's make
            today amazing! ✨
          </p>
        </div>

        {/* Beautiful call-to-action card */}
        <div className="max-w-sm mx-auto">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {/* Decorative top border */}
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>

            <div className="flex items-center justify-center space-x-3 text-blue-600 mb-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Your First Task
              </span>
            </div>

            <p className="text-blue-700 text-sm font-medium">
              Click the{" "}
              <span className="bg-blue-100 px-2 py-1 rounded-md font-bold">
                Create Task
              </span>{" "}
              button above
            </p>

            {/* Motivational badges */}
            <div className="flex justify-center space-x-2 mt-4">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                📈 Boost Productivity
              </span>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                🎯 Stay Focused
              </span>
            </div>
          </div>
        </div>

        {/* Subtle bottom decoration */}
        <div className="mt-8 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
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
