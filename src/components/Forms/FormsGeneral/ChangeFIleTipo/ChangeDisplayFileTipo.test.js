import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayFileTipo } from "./ChangeDisplayFileTipo";

describe("ChangeDisplayFileTipo", () => {
  it("calls onClose and sets tipoFile when 'Aceptar' button is pressed", () => {
    const onClose = jest.fn();
    const setTipoFile = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
      isSubmitting: false,
    };

    const { getByTestId, getByText } = render(
      <ChangeDisplayFileTipo
        onClose={onClose}
        formik={formik}
        setTipoFile={setTipoFile}
      />
    );

    const acceptButton = getByText("Aceptar");
    fireEvent.press(acceptButton);

    expect(setTipoFile).toHaveBeenCalledTimes(1);
    expect(setTipoFile).toHaveBeenCalledWith(expect.any(String));

    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "tipoFile",
      expect.any(String)
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
