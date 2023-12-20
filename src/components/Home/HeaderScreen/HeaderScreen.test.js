import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { HeaderScreen } from "./HeaderScreen";
import { store } from "../../../../../App";
import { Provider } from "react-redux";

jest.mock("react-native-gesture-handler", () => {
  return {
    enableLegacyWebImplementation: jest.fn(),
  };
});

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

describe("HeaderScreenNoRedux", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <HeaderScreen />
      </Provider>
    );

    expect(getByTestId("flatlist")).toBeTruthy();
  });

  it("navigates to the selected asset", () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByTestId } = render(
      <Provider store={store}>
        <HeaderScreen navigation={navigationMock} />
      </Provider>
    );

    fireEvent.press(getByTestId("asset"));
    expect(navigationMock.navigate).toHaveBeenCalledWith(
      screen.search.tab,
      expect.objectContaining({
        screen: screen.search.item,
        params: { Item: expect.anything() },
      })
    );
  });
});
