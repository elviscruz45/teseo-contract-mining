import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplaynumeroAIT } from "./ChangeDisplayNumeroAIT";

describe("ChangeDisplaynumeroAIT", () => {
  it("should update the text state when input value changes", () => {
    const { getByTestId } = render(<ChangeDisplaynumeroAIT />);
    const input = getByTestId("ChangeDisplaynumeroAIT:Input");
    fireEvent.changeText(input, "12345");
    expect(input.props.value).toBe("12345");
  });

  it("should call the provided functions when the button is pressed", () => {
    const setnumeroAITMock = jest.fn();
    const setAitMock = jest.fn();
    const onCloseMock = jest.fn();
    const formikMock = {
      errors: { NumeroAIT: "" },
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplaynumeroAIT
        setnumeroAIT={setnumeroAITMock}
        setAit={setAitMock}
        onClose={onCloseMock}
        formik={formikMock}
      />
    );

    const input = getByTestId("ChangeDisplaynumeroAIT:Input");
    const button = getByTestId("ChangeDisplaynumeroAIT:Button");

    fireEvent.changeText(input, "12345");
    fireEvent.press(button);

    expect(setnumeroAITMock).toHaveBeenCalledWith("12345");
    expect(setAitMock).toHaveBeenCalledWith("12345");
    expect(onCloseMock).toHaveBeenCalled();
    expect(formikMock.setFieldValue).toHaveBeenCalledWith("NumeroAIT", "12345");
  });
});
