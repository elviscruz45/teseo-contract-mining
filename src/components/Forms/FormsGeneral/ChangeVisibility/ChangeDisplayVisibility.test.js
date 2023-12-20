import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayVisibility } from "./ChangeDisplayVisibility";

describe("ChangeDisplayVisibility", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: false,
    };
    const setVisibilidad = jest.fn();

    const { getByText } = render(
      <ChangeDisplayVisibility
        onClose={onClose}
        formik={formik}
        setVisibilidad={setVisibilidad}
      />
    );

    expect(getByText("Aceptar")).toBeTruthy();
  });

  it("calls setVisibilidad, formik.setFieldValue, and onClose when the button is pressed", () => {
    const onClose = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: false,
    };
    const setVisibilidad = jest.fn();

    const { getByText } = render(
      <ChangeDisplayVisibility
        onClose={onClose}
        formik={formik}
        setVisibilidad={setVisibilidad}
      />
    );

    fireEvent.press(getByText("Aceptar"));

    expect(setVisibilidad).toHaveBeenCalledTimes(1);
    expect(setVisibilidad).toHaveBeenCalledWith(expect.any(String));
    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "visibilidad",
      expect.any(String)
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
