import React from "react";
import Navbar from "./Navbar";
import Filtercard from "./Filtercard";
import Job1 from "./Job1";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <Filtercard />
          </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {jobsArray.length <= 0 ? (
                <span>Job Not Found</span>
              ) : (
                jobsArray.map((job, index) => <Job1 />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
