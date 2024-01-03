import * as Yup from "yup";
export function initialValues() {
  return {
    titulo: "",
    comentarios: "",
    visibilidad: "Todos",
    etapa: "",
    porcentajeAvance: "0",
    aprobacion: "",
    pdfFile: "",
    FilenameTitle: "",
    MontoModificado: "0",
    NuevaFechaEstimada: null,
    HHModificado: "0",
    tipoFile: "",
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string().required("Campo obligatorio"),
    comentarios: Yup.string().required("Campo obligatorio"),
    etapa: Yup.string().required("Campo obligatorio"),

    // porcentajeAvance: Yup.string().required("Campo obligatorio"),
    // aprobacion: Yup.string().required("Campo obligatorio"),
    // pdfFile: Yup.string().required("Campo obligatorio"),
    // MontoModificado: Yup.string().required("Campo obligatorio"),
    // NuevaFechaEstimada: Yup.string().required("Campo obligatorio"),
    // HHModificado: Yup.string().required("Campo obligatorio"),
    // visibilidad: Yup.string().required("Campo obligatorio"),
  });
}
