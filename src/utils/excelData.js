import React, { useState } from "react";

import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  getDoc,
} from "firebase/firestore";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";
import { db } from "./firebase";

export const getExcelGLobal = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const post_array = [];
  querySnapshot.forEach((doc) => {
    const table = {
      //Tag y nombre Equipo
      Equipo_Tag: doc.data().equipoTag,
      Equipo_Nombre: doc.data().equipoNombre,
      ClaseEquipo: doc.data().claseEquipo,
      //Evento
      Titulo_Trabajo: doc.data().titulo,
      Etapa_Evento: doc.data().etapa,
      Fecha_Formato: doc.data().fechaPostFormato,
      Nombre_Componente: doc.data().nombreComponente,
      Descripcion_Trabajo: doc.data().tipo,
      Comentarios: doc.data().comentarios,
      Recursos_Trabajo: doc.data().recursos,
      //Fecha y ID Database
      Fecha_ISO: doc.data().fechaPostISO,
      ID_DataBase: doc.data().idDocFirestoreDB,
      //Usuario
      Nombre_Perfil: doc.data().nombrePerfil,
      Email_Perfil: doc.data().emailPerfil,
      Equipo_Trabajo: doc.data().equipoTrabajo,
    };

    post_array.push(table);
  });

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  const base64String = Buffer.from(excelFileBuffer).toString("base64");
  const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

  try {
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log("Error creating Excel file:", error);
  }
};

export const getExcelEquipo = async (tagEquipo) => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  console.log(tagEquipo);
  const post_array = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().equipoTag === tagEquipo) {
      const table = {
        //Tag y nombre Equipo
        Equipo_Tag: doc.data().equipoTag,
        Equipo_Nombre: doc.data().equipoNombre,
        ClaseEquipo: doc.data().claseEquipo,
        //Evento
        Titulo_Trabajo: doc.data().titulo,
        Etapa_Evento: doc.data().etapa,
        Fecha_Formato: doc.data().fechaPostFormato,
        Nombre_Componente: doc.data().nombreComponente,
        Descripcion_Trabajo: doc.data().tipo,
        Comentarios: doc.data().comentarios,
        Recursos_Trabajo: doc.data().recursos,
        //Fecha y ID Database
        Fecha_ISO: doc.data().fechaPostISO,
        ID_DataBase: doc.data().idDocFirestoreDB,
        //Usuario
        Nombre_Perfil: doc.data().nombrePerfil,
        Email_Perfil: doc.data().emailPerfil,
        Equipo_Trabajo: doc.data().equipoTrabajo,
      };

      post_array.push(table);
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  const base64String = Buffer.from(excelFileBuffer).toString("base64");
  const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

  try {
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log("Error creating Excel file:", error);
  }
};
