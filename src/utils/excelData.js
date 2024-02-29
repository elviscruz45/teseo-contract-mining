import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";

export const getExcelReportData = async (datas = []) => {
  // const querySnapshot = collection(db, "ServiciosAIT");
  const post_array = [];

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
      Fecha_Final_Ejecucion: data?.fechaFinEjecucion,
      //ok
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
