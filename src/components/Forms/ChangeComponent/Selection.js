import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { chancadoraSecundaria } from "../../../utils/componentsList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const { formik } = props;

  function saveProperty(itemValue) {
    formik.setFieldValue("Componente", itemValue);
    console.log(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={chancadoraSecundaria}
      save="value"
      maxHeight={500}
      onSelect={() => saveProperty(selected)}
    />
  );
};
