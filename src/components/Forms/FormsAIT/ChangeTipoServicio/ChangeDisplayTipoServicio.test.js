import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayTipoServicio } from "./ChangeDisplayTipoServicio";

describe("ChangeDisplayTipoServicio", () => {
  it("calls the onClose function when the 'Aceptar' button is pressed", () => {
    const onCloseMock = jest.fn();
    const setTiposervicioMock = jest.fn();
    const setTiposervMock = jest.fn();
    const setFieldValueMock = jest.fn();
    const formikMock = {
      setFieldValue: setFieldValueMock,
    };

    const { getByTestId } = render(
      <ChangeDisplayTipoServicio
        onClose={onCloseMock}
        formik={formikMock}
        setTiposervicio={setTiposervicioMock}
        setTiposerv={setTiposervMock}
      />
    );

    const aceptarButton = getByTestId("ChangeDisplayTipoServicio:Button2");
    fireEvent.press(aceptarButton);

    expect(setTiposervicioMock).toHaveBeenCalledWith(expect.any(String));
    expect(setTiposervMock).toHaveBeenCalledWith(expect.any(String));
    expect(setFieldValueMock).toHaveBeenCalledWith(
      "TipoServicio",
      expect.any(String)
    );
    expect(onCloseMock).toHaveBeenCalled();
  });
});
