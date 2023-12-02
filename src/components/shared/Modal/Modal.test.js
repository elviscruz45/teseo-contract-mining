import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Modal } from "./Modal";
import { Text } from "react-native";
// import "@testing-library/jest-dom";

describe("Modal", () => {
  it("renders the modal when show prop is true", () => {
    const { getByTestId } = render(
      <Modal show={true} close={jest.fn()}>
        <Text
          testID="overlay" // Add testID here
        >
          Modal Content
        </Text>
      </Modal>
    );

    const overlay = getByTestId("overlay");
    expect(overlay).toBeTruthy();
  });

  it("does not render the modal when show prop is false", () => {
    const { queryByTestId } = render(
      <Modal show={false} close={jest.fn()}>
        <Text testID="overlay">Modal Content</Text>
      </Modal>
    );

    const overlay = queryByTestId("overlay");
    expect(overlay).toBeNull();
  });

  it("calls the close function when backdrop is pressed", () => {
    const closeMock = jest.fn();
    const { getByTestId } = render(
      <Modal show={true} close={closeMock}>
        <Text testID="overlay">Modal Content</Text>
      </Modal>
    );

    const overlay = getByTestId("overlay");
    fireEvent(overlay, "backdropPress");
    expect(closeMock).toHaveBeenCalled();
  });
});
