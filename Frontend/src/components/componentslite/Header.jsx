import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <div>
      <div className="text-center mt-6">
        {" "}
        {/* Added mt-6 for spacing */}
        <span className="px-6 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md">
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
          <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full item-centre gap-4 mx-auto">
            <input
              type="text"
              placeholder="Search Jobs"
              className="outline-none border-none w-full"
            />
            <Button className="rounded-r-full bg-violet-500 hover:bg-violet-600 transition-all">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
