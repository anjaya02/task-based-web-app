// Simple utility functions for the server
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
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
  formatTaskResponse,
  sanitizeUserResponse,
};
