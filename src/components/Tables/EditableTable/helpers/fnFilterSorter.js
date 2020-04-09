export default function fnFilterSorter(props) {
  const { col, urlParamsObject } = props;

  let filteredValue;
  let sortDirections = null;
  let sortOrder = null;

  if (Array.isArray(urlParamsObject[col.dataIndex])) {
    filteredValue = urlParamsObject[col.dataIndex];
  } else if (urlParamsObject[col.dataIndex]) {
    filteredValue = [urlParamsObject[col.dataIndex]];
  }

  if (col.sorter && urlParamsObject._sort_by === col.dataIndex) {
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
    filteredValue,
    sortOrder,
    sortDirections,
  }
}