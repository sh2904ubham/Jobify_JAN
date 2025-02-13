import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Header = () => {
  return (
    <div>
      <div className="text-center mt-6">
        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md max-w-max mx-auto">
          <HiOutlineBuildingOffice2 className="h-5 w-5 text-[#614232]" />
          Premier Websites for Job Seekers
        </span>
        <div className="flex flex-col gap-3 my-5">
          <h2 className="mt-4 text-4xl font-bold text-gray-800">
            Find Your Perfect Job <br />
            <span className="text-violet-500">Apply & Get Hired! </span>
          </h2>
          <p className="text-gray-600 text-sm">
            We're here to support you in finding the perfect job that matches
            your
            <br /> skills and aspirations, no matter where you are.
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Search Jobs"
              className="outline-none border-none w-full px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 rounded-l-full"
            />
            <Button className="rounded-r-full bg-violet-500 hover:bg-violet-600 transition-all px-4 py-2">
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
