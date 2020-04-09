import * as Yup from 'yup'

export default Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('This is a required field.'),
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
  role: Yup.string()
    .required('This is a required field.'),
  confirm_password: Yup.string()
    .required("This field is required.")
    .trim()
    .oneOf([Yup.ref('new_password')], 'Confirm Password do not match.'),
  password: Yup.string()
    .max(50, "Maximum character is 50.")
    .required("This field is required.")
    // .matches(/^[A-Za-z0-9 !(),.?"':;{}<>\[\]/_\-]+$/, { excludeEmptyString: false, message: "Invalid characters." })
    // .matches(/^(?:([\w\d*? !:;`.,'"@#$%^&*()/_=|\\{}\[\]<>+~-])?(?!\1))+$/, "Password must not contain two identical characters in a row.")
    .matches(/[-!(),.?"':;{}<>\[\]/_]/, "Password must contain a special character.")
    .matches(/[a-z]/, "Password must contain a lower case character.")
    .matches(/[A-Z]/, "Password must contain an upper case character.")
    .matches(/\d+/, "Password must contain a number.")
    .min(10, "Password must be at least 10 characters long."),
  // tel_no: Yup.string()
  //   .matches(/^[0-9]+$/, { excludeEmptyString: false, message: "Only number is required." })
  //   .min(9, "Must be 9 to 11 digits long.")
  //   .max(11, "Must be 9 to 11 digits long."),
  // mobile_no: Yup.string()
  //   .matches(/^[0-9+]+$/, { excludeEmptyString: false, message: "Only number is required." })
  //   // .matches(/^(09)\d{9}$/, { excludeEmptyString: false, message: "Invalid mobile format." })
  //   .min(11, "Must be 11 digits long.")
  //   .max(11, "Must be 11 digits long.")
});
