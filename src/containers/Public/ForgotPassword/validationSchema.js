import * as Yup from 'yup';

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, "Maximum character is 50.")
    .trim()
    .matches(/^[A-Za-z0-9 @Ññ._-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .email("Oops, wrong email format.")
    .required('This field is required.'),
});
