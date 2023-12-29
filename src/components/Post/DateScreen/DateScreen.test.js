import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { DateScreen } from "./DateScreen";
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

describe("DateScreenNoRedux", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <DateScreen />
      </Provider>
    );
    expect(getByText("Inicio:")).toBeTruthy();
    expect(getByText("Fin")).toBeTruthy();
    expect(getByText("Filtrar")).toBeTruthy();
    expect(getByText("x")).toBeTruthy();
  });

  it("calls filterButton when 'Filtrar' button is pressed", () => {
    const filterButtonMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <DateScreen filterButton={filterButtonMock} />
      </Provider>
    );

    fireEvent.press(getByText("Filtrar"));

    expect(filterButtonMock).toHaveBeenCalled();
  });

  // it("calls quitFilterButton when 'x' button is pressed", () => {
  //   const quitFilterButtonMock = jest.fn();
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <DateScreen filterButton={filterButtonMock} />
  //     </Provider>
  //   );

  //   fireEvent.press(getByText("x"));

  //   expect(quitFilterButtonMock).toHaveBeenCalled();
  // });

  // it("calls showDatepickerStart when 'Inicio' button is pressed", () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <DateScreen filterButton={filterButtonMock} />
  //     </Provider>
  //   );
  //   fireEvent.press(getByText("Inicio:"));

  //   // Add your assertion here
  // });

  // it("calls showDatepickerEnd when 'Fin' button is pressed", () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <DateScreen filterButton={filterButtonMock} />
  //     </Provider>
  //   );
  //   fireEvent.press(getByText("Fin"));

  //   // Add your assertion here
  // });

  // Add more tests for other functionality if needed
});
