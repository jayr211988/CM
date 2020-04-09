export default function fnQueryParams(params) {
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