import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Modal } from "./Modal";
import "@testing-library/jest-dom";

// Mock the @rneui/themed library
jest.mock("@rneui/themed", () => ({
  Overlay: ({ isVisible, onBackdropPress, children, testID }) => {
    if (isVisible) {
      return (
        <div onBackdropPress={onBackdropPress} testID={testID}>
          {children}
        </div>
      );
    }

    return null;
  },
}));

describe("Modal", () => {
  it("renders correctly", () => {
    const closeMock = jest.fn();
    const { getByTestId } = render(
      <Modal show={true} close={closeMock} testID="mockOverlay">
        <span>Modal Content</span>
      </Modal>
    );

    expect(getByTestId("mockOverlay")).toBeDefined();
  });

  it("calls the close function on backdrop press", () => {
    const closeMock = jest.fn();
    const { getByTestId } = render(
      <Modal show={true} close={closeMock} testID="mockOverlay">
        <span>Modal Content</span>
      </Modal>
    );

    fireEvent.press(getByTestId("mockOverlay"));
    expect(closeMock).toHaveBeenCalled();
  });
});
