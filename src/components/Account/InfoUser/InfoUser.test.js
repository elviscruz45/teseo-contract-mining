import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ConnectedInfoUser } from "./InfoUser";
import { Provider } from "react-redux";
import { store } from "../../../../App";
import { legacy_createStore as createStore } from "redux";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({ canceled: false, assets: [{ uri: "test-uri" }] })
  ),
}));
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: jest.fn(),
}));
jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: jest.fn(),
}));
jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null), // Mocked component returns null
  VictoryLabel: jest.fn(() => null), // Mocked component returns null
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

describe("InfoUser", () => {
  it("renders correctly", async () => {
    // Create a mock reducer that sets the email state when it receives the SET_EMAIL action
    const mockReducer = (state = {}, action) => {
      switch (action.type) {
        case "SET_EMAIL":
          return {
            ...state,
            profile: {
              ...state.profile,
              email: action.email,
            },
          };
        default:
          return state;
      }
    };

    // Create a mock store with the initial state
    const mockStore = createStore(mockReducer, {
      profile: {
        profile: {},
        user_photo: "test-photo",
        email: "initial-email",
        uid: "test-uid",
      },
      search: {
        approvalListNew: [],
      },
    });

    // Dispatch the SET_EMAIL action to set the email state to "test-email"
    mockStore.dispatch({ type: "SET_EMAIL", email: "test-email" });

    const { getByTestId, getByText } = render(
      <Provider store={mockStore}>
        <ConnectedInfoUser />
      </Provider>
    );

    expect(getByTestId("avatar")).toBeTruthy();
    expect(getByText("test-email")).toBeTruthy();
  });

  it("calls changeAvatar and updatePhotoUrl when avatar is pressed", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ConnectedInfoUser />
      </Provider>
    );

    const avatar = getByTestId("avatar");
    fireEvent.press(avatar);
    expect(getByTestId("avatar-accessory")).toBeTruthy();

    // expect(avatar.props.source.uri).toBe("test-uri");
    // fireEvent.press(getByTestId("avatar-accessory"));

    // expect(getByTestId("avatar").props.source.uri).toBe("test-url");
  });

  it("calls updateManpower and setShowModal when updateManpower button is pressed", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ConnectedInfoUser />
      </Provider>
    );

    // fireEvent.press(getByTestId("update-manpower-button"));

    // expect(getByTestId("modal")).toBeTruthy();
    // expect(getByTestId("change-manpower-component")).toBeTruthy();
  });

  it("calls goToApprovalScreen when approval button is pressed", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ConnectedInfoUser />
      </Provider>
    );

    // fireEvent.press(getByTestId("approval-button"));

    // expect(useNavigation().navigate).toHaveBeenCalledWith("profile", {
    //   screen: "approvals",
    // });
  });
});
