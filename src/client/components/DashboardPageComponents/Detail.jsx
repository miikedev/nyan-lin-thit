import React from "react";

const Detail = ({name,number,layout}) => {
	return (
		<>
			<div className={`
        ${layout === true 
          ? "w-full 2xl:h-[150px] h-[58px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-around items-center" 
          : "w-full h-[25%] max-md:w-[320px] max-md:h-[100px] lg:max-xl:h-[120px]   border-[1px] border-[#e6e6e6] bg-white  rounded-md grid grid-cols-3 justify-center items-center pl-[25px]"
        }
      `}>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Total</p>
					<p className={`text-[${number}] text-black font-bold`}>1000</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Case/day</p>
					<p className={`text-[${number}] text-red-500 font-bold`}>10</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Death</p>
					<p className={`text-[${number}] text-black font-bold`}>1023</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>30DAY%change</p>
					<p className={`text-[${number}] text-green-500 font-bold`}>1.64%</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>24hr</p>
					<p className={`text-[${number}] text-black font-bold`}>5</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Arresting Rate</p>
					<p className={`text-[${number}] text-green-500 font-bold`}>1.64%</p>
				</div>
				
				
			</div>
		</>
	);
};

export default Detail;
