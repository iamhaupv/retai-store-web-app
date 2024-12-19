import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Link } from "react-router-dom";
import apiGetInformationProduct from "../../apis/apiGetInformationProduct";

const BarcodeScanner = () => {
  const [product, setProduct] = useState({});
  const [barcode, setBarcode] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [inputString, setInputString] = useState("");

  // Hàm này được gọi khi quét thành công mã vạch
  const handleScan = async (data) => {
    if (data) {
      setBarcode(data.text); // Lưu mã vạch vừa quét vào state barcode
      setInputString(data.text); // Cập nhật state inputString với giá trị mã vạch vừa quét
      setIsScanning(false); // Dừng quét sau khi quét thành công
    }
  };

  // Hàm này được gọi khi gặp lỗi trong quá trình quét
  const handleError = (err) => {
    console.error("Lỗi khi quét mã vạch:", err);
  };

  useEffect(() => {
    if (!isScanning && barcode) {
      fetchInforProduct();
    }
  }, [isScanning, barcode]);

  const splitString = (str) => {
    const [MaSP, MaPhieu, HSD] = str.split("-");
    return { MaSP, MaPhieu, HSD };
  };

  const { MaSP, MaPhieu, HSD } = inputString ? splitString(inputString) : {};

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchInforProduct = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiGetInformationProduct.apiGetInforProduct(
        token,
        { product: MaSP, receipt: MaPhieu }
      );
      if (response.success) setProduct(response.item);
      else setProduct([]);
    } catch (error) {
      console.log("fetch infor product is error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 overflow-hidden">
      <Link to="/home">
        <button className="fixed btn btn-circle bg-gray-200 left-3 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>
      <h2 className="fixed badge badge-md h-9 bg-gray-200 text-xl font-semibold top-2 left-32">
        Quét Mã Vạch
      </h2>
      <div className="h-full p-2 rounded-lg shadow-lg max-w-sm w-full text-center">
        {/* Hiển thị video camera để quét mã vạch */}
        {isScanning ? (
          <div>
            <BarcodeScannerComponent
              width="100%"
              height="calc(100vh - 10px)"
              onUpdate={(err, result) => {
                if (result) {
                  handleScan(result);
                } else if (err) {
                  handleError(err);
                }
              }}
            />
            <p className="mt-4 text-gray-500">
              Hướng camera tới mã vạch để quét.
            </p>
          </div>
        ) : product && Object.keys(product).length > 0 ? (
          <div className="w-full min-h-screen bg-gray-100 p-4">
            <h3 className="text-xl font-bold text-gray-800">
              Thông tin sản phẩm
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Mã vạch: <span className="font-semibold">{barcode}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="w-full sm:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={product?.product?.images[0] || "default-image-url.jpg"}
                    alt="Avatar sản phẩm"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="sm:col-span-2">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-bold w-32 text-left">
                      Mã sản phẩm:
                    </span>
                    <span className="text-gray-700">
                      {product?.product?.id}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold w-32 text-left">
                      Tên sản phẩm:
                    </span>
                    <span className="text-gray-700">
                      {product?.product?.title}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold w-32 text-left">Mã Phiếu:</span>
                    <span className="text-gray-700">
                      {product?.receipt?.idPNK}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold w-32 text-left">
                      Tên nhà cung cấp:
                    </span>
                    <span className="text-gray-700">
                      {product?.product?.brand?.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold w-32 text-left">Tên loại:</span>
                    <span className="text-gray-700">
                      {product?.product?.category?.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold w-32 text-left">
                      Hạn sử dụng:
                    </span>
                    <span className="text-gray-700">
                      {formatDate(product?.receipt?.products[0]?.expires)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsScanning(true)}
            >
              Quét lại
            </button>
          </div>
        ) : (
          <>
            Mã vạch không hợp lệ
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsScanning(true)}
            >
              Quét lại
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
