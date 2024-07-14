/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingLogin(true);
      const data = JSON.stringify({
        email: email,
        password: password,
      });
      const response = await AuthServices.login(data);
      console.log(response);
      if (response.status == 200) {
        Toast.fire({
          icon: "success",
          html: "<div><strong>Success</strong> <br> Selamat Datang Kembali</div>",
        });
        navigate("/dashboard");
      }
      setLoadingLogin(false);
    } catch (error) {
      // console.error("Login error:", error);
      setLoadingLogin(false);
      Toast.fire({
        icon: "info",
        html: "<div><strong>Warning</strong> <br> Check Your Username/Password</div>",
      });
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="font-semibold text-[#238FDD] text-5xl text-center my-5">
          Paper Management
        </h1>
        <div className="w-full bg-[#238FDD] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Login
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-xl font-medium text-white "
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-xl font-medium text-white "
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="your-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 "
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.88 15.59A10.05 10.05 0 0112 17c-2.88 0-5.52-1.17-7.42-3a2.98 2.98 0 010-4.24C6.48 8.17 9.12 7 12 7c1.07 0 2.07.25 3 .68"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loadingLogin}
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-md px-5 py-2.5 text-center"
              >
                {loadingLogin == true ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-black mt-4">
          <p className="font-medium">
            Don't have an account?{" "}
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="font-bold text-[#238FDD]"
            >
              Create One Now
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
