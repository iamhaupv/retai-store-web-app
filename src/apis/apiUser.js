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
const apiGetCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${url}user/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api get current user is error " + error);
  }
};
const apiUpdateInfor = async (token, payload) => {
  try {
    const response = await axios.put(`${url}user/update-infor`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return response.data;
  } catch (error) {
    console.log("api update infor error: " + error);
  }
};
const apiUser = {
  apiLogin,
  apiForgotPassword,
  apiGetCurrentUser,
  apiUpdateInfor
};
export default apiUser;
