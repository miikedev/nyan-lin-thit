import React, { useState } from "react";

import Dates3 from "./Dates3";
import Data2 from "./Data2";
import CLineChart from "./CLineChart";
import CScatterChart from "./CScatterChart";
import CStackedBarChart from "./CStackedBarChart";

const TabContent = ({ active }) => {
  const [activeChart, setActiveChart] = useState(0);
  // I-pad Chart Sizes
  const [mobileWidth, setMobileWidth] = useState(235);
  const [mobileHeight, setMobileHeight] = useState(165);

  const handleChartClick = (chartIndex) => {
    setActiveChart(chartIndex);
    setIsFullWidth(!isFullWidth);
  };
  const chartFontSize = 5;

  switch (active) {
    case "chart":
      return (
        <div>
          <div
            className={`w-full h-full flex justify-center items-center px-[5px] `}
          >
            {/* Left Navigate button */}
            <button
              className="mr-[40px] text-[20px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
              onClick={() => setActiveChart((activeChart - 1 + 3) % 3)}
            >
              {/* &#8592; */}
              &lt;
            </button>
            <div
              className={`chart-transition ${
                activeChart === 0 ? "active" : ""
              }`}
            >
              {activeChart === 0 && (
                <CLineChart
                  width={mobileWidth}
                  height={mobileHeight}
                  fontSize={chartFontSize}
                  isFullWidth={false}
                />
              )}
            </div>
            <div
              className={`chart-transition ${
                activeChart === 1 ? "active" : ""
              }`}
            >
              {activeChart === 1 && (
                <CScatterChart
                  width={mobileWidth}
                  height={mobileHeight}
                  fontSize={chartFontSize}
                  isFullWidth={false}
                />
              )}
            </div>
            <div
              className={`chart-transition ${
                activeChart === 2 ? "active" : ""
              }`}
            >
              {activeChart === 2 && (
                <CStackedBarChart
                  width={mobileWidth}
                  height={mobileHeight}
                  fontSize={chartFontSize}
                  isFullWidth={false}
                />
              )}
            </div>
            {/* Right Navigate Button */}
            <button
              className="ml-[40px] text-[20px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
              onClick={() => setActiveChart((activeChart + 1) % 3)}
            >
              {/* &#8594; */}
              &gt;
            </button>
          </div>
        </div>
      );
    case "highlight":
      return (
        <div className="flex justify-center items-center mt-[30px]">
          <div className="w-[300px] h-[100px] border-[1px] border-[#1e1835] bg-[#000408] rounded-md grid grid-cols-3 justify-center items-center pl-[15px]">
            <div className="flex flex-col ">
              <p className="text-[11px] text-[#A6A1C0]">Price</p>
              <p className="text-[12px] text-white">$9,542.39</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-[11px] text-[#A6A1C0]">Price</p>
              <p className="text-[12px] text-white">$9,542.39</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-[11px] text-[#A6A1C0]">Price</p>
              <p className="text-[12px] text-white">$9,542.39</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-[11px] text-[#A6A1C0]">Price</p>
              <p className="text-[12px] text-white">$9,542.39</p>
            </div>
            <div className="flex flex-col ">
              <p className="text-[11px] text-[#A6A1C0]">Price</p>
              <p className="text-[12px] text-white">$9,542.39</p>
            </div>
          </div>
        </div>
      );

    case "categories":
      return (
        <div>
          <div className="w-[90%] mx-auto px-[10px] h-[160px] border-[1px] border-[#1e1835] bg-[#000408]  rounded-md">
            <Data2 />
          </div>
        </div>
      );

    case "date":
      return (
        <div>
          
          <div className=" w-[70%] mt-[100px] mx-auto  flex justify-center h-auto border-[1px] border-[#1e1835] bg-[#000408] rounded-md  items-center">
            <Dates3 fontSize={"11px"}  />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default TabContent;
