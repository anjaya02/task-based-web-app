import { describe, it, expect } from "vitest";
import { isTaskOverdue } from "../utils/taskUtils";

describe("Due Date Bug Tests", () => {
  describe("isTaskOverdue", () => {
    it("should handle completed tasks correctly", () => {
      const completedTask = {
        dueDate: "2023-01-01",
        status: "completed",
      };
      expect(isTaskOverdue(completedTask)).toBe(false);
    });

    it("should handle tasks due today", () => {
      const today = new Date().toISOString().split("T")[0];
      const taskDueToday = {
        dueDate: today,
        status: "pending",
      };
      expect(isTaskOverdue(taskDueToday)).toBe(false);
    });

    it("should handle tasks due tomorrow", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const taskDueTomorrow = {
        dueDate: tomorrow.toISOString().split("T")[0],
        status: "pending",
      };
      expect(isTaskOverdue(taskDueTomorrow)).toBe(false);
    });

    it("should handle overdue tasks correctly", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const overdueTask = {
        dueDate: yesterday.toISOString().split("T")[0],
        status: "pending",
      };
      expect(isTaskOverdue(overdueTask)).toBe(true);
    });

    it("should handle invalid date formats gracefully", () => {
      const taskWithInvalidDate = {
        dueDate: "invalid-date",
        status: "pending",
      };
      expect(isTaskOverdue(taskWithInvalidDate)).toBe(false);
    });

    it("should handle null/undefined due dates", () => {
      const taskWithoutDueDate = {
        dueDate: null,
        status: "pending",
      };
      expect(isTaskOverdue(taskWithoutDueDate)).toBe(false);

      const taskWithUndefinedDueDate = {
        status: "pending",
      };
      expect(isTaskOverdue(taskWithUndefinedDueDate)).toBe(false);
    });

    it("should handle edge case of exactly midnight", () => {
      // Task due yesterday at end of day vs today at start of day
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(23, 59, 59, 999);

      const overdueTask = {
        dueDate: yesterday.toISOString(),
        status: "pending",
      };
      expect(isTaskOverdue(overdueTask)).toBe(true);
    });
  });

  describe("Date parsing edge cases", () => {
    it("should handle ISO date strings", () => {
      const task = {
        dueDate: "2024-12-25T00:00:00.000Z",
        status: "pending",
      };
      // Should not throw error
      expect(() => isTaskOverdue(task)).not.toThrow();
    });

    it("should handle date-only strings", () => {
      const task = {
        dueDate: "2024-12-25",
        status: "pending",
      };
      // Should not throw error
      expect(() => isTaskOverdue(task)).not.toThrow();
    });

    it("should handle Date objects", () => {
      const task = {
        dueDate: new Date("2024-12-25"),
        status: "pending",
      };
      // Should not throw error
      expect(() => isTaskOverdue(task)).not.toThrow();
    });
  });
});
