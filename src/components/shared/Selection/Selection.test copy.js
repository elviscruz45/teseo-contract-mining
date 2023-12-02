import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SelectList } from "react-native-dropdown-select-list";

describe("<SelectList />", () => {
  test("renders correctly and triggers setSelected", () => {
    // Mock the setSelected function
    const setSelected = jest.fn();

    const chancadoraSecundaria = [
      { key: 1, value: "Option 1" },
      { key: 2, value: "Option 2" },
      { key: 3, value: "Option 3" },
    ];

    const { getByTestId } = render(
      <SelectList
        setSelected={setSelected}
        testID="SelectExample"
        data={chancadoraSecundaria}
        save="value"
        maxHeight={500}
      />
    );

    // Simulate selecting an item
    fireEvent.changeText(getByTestId("SelectExample"), "selectedValue");

    // Check if setSelected was called with the correct value
    expect(setSelected).toHaveBeenCalledWith("selectedValue");
  });
});

// import React from "react";
// import { render, fireEvent } from "@testing-library/react-native";
// import { SelectExample } from "./Selection";

// describe("SelectExample", () => {
//   const mockChancadoraSecundaria = [
//     { key: 1, value: "Option 1" },
//     { key: 2, value: "Option 2" },
//     { key: 3, value: "Option 3" },
//   ];
//   it("renders the select list component", () => {
//     const { getByTestId } = render(<SelectExample />);
//     const selectList = getByTestId("SelectExample");
//     expect(selectList).toBeTruthy();
//   });

//   it("updates the selected value when an option is selected", () => {
//     const { getByTestId } = render(<SelectExample />);
//     const selectList = getByTestId("SelectExample");

//     // Simulate selecting an option
//     fireEvent.change(selectList, { target: { value: "Option 1" } });

//     // Verify that the selected value is updated
//     expect(selectList.value).toBe("Option 1");
//   });

//   // Add more tests as needed
// });
