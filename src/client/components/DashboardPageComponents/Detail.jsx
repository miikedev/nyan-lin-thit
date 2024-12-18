import React from "react";

const Detail = ({name,number,layout,data}) => {
	return (
		<>
			<div className={`
				${layout === true 
				? "w-full min-h-[150px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex flex-wrap justify-start items-center xl:gap-x-[24px] xl:gap-y-[14px] xl:p-5 relative" 
				: "w-full h-[140px] py-[30px] max-md:w-[320px] max-md:h-[100px] lg:max-xl:h-[120px] border-[1px] border-[#e6e6e6] bg-white rounded-md grid grid-cols-3 justify-center items-center pl-[25px]"
				}
			`}>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Total incident</p>
					<p className={`text-[${number}] text-black font-bold`}>{data?.total}</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Case/day</p>
					<p className={`text-[${number}] text-red-500 font-bold`}>{data?.caseday}</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Airstrike/day</p>
					<p className={`text-[${number}] text-black font-bold`}>{data?.death}</p>
				</div>
				{/* <div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>30DAY%change</p>
					<p className={`text-[${number}] text-green-500 font-bold`}>{data?.monthlypercent}</p>
				</div> */}
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Civilian death/day</p>
					<p className={`text-[${number}] text-black font-bold`}>{data?.daily}</p>
				</div>
				<div className="flex flex-col ">
					<p className={`text-[${name}] text-[#A6A1C0]`}>Arrest/day</p>
					<p className={`text-[${number}] text-green-500 font-bold`}>100</p>
					{/* {data?.arrestingrate} */}
				</div>
			</div>
		</>
	);
};

export default Detail;
