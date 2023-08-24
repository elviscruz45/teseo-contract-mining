import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

const dateFormat = () => {
  const date = new Date();

  const monthNames = [
    "ene.",
    "feb.",
    "mar.",
    "abr.",
    "may.",
    "jun.",
    "jul.",
    "ago.",
    "sep.",
    "oct.",
    "nov.",
    "dic.",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
  return formattedDate;
};

const uploadImage = async (uri) => {
  const uuid = uuidv4();

  const response = await fetch(uri);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage, `mainImageEvents/${uuid}`);
  return uploadBytes(storageRef, blob);
};

const uploadPdf = async (uri) => {
  const uuid = uuidv4();

  const response = await fetch(uri);
  const blob = await response.blob();
  const fileSize = blob.size;
  if (fileSize > 25 * 1024 * 1024) {
    throw new Error("File size exceeds 25MB");
  }
  const storage = getStorage();
  const storageRef = ref(storage, `pdfPost/${uuid}`);
  return uploadBytes(storageRef, blob);
};
