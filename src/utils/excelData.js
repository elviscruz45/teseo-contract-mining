import React, { useState } from "react";

import {
  collection,
  getDocs,
  doc,
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
  console.log("getExcelGLobal");

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
  const queryEquipo = await getDocs(
    query(collection(db, "posts"), where("equipoTag", "==", tagEquipo))
  );
  console.log("getExcelGLobal");

  const post_array = [];
  queryEquipo.forEach((doc) => {
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
      revisado_por: doc.data().likes.join(" "),
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

export const getExcelPerfil = async (emailProfile) => {
  console.log(emailProfile);
  const queryProfile = await getDocs(
    query(collection(db, "posts"), where("emailPerfil", "==", emailProfile))
  );
  console.log("getExcelGLobal");

  const post_array = [];
  queryProfile.forEach((doc) => {
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
      revisado_por: doc.data().likes.join(" "),
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

export const getExcelReportData = async (datas = []) => {
  // const querySnapshot = collection(db, "ServiciosAIT");
  const post_array = [];
  console.log("getExcelGLobal");

  datas.forEach((data) => {
    const table = {
      //Datos principales del servicio
      NumeroServicio: data.NumeroAIT,
      NombreServicio: data.NombreServicio,
      TipoServicio: data.TipoServicio,
      companyName: data.companyName,
      fechaPostFormato: data.fechaPostFormato,
      // LastEventPosted: doc.data().LastEventPosted,
      NumeroCotizacion: data.NumeroCotizacion,
      // FechaFin: doc.data().FechaFin,
      //Usuario
      emailPerfil: data.emailPerfil,
      nombreAutor: data.nombrePerfil,
      // Responsables ,interacciones
      ResponsableEmpresaUsuario: data.ResponsableEmpresaUsuario,
      ResponsableEmpresaContratista: data.ResponsableEmpresaContratista,
      AreaServicio: data.AreaServicio,
      //Monto y HH
      HorasHombre: data.HorasHombre,
      Moneda: data.Moneda,
      Monto: data.Monto,
      //Fechas
      fechaPostISO: data.fechaPostISO,
      // createdAt: doc.data().createdAt,
      //Avances
      AvanceEjecucion: data.AvanceEjecucion,
      AvanceAdministrativo: data.AvanceAdministrativo,
      AvanceEjecucionTexto: data.AvanceEjecucionTexto,
      AvanceAdministrativoTexto: data.AvanceAdministrativoTexto,
      //Modificaciones
      // NuevaFechaEstimada: doc.data().NuevaFechaEstimada,
      HHModificado: data.HHModificado,
      MontoModificado: data.MontoModificado,
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
