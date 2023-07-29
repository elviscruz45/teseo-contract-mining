import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { tipoServicioList } from "../../../../utils/tipoServicioList";

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
      data={tipoServicioList}
      save="value"
      maxHeight={200}
      onSelect={() => saveProperty(selected)}
    />
  );
};
