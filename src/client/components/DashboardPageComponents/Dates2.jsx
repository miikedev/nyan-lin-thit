import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dates.css";
import CalendarIcon from "../DashboardPageComponents/assets2/calendar.svg";
import { useDashboardDateContext } from "../../context/DashboardDateContext";

const Dates2 = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDashboardDateContext();
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

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

  console.log('startDate: ' + startDate)
  console.log('endDate: ' + endDate)
  return (
    <div className="w-[251px] px-[5px] h-full  flex flex-col gap-[10px]  justify-center items-center">
      <div className="mb-[10px] w-[100px] h-[50%] flex flex-col justify-center items-center">
        <h3 className="mb-[10px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] text-[#DCDCDC] ">Start Date</h3>
        <div className="w-full flex justify-center items-center">
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
            onChange={(date) => setStartDate(new Date(date).toLocaleDateString('en-CA'))}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            className="custom-input"
            placeholderText="Add dates"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-white "></div>

      <div className="mb-[10px] w-[100px] h-[50%] flex flex-col justify-center items-center">
        <h3 className="mb-[10px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] text-[#DCDCDC] ">End Date</h3>
        <div className="w-full flex justify-center items-center">
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
            onChange={(date) => setEndDate(new Date(date).toLocaleDateString('en-CA'))}
            className="custom-input"
            placeholderText="Add dates"
          />
        </div>
      </div>
    </div>
  );
};

export default Dates2;