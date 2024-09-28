import { useState } from "react";

import { useDashboardFilterContext } from "../../context/DashboardFilterContext";
import L1 from '../DashboardPageComponents/assets2/airStrike.svg';
import L2 from "../DashboardPageComponents/assets2/armed.svg";
import L5 from "../DashboardPageComponents/assets2/arrest.svg";
import L4 from "../DashboardPageComponents/assets2/casualty.svg";
import L3 from "../DashboardPageComponents/assets2/massacre.svg";
import { Stack, Box, Text, Button } from "@mantine/core";
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
    <Box className="p-[20px] w-full">
      <Stack className="w-full" align="stretch" bg="transparent">
        <Box className="flex justify-between text-[14px] w-full">
          <Text className="">filter by</Text>
          <Box className="text-[14px]">
            {isAllSelected && (
              <button
                className="text-black hover:text-blue-500"
                onClick={handleClearAll}
              >
                <Text>clear all</Text>
              </button>
            ) 
            // : (
            //   <button
            //     className="text-black hover:text-blue-500"
            //     onClick={handleSelectAll}
            //   >
            //     select all
            //   </button>
            // )
            }
          </Box>
        </Box>
        <Stack>
        {data.map(({ id, name, number, logo }) => (
          <Button
            bg={filterParams.some((d) => d.id === id) ? "#A2CBFE" : "#e6e6e6"}
            key={id}
            className={`w-full cursor-pointer`}
            onClick={() => handleDataClick({ id, name, number, logo })}
          >
            <div className="flex w-full justify-between text-[#212121]">
              <Box className="flex">
                <img src={logo} alt="logo" className="w-[15px] h-[15px]" />
                <Text className="text-[13px] 2xl:text-[12px]" size="xs">{name.toLowerCase()}</Text>
              </Box>
              <Text className="text-[13px] 2xl:text-[12px]" size="xs">{number} {number>1 ? 'cases': 'case'}</Text>
            </div>
          </Button>
        ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Data;

