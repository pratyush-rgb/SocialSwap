import React from "react";
import Title from "./Title";
import { PricingTable } from "@clerk/react";

const Plans = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30 max-md:px-4">
      <div className="text-center">
        <Title
          title="Choose your plan"
          description="Flexible pricing designed to scale with your goals."
        />
        <div className="mt-14">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default Plans;
