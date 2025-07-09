import { useState, useCallback } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook for handling async operations with loading states and error handling
 * @param {Function} asyncFunction - The async function to execute
 * @param {Object} options - Configuration options
 * @returns {Object} - { execute, loading, error, data }
 */
function useAsyncHandler(asyncFunction, options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = "Operation completed successfully!",
    onSuccess = null,
    onError = null,
  } = options;

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        const result = await asyncFunction(...args);
        setData(result);

        if (showSuccessToast) {
          toast.success(successMessage);
        }

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        setError(err);

        if (showErrorToast) {
          const errorMessage =
            err.response?.data?.message || err.message || "An error occurred";
          toast.error(`❌ ${errorMessage}`);
        }

        if (onError) {
          onError(err);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [
      asyncFunction,
      showSuccessToast,
      showErrorToast,
      successMessage,
      onSuccess,
      onError,
    ]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}

/**
 * Custom hook for form validation errors
 */
export function useFormErrors() {
  const [errors, setErrors] = useState({});

  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    hasErrors,
  };
}

/**
 * Utility function to handle network errors gracefully
 */
export function handleNetworkError(error) {
  if (!navigator.onLine) {
    toast.error("📡 You are offline. Please check your internet connection.");
    return;
  }

  if (error.code === "NETWORK_ERROR" || !error.response) {
    toast.error(
      "🌐 Network error. Please check your connection and try again."
    );
    return;
  }

  const message =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred";
  toast.error(`❌ ${message}`);
}

export default useAsyncHandler;
