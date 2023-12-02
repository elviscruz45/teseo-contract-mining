import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayMoneda } from "./ChangeDisplayTipoServicio";

describe("ChangeDisplayMoneda", () => {
  it("calls the onClose function when the 'Aceptar' button is pressed", () => {
    const onCloseMock = jest.fn();
    const setMonedaMock = jest.fn();
    const formikMock = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayMoneda
        onClose={onCloseMock}
        formik={formikMock}
        setMoneda={setMonedaMock}
      />
    );

    const aceptarButton = getByTestId("ChangeDisplayMoneda:Button");
    fireEvent.press(aceptarButton);

    expect(setMonedaMock).toHaveBeenCalled();
    expect(formikMock.setFieldValue).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
