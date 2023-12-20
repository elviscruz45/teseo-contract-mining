import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContratista3 } from "./ChangeDisplayContratista3";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: () => null,
}));

describe("ChangeDisplayAdminContratista3", () => {
  it("calls setResponsableempresacontratista3 and formik.setFieldValue when the button is pressed", () => {
    const onClose = jest.fn();
    const setResponsableempresacontratista3 = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <ChangeDisplayAdminContratista3
        onClose={onClose}
        formik={formik}
        setResponsableempresacontratista3={setResponsableempresacontratista3}
      />
    );

    const button = getByText("Aceptar");
    fireEvent.press(button);

    expect(setResponsableempresacontratista3).toHaveBeenCalledTimes(1);
    expect(setResponsableempresacontratista3).toHaveBeenCalledWith(
      expect.any(String)
    );

    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaContratista3",
      expect.any(String)
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
