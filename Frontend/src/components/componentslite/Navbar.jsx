import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div>
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#022bf8]">ify</span>
        </h1>
      </div>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
