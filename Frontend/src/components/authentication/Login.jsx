import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added `useNavigate`
import Navbar from "../componentslite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Button } from "../ui/button";
import { Loader, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/"); // Navigate after successful login
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <form
          onSubmit={submitHandler}
          className="w-1/3 border border-gray-300 rounded-xl p-8 shadow-lg bg-white"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-violet-700">
            Login
          </h1>

          {/* Email */}
          <div className="my-4">
            <Label className="text-gray-700 font-semibold">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email address"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label className="text-gray-700 font-semibold">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="my-5">
            <Label className="text-gray-700 font-semibold">Select Role</Label>
            <RadioGroup className="flex items-center gap-6 mt-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="JobSeeker"
                  checked={input.role === "JobSeeker"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-700 font-medium">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-700 font-medium">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600 role=status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-violet-500 text-white px-6 py-3 rounded-lg hover:bg-violet-600 transition duration-300 w-full shadow-md"
            >
              Login
            </button>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center mt-6">
            {/* Don't have an account? Register */}
            <p className="text-gray-600 mt-4 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-violet-700 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
