import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TitleForms } from "./TitleForms";
import { store } from "../../../../../App";
import { Provider } from "react-redux";

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

describe("TitleFormsBare", () => {
  it("renders correctly", () => {
    const formikMock = {
      values: {},
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
      setFieldValue: jest.fn(), // Add this line
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <TitleForms formik={formikMock} />
      </Provider>
    );
    expect(getByPlaceholderText("Titulo del Evento")).toBeTruthy();
    expect(getByPlaceholderText("Comentarios")).toBeTruthy();
  });

  it("updates the 'titulo' state when input value changes", () => {
    const formikMock = {
      values: {},
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
      setFieldValue: jest.fn(), // Add this line
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <TitleForms formik={formikMock} />
      </Provider>
    );

    const input = getByPlaceholderText("Titulo del Evento");
    fireEvent.changeText(input, "Test Title");
    expect(input.props.value).toBe("Test Title");
  });

  //   it("calls selectComponent when rightIcon is pressed", () => {
  //     const formikMock = {
  //       values: {},
  //       errors: {},
  //       touched: {},
  //       handleChange: jest.fn(),
  //       handleBlur: jest.fn(),
  //       handleSubmit: jest.fn(),
  //       setFieldValue: jest.fn(), // Add this line
  //     };
  //     const { getByPlaceholderText, getByTestId } = render(
  //       <Provider store={store}>
  //         <TitleForms formik={formikMock} />
  //       </Provider>
  //     );

  //     const input = getByPlaceholderText("Titulo del Evento");
  //     const rightIcon = getByTestId("right-icon");
  //     fireEvent.press(rightIcon);
  //     expect(input.props.value).toBe("Test Title");
  //   });

  //   it("displays the modal when rightIcon is pressed", () => {
  //     const formikMock = {
  //       values: {},
  //       errors: {},
  //       touched: {},
  //       handleChange: jest.fn(),
  //       handleBlur: jest.fn(),
  //       handleSubmit: jest.fn(),
  //       setFieldValue: jest.fn(), // Add this line
  //     };
  //     const { getByTestId } = render(
  //       <Provider store={store}>
  //         <TitleForms formik={formikMock} />
  //       </Provider>
  //     );
  //     const rightIcon = getByTestId("right-icon");
  //     fireEvent.press(rightIcon);
  //     const modal = getByTestId("modal");
  //     expect(modal).toBeTruthy();
  //   });

  //   it("closes the modal when modal close button is pressed", () => {
  //     const formikMock = {
  //       values: {},
  //       errors: {},
  //       touched: {},
  //       handleChange: jest.fn(),
  //       handleBlur: jest.fn(),
  //       handleSubmit: jest.fn(),
  //       setFieldValue: jest.fn(), // Add this line
  //     };
  //     const { getByTestId } = render(
  //       <Provider store={store}>
  //         <TitleForms formik={formikMock} />
  //       </Provider>
  //     );
  //     const rightIcon = getByTestId("right-icon");
  //     fireEvent.press(rightIcon);
  //     const closeButton = getByTestId("modal-close-button");
  //     fireEvent.press(closeButton);
  //     const modal = getByTestId("modal");
  //     expect(modal).toBeFalsy();
  //   });
});
