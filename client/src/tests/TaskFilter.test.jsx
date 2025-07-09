import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskFilter from "../components/Tasks/TaskFilter";

describe("TaskFilter Component", () => {
  const mockProps = {
    search: "",
    setSearch: vi.fn(),
    statusFilter: "all",
    setStatusFilter: vi.fn(),
    priorityFilter: "all",
    setPriorityFilter: vi.fn(),
    sortBy: "createdAt",
    setSortBy: vi.fn(),
    sortOrder: "desc",
    setSortOrder: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filter controls", () => {
    render(<TaskFilter {...mockProps} />);

    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Status")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Priorities")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Date Created")).toBeInTheDocument();
  });

  it("calls setSearch when typing in search input", async () => {
    const user = userEvent.setup();
    render(<TaskFilter {...mockProps} />);

    const searchInput = screen.getByPlaceholderText(/search tasks/i);
    await user.type(searchInput, "test task");

    expect(mockProps.setSearch).toHaveBeenCalledWith("test task");
  });

  it("calls setStatusFilter when changing status filter", async () => {
    const user = userEvent.setup();
    render(<TaskFilter {...mockProps} />);

    const statusSelect = screen.getByDisplayValue("All Status");
    await user.selectOptions(statusSelect, "completed");

    expect(mockProps.setStatusFilter).toHaveBeenCalledWith("completed");
  });

  it("calls setPriorityFilter when changing priority filter", async () => {
    const user = userEvent.setup();
    render(<TaskFilter {...mockProps} />);

    const prioritySelect = screen.getByDisplayValue("All Priorities");
    await user.selectOptions(prioritySelect, "high");

    expect(mockProps.setPriorityFilter).toHaveBeenCalledWith("high");
  });

  it("displays current search value", () => {
    const propsWithSearch = { ...mockProps, search: "my search term" };
    render(<TaskFilter {...propsWithSearch} />);

    const searchInput = screen.getByDisplayValue("my search term");
    expect(searchInput).toBeInTheDocument();
  });

  it("displays current status filter", () => {
    const propsWithStatus = { ...mockProps, statusFilter: "completed" };
    render(<TaskFilter {...propsWithStatus} />);

    const statusSelect = screen.getByDisplayValue("Completed");
    expect(statusSelect).toBeInTheDocument();
  });
});
