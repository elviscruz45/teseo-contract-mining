import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContracts } from "./ChangeDisplayContratos";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: ({ setText }) => {
    return null;
  },
}));
describe("ChangeDisplayAdminContracts", () => {
  it("calls setResponsableempresausuario and formik.setFieldValue when Accept button is pressed", () => {
    const onClose = jest.fn();
    const setResponsableempresausuario = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayAdminContracts
        onClose={onClose}
        formik={formik}
        setResponsableempresausuario={setResponsableempresausuario}
      />
    );

    const acceptButton = getByTestId("accept-button");
    fireEvent.press(acceptButton);

    expect(setResponsableempresausuario).toHaveBeenCalledTimes(1);
    expect(setResponsableempresausuario).toHaveBeenCalledWith("");
    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaUsuario",
      ""
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
