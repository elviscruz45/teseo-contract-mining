import React from "react";
import { render } from "@testing-library/react-native";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders the loading component", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const loadingComponent = getByTestId("loading-component");
    expect(loadingComponent).toBeTruthy();
  });

  it("renders the activity indicator", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });
});
