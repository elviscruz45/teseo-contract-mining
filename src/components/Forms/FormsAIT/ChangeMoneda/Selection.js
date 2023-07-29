import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { monedaList } from "../../../../utils/MonedaList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { formik, setText } = props;

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={monedaList}
      save="value"
      maxHeight={200}
      onSelect={() => saveProperty(selected)}
    />
  );
};
