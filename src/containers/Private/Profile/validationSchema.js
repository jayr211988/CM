import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string()
    .max(50, "Maximum character is 50.")
    .trim()
    .matches(/^[A-Za-z0-9 @Ññ._-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .email("Invalid Email.")
    .required('This is a required field.'),
  first_name: Yup.string()
    .max(50, "Maximum character is 50.")
    .trim()
    .matches(/^[A-Za-z Ññ,.'_-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .required('This is a required field.'),
  last_name: Yup.string()
    .max(50, "Maximum character is 50.")
    .trim()
    .matches(/^[A-Za-z Ññ,.'_-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    .required('This is a required field.'),
  tel_no: Yup.string()
    .matches(/^[0-9]+$/, { excludeEmptyString: false, message: "Only number is required." })
    .min(9, "Must be 9 to 11 digits long.")
    .max(11, "Must be 9 to 11 digits long."),
  mobile_no: Yup.string()
    .matches(/^[0-9+]+$/, { excludeEmptyString: false, message: "Only number is required." })
    // .matches(/^(09)\d{9}$/, { excludeEmptyString: false, message: "Invalid mobile format." })
    .min(11, "Must be 11 digits long.")
    .max(11, "Must be 11 digits long.")
});
