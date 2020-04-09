import { API_V1 } from "fe-utils/api";

export default async function fnGetDate(api, payload) {
  try {
    const response = await API_V1.get(api, { params: payload });
    const { data, meta } = response;
    return {
      data,
      total: data.length > 0 ? meta.total : 0,
      meta: meta,
      loading: false
    };
  } catch (error) {
    const statusCode = error.status || 500;
    return {
      loading: false,
      statusCode
    };
  }
};