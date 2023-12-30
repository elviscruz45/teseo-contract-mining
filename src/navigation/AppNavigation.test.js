// App.test.js
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { AppNavigation } from "./AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("victory-native", () => ({
  VictoryPie: jest.fn(() => null),
  VictoryLabel: jest.fn(() => null),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(() =>
    Promise.resolve({ metadata: { fullPath: "test-path" } })
  ),
  getDownloadURL: jest.fn(() => Promise.resolve("test-url")),
}));

jest.mock("./HomeStack", () => ({
  ConnectedHomeStack: () => <div data-testid="home-stack">HomeStack</div>,
}));

jest.mock("./ReportStack", () => ({
  ReportStack: () => <div data-testid="report-stack">ReportStack</div>,
}));

jest.mock("./PostStack", () => ({
  PostStack: () => <div data-testid="post-stack">PostStack</div>,
}));

jest.mock("./SearchStack", () => ({
  SearchStack: () => <div data-testid="search-stack">SearchStack</div>,
}));

jest.mock("./ProfileStack", () => ({
  ProfileStack: () => <div data-testid="profile-stack">ProfileStack</div>,
}));

describe("AppNavigation", () => {
  test("should render the Home screen by default", () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );

    const homeScreenText = getByText("Inicio");
    expect(homeScreenText).toBeTruthy();
  });
});
