import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { Tipo } from "../../../utils/componentsList";

export const MultiSelectExample = (props) => {
  const [selected, setSelected] = React.useState([]);
  const { formik } = props;

  function saveProperty(itemValue) {
    const tipo =
      itemValue.includes("Preventivo") || itemValue.includes("Correctivo");

    if (tipo) {
      formik.setFieldValue("tipo", itemValue.join(","));
    }
  }

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={Tipo}
        save="value"
        onSelect={() => saveProperty(selected)}
        label="Categories"
      />
    </>
  );
};
