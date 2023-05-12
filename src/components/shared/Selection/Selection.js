import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { chancadoraSecundaria } from "../../../utils/componentsList";

export const SelectExample = () => {
  const [selected, setSelected] = useState("");

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={chancadoraSecundaria}
      save="value"
      maxHeight={500}
    />
  );
};
