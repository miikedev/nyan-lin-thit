import { Box } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import calendar from "../../../assets/ic_date.svg";

const DisplayDate1 = ({timeSpan: defaultTimeSpan}) => {
  const [params] = useSearchParams();
  const startDate = params.get("start_date");
  const endDate = params.get("end_date");

  // Format the time span for display
  const timeSpan = startDate && endDate ? `${startDate} - ${endDate}` : defaultTimeSpan;

  return (
    <Box className="mb-[7px] bg-[#ffff] border w-auto py-3 lg:w-72 rounded-md px-3 flex items-center">
      <img
        src={calendar}
        className="w-[12px] h-[12px] 2xl:w-[20px] 2xl:h-[20px] text-white"
        alt="calendar"
      />
      <p className="text-black text-[16px] ml-[16px] openSans-400 font-semibold">
        {timeSpan}
      </p>
    </Box>
  );
};

export default DisplayDate1;