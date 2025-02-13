import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header />
      <Categories />
      {/*<LatestJobs />
      <Footer /> */}
    </div>
  );
};

export default Home;
