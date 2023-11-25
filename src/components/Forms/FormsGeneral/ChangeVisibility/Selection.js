import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { visibilityList } from "../../../../utils/visibilityList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { setText, formik } = props;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={visibilityList}
      save="value"
      maxHeight={100}
      onSelect={() => saveProperty(selected)}
    />
  );
};
