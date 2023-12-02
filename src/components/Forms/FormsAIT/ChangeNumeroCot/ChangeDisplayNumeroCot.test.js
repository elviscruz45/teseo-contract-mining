import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplaynumeroCot } from "./ChangeDisplayNumeroCot";

describe("ChangeDisplaynumeroCot", () => {
  it("should update the text value when input changes", () => {
    const { getByTestId } = render(<ChangeDisplaynumeroCot />);
    const input = getByTestId("ChangeDisplaynumeroCot:Input");

    fireEvent.changeText(input, "12345");

    expect(input.props.value).toBe("12345");
  });

  it("should call the onClose and setNumerocotizacion functions when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setNumerocotizacionMock = jest.fn();

    const formikMock = {
      setFieldValue: jest.fn(),
    };
    const { getByTestId } = render(
      <ChangeDisplaynumeroCot
        onClose={onCloseMock}
        setNumerocotizacion={setNumerocotizacionMock}
        formik={formikMock}
      />
    );
    const button = getByTestId("ChangeDisplaynumeroCot:Button");

    fireEvent.press(button);

    expect(onCloseMock).toHaveBeenCalled();
    expect(setNumerocotizacionMock).toHaveBeenCalled();
  });

  it("should update the formik field value when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setNumerocotizacionMock = jest.fn();
    const formikMock = {
      setFieldValue: jest.fn(),
    };
    const { getByTestId } = render(
      <ChangeDisplaynumeroCot
        onClose={onCloseMock}
        setNumerocotizacion={setNumerocotizacionMock}
        formik={formikMock}
      />
    );
    const button = getByTestId("ChangeDisplaynumeroCot:Button");

    fireEvent.press(button);

    expect(formikMock.setFieldValue).toHaveBeenCalledWith(
      "NumeroCotizacion",
      expect.any(String)
    );
  });
});
