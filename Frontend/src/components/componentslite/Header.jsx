import React from "react";

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
        </div>
      </div>
    </div>
  );
};

export default Header;
