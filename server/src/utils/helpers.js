// Simple utility functions for the server
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Enhanced password validation: at least 6 characters, 1 uppercase, 1 lowercase, 1 number
  // Optionally allows special characters for stronger passwords
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

// Get password strength score (for API responses)
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "Invalid" };

  let score = 0;
  if (password.length >= 6) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  if (password.length >= 8) score++;

  if (score <= 2) return { score, label: "Weak" };
  if (score <= 4) return { score, label: "Medium" };
  return { score, label: "Strong" };
};

const formatTaskResponse = (task) => {
  if (!task) return null;

  return {
    _id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    user: task.user,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};

const sanitizeUserResponse = (user) => {
  if (!user) return null;

  const { password, ...userWithoutPassword } = user.toObject
    ? user.toObject()
    : user;
  return userWithoutPassword;
};

module.exports = {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  formatTaskResponse,
  sanitizeUserResponse,
};
