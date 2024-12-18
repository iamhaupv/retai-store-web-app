
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./FormLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import apiUser from "../../apis/apiUser";

export default function FormLogin() {

  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    try {
      const rs = await apiUser.apiLogin(payload);
      if (rs.success) {
        setPayload({ email: "", password: "" });
        navigate("/home");
        localStorage.setItem("accessToken", rs.accessToken);
        localStorage.setItem("name", rs.userData.name);
        localStorage.setItem("refreshToken", rs.userData.refreshToken);
        localStorage.setItem("email", rs.userData.email);
        localStorage.setItem("image", rs.userData.image);
        localStorage.setItem("role", rs.role);
      } else {
        toast.error("Sai tên đăng nhập hoặc mật khẩu")
      }
    } catch (error) {
      console.log("handle login error:", error);
      toast.error("Sai tên đăng nhập hoặc mật khẩu")
    }
  };
  
  const handleForgotPassword = async() => {
    try {
      const {email} = payload
      const rs = await apiUser.apiForgotPassword({email})
      if(rs.success){
        Swal.fire("Bạn vui lòng check email", rs.mes, "success")
      }else{
        Swal.fire("Email không tồn tại!", rs.mes, "error")
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  
  return (
    <>
    <ToastContainer/>
    <div className="max-w-screen-sm max-h-screen flex justify-items-center" 
    style={{ backgroundColor: "#F5F5F5" }} >
      {/* <div className="container__login flex justify-center font-roboto border rounded-[44px]"> */}
        <div className="content__login flex justify-center items-center border rounded-[39px]">
          <div>
            {isLogin ? <p className="font-bold text-[30px] flex justify-center items-center mt-5">
              Đăng nhập
            </p>: <div className="flex items-center font-bold text-[25px]"> <button onClick={()=> setIsLogin(!isLogin)}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <p className="font-bold text-[30px] flex justify-center items-center mt-5">
              <span className="ml-[62px]">Quên mật khẩu</span>
            </p></div>}
            {isLogin ? <div><label class="input input-bordered flex items-center gap-2 w-[370px] h-[45px] border rounded-[22px] mt-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                class="grow"
                placeholder="Username"
                name="email"
                onChange={handleChange}
                value={payload.email}
              />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-[370px] h-[45px] border rounded-[22px] mt-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input name="password" onChange={handleChange} type="password" class="grow" value={payload.password} />
            </label>
            <div className="flex justify-between mt-[27px]">
              <label className="text-[16px] flex items-center">
                <input type="checkbox" defaultChecked className="w-[25px] h-[25px] border rounded-[7px] text-[#ffffff]" />
                <span className="ml-[12px]">Lưu mật khẩu</span>
              </label>
              <label onClick={()=>setIsLogin(!isLogin)} className="text-[#19B563] text-[17px]">Quên mật khẩu</label>
            </div></div>: <div><label class="input input-bordered flex items-center gap-2 w-[370px] h-[45px] border rounded-[22px] mt-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                class="grow"
                placeholder="Username"
                name="email"
                value={payload.email}
                onChange={handleChange}
              />
            </label></div>}
            <div className="flex justify-center">
              {isLogin ? <button onClick={handleLogin} className="w-[260px] h-[40px] mb-2 bg-[#19B563] border rounded-[30px] mt-[16px]">
                <span className="text-[#ffffff] font-bold">ĐĂNG NHẬP</span>
              </button> : <button onClick={handleForgotPassword} className="w-[260px] h-[40px] mb-2 bg-[#19B563] border rounded-[30px] mt-[16px]">
                <span className="text-[#ffffff] font-bold">GỬI YÊU CẦU</span>
              </button>}
            </div>
          </div>
        {/* </div> */}
        </div>
      </div>
    </>
  );
}
