import React from "react";
import { render } from "@testing-library/react-native";
import { LoadingModal } from "./LoadingModal";

describe("LoadingModal", () => {
  it("renders the loading modal when show prop is true", () => {
    const { getByTestId } = render(
      <LoadingModal show={true} text="Loading..." />
    );

    const loadingComponent = getByTestId("loading-component");
    expect(loadingComponent).toBeTruthy();
  });

  it("does not render the loading modal when show prop is false", () => {
    const { queryByTestId } = render(
      <LoadingModal show={false} text="Loading..." />
    );

    const loadingComponent = queryByTestId("loading-component");
    expect(loadingComponent).toBeNull();
  });

  it("renders the loading text when provided", () => {
    const { getByText } = render(
      <LoadingModal show={true} text="Loading..." />
    );

    const loadingText = getByText("Loading...");
    expect(loadingText).toBeTruthy();
  });

  it("does not render the loading text when not provided", () => {
    const { queryByText } = render(<LoadingModal show={true} />);

    const loadingText = queryByText("Loading...");
    expect(loadingText).toBeNull();
  });
});
