import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold">
            <span className="text-[#FA4F09]">Job</span>
            <span className="text-[#6B3AC2]">ify</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-semibold text-gray-700 items-center gap-8">
            <li className="hover:text-blue-600 transition-all">
              <Link to="/Home">Home</Link>
            </li>
            <li className="hover:text-blue-600 transition-all">
              <Link to="/browse">Browse</Link>
            </li>
            <li className="hover:text-blue-600 transition-all">
              <Link to="/Jobs">Job</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                {" "}
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                {" "}
                <Button
                  variant="primary"
                  className="bg-blue-600 text-white hover:bg-red-700 transition-all"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-all">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                  <Avatar className="rounded-full cursor-pointer border-2 border-gray-300">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Shubham Srivastav</h3>
                    <p className="text-sm font-medium text-gray-500">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 hover:text-blue-600 transition-all cursor-pointer">
                    <User2 size={18} />
                    <Button variant="link" className="w-full text-left p-0">
                      Profile
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 hover:text-red-600 transition-all cursor-pointer">
                    <LogOut className="items-center" size={18} />
                    <Button variant="link" className="w-full text-left p-0">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
