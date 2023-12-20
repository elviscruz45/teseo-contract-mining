import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";

export const MultiSelectExample = () => {
  const [selected, setSelected] = React.useState([]);

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => alert(selected)}
        label="Categories"
      />
    </>
  );
};
