import { Grid } from "@mantine/core";
import DatePicker from "react-datepicker";
import { useSearchParams } from "react-router-dom";

import CalendarIcon from "../DashboardPageComponents/assets2/calendar.svg";

import "./Dates.css";
import "react-datepicker/dist/react-datepicker.css";

const Dates = ({fontSize, startDate, setStartDate, setEndDate, endDate}) => {
  const [params, setSearchParams] = useSearchParams();
  const currentYear = new Date().getFullYear();
  
  const years = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - (currentYear - 2021 - i)
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchParams({});
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const newParams = {
      ...Object.fromEntries(params),
      start_date: date ? new Date(date).toLocaleDateString("en-CA") : "",
    };
    setSearchParams(newParams);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    const newParams = {
      ...Object.fromEntries(params),
      end_date: date ? new Date(date).toLocaleDateString("en-CA") : "",
    };
    setSearchParams(newParams);
  };

  return (
    <div className="w-full px-[20px] flex flex-col rounded-md bg-white">
      <div className="flex justify-end cursor-pointer relative left-5" onClick={handleReset}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 scale-75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
      <Grid>
        <Grid.Col span={6}>
          <div className="mb-[10px] rounded-md">
            <h3 className="mb-[10px] text-black font-poppins">Start Date</h3>
            <div className="w-full flex gap-[15px] justify-start items-center">
              <img src={CalendarIcon} className="w-[20px] h-[20px]" alt="calendar icon" />
              <DatePicker
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                  <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                    <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                      {years.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                      {months.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{">"}</button>
                  </div>
                )}
                selected={startDate}
                onChange={(date)=>handleStartDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                className="custom-input placeholder:font-medium"
                placeholderText="Add Date"
              />
            </div>
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <div className="mb-[10px] rounded-md">
            <h3 className="mb-[10px] text-black font-poppins">End Date</h3>
            <div className="w-full flex gap-[15px] justify-start items-center">
              <img src={CalendarIcon} className="w-[20px] h-[20px]" alt="calendar icon" />
              <DatePicker
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                  <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                    <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                      {years.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                      {months.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{">"}</button>
                  </div>
                )}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                selected={endDate}
                onChange={(date)=>handleEndDateChange(date  )}
                dateFormat="dd/MM/yyyy"
                className="custom-input relative"
                placeholderText="Add Date"
              />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Dates;
