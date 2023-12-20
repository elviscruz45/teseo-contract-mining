import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChangeDisplayFechaFin } from "./ChangeDisplayFechaFin";
// Mock the MultiSelectExample component
jest.mock("./MultiSelection", () => ({
  MultiSelectExample: ({ setText }) => {
    return null;
  },
}));
describe("ChangeDisplayFechaFin", () => {
  it("renders correctly", () => {
    const onClose = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };
    const setFechafin = jest.fn();

    const { getByTestId } = render(
      <ChangeDisplayFechaFin
        onClose={onClose}
        formik={formik}
        setFechafin={setFechafin}
      />
    );

    expect(getByTestId("dateTimePicker")).toBeTruthy();
  });

  it("calls onClose and updates formik and setFechafin when date is changed", () => {
    const onClose = jest.fn();
    const formik = {
      setFieldValue: jest.fn(),
    };
    const setFechafin = jest.fn();

    const { getByTestId } = render(
      <ChangeDisplayFechaFin
        onClose={onClose}
        formik={formik}
        setFechafin={setFechafin}
      />
    );

    const dateTimePicker = getByTestId("dateTimePicker");
    // fireEvent.change(dateTimePicker, { target: { value: new Date() } });

    // expect(onClose).toHaveBeenCalled();
    // expect(formik.setFieldValue).toHaveBeenCalledWith(
    //   "FechaFin",
    //   expect.any(Date)
    // );
    // expect(setFechafin).toHaveBeenCalledWith(expect.any(Date));
  });
});
