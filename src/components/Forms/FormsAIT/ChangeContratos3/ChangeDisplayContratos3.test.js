import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContracts3 } from "./ChangeDisplayContratos3";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: ({ setText }) => {
    return null;
  },
}));
describe("ChangeDisplayAdminContracts3", () => {
  it("calls setResponsableempresausuario3 and formik.setFieldValue when the button is pressed", () => {
    const onClose = jest.fn();
    const setResponsableempresausuario3 = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <ChangeDisplayAdminContracts3
        onClose={onClose}
        formik={formik}
        setResponsableempresausuario3={setResponsableempresausuario3}
      />
    );

    const button = getByText("Aceptar");
    fireEvent.press(button);

    expect(setResponsableempresausuario3).toHaveBeenCalledTimes(1);
    expect(setResponsableempresausuario3).toHaveBeenCalledWith("");
    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaUsuario3",
      ""
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
