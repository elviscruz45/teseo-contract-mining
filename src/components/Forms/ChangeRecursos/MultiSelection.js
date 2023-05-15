import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { recursos } from "../../../utils/componentsList";

export const MultiSelectExample = (props) => {
  const [selected, setSelected] = React.useState([]);
  const { formik } = props;

  function saveProperty(itemValue) {
    formik.setFieldValue("recursos", itemValue.join(","));
    console.log(itemValue);
  }

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={recursos}
        save="value"
        onSelect={() => saveProperty(selected)}
        label="Categories"
      />
    </>
  );
};
