import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContratista } from "./ChangeDisplayContratista";

describe("ChangeDisplayAdminContratista", () => {
  it("calls the onClose function when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setResponsableempresacontratistaMock = jest.fn();
    const formikMock = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayAdminContratista
        onClose={onCloseMock}
        formik={formikMock}
        setResponsableempresacontratista={setResponsableempresacontratistaMock}
      />
    );

    const button = getByTestId("ChangeDisplayAdminContratista:Button");
    fireEvent.press(button);

    expect(onCloseMock).toHaveBeenCalled();
    expect(setResponsableempresacontratistaMock).toHaveBeenCalled();
    expect(formikMock.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaContratista",
      expect.any(String)
    );
  });
});
