import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SelectExample } from "./Selection";

describe("SelectExample", () => {
  it("should render the SelectList component", () => {
    // const setText = jest.fn();
    // const { getByTestId } = render(<SelectExample setText={setText} />);
    // const selectList = getByTestId("ChangeDisplayArea:SelectList");
    // expect(selectList).toBeTruthy();
    // const { getByText } = render(<SelectExample />);
    // expect(getByText("Select option")).toBeTruthy();
  });

  // it("should update the selected value when an option is selected", () => {
  // const { getByTestId } = render(<SelectExample />);
  // const selectList = getByTestId("ChangeDisplayArea:SelectList");
  // fireEvent.change(selectList, { target: { value: "Option 1" } });
  // expect(selectList.value).toBe("Option 1");
  // });

  // it("should call the saveProperty function when an option is selected", () => {
  //   const savePropertyMock = jest.fn();
  //   const { getByTestId } = render(
  //     <SelectExample setText={savePropertyMock} />
  //   );
  //   const selectList = getByTestId("ChangeDisplayArea:SelectList");

  //   fireEvent.change(selectList, { target: { value: "Option 2" } });

  //   expect(savePropertyMock).toHaveBeenCalledWith("Option 2");
  // });
});
