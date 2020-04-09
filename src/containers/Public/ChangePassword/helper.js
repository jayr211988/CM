import { API_V1 } from '../../../utils/api';
export const fnChangePasswordSubmit = async (values) => {
  try {
    const response = await API_V1.post('/login', values);
    if (response.status === 200) {
      console.log(response, 'error Logs');
      return true;
    }
  } catch (error) {
    console.log(error.response, 'error Logs');
    return false;
  }
  return false;
};
