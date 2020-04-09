import { notification } from "antd";
import axios from "axios";

export const API_V1 = axios.create({
  baseURL: process.env.REACT_APP_API,
});

API_V1.interceptors.response.use((response) => {
  return {
    ...response,
    csv: response.data,
    data: response.data.data,
    meta: response.data.meta,
    message: response.data.message
  };
}, (error) => {
  if(error.response === undefined) {
    notification.open({
      message: "No internet connection found",
      description: "Please connect to a network to continue using the Call Tree App Management System.",
      style: { background: '#FFEFEF', boxShadow: '0 0 3px #E64B37' }
    });
    return Promise.reject(error);
  }
  if(error.response.status) {
    if(error.response.status === 500) {
      notification.open({
        message: "Internal Server Error",
        description: "Sorry, the server is reporting an error.",
        style: { background: '#FFEFEF', boxShadow: '0 0 3px #E64B37' }
      });
      return Promise.reject(error);
    }
  }
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    notification.error({ message: "Unauthenticated" });
    setTimeout(() => { window.location.replace("/login"); }, 1000);
  }

  return Promise.reject({
    ...error.response,
    data: error.response.data.data,
    message: error.response.data.message
  });
});


export const FILE_DOWNLOAD  = async (url, params) => {
  try {
    return await API_V1.get(url, {
      params,
      responseType: 'blob',
    });
  } catch ({response}) {
    notification.error({ message: "Error", description: "Error downloading file"})
  }
}