import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContratista } from "./ChangeDisplayContratista";
import { MultiSelectExample } from "./MultiSelection";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: () => null,
}));
describe("ChangeDisplayAdminContratista", () => {
  it("calls the onPress function when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setFieldValueMock = jest.fn();
    const setResponsableempresacontratistaMock = jest.fn();
    const formikMock = { setFieldValue: setFieldValueMock };

    const { getByTestId } = render(
      <ChangeDisplayAdminContratista
        onClose={onCloseMock}
        formik={formikMock}
        setResponsableempresacontratista={setResponsableempresacontratistaMock}
      />
    );

    const button = getByTestId("ChangeDisplayAdminContratista:Button");
    fireEvent.press(button);

    expect(setResponsableempresacontratistaMock).toHaveBeenCalled();
    expect(setFieldValueMock).toHaveBeenCalledWith(
      "ResponsableEmpresaContratista",
      ""
    );
    expect(onCloseMock).toHaveBeenCalled();
  });
});
