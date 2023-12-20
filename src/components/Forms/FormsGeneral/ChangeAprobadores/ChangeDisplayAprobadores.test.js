import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAprobadores } from "./ChangeDisplayAprobadores";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: ({ setText }) => {
    return null;
  },
}));
describe("ChangeDisplayAprobadores", () => {
  it("calls setAprobadores, formik.setFieldValue, and onClose when 'Aceptar' button is pressed", () => {
    const setAprobadores = jest.fn();
    const setFieldValue = jest.fn();
    const onClose = jest.fn();

    const formik = {
      setFieldValue,
    };

    const { getByTestId, getByText } = render(
      <ChangeDisplayAprobadores
        onClose={onClose}
        formik={formik}
        setAprobadores={setAprobadores}
        etapa="Contratista-Envio Cotizacion"
      />
    );

    const aceptarButton = getByText("Aceptar");
    fireEvent.press(aceptarButton);

    expect(setAprobadores).toHaveBeenCalledTimes(1);
    expect(setAprobadores).toHaveBeenCalledWith("");
    expect(setFieldValue).toHaveBeenCalledTimes(1);
    expect(setFieldValue).toHaveBeenCalledWith("aprobacion", "");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when 'Aceptar' button is pressed and etapa is not one of the specified values", () => {
    const onClose = jest.fn();

    const { getByText } = render(
      <ChangeDisplayAprobadores
        onClose={onClose}
        formik={{}}
        setAprobadores={jest.fn()}
        etapa="Some Other Etapa"
      />
    );

    const aceptarButton = getByText("Aceptar");
    fireEvent.press(aceptarButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
