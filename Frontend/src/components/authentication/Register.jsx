import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Navbar from "../componentslite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-500 rounded-lg p-6 my-10 shadow-md bg-white"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-violet-600">
            Register
          </h1>

          <div className="my-3">
            <Label className="text-gray-700 font-semibold">Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div className="my-3">
            <Label className="text-gray-700 font-semibold">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div className="my-3">
            <Label className="text-gray-700 font-semibold">Password</Label>
            <Input
              type="password"
              placeholder="Create a strong password"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div className="my-3">
            <Label className="text-gray-700 font-semibold">Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div className="flex justify-between items-center">
            {/* Role Selection */}
            <RadioGroup className="flex items-center gap-6 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="JobSeeker"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-700 font-medium">
                  Job Seeker
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="text-gray-700 font-medium">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center gap-2 w-1/2">
              <Label className="font-medium text-gray-700 text-center">
                Profile Photo
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer border border-gray-300 rounded-md p-2 w-full bg-gray-100 hover:bg-gray-200 transition focus:ring-2 focus:ring-violet-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="bg-violet-500 text-white px-6 py-2 rounded-lg hover:bg-violet-600 transition w-full"
            >
              Register
            </button>

            {/* Already have an account? Login */}
            <p className="text-gray-600 mt-4 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
