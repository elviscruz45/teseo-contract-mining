import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { companyListFormat } from "../../../../utils/companyList";

export function ChangeDisplayCompany(props) {
  const { onClose, setCompany, companyList } = props;
  const [selected, setSelected] = useState("");
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
