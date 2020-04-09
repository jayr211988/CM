import { notification } from "antd";
import { API_V1 } from "fe-utils/api";
import apiFormValidation from "fe-utils/apiFormValidation";
import NOTIFICATION from "fe-constants/notification";

export default async function fnUpdateProfile({actions, values}) {
  const { message, description, style } = NOTIFICATION.UPDATED;
  values = {
    ...values,
    status: values.status ? "active" : "inactive"
  }
  const { setSubmitting, setErrors } = actions;
  try {
    await API_V1.put("v1/admin/user/account/update", values);
    notification.open({message, description, style});
    return true
  } catch (error) {
    if(error.status === 422){
      const errors = apiFormValidation(error.data);
      setErrors(errors);
    }
    setSubmitting(false);
    return false
  }
}