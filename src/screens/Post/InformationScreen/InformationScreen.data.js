import * as Yup from "yup";
export function initialValues() {
  return {
    titulo: "",
    comentarios: "",
    nombreComponente: "",
    supervisor: "",
    equipoTrabajo: "",
    recursos: "",
    pdfFile: "",
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string().required("Campo obligatorio"),
    comentarios: Yup.string().required("Campo obligatorio"),
    // nombreComponente: Yup.string().required("Campo obligatorio"),
    // supervisor: Yup.string().required("Campo obligatorio"),
    // equipoTrabajo: Yup.string().required("Campo obligatorio"),
    // recursos: Yup.string().required("Campo obligatorio"),
  });
}
