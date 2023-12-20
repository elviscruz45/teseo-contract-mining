import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContracts2 } from "./ChangeDisplayContratos2";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: ({ setText }) => {
    return null;
  },
}));
describe("ChangeDisplayAdminContracts2", () => {
  it("calls setResponsableempresausuario2 and formik.setFieldValue when the button is pressed", () => {
    const onClose = jest.fn();
    const setResponsableempresausuario2 = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <ChangeDisplayAdminContracts2
        onClose={onClose}
        formik={formik}
        setResponsableempresausuario2={setResponsableempresausuario2}
      />
    );

    const button = getByText("Aceptar");
    fireEvent.press(button);

    expect(setResponsableempresausuario2).toHaveBeenCalledTimes(1);
    expect(setResponsableempresausuario2).toHaveBeenCalledWith("");
    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaUsuario2",
      ""
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
