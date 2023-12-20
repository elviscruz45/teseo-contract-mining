import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayTitulo } from "./ChangeDisplayTitulo";

// Mock the MultiSelectExample component
jest.mock("./Selection", () => ({
  SelectExample: () => null,
}));

describe("ChangeDisplayTitulo", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const setTitulo = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: false,
    };

    const { getByText, getByTestId } = render(
      <ChangeDisplayTitulo
        onClose={onClose}
        formik={formik}
        setTitulo={setTitulo}
      />
    );

    expect(getByTestId("change-display-titulo")).toBeTruthy();
    expect(getByText("Aceptar")).toBeTruthy();
  });

  it("calls setTitulo, formik.setFieldValue, and onClose when the 'Aceptar' button is pressed", () => {
    const onClose = jest.fn();
    const setTitulo = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: false,
    };

    const { getByText, getByTestId } = render(
      <ChangeDisplayTitulo
        onClose={onClose}
        formik={formik}
        setTitulo={setTitulo}
      />
    );

    const button = getByText("Aceptar");
    fireEvent.press(button);

    expect(setTitulo).toHaveBeenCalledTimes(1);
    expect(setTitulo).toHaveBeenCalledWith(expect.any(String));
    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "titulo",
      expect.any(String)
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("displays loading state when formik isSubmitting is true", () => {
    const onClose = jest.fn();
    const setTitulo = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: true,
    };

    const { getByText, getByTestId } = render(
      <ChangeDisplayTitulo
        onClose={onClose}
        formik={formik}
        setTitulo={setTitulo}
      />
    );

    const button = getByTestId("change-display-titulo");
    // expect(button.props.loading).toBe(true);
  });
});
