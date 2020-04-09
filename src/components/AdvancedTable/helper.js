import React from "react";
import { notification } from "antd";
import { API_V1 } from "fe-utils/api";

export const fnGetData = async (api, payload) => {
  try {
    const response = await API_V1.get(api, { params: payload });
    const { data, meta } = response;
    return {
      data,
      total: data.length > 0 ? meta.total : 0,
      loading: false,
      meta
    };
  } catch (error) {
    const statusCode = error.status || 500;
    return {
      loading: false,
      statusCode
    };
  }
};

export const fnSetTableColumns = (props) => {
  const { columns, urlParamsObject } = props;
  return columns.map((data) => {
    let filteredValue;
    let sortDirections = null;
    let sortOrder = null;

    if (Array.isArray(urlParamsObject[data.dataIndex])) {
      filteredValue = urlParamsObject[data.dataIndex];
    } else if (urlParamsObject[data.dataIndex]) {
      filteredValue = [urlParamsObject[data.dataIndex]];
    }

    if (data.sorter && urlParamsObject._sort_by === data.dataIndex) {
      switch (urlParamsObject._sort_order) {
        case "asc":
          sortDirections = ["ascend", "descend"];
          sortOrder = "ascend";
          break;
        case "desc":
          sortDirections = ["descend", "ascend"];
          sortOrder = "descend";
          break;
        default:
          sortDirections = null;
          sortOrder = null;
          break;
      }
    }

    return {
      ...data,
      filteredValue,
      sortOrder,
      sortDirections,
    };
  });
};

export const fnDelete = async (props) => {
  const { api, uuids, self } = props;
  const data = { [api]: [uuids] };

  try {
    const res = await API_V1.delete(api, { data });
    if (res.status === 422) {
      notification.info({ message: "Alert", description: res.data.message });
    } else {
      self.fetch();
      notification.success({
        message: "Success",
        description: `Records successfully deleted.`,
      });
    }
  } catch (error) {
    self.fetch();
  }
};

// helper functions
export function fnShowTotal(total, totalPagination, range) {
  return <div style={{ flex: "row", display: "flex" }}>
    <span>Showing&nbsp;</span>
    <b>{total > 0 ? range[0] : 0} -&nbsp;</b>
    <b>{total > 0 ? range[1] : 0}&nbsp;</b>
    <p>of&nbsp;</p>
    <b>{total > 0 ? totalPagination : 0}</b>
  </div>
}

export function fnQueryParams(params) {
  let query = "";
  for (const key in params) {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        // TODO
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < params[key].length; index++) {
          const value = params[key][index];
          query += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
      } else {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
      }
    }
  }
  if (query.length === 0) {
    return "";
  }

  query = query.slice(0, -1);
  return "?" + query;
}

