import axios from "axios";
const url = process.env.REACT_APP_API_URL;
const apiLogin = async (payload) => {
  try {
    const response = await axios.post(`${url}user/login`, payload);
    return response.data;
  } catch (error) {
    console.log("api login is error " + error);
  }
};
const apiForgotPassword = async (payload) => {
  try {
    const response = axios.post(`${url}user/forgotpassword`, payload);
    return (await response).data;
  } catch (error) {
    console.log("api forgot password is error " + error);
  }
};
const apiUser = {
  apiLogin,
  apiForgotPassword,
};
export default apiUser;
