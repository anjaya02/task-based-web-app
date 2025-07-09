const {
  validateEmail,
  validatePassword,
  formatTaskResponse,
  sanitizeUserResponse,
} = require("../src/utils/helpers.js");

describe("Server Utilities", () => {
  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
      expect(validateEmail("user+tag@example.org")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("@domain.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should validate strong passwords", () => {
      expect(validatePassword("Password123")).toBe(true);
      expect(validatePassword("MyPass1")).toBe(true);
      expect(validatePassword("Test@123")).toBe(true);
    });

    it("should reject weak passwords", () => {
      expect(validatePassword("password")).toBe(false); // no uppercase, no number
      expect(validatePassword("PASSWORD")).toBe(false); // no lowercase, no number
      expect(validatePassword("12345")).toBe(false); // no letters
      expect(validatePassword("Pass1")).toBe(false); // too short
    });
  });

  describe("formatTaskResponse", () => {
    it("should format task response correctly", () => {
      const mockTask = {
        _id: "123",
        title: "Test Task",
        description: "Test Description",
        status: "pending",
        priority: "high",
        user: "user123",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      };

      const formatted = formatTaskResponse(mockTask);

      expect(formatted).toHaveProperty("_id", "123");
      expect(formatted).toHaveProperty("title", "Test Task");
      expect(formatted).toHaveProperty("status", "pending");
      expect(formatted).toHaveProperty("priority", "high");
      expect(formatted).not.toHaveProperty("__v");
    });

    it("should handle null task", () => {
      expect(formatTaskResponse(null)).toBe(null);
      expect(formatTaskResponse(undefined)).toBe(null);
    });
  });

  describe("sanitizeUserResponse", () => {
    it("should remove password from user object", () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
        createdAt: new Date(),
        toObject: () => ({
          _id: "123",
          username: "testuser",
          email: "test@example.com",
          password: "hashedpassword",
          createdAt: new Date(),
        }),
      };

      const sanitized = sanitizeUserResponse(mockUser);

      expect(sanitized).toHaveProperty("_id", "123");
      expect(sanitized).toHaveProperty("username", "testuser");
      expect(sanitized).toHaveProperty("email", "test@example.com");
      expect(sanitized).not.toHaveProperty("password");
    });

    it("should handle plain objects without toObject method", () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      const sanitized = sanitizeUserResponse(mockUser);

      expect(sanitized).not.toHaveProperty("password");
      expect(sanitized).toHaveProperty("username", "testuser");
    });

    it("should handle null user", () => {
      expect(sanitizeUserResponse(null)).toBe(null);
      expect(sanitizeUserResponse(undefined)).toBe(null);
    });
  });
});
