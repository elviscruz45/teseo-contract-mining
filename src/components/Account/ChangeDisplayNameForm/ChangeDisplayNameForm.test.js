import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ConnectedChangeDisplayNameForm } from "./ChangeDisplayNameForm";

const mockStore = configureStore([]);

describe("ChangeDisplayNameForm", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      profile: {
        user_photo: "user_photo_url",
        email: "test@example.com",
        profile: {},
        uid: "user_uid",
      },
    });

    component = (
      <Provider store={store}>
        <ConnectedChangeDisplayNameForm onClose={jest.fn()} />
      </Provider>
    );
  });

  it("should update display name and submit form", async () => {
    const { getByTestId } = render(component);

    const displayNameInput = getByTestId("displayNameform");
    const cargoInput = getByTestId("cargo");
    const descripcionInput = getByTestId("descripcion");
    const submitButton = getByTestId("submitButton");

    fireEvent.changeText(displayNameInput, "John Doe");
    fireEvent.changeText(cargoInput, "Software Engineer");
    fireEvent.changeText(descripcionInput, "I love coding!");

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        // Add expected redux actions here
      ]);
    });
  });

  // Add more test cases as needed
});
