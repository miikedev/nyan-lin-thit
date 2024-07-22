import React, { useState } from "react";

import L1 from '../DashboardPageComponents/assets2/airStrike.svg';
import L2 from "../DashboardPageComponents/assets2/armed.svg";
import L3 from "../DashboardPageComponents/assets2/massacre.svg";
import L4 from "../DashboardPageComponents/assets2/casualty.svg";
import L5 from "../DashboardPageComponents/assets2/arrest.svg";
import { useDashboardFilterContext } from "../../context/DashboardFilterContext";

const Data = ({details, dataAll, dataResult, setDataResult}) => {
  const data = [
  { id: 1, logo: L1, name: "Airstrike", number: details.airstrike , param : 'airstrike'},
  { id: 2, logo: L2, name: "Armed Clashes", number: details.armed_clashes , param : 'armed_clashes'},
  { id: 3, logo: L3, name: "Massacre", number: details.massacre , param : 'massacre'},
  { id: 4, logo: L4, name: "Casualty", number: details.casualties , param : 'casualties'},
  { id: 5, logo: L5, name: "Arrest", number: details.arrests , param : 'arrests'},
];
  const [selectedData, setSelectedData] = useState([]);
  const { filteredData, setFilteredData, filterParams, setFilterParams } = useDashboardFilterContext()
  const handleDataClick = (data, dataResult, setDataResult) => {
    setFilterParams((prevSelectedData) => {
      if (prevSelectedData.some((d) => d.id === data.id)) {
        return prevSelectedData.filter((d) => d.id !== data.id);
      } else {
        return [...prevSelectedData, data];
      }
      
    });
  };

  const handleSelectAll = () => {
    setFilterParams(data);
  };

  const handleClearAll = () => {
    setFilterParams([]);
  };

  

  const isAllSelected = data.every((d) =>
    filterParams.some((sd) => sd.id === d.id)
  );

  return (
    <>
      {/* Datas */}
      <div className=" w-full h-full  flex flex-col justify-center items-center px-[10px] py-[15px] gap-[5px]">
        <div className="w-full h-full flex justify-between text-[14px] px-[7px]">
          <div className=" text-black 2xl:text-[18px] text-left">Filter By</div>
          <div className="2xl:text-[18px]">
            {isAllSelected ? (
              <button
                className="text-black hover:text-blue-500"
                onClick={handleClearAll}
              >
                clear all
              </button>
            ) : (
              <button
                className="text-black hover:text-blue-500"
                onClick={handleSelectAll}
              >
                select all
              </button>
            )}
          </div>
        </div>
        {data.map(({ id, name, number, logo }) => (
          <div
            key={id}
            className={`w-full h-full cursor-pointer border-[1px] border-[#e6e6e6] flex justify-between items-center py-[5px] px-[7px] rounded-md ${
              filterParams.some((d) => d.id === id) ? "bg-[#0f007b] text-white " : "bg-[#e6e6e6] text-black"
            }`}
            onClick={() => handleDataClick({ id, name, number, logo })}
          >
            <div>
              <img src={logo} alt="logo" className="w-[15px] h-[15px] 2xl:w-[18px] 2xl:h-[18px]" />
            </div>
            <div className="text-[13px] 2xl:text-[15px] text-left ">{name}</div>
            <div className="text-[13px] 2xl:text-[15px] text-left ">{number} Cases</div>
            {/* <button
              className="text-white text-[13px]"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedData.some((d) => d.id === id) ? "×" : "✓"}
            </button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Data;

