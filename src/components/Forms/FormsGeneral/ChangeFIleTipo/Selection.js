import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { TipoFileLists } from "../../../../utils/TipoFileList";
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
      data={TipoFileLists}
      save="value"
      maxHeight={200}
      onSelect={() => saveProperty(selected)}
      search={"false"}
    />
  );
};
