import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dates.css";
import CalendarIcon from "../DashboardPageComponents/assets2/calendar.svg";

const Dates = ({fontSize}) => {
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
    <div className=" w-full px-[30px] flex justify-center gap-[40px] 2xl:justify-evenly items-center">
      
      <div className="mb-[10px] w-[100px] ">
        <div className={`mb-[10px] text-[${fontSize}] text-black `}>Start Date</div>
        <div className="w-full flex gap-[15px] justify-between items-center">
          <img src={CalendarIcon} className="w-[20px] h-[20px] text-white" />

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
              {/* <div className="w-[1px] h-full bg-white "></div> */}
      <div className="mb-[10px] w-[100px]">
        <h3 className={`mb-[10px] text-[${fontSize}] text-black`} >End Date</h3>
        <div className="w-full flex gap-[15px] justify-between items-center">
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

export default Dates;
