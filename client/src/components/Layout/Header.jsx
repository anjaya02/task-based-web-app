import React from "react";
import { LogOut, CheckSquare, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section - Mobile Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
              <CheckSquare className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskManager
            </h1>
          </div>

          {/* User Section - Mobile Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* User Info - Responsive Layout */}
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-1 sm:p-2 rounded-md sm:rounded-lg">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-gray-900 hidden sm:block">
                  Welcome back!
                </p>
                <p className="text-gray-600 truncate max-w-[80px] sm:max-w-none">
                  {user?.name}
                </p>
              </div>
            </div>

            {/* Logout Button - Mobile Responsive */}
            <button
              onClick={logout}
              className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
