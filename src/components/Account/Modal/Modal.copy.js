import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Modal } from "./Modal";
import { Text, View } from "react-native";

// Mock the react-native-elements library
jest.mock("@rneui/themed", () => ({
  Overlay: jest.fn(
    ({ isVisible, onBackdropPress, children }) =>
      isVisible && <div onPress={onBackdropPress}>{children}</div>
  ),
}));

describe("MyComponent", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Modal>
        <Text testID="modal-content">Open Overlay</Text>
      </Modal>
    );

    // Check if the component renders without crashing
    expect(getByText("Open Overlay")).toBeDefined();
  });

  it("toggles overlay visibility", () => {
    const { getByText } = render(<Modal />);

    // Open Overlay
    fireEvent.press(getByText("Open Overlay"));

    // Check if the Overlay content is visible
    expect(getByText("Hello from Overlay!")).toBeDefined();

    // Close Overlay
    fireEvent.press(getByText("Close Overlay"));

    // Check if the Overlay content is not visible
    expect(() => getByText("Hello from Overlay!")).toThrowError();
  });
});
