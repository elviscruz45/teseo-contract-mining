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
      Numero_Servicio: data.NumeroAIT, //ok
      Nombre_Servicio: data.NombreServicio, //ok
      Tipo_Servicio: data.TipoServicio, //ok
      Nombre_Empresa: data.companyName, //ok
      Fecha_Post_Formato: data.fechaPostFormato, //ok
      Fecha_Ultimo_Evento_Posteado: data.LastEventPosted?.toDate().getTime(), //ok
      Numero_Cotizacion: data.NumeroCotizacion, //ok
      FechaFin_original: data.FechaFin, //ok
      //Usuario
      Email_Creador_servicio: data.emailPerfil, //ok
      Nombre_Autor: data.nombrePerfil, //ok
      // Responsables ,interacciones
      ResponsableEmpresaUsuario: data.ResponsableEmpresaUsuario, //ok
      ResponsableEmpresaContratista: data.ResponsableEmpresaContratista, //ok
      AreaServicio: data.AreaServicio, //ok
      //Monto y HH
      HorasHombre: data.HorasHombre, //ok
      Moneda: data.Moneda, //ok
      Monto: data.Monto, //ok
      //Fechas
      FechaPostISO: data.fechaPostISO, //ok
      Fecha_Creacion: data.createdAt?.toDate().getTime(), //ok
      Fecha_Final_Ejecucion: data.fechaFinEjecucion?.toDate().getTime(), //ok
      //Avances
      AvanceEjecucion: data.AvanceEjecucion, //ok
      AvanceAdministrativoTexto: data.AvanceAdministrativoTexto, //ok
      //Modificaciones
      Nueva_Fecha_Fin_Estimada: data.NuevaFechaEstimada, //ok
      HHModificado: data.HHModificado, //ok
      MontoModificado: data.MontoModificado, //ok
      //events
      // Events: JSON.stringify(data.events), //ok
      Id_Servicios_Cloud: data.idServiciosAIT, //ok
      Cantidad_Docs: data.pdfFiles?.length, //ok
    };
    post_array.push(table);
  });
  console.log("getExcelGLobalFINALL");

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
