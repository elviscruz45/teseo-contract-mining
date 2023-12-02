import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayMonto } from "./ChangeDisplayMonto";

describe("ChangeDisplayMonto", () => {
  it("should update the text state when input value changes", () => {
    const { getByTestId } = render(<ChangeDisplayMonto />);
    const input = getByTestId("ChangeDisplayMonto:Input");

    fireEvent.changeText(input, "123");

    expect(input.props.value).toBe("123");
  });

  it("should call the setMonto, onClose, and formik.setFieldValue functions when the button is pressed", () => {
    const setMontoMock = jest.fn();
    const onCloseMock = jest.fn();
    const setFieldValueMock = jest.fn();
    const formikMock = { setFieldValue: setFieldValueMock };

    const { getByTestId } = render(
      <ChangeDisplayMonto
        setMonto={setMontoMock}
        onClose={onCloseMock}
        formik={formikMock}
      />
    );

    const button = getByTestId("ChangeDisplayMonto:Button");

    fireEvent.press(button);

    expect(setMontoMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
    expect(setFieldValueMock).toHaveBeenCalled();
  });
});
