import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Scan2InsertOrder = () => {
  const [barcode, setBarcode] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  // Hàm này được gọi khi quét thành công mã vạch
  const handleScan = (data) => {
    if (data) {
      setBarcode(data.text); // Lưu mã vạch vừa quét vào state
      setIsScanning(false); // Dừng quét sau khi quét thành công
    }
  };

  // Hàm này được gọi khi gặp lỗi trong quá trình quét
  const handleError = (err) => {
    console.error("Lỗi khi quét mã vạch:", err);
  };

  // Sử dụng effect để khởi tạo hoặc dọn dẹp nếu cần
  useEffect(() => {
    if (!isScanning) {
      // Nếu đã quét thành công, không tiếp tục quét nữa
      console.log("Mã vạch đã quét:", barcode);
    }
  }, [isScanning, barcode]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Link to="/">
        <button className="fixed btn btn-circle bg-gray-200 left-3 top-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>
      <h2 className="fixed badge badge-md h-9 bg-gray-200 text-xl font-semibold top-2 left-32 ">
           Quét SP thanh toán
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
        ) : (
          <div className="w-full min-h-screen bg-gray-100  p-4">
            <h3 className="text-xl font-bold ">Thông tin sản phẩm</h3>
            <p className="mt-2 text-sm text-gray-600">
              Mã vạch: <span className="font-semibold">{barcode}</span>
            </p>
            <div className="w-full flex">
              <div className="avatar">
                <div className="w-24 rounded">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="w-2/3 ml-1">
                <h1 className="font-bold text-lg flex mt-2">
                  Mã SP: <h1>001</h1>
                </h1>
                <h1 className="font-bold text-lg flex mt-2">
                  Mã Phiếu: <h1>0231241</h1>
                </h1>
                <h1 className="font-bold text-lg flex mt-2">
                  Tên SP: <h1>Nước ngọt Pepsi...</h1>
                </h1>
                <h1 className="font-bold text-lg flex mt-2">
                  Số lượng SP trong kho: <h1>70</h1>
                </h1>
                <h1 className="font-bold text-lg flex mt-2">
                  Nhà cung cấp: <h1>PepsiCo</h1>
                </h1>
                <h1 className="font-bold text-lg flex mt-2">
                  Hạn sử dụng: <h1 className="font-bold text-lg">21/11/2024</h1>
                </h1>
              </div>
            </div>
            <div className="w-full flex">
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={() => setIsScanning(true)} // Reset để tiếp tục quét
            >
              Quét lại
            </button>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Thêm            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan2InsertOrder;