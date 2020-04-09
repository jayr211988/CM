import { API_V1 } from "fe-utils/api";

export const getProfile = async () => {
  try {
    return await API_V1.get("v1/admin/user/account/details");
  } catch (error) {
    console.log("getProfile error", error.response);
  }
};


export const getPermission = async () => {
  try {
    return await API_V1.get("v1/admin/roles/module/permissions");
  } catch (error) {
    console.log("getProfile error", error.response);
  }
};