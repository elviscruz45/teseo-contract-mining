import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Modal } from "./Modal";

// Mock the necessary dependencies
jest.mock("@rneui/themed", () => ({
  Overlay: jest.fn(({ children }) => children),
}));

describe("Modal", () => {
  test("renders correctly when visible", () => {
    const { getByText } = render(
      <Modal show={true} close={() => {}}>
        <Text>Modal Content</Text>
      </Modal>
    );

    // You can add more assertions based on your specific content and styling
    expect(getByText("Modal Content")).toBeDefined();
  });

  test("calls the close function on backdrop press", () => {
    const closeMock = jest.fn();
    const { getByTestId } = render(
      <Modal show={true} close={closeMock}>
        <Text>Modal Content</Text>
      </Modal>
    );

    // Simulate a press on the backdrop
    fireEvent.press(getByTestId("overlay"));

    // Verify that the close function was called
    expect(closeMock).toHaveBeenCalled();
  });
});
