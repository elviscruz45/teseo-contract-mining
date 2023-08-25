import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../../../utils";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const MultiSelectExample = (props) => {
  const [selected, setSelected] = React.useState([]);
  const [list, setList] = useState([]);
  const { formik, setText } = props;

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const post_array = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const object = doc.data();
        const objectver2 = {
          ...object,
          value: `${object.displayNameform}(${object.email})`,
          email: object.email,
        };
        post_array.push(objectver2);
      });
      console.log("querySnapshot1");
      console.log("querySnapshot1");

      setList(post_array);
    }
    fetchData();
  }, []);

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={list}
        save="value"
        mode="datetime"
        onSelect={() => saveProperty(selected)}
        label="Categories"
      />
    </>
  );
};
