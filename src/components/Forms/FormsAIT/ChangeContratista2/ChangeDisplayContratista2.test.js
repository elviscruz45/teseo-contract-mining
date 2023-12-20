import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayAdminContratista2 } from "./ChangeDisplayContratista2";
import { MultiSelectExample } from "./MultiSelection";

// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: () => null,
}));

describe("ChangeDisplayAdminContratista2", () => {
  it("calls setResponsableempresacontratista2 and formik.setFieldValue when the button is pressed", () => {
    const onClose = jest.fn();
    const setResponsableempresacontratista2 = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayAdminContratista2
        onClose={onClose}
        formik={formik}
        setResponsableempresacontratista2={setResponsableempresacontratista2}
      />
    );

    const button = getByTestId("ChangeDisplayAdminContratista:Button2");
    fireEvent.press(button);

    expect(setResponsableempresacontratista2).toHaveBeenCalledTimes(1);
    expect(setResponsableempresacontratista2).toHaveBeenCalledWith(
      expect.any(String)
    );

    expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
    expect(formik.setFieldValue).toHaveBeenCalledWith(
      "ResponsableEmpresaContratista2",
      expect.any(String)
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
