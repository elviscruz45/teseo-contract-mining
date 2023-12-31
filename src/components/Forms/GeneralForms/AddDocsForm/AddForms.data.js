import * as Yup from "yup";
export function initialValues() {
  return {
    pdfFile: "",
    FilenameTitle: "",
    tipoFile: "",
  };
}

export function validationSchema() {
  return Yup.object({
    pdfFile: Yup.string().required("Campo obligatorio"),
    tipoFile: Yup.string().required("Campo obligatorio"),
    // etapa: Yup.string().required("Campo obligatorio"),
    // porcentajeAvance: Yup.string().required("Campo obligatorio"),
    // aprobacion: Yup.string().required("Campo obligatorio"),
    // pdfFile: Yup.string().required("Campo obligatorio"),
    // MontoModificado: Yup.string().required("Campo obligatorio"),
    // NuevaFechaEstimada: Yup.string().required("Campo obligatorio"),
    // HHModificado: Yup.string().required("Campo obligatorio"),
  });
}
