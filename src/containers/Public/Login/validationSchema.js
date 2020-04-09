import * as Yup from "yup";

export const usernameSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .max(50, "Maximum character is 50.")
    .matches(/^[A-Za-z0-9 @Ññ._-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .email("Oops, wrong email format.")
    .required("This field is required."),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .max(50, "Maximum character is 50.")
    .required("This field is required."),
});
