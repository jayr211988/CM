export default function apiFormValidation(dataObject) {
  console.log("API VALIDATION PLEASE REMOVE LATER", dataObject);
  for (const key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      if (Array.isArray(dataObject[key])) {
        dataObject[key] = dataObject[key][0];
      } else {
        /* eslint-disable no-unused-expressions */
        dataObject[key];
      }
    }
  }
  return dataObject;
}