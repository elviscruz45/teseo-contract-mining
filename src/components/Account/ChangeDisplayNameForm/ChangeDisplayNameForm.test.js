import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { ConnectedChangeDisplayNameForm } from "./ChangeDisplayNameForm";
import { getAuth, updateProfile } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../../../../App";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null), // Mocked component returns null
  VictoryLabel: jest.fn(() => null), // Mocked component returns null
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

describe("ChangeDisplayNameForm", () => {
  it("updates the display name and calls onClose when submitted", async () => {
    const onCloseMock = jest.fn();
    const updateProfileMock = jest.fn();
    const getAuthMock = jest.fn(() => ({
      currentUser: {
        displayName: "Old Name",
      },
    }));

    updateProfile.mockImplementation(updateProfileMock);
    getAuth.mockImplementation(getAuthMock);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ConnectedChangeDisplayNameForm onClose={onCloseMock} />
      </Provider>
    );

    const displayNameInput = getByTestId("displayNameform");
    const cargo = getByTestId("cargo");
    const descripcion = getByTestId("descripcion");

    const submitButton = getByTestId("submitButton");

    await act(async () => {
      fireEvent.changeText(displayNameInput, "New Name");
      fireEvent.changeText(cargo, "New Name");
      fireEvent.changeText(descripcion, "New Name");
    });
    await act(async () => {
      fireEvent.press(submitButton);
    });
    expect(updateProfileMock).toHaveBeenCalledWith(getAuthMock().currentUser, {
      displayName: "New Name",
    });
    //match that the cargo has the text New Name
    expect(cargo.props.value).toBe("New Name");
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("displays an error toast when an error occurs", async () => {
    const onCloseMock = jest.fn();
    const updateProfileMock = jest.fn(() => {
      throw new Error("Update failed");
    });

    updateProfile.mockImplementation(updateProfileMock);

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <ConnectedChangeDisplayNameForm onClose={onCloseMock} />
      </Provider>
    );

    const displayNameInput = getByTestId("displayNameform");
    const cargo = getByTestId("cargo");
    const descripcion = getByTestId("descripcion");

    const submitButton = getByTestId("submitButton");
    await act(async () => {
      fireEvent.changeText(displayNameInput, "New Name");
      fireEvent.changeText(cargo, "New Name");
      fireEvent.changeText(descripcion, "New Name");
    });
    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(updateProfileMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
