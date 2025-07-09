import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskItem from "../components/Tasks/TaskItem";

describe("TaskItem Component", () => {
  const mockTask = {
    _id: "1",
    title: "Test Task",
    description: "This is a test task description",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-01T00:00:00.000Z",
    user: "1",
  };

  const mockProps = {
    task: mockTask,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders task information correctly", () => {
    render(<TaskItem {...mockProps} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test task description")
    ).toBeInTheDocument();
  });

  it("renders task with high priority", () => {
    render(<TaskItem {...mockProps} />);

    const priorityElement = screen.getByText("high");
    expect(priorityElement).toBeInTheDocument();
    expect(priorityElement).toHaveClass("text-red-600", "bg-red-50");
  });

  it("renders task with pending status", () => {
    render(<TaskItem {...mockProps} />);

    const statusElement = screen.getByText("pending");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("text-gray-700", "bg-gray-50");
  });

  it("renders task with completed status correctly", () => {
    const completedTask = { ...mockTask, status: "completed" };
    render(<TaskItem {...mockProps} task={completedTask} />);

    const statusElement = screen.getByText("completed");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("text-green-700", "bg-green-50");
  });

  it("renders medium priority correctly", () => {
    const mediumPriorityTask = { ...mockTask, priority: "medium" };
    render(<TaskItem {...mockProps} task={mediumPriorityTask} />);

    const priorityElement = screen.getByText("medium");
    expect(priorityElement).toBeInTheDocument();
    expect(priorityElement).toHaveClass("text-yellow-600", "bg-yellow-50");
  });

  it("renders edit and delete buttons", () => {
    render(<TaskItem {...mockProps} />);

    const editButton = screen.getByTitle("Edit task");
    const deleteButton = screen.getByTitle("Delete task");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
