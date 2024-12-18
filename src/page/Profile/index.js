import React, { useEffect, useState } from "react";
import apiUser from "../../apis/apiUser";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({}); 
  const [editData, setEditData] = useState({}); 
  const [newImage, setNewImage] = useState(null);
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token is invalid!");
    const currentUSer = await apiUser.apiGetCurrentUser(token);
    setUser(currentUSer.rs);
    setEditData(currentUSer.rs); 
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("employee.")) {
      const field = name.split(".")[1];
      setEditData((prev) => ({
        ...prev,
        employee: {
          ...prev.employee,
          [field]: value,
        },
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const previewUrl = URL.createObjectURL(file); 
      setEditData((prev) => ({
        ...prev,
        employee: {
          ...prev.employee,
          images: [previewUrl],
        },
      }));
    }
  };
  const handleUpdateInfor = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const formData = new FormData();
      formData.append("id", user?._id);
      formData.append("name", editData?.employee?.name);
      formData.append("email", user?.email);
      formData.append("phone", editData?.employee?.phone);
      formData.append("address", editData?.employee?.address);
      formData.append("birthday", user?.employee?.birthday);
      if (newImage) {
        formData.append("image", newImage);
      }
      console.log(formData);
      
      const response = await apiUser.apiUpdateInfor(token, formData);
      if (response.success) {
        setUser(response.user);
        setIsEditing(false)
        toast("Thông tin đã được cập nhật!");
      } else {
        toast("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      console.log("Error updating user info:", error);
      toast("Có lỗi khi cập nhật thông tin.");
    }
  };
  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        {/* Header Section */}
        <div className="flex flex-col items-center">
          {!isEditing ? (
            <>
              <img
                src={user?.employee?.images?.[0] || "default-image-url.jpg"} // Dùng ảnh mặc định nếu không có ảnh
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="upload-image"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <img
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : user?.employee?.images?.[0] || "default-image-url.jpg"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer"
                />
              </label>
            </>
          )}
          <h1 className="text-2xl font-bold mt-4">{user?.employee?.name}</h1>
          <p className="text-gray-600">
            {user?.role === "admin" ? "Quản lý" : "Nhân viên"}
          </p>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Info Section */}
        {!isEditing && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{user?.employee?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{user?.employee?.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p className="font-medium">{user?.employee?.birthday}</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="employee.name"
                  value={editData?.employee?.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="employee.email"
                  value={editData?.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Điện thoại</label>
                <input
                  type="text"
                  name="employee.phone"
                  value={editData?.employee?.phone || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  name="employee.address"
                  value={editData?.employee?.address || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Ngày sinh</label>
                <input
                  type="text"
                  name="employee.birthday"
                  value={editData?.employee?.birthday || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleUpdateInfor}
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
