import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // "danger", "warning", "info"
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "text-red-600",
          iconBg: "bg-red-100",
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        };
      case "warning":
        return {
          iconColor: "text-yellow-600",
          iconBg: "bg-yellow-100",
          confirmButton:
            "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
        };
      default:
        return {
          iconColor: "text-blue-600",
          iconBg: "bg-blue-100",
          confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-lg text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-white/20">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="px-6 py-8 sm:px-8">
            <div className="sm:flex sm:items-start">
              {/* Icon */}
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${styles.iconBg} sm:mx-0 sm:h-10 sm:w-10`}
              >
                <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold leading-6 text-gray-900 mb-2">
                  {title}
                </h3>

                {/* Message */}
                <div className="mt-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50/80 backdrop-blur-sm px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 border-t border-gray-200/50">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 sm:ml-3 sm:w-auto ${styles.confirmButton} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-lg transition-all duration-200 sm:mt-0 sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
