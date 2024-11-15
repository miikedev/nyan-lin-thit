import React, { useState } from "react";
import DatePicker from "react-datepicker";

import CalendarIcon from "../DashboardPageComponents/assets2/calendar.svg";

import "./Dates.css";
import "react-datepicker/dist/react-datepicker.css";

const Dates3 = ({fontSize}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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


  return (
    <div className=" w-full gap-[5px] flex  justify-center items-center">
      {/* reset icon   */}
      

      <div className="mb-[10px] w-[100px] ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <div className={`mb-[10px] pt-[5px] text-[${fontSize}] text-black `}>Start Date</div>
        <div className="w-full flex gap-[5px] justify-between items-center">
          <img src={CalendarIcon} className="w-[20px] h-[20px] text-black" />
          <DatePicker
             renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            className="custom-input"
            placeholderText="Add dates"
          />
        </div>
      </div>
              
      <div className="mb-[10px] w-[100px]">
        <h3 className={`mb-[10px] pt-[5px] text-[${fontSize}] text-black`} >End Date</h3>
        <div className="w-full flex gap-[5px] justify-between items-center">
          <img src={CalendarIcon} className="w-[20px] h-[20px]" />

          <DatePicker
             renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
            dateFormat="dd/MM/yyyy"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="custom-input"
          
            placeholderText="Add dates"
            
          />
        </div>
      </div>
    </div>
  );
};

export default Dates3;
