import { describe, it, expect } from "vitest";
import {
  formatTaskPriority,
  formatTaskStatus,
  isTaskOverdue,
  getTaskStatusColor,
  getTaskPriorityColor,
} from "../utils/taskUtils";

describe("Task Utilities", () => {
  describe("formatTaskPriority", () => {
    it("should format priority correctly", () => {
      expect(formatTaskPriority("HIGH")).toBe("high");
      expect(formatTaskPriority("Medium")).toBe("medium");
      expect(formatTaskPriority("LOW")).toBe("low");
    });

    it("should return default for null/undefined", () => {
      expect(formatTaskPriority(null)).toBe("low");
      expect(formatTaskPriority(undefined)).toBe("low");
      expect(formatTaskPriority("")).toBe("low");
    });
  });

  describe("formatTaskStatus", () => {
    it("should format status correctly", () => {
      expect(formatTaskStatus("in-progress")).toBe("in progress");
      expect(formatTaskStatus("COMPLETED")).toBe("completed");
      expect(formatTaskStatus("pending")).toBe("pending");
    });

    it("should return default for null/undefined", () => {
      expect(formatTaskStatus(null)).toBe("pending");
      expect(formatTaskStatus(undefined)).toBe("pending");
      expect(formatTaskStatus("")).toBe("pending");
    });
  });

  describe("isTaskOverdue", () => {
    it("should detect overdue tasks", () => {
      const overdueTask = {
        dueDate: "2023-01-01",
        status: "pending",
      };
      expect(isTaskOverdue(overdueTask)).toBe(true);
    });

    it("should not mark completed tasks as overdue", () => {
      const completedTask = {
        dueDate: "2023-01-01",
        status: "completed",
      };
      expect(isTaskOverdue(completedTask)).toBe(false);
    });

    it("should handle tasks without due date", () => {
      const taskWithoutDueDate = {
        status: "pending",
      };
      expect(isTaskOverdue(taskWithoutDueDate)).toBe(false);
    });
  });

  describe("getTaskStatusColor", () => {
    it("should return correct colors for status", () => {
      expect(getTaskStatusColor("completed")).toBe(
        "text-green-700 bg-green-50"
      );
      expect(getTaskStatusColor("in-progress")).toBe(
        "text-blue-700 bg-blue-50"
      );
      expect(getTaskStatusColor("pending")).toBe("text-gray-700 bg-gray-50");
      expect(getTaskStatusColor("unknown")).toBe("text-gray-700 bg-gray-50");
    });
  });

  describe("getTaskPriorityColor", () => {
    it("should return correct colors for priority", () => {
      expect(getTaskPriorityColor("high")).toBe("text-red-600 bg-red-50");
      expect(getTaskPriorityColor("medium")).toBe(
        "text-yellow-600 bg-yellow-50"
      );
      expect(getTaskPriorityColor("low")).toBe("text-green-600 bg-green-50");
      expect(getTaskPriorityColor("unknown")).toBe("text-gray-600 bg-gray-50");
    });
  });
});
