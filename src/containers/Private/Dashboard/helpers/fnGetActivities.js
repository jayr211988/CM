import { API_V1 } from "fe-utils/api";

export default async function fnGetActivities(payload) {
  try {
    const { data: dashboard } = await API_V1.get("v1/api/activity", { params: payload });
    return {
      dashboard,
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