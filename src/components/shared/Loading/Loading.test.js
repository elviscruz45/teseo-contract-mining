import React from "react";
import { render } from "@testing-library/react-native";
import { Loading } from "./Loading";

describe("Loading", () => {
  it("renders the loading component when show prop is true", () => {
    const { getByTestId, getByText } = render(
      <Loading show={true} text="Loading..." />
    );

    const loadingComponent = getByTestId("loading-component");
    const loadingText = getByText("Loading...");

    expect(loadingComponent).toBeTruthy();
    expect(loadingText).toBeTruthy();
  });

  it("does not render the loading component when show prop is false", () => {
    const { queryByTestId, queryByText } = render(
      <Loading show={false} text="Loading..." />
    );

    const loadingComponent = queryByTestId("loading-component");
    const loadingText = queryByText("Loading...");

    expect(loadingComponent).toBeNull();
    expect(loadingText).toBeNull();
  });
});
