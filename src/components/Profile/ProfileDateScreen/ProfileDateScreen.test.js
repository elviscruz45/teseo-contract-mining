import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ProfileDateScreen } from "./ProfileDateScreen";
import { Provider } from "react-redux";
import { store } from "../../../../App";

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

describe("ProfileDateScreenNoRedux", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProfileDateScreen />
      </Provider>
    );
    expect(getByText("Inicio")).toBeTruthy();
    expect(getByText("Fin")).toBeTruthy();
    expect(getByText("Filtrar")).toBeTruthy();
    expect(getByText("Sin Filtro")).toBeTruthy();
  });

  //   it("calls filterButton when 'Filtrar' button is pressed", () => {
  //     const filterButton = jest.fn();
  //     const { getByText } = render(
  //       <Provider store={store} filterButton={filterButton}>
  //         <ProfileDateScreen />
  //       </Provider>
  //     );

  //     fireEvent.press(getByText("Filtrar"));

  //     expect(filterButton).toHaveBeenCalled();
  //   });

  //   it("calls quitFilterButton when 'Sin Filtro' button is pressed", () => {
  //     const quitFilterButton = jest.fn();
  //     const { getByText } = render(
  //       <Provider store={store} quitFilterButton={quitFilterButton}>
  //         <ProfileDateScreen />
  //       </Provider>
  //     );

  //     fireEvent.press(getByText("Sin Filtro"));

  //     expect(quitFilterButton).toHaveBeenCalled();
  //   });

  // Add more tests for other functionality if needed
});
