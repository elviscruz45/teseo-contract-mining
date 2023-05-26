import * as Yup from "yup";

export function initialValues() {
  return {
    etapa: "",
  };
}

export function validationSchema() {
  return Yup.object({
    etapa: Yup.string().required("Selecciona una opcion"),
  });
}
