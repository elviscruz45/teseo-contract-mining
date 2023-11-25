import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { styles } from "./ChangeCompany.styles";
import { SelectExample } from "./Selection";
import { SelectList } from "react-native-dropdown-select-list";
import { companyListFormat } from "../../../../utils/companyList";

export function ChangeDisplayCompany(props) {
  const { onClose, setCompany, companyList } = props;
  // const [text, setText] = useState("");
  const [selected, setSelected] = useState("");
  // const [list, setList] = useState([]);

  //[{"value": "TOTAL CONTRATISTAS"}, {"value": "PRODISE"}, {"value": "GMAIL"}, {"value": "EMEMSA"}, {"value": "METSO"}]

  let combinedCompanies = [
    ...companyListFormat,
    ...companyList?.map((item) => ({ value: item.toUpperCase() })),
  ];

  function saveProperty(itemValue) {
    setCompany(itemValue);
    onClose();
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={combinedCompanies}
      save="value"
      maxHeight={300}
      onSelect={() => saveProperty(selected)}
    />
  );
}
