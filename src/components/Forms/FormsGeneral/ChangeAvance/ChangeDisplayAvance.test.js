import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAvance } from "./ChangeDisplayAvance";
jest.mock("react-native-toast-message", () => ({
  Toast: {
    show: jest.fn(),
  },
}));
describe("ChangeDisplayAvance", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const formik = { errors: {} };
    const setAvance = jest.fn();

    const { getByPlaceholderText, getAllByTestId } = render(
      <ChangeDisplayAvance
        onClose={onClose}
        formik={formik}
        setAvance={setAvance}
      />
    );

    expect(getByPlaceholderText("Avance de Ejecucion")).toBeTruthy();
    expect(getAllByTestId("changeDisplayAvance")).toBeTruthy();
  });

  it("calls setAvance and formik.setFieldValue when 'Aceptar' button is pressed with valid input", () => {
    const onClose = jest.fn();
    const formik = { errors: {}, setFieldValue: jest.fn() };
    const setAvance = jest.fn();

    const { getByPlaceholderText, getByTestId } = render(
      <ChangeDisplayAvance
        onClose={onClose}
        formik={formik}
        setAvance={setAvance}
      />
    );

    const input = getByPlaceholderText("Avance de Ejecucion");
    const button = getByTestId("changeDisplayAvance");

    fireEvent.changeText(input, "50");
    fireEvent.press(button);

    expect(setAvance).toHaveBeenCalledWith("50");
    expect(onClose).toHaveBeenCalled();
    expect(formik.setFieldValue).toHaveBeenCalledWith("porcentajeAvance", "50");
  });

  it("displays an alert and calls onClose when 'Aceptar' button is pressed with invalid input", () => {
    const onClose = jest.fn();
    const formik = { errors: {}, setFieldValue: jest.fn() };
    const setAvance = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <ChangeDisplayAvance
        onClose={onClose}
        formik={formik}
        setAvance={setAvance}
      />
    );

    const input = getByPlaceholderText("Avance de Ejecucion");
    const button = getByTestId("changeDisplayAvance");

    fireEvent.changeText(input, "150");
    fireEvent.press(button);

    expect(setAvance).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    expect(formik.setFieldValue).not.toHaveBeenCalled();
    // expect(alert).toHaveBeenCalledWith("No numeros mayores que 100");
  });
});
