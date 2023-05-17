import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { chancadoraSecundaria } from "../../../utils/componentsList";
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
import { db } from "../../../utils";

export const SelectExample = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const { formik } = props;

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const post_array = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const object = doc.data();
        const objectver2 = { ...object, value: object.displayNameform };
        post_array.push(objectver2);
      });

      setList(post_array);
    }
    fetchData();
  }, []);

  function saveProperty(itemValue) {
    formik.setFieldValue("Supervisor", itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={list}
      save="value"
      maxHeight={200}
      onSelect={() => saveProperty(selected)}
    />
  );
};
