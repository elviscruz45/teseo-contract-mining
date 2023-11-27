import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Overlay } from "@rneui/themed";

jest.mock("@rneui/themed", () => {
  const originalModule = jest.requireActual("@rneui/themed");
  return {
    ...originalModule,
    useTheme: jest.fn(() => ({
      colors: { primary: "#007bff" },
    })),
  };
});

describe("Overlay Component", () => {
  it("should render the Overlay component with default props", () => {
    render(<Overlay />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveStyle({
      backgroundColor: "#007bff",
    });
  });

  it("should render the Overlay component with custom props", () => {
    render(<Overlay visible={false} onDismiss={() => jest.fn()} />);
    expect(screen.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("should handle the onDismiss prop", () => {
    const mockOnDismiss = jest.fn();
    render(<Overlay onDismiss={mockOnDismiss} />);
    screen.getByRole("button").tap();
    expect(mockOnDismiss).toHaveBeenCalled();
  });
});
