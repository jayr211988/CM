import { API_V1 } from "fe-utils/api";
import apiFormValidation from "fe-utils/apiFormValidation";
import { notification } from "antd";

export default async function fnForgotPasswordSubmit({values, actions}) {
  const { setSubmitting, setErrors } = actions;
  values = {
    ...values,
    type: "cms"
  }
  try {
    const { message } = await API_V1.post("v1/auth/forgot-password", values);
    actions.setSubmitting(false);
    // notification.open({
    //   message: "Success.",
    //   description: message,
    //   style: { background: '#F6FFED', boxShadow: '0 0 3px #52C41A' }
    // });
    return true;
  } catch (error) {
    if(error.status === 422) {
      const errors = apiFormValidation(error.data);
      setErrors(errors);
    }
    setSubmitting(false);
    return false
  }
};
