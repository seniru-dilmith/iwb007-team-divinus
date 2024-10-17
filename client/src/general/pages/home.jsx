import React from "react";
import Description from "../components/home/Description";
import Features from "../components/home/Features";
import HeroSection from "../components/home/HeroSection";
import Navbar from "../components/common/navbar";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <Description />
      <Features />
    </div>
  );
};

export default Home;
