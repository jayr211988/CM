import { API_V1 } from "fe-utils/api";
import apiFormValidation from "fe-utils/apiFormValidation";


export const fnLoginSubmit = async (values, actions) => {
  const { password, username } = values;
  try {
    const { data } = await API_V1.post("v1/auth/login", { username, password, type: "cms" });

    if(!data.temporary) {
      API_V1.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem("token", data.token);
    }
    return { temporary: data.temporary };
  } catch (response) {
    actions.setSubmitting(false);
    if (response && response.status === 422) {
      const message = apiFormValidation({password: "Oops, wrong password."});
      actions.setErrors(message);
    } else {
      return {
        error: response && response.statusText,
        status: response.status
      };
    }
    return false;
  }
};

export const fnUsernameChecker = async (values, actions) => {
  const { email } = values;
  try {
    const { data } = await API_V1.post("v1/auth/validate", { email, type: "cms" });
    actions.setSubmitting(false);
    return data;
  } catch (response) {
    actions.setSubmitting(false);
    if (response && response.status === 422) {
      const message = apiFormValidation({ email: response.message });
      actions.setErrors(message);
    } else {
      return {
        error: response && response.statusText,
      };
    }
  }
};
