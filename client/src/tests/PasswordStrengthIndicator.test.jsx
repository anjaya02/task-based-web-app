import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PasswordStrengthIndicator from "../components/Common/PasswordStrengthIndicator";

describe("PasswordStrengthIndicator", () => {
  it("should not render when password is empty", () => {
    const { container } = render(<PasswordStrengthIndicator password="" />);
    expect(container.firstChild).toBeNull();
  });

  it("should show weak password strength", () => {
    render(<PasswordStrengthIndicator password="weak" />);
    expect(screen.getByText("Weak")).toBeInTheDocument();
  });

  it("should show medium password strength", () => {
    render(<PasswordStrengthIndicator password="Pass1" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("should show strong password strength", () => {
    render(<PasswordStrengthIndicator password="Password123!" />);
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });

  it("should show requirements checklist", () => {
    render(<PasswordStrengthIndicator password="Pass1" />);
    expect(screen.getByText("6+ characters")).toBeInTheDocument();
    expect(screen.getByText("Uppercase")).toBeInTheDocument();
    expect(screen.getByText("Lowercase")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
  });

  it("should show security tip for medium strength passwords", () => {
    render(<PasswordStrengthIndicator password="Password1" />);
    expect(
      screen.getByText(/Add special characters and make it 8\+ chars/)
    ).toBeInTheDocument();
  });
});
