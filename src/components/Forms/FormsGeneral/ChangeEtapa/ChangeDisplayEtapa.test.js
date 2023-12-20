import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayEtapa } from "./ChangeDisplayEtapa";

describe("ChangeDisplayEtapa", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const setEtapa = jest.fn();
    const setAprobadores = jest.fn();
    const etapa = "Contratista-Envio Cotizacion";
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByText } = render(
      <ChangeDisplayEtapa
        onClose={onClose}
        formik={formik}
        setEtapa={setEtapa}
        setAprobadores={setAprobadores}
        etapa={etapa}
      />
    );

    expect(getByText("Aceptar")).toBeTruthy();
  });

  it("calls setEtapa, formik.setFieldValue, setAprobadores, and onClose when the button is pressed", () => {
    const onClose = jest.fn();
    const setEtapa = jest.fn();
    const setAprobadores = jest.fn();
    const etapa = "Contratista-Envio Cotizacion";
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByText } = render(
      <ChangeDisplayEtapa
        onClose={onClose}
        formik={formik}
        setEtapa={setEtapa}
        setAprobadores={setAprobadores}
        etapa={etapa}
      />
    );

    const button = getByText("Aceptar");
    fireEvent.press(button);

    expect(setEtapa).toHaveBeenCalledWith(expect.any(String));
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "etapa",
      expect.any(String)
    );
    expect(setAprobadores).toHaveBeenCalledWith(null);
    expect(onClose).toHaveBeenCalled();
  });
});
