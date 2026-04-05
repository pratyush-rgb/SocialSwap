import React from "react";
import Hero from "../components/Hero";
import LatestListings from "../components/LatestListings";
import Plans from "../components/Plans";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <h1>
        <Hero />
        <LatestListings />
        <Plans />
        <Cta />
        <Footer />
      </h1>
    </div>
  );
};

export default Home;
