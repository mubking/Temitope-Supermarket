"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Signup({ session }) {
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username") {
      if (value.trim() !== "") {
        setErrors({ ...errors, username: "" });
      } else {
        setErrors({ ...errors, username: "This field is required" });
      }
    } else if (name === "email") {
      if (value.trim() !== "") {
        setErrors({ ...errors, email: "" });
      } else {
        setErrors({ ...errors, email: "This field is required" });
      }
    } else if (name === "password") {
      if (value.trim() !== "") {
        setErrors({ ...errors, password: "" });
      } else {
        setErrors({ ...errors, password: "This field is required" });
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword();
    if (value.trim() !== "") {
      setErrors({ ...errors, confirmPassword: "" });
    } else {
      setErrors({ ...errors, confirmPassword: "This field is required" });
    }

    if (value.trim() !== userDetails.password.trim()) {
      setErrors({ ...errors, confirmPassword: "Password do not match" });
    }
  };

  const handleJoinClick = async (e) => {
    e.preventDefault();
    if (!userDetails.username) {
      setErrors({ ...errors, username: "This field is required" });
    } else if (!userDetails.email) {
      setErrors({ ...errors, email: "This field is required" });
    } else if (!userDetails.password) {
      setErrors({ ...errors, password: "This field is required" });
    } else {
      setLoading(true);

      try {
        const response = await fetch("/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });

        const data = await response.json();
        const { message } = data;

        if (response.ok) {
          toast.success(message, {
            position: "top-right",
            autoClose: 3000,
          });
          // Clear the form fields after successful registration
          setUserDetails({
            email: "",
            password: "",
            username: "",
          });
          setLoading(false);
          router.push("/login");
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during registration", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      }
    }
  };
  const AlreadyHaveanAccount = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleJoinClick = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match!");
  //   } else {
  //     router.push("/login")
  //     toast.success("Successfully signed up!");
  //     // Add your form submission logic here
  //   }
  // };

  return (
    <>
      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Signup.png')`,
            zIndex: -2,
          }}
        />
        <div
          className="absolute inset-0 bg-blue-700 opacity-50"
          style={{ backgroundColor: "#4c5aa6", zIndex: -1 }}
        />
        <div className="relative text-white flex flex-col md:flex-row justify-center gap-10 items-center min-h-screen md:h-full w-full capitalize">
          <div className="relative flex flex-col h-fit w-[100%] md:w-[30%]  p-4 rounded-2xl">
            <div
              className="absolute inset-0 bg-[#8f98db] rounded-2xl opacity-50"
              style={{ zIndex: -1 }}
            ></div>
            <h1 className="relative text-white text-2xl">
              Sign Up. <span className="text-xl">It's Fast!</span>
            </h1>
            <form className="flex flex-col gap-4 mt-6" action="">
              <div className="relative mb-4">
                <label htmlFor="Name" className="text-2xl">
                 full  Name
                </label>
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  name="username"
                  value={userDetails.username}
                  onChange={handleChangeInput}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.username && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="relative mb-4">
                <label htmlFor="Email" className="text-xl">
                  Email address 
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userDetails.email}
                  onChange={handleChangeInput}
                  placeholder="email"
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.email && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                
<form class="max-w-sm mx-auto">
    <label for="phone-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
            </svg>
        </div>
        <input type="text" id="phone-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
    </div>
</form>

              </div>
              
              <div>
              <label for="large" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">City</label>
  <select id="large" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Select city</option>
    <option value="US">llorin</option>
    <option value="CA">Malete</option>
    <option value="FR">ibadan</option>
    {/* <option value="DE">Germany</option> */}
  </select>
              </div>
              <div className="relative mb-4">
                <label htmlFor="Password" className="text-xl">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={userDetails.password}
                  onChange={handleChangeInput}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                </div>
                {errors.password && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="relative mb-4">
                <label htmlFor="Confirm Password" className="text-xl">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full bg-[#b0b0d6] placeholder:text-white rounded-xl border border-[#D9D9D9] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                >
                  {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                </div>
                {errors.confirmPassword && (
                  <div className="p-1 bg-red-200 text-red-600 border-l-2 text-sm mt-2 border-l-red-600">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="mb-4 flex items-center gap-2 relative">
                <input type="checkbox" name="terms" id="terms" />
                <span className="text-sm">
                  Only items in original condition and packaging may be returned
                  within 3 days of delivery. Refunds may be issued as store
                  credit or bank transfer.
                </span>
              </div>
              <div className="w-full text-left cursor-pointer">
                <p>
                  already have an existing account?{" "}
                  <span className="text-[blue]" onClick={AlreadyHaveanAccount}>
                    Click here...
                  </span>
                </p>
              </div>
              <div className="mb-4 relative">
                <button
                  onClick={handleJoinClick}
                  disabled={loading}
                  className="w-full bg-[#7879f1] px-5 py-3 text-white rounded-full"
                >
                  {loading ? "Signing Up" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
