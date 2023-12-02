import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayArea } from "./ChangeDisplayArea";

describe("ChangeDisplayArea", () => {
  it("calls the onClose function when the button is pressed", () => {
    const onCloseMock = jest.fn();
    const setAreaservicioMock = jest.fn();
    const setAreaMock = jest.fn();
    const formikMock = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayArea
        onClose={onCloseMock}
        formik={formikMock}
        setAreaservicio={setAreaservicioMock}
        setArea={setAreaMock}
      />
    );

    const button = getByTestId("ChangeDisplayArea:Button");
    fireEvent.press(button);

    expect(onCloseMock).toHaveBeenCalled();
    expect(setAreaservicioMock).toHaveBeenCalled();
    expect(setAreaMock).toHaveBeenCalled();
    expect(formikMock.setFieldValue).toHaveBeenCalled();
  });
});
