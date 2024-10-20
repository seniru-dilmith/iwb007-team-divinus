import React from "react";
import Description from "../components/home/Description";
import Features from "../components/home/Features";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Description />
      <Features />
    </div>
  );
};

export default Home;
