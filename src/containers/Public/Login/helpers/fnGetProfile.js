import { API_V1 } from "fe-utils/api";

export default async function fnGetProfile(uuid) {
  try {
    const { data } = await API_V1.get("v1/admin/user/account/details");
    return {
      ...data,
      loading: false
    };
  } catch (error) {
    const statusCode = error.status || 500;
    return {
      loading: false,
      statusCode
    };
  }
}