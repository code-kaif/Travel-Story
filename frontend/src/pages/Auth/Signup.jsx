import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { url } from "../../main";

const Signup = () => {
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
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await axios
      .post(`${url}/user/create`, userInfo, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Account Created Successfully");
          navigate("/dashboard");
          localStorage.setItem("token", JSON.stringify(res.data.user.token));
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
      <div className="h-screen bg-yellow-50 overflow-hidden md:flex hidden relative">
        <div className="login-ui-box right-10 -top-40 bg-green-400"></div>
        <div className="login-ui-box -bottom-20 bg-green-300"></div>
        <div className="container h-screen flex items-center justify-center px-20 mx-auto">
          <div className="w-2/4 h-[90vh] flex items-end bg-signup-bg-img object-contain bg-cover bg-center rounded-lg p-10 z-50">
            <div>
              <h4 className="text-5xl text-white font-semibold leading-[50px]">
                Start Your <br /> Journey
              </h4>
              <p className="text-[15px] text-white leading-6 pr-7 mt-4">
                Share your story with create account
              </p>
            </div>
          </div>
          <div className="w-2/4 h-[75vh] bg-white rounded-lg relative p-16 shadow-lg shadow-cyan-200/20">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="text-2xl font-semibold mb-7">Create Account</h4>

              <input
                type="text"
                placeholder="Name"
                className="input-box"
                {...register("name", { required: true })}
              />
              <br />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}

              <input
                type="email"
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
                    className="text-green-700 cursor-pointer"
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
                className="btn-primary bg-green-600 hover:text-white hover:bg-green-800"
              >
                Sign Up
              </button>
              <p className="text-sm text-slate-500 text-center my-4">Or</p>
              <button
                type="submit"
                className="btn-primary btn-ligth bg-green-200 hover:bg-green-400 text-green-600"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
