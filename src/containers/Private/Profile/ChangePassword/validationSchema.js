import * as Yup from 'yup'

export default Yup.object().shape({
  current_password: Yup.string()
    .trim()
    .max(50, "Maximum character is 50.")
    .required("This field is required."),
  new_password: Yup.string()
    .max(50, "Maximum character is 50.")
    .required("This field is required.")
    //.matches(/\b(?:(?!(.)\1)\w)+\b/, "Password must not contain two identical characters in a row.")
    .matches(/^[A-Za-z0-9 !(),.?"':;{}<>\[\]/_\-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .matches(/^(?:([\w\d*? !:;`.,'"@#$%^&*()/_=|\\{}\[\]<>+~-])?(?!\1))+$/, "Password must not contain two identical characters in a row.")
    .matches(/[-!(),.?"':;{}<>\[\]/_]/, "Password must contain a special character.")
    .matches(/[a-z]/, "Password must contain a lower case character.")
    .matches(/[A-Z]/, "Password must contain an upper case character.")
    .matches(/\d+/, "Password must contain a number.")
    .min(10, "Password must be at least 10 characters long."),
  new_password_confirmation: Yup.string()
    .trim()
    .max(50, "Maximum character is 50.")
    .oneOf([Yup.ref("new_password")], "Passwords do not match.")
    .required("This field is required."),
});
