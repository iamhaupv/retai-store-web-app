import axios from "axios";
const url = process.env.REACT_APP_API_URL;
const apiGetInforProduct = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}product/get-infor-product`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api get infor product is error" + error);
  }
};

const apiGetInformationProduct = {
  apiGetInforProduct,
};

export default apiGetInformationProduct;
