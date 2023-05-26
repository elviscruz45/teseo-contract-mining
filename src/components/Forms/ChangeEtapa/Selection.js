import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { Etapa } from "../../../utils/componentsList";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const { formik } = props;

  function saveProperty(itemValue) {
    formik.setFieldValue("etapa", itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={Etapa}
      save="value"
      maxHeight={150}
      onSelect={() => saveProperty(selected)}
    />
  );
};
