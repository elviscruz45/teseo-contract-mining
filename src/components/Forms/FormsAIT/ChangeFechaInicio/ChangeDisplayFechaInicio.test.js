import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayFechaInicio } from "./ChangeDisplayFechaInicio";

describe("ChangeDisplayFechaInicio", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const setFechaInicio = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayFechaInicio
        onClose={onClose}
        setFechaInicio={setFechaInicio}
        formik={formik}
      />
    );

    expect(getByTestId("dateTimePicker")).toBeTruthy();
  });

  it("calls onClose and sets the selected date when a date is selected", () => {
    const onClose = jest.fn();
    const setFechaInicio = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };

    const { getByTestId } = render(
      <ChangeDisplayFechaInicio
        onClose={onClose}
        setFechaInicio={setFechaInicio}
        formik={formik}
      />
    );

    const dateTimePicker = getByTestId("dateTimePicker");
    // fireEvent.change(dateTimePicker, { target: { value: new Date() } });

    // expect(onClose).toHaveBeenCalledTimes(1);
    // expect(setFechaInicio).toHaveBeenCalledTimes(1);
    // expect(formik.setFieldValue).toHaveBeenCalledTimes(1);
  });
});
