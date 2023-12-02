import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayHH } from "./ChangeDisplayHH";

describe("ChangeDisplayHH", () => {
  it("should update the text value when input changes", () => {
    const { getByTestId } = render(<ChangeDisplayHH />);
    const input = getByTestId("ChangeDisplayHH:Input");

    fireEvent.changeText(input, "10");

    expect(input.props.value).toBe("10");
  });

  it("should call the onClose and setHorashombre functions when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setHorashombreMock = jest.fn();
    const formikMock = {
      setFieldValue: jest.fn(),
    };
    const { getByTestId } = render(
      <ChangeDisplayHH
        onClose={onCloseMock}
        setHorashombre={setHorashombreMock}
        formik={formikMock}
      />
    );
    const button = getByTestId("ChangeDisplayHH:Button");

    fireEvent.press(button);

    expect(onCloseMock).toHaveBeenCalled();
    expect(setHorashombreMock).toHaveBeenCalled();
  });

  it("should update the formik field value when the button is pressed", () => {
    const setFieldValueMock = jest.fn();
    const setHorashombreMock = jest.fn();
    const onCloseMock = jest.fn();

    const formikMock = {
      setFieldValue: jest.fn(),
    };
    const { getByTestId } = render(
      <ChangeDisplayHH
        formik={{ setFieldValue: setFieldValueMock }}
        setHorashombre={setHorashombreMock}
        onClose={onCloseMock}
      />
    );
    const button = getByTestId("ChangeDisplayHH:Button");

    fireEvent.press(button);

    expect(setFieldValueMock).toHaveBeenCalledWith("HorasHombre", "");
  });
});
