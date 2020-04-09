import { notification } from "antd";
import { API_V1 } from "fe-utils/api";
import apiFormValidation from "fe-utils/apiFormValidation";

export default async function fnUpdatePassword({actions, values}) {
  const { setSubmitting, setErrors } = actions;
  try {
    await API_V1.put("v1/auth/change-password", values);
    notification.open({
      message: "Password Updated",
      description: "You have successfully updated your password. You may now login using your new password.",
      style: { background: '#F6FFED', boxShadow: '0 0 3px #52C41A' }
    });
    return true
  } catch (error) {
    if(error.status === 422) {
      const errors = apiFormValidation({ current_password: error.message });
      setErrors(errors);
    }
    setSubmitting(false);
    return false
  }
}
