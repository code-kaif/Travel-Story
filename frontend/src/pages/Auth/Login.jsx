import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import PasswordInput from "../../components/input/PasswordInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { url } from "../../main";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${url}/user/login`, userInfo, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", JSON.stringify(res.data.user.token));
          toast.success("Loggedin Successfully");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };

  return (
    <>
      <div className="h-screen bg-slate-50 overflow-hidden relative">
        <div className="login-ui-box right-10 -top-40"></div>
        <div className="login-ui-box -bottom-20 bg-cyan-300"></div>
        <div className="container h-screen flex items-center justify-center px-20 mx-auto">
          <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
            <div>
              <h4 className="text-5xl text-white font-semibold leading-[50px]">
                Capture Your <br /> Journey
              </h4>
              <p className="text-[15px] text-white leading-6 pr-7 mt-4">
                Record your travel experience and memories in your personal
                travel journal.
              </p>
            </div>
          </div>
          <div className="w-2/4 h-[75vh] bg-white rounded-lg relative p-16 shadow-lg shadow-cyan-200/20">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="text-2xl font-semibold mb-7">Login</h4>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}

              <div className="flex items-center bg-cyan-600/5 px-5 rounded">
                <input
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  className="w-full text-sm bg-slate-50 py-3 mr-3 rounded outline-none"
                  {...register("password", { required: true })}
                />
                {showPass ? (
                  <FaRegEye
                    size={20}
                    className="text-slate-700 cursor-pointer"
                    onClick={() => toggleShowPassword()}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="text-slate-400 cursor-pointer"
                    onClick={() => toggleShowPassword()}
                  />
                )}
              </div>
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}

              <button
                type="submit"
                className="btn-primary hover:text-white hover:bg-cyan-400"
              >
                Login
              </button>
              <p className="text-sm text-slate-500 text-center my-4">Or</p>
              <button
                type="submit"
                className="btn-primary btn-ligth"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create New Account
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="md:hidden pb-20 flex flex-col md:flex-row h-screen bg-cover bg-center">
        <div className="flex items-center justify-center w-full h-full backdrop-blur-md bg-white/30 md:pb-0 pb-28">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6 relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 top-3"
              >
                {showPass ? (
                  <FaRegEyeSlash />
                ) : (
                  <FaRegEye className="text-slate-500" />
                )}
              </button>
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <p className="">
                haven't account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-blue-700 hover:underline"
                >
                  Create
                </span>
              </p>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Login;
