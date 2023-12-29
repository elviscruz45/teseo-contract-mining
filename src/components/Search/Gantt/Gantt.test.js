import React from "react";
import { render } from "@testing-library/react-native";
import { GanttHistorial } from "./Gantt";

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
describe("GanttHistorial", () => {
  const datas = [
    {
      createdAt: { seconds: 1631234567, nanoseconds: 0 },
      emailPerfil: "test@example.com",
      icon: "test-icon",
      imageUrl: "test-image-url",
      title: "Test Title",
      description: "Test Description",
      etapa: "Test Etapa",
      porcentajeAvance: 50,
      nombrePerfil: "Test User",
      pdfFile: true,
    },
    // Add more test data as needed
  ];

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <GanttHistorial datas={datas} comentPost={jest.fn()} />
    );

    // Assert that the rendered components and data are correct
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();
    // expect(getByText("Etapa: Test Etapa")).toBeTruthy();
    // expect(getByText("Avance Ejecucion: 50%")).toBeTruthy();
    // expect(getByText("Autor: Test User")).toBeTruthy();
    // expect(getByTestId("pdf-icon")).toBeTruthy();
  });

  // Add more test cases as needed
});
