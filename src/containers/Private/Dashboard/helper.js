import { API_V1 } from "fe-utils/api";

export const fnGetData = async (payload={}) => {
  try {
    const response = await API_V1.get("admin/users", { params: {
      ...payload,
      items_per_page: 20
    } });
    const { data, meta } = response;
    return {
      data,
      total: data.length > 0 ? meta.total : 0,
      loading: false
    };
  } catch (error) {
    console.log("error", error);
    const statusCode = error.status || 500;
    return {
      loading: false,
      statusCode
    };
  }
};