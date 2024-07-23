import React, { useEffect, useState, useMemo } from "react";

import TextSectionCard from "../components/DashboardPageComponents/TextSectionCard";

import DataMap3 from "../components/DashboardPageComponents/DataMap3";

// Icons
import Cicon from "../components/DashboardPageComponents/assets2/calendar.svg";
import M from "../components/DashboardPageComponents/assets2/map.svg";
import Data from "../components/DashboardPageComponents/Data";
import Data2 from "../components/DashboardPageComponents/Data2";
import Max from "../components/DashboardPageComponents/assets2/maximize.svg";
import Min from "../components/DashboardPageComponents/assets2/minimize.svg";
import L from "../components/DashboardPageComponents/assets2/left-arrow.svg";
import R from "../components/DashboardPageComponents/assets2/right-arrow.svg";
import L1 from '../components/DashboardPageComponents/assets2/1st-layout.svg';
import L2 from '../components/DashboardPageComponents/assets2/2nd-layout.svg';




import Dates from "../components/DashboardPageComponents/Dates";
import Dates2 from "../components/DashboardPageComponents/Dates2";

import TextSectionCard2 from "../components/DashboardPageComponents/TextSectionCard2";
import Detail from "../components/DashboardPageComponents/Detail";


// Tab Section
import Tab from "../components/DashboardPageComponents/Tab";
import TabContent from "../components/DashboardPageComponents/TabContent";
import CLineChart from "../components/DashboardPageComponents/CLineChart";
import CScatterChart from "../components/DashboardPageComponents/CScatterChart";
import CStackedBarChart from "../components/DashboardPageComponents/CStackedBarChart";
import CLineChartStacked from "../components/DashboardPageComponents/CLineChartStacked";

import { useDashboardData } from "../apis/dashboardData";
import { useDashboardDateContext } from "../context/DashboardDateContext";
import { useDashboardFilterContext } from "../context/DashboardFilterContext";
import { useDashboardDataContext } from "../context/DashboardDataContext";
// import { px } from "framer-motion";
import Loading from '../pages/Loading'
const caseName = {
	1: 'airstrike',
	2: 'armed_clashes',
    3:	'massacre',
    4: 'casualties',
    5: 'arrests',
}
const Dashboard = () => {
	const { setFilteredData, filterParams } = useDashboardFilterContext();  
    const { dataResult, setDataResult } = useDashboardDataContext();  
	const date = useDashboardDateContext();
    const resultedParamId = useMemo(() => filterParams.map(param => param.id), [filterParams]);  
    const resultedParamNames = useMemo(() => resultedParamId.map(id => caseName[id] || ""), [resultedParamId]);  
    const paramString = resultedParamNames.join(",");   

    const [news, setNews] = useState([]);  
    const [townships, setTownships] = useState([]);  
    const [details, setDetails] = useState([]);  

    const { data, isLoading, isSuccess, isError } = useDashboardData(date);  
	console.log('fetched data', data)
    const [activeTab, setActiveTab] = useState("chart");  
    const [activeChart, setActiveChart] = useState(0); // 0, 1, or 2 for the three charts  
    const [isFullWidth, setIsFullWidth] = useState(false);  
    const [isDefaultLayout, setIsDefaultLayout] = useState(true);  

    // Chart Sizes  
    const [ipadChartWidth, setIpadChartWidth] = useState(235);  
    const [ipadChartHeight, setIpadChartHeight] = useState(230);  
    const [ipadChartWidthTwo, setIpadChartWidthTwo] = useState(690);  
    const [ipadChartHeightTwo, setIpadChartHeightTwo] = useState(230);  
    const [smallChartWidth, setSmallChartWidth] = useState(300);  
    const [smallChartHeight, setSmallChartHeight] = useState(220);  
    const [smallChartWidthTwo, setSmallChartWidthTwo] = useState(330);  
    const [smallChartHeightTwo, setSmallChartHeightTwo] = useState(220);  
    const [mediumChartWidth, setMediumChartWidth] = useState(820);  
    const [mediumChartHeight, setMediumChartHeight] = useState(250);  
    const [fullChartWidth, setFullChartWidth] = useState(1200);  
    const [fullChartHeight, setFullChartHeight] = useState(250);  

    const detailNameForLarge = '14px';  
    const detailNumberForLarge = '13px';  
    const detailNameForMedium = '12px';  
    const detailNumberForMedium = '12px';  
    const detailNameForSmall = '11px';  
    const detailNumberForSmall = '12px';  

    // Effect to handle news and townships data  
    useEffect(() => {  
        if (isSuccess && data) {  
            setNews(data.news || []);  
            setTownships(data.town_ships || []);  
            setDetails({  
                total: data.total || 0,  
                caseday: data.caseday || 0,  
                death: data.death || 0,  
                monthlypercent: data.monthlypercent || 0,  
                daily: data.daily || 0,  
                arrestingrate: data.arrestingrate || 0,  
                airstrike: data.airstrike || 0,  
                armed_clashes: data.armed_clashes || 0,  
                massacre: data.massacre || 0,  
                casualties: data.casualties || 0,  
                arrests: data.arrests || 0  
            });  
        }  
    }, [isSuccess, data]);  
	console.log('dataResult', data)
    // console.log('Filtered Details:', details);  
	// console.log('resulted param names', resultedParamNames)
    // console.log('News:', news);  
    // console.log('Townships:', townships);  
    const timeSpan = new Date(data?.earliestDate).toLocaleDateString('en-CA') + ' - ' + new Date(data?.latestDate).toLocaleDateString('en-CA');  
	
    const handleChartClick = (chartIndex) => {  
        setActiveChart(chartIndex);  
        setIsFullWidth(!isFullWidth);  
    };  

    const handleTabChange = (tab) => {  
        setActiveTab(tab);  
    };
	useEffect(() => {  
        if (isSuccess) {  
            filterDataWithParams(townships, resultedParamNames);  
        }  
    }, [resultedParamNames, isSuccess, townships]);  

	const filterDataWithParams = (data, resultedParamNames) => {  
        // Check if resultedParamNames is an empty array  
        if (!resultedParamNames || resultedParamNames.length === 0) {  
            // Return all data if resultedParamNames is empty  
            if (dataResult !== data) {  
                setDataResult(data);  
            }  
            return;  
        }  

        // Filter data based on resultedParamNames when it's not empty  
        const filteredData = data.filter(item =>  
            resultedParamNames.includes(item.case_type?.name)  
        );  

        // Only set filtered data if it's different  
        if (JSON.stringify(filteredData) !== JSON.stringify(dataResult)) {  
            setDataResult(filteredData);  
        }  
    }; 

    // console.log('data result', dataResult);  

	if(isLoading) return <Loading />
	if(isSuccess && data && data.length !== 0) return (
			<section className="bg-[#dedede]   pr-[10px] pl-[10px] pb-[10px] w-full h-auto">
				{/*Mobile Phone Size */}
				<div className=" md:hidden mt-[25px] bg-white">
					{/* Top Section */}
					<div className=" md:hidden w-full h-[200px] flex flex-col justify-between items-center pt-[3px]">
						<div className=" bg-[#e6e6e6] border-[#737373] rounded-[8px] gap-[5px] w-[80%] h-[30px]  px-4 py-[2px] flex  justify-center items-center">
							<Tab
								active={activeTab === "chart"}
								onClick={() => handleTabChange("chart")}
							>
								Chart
							</Tab>
							<Tab
								active={activeTab === "highlight"}
								onClick={() => handleTabChange("highlight")}
							>
								Highlight
							</Tab>
							<Tab
								active={activeTab === "categories"}
								onClick={() => handleTabChange("categories")}
							>
								Categories
							</Tab>
							<Tab
								active={activeTab === "date"}
								onClick={() => handleTabChange("date")}
							>
								Date
							</Tab>
						</div>
						<div className=" w-full h-full mt-[10px]">
							<TabContent active={activeTab} />
						</div>
					</div>
					{/* Bottom Section */}
					<div className=" md:hidden bg-white  mt-[30px] px-[5px] mx-auto w-full  h-[420px]">
						<DataMap3 width={"full"} height={"420px"} />
					</div>
				</div>

				{/*Vertical Tablet Sizes */}
				<div className="  lg:hidden ">
					<div className="max-md:hidden py-[10px]  w-full flex flex-col justify-center items-center">
						{/* Top Container */}

						<div
							className={`relative bg-white w-full h-[260px] rounded-md flex justify-center items-center gap-[10px] py-[20px] mb-[10px]`}
						>
							{!isFullWidth && (
								<>
									{/*1 container */}
									<div
										className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center"
										onClick={() => handleChartClick(0)}
									>
										{/* <SimpleLineChart
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
										<CLineChart
										width={ipadChartWidth}
										height={smallChartHeightTwo}
										/>
									</div>
									<div className="w-[1px] h-full bg-[#4d5eb2]">---</div>
									{/*2 container */}
									<div
										className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
										onClick={() => handleChartClick(1)}
									>
										{/* <ScatterChartComponent
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
										<CLineChartStacked
										    dataResult={dataResult}
										width={ipadChartWidth}
										height={smallChartHeightTwo}
										/>
									</div>
									<div className="w-[1px]  h-full bg-[#4d5eb2]">---</div>
									{/* 3 container */}
									<div
										className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
										onClick={() => handleChartClick(2)}
									>
										{/* <StackedBarChart
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
										{isSuccess && <CStackedBarChart
										   dataResult={dataResult}
										width={ipadChartWidth}
										height={smallChartHeightTwo}
										/>}
									</div>
								</>
							)}
							{isFullWidth && (
								<>
									<div className="w-full h-[230px] flex justify-center items-center p-[10px]">
										{/* Left Navigate button */}
										<button
											className="mr-[30px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
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
											{activeChart === 0 && isSuccess && (
												// <SimpleLineChart
												// 	width={ipadChartWidthTwo}
												// 	height={fullChartHeight}
												// 	fontSize={chartFontSize}
												// 	isFullWidth={true}
												// />
												<CLineChart
												width={ipadChartWidthTwo}
												height={fullChartHeight}
												/>
											)}
										</div>
										<div
											className={`chart-transition ${
												activeChart === 1 ? "active" : ""
											}`}
										>
											{activeChart === 1 && (
												// <ScatterChartComponent
												// 	width={ipadChartWidthTwo}
												// 	height={fullChartHeight}
												// 	fontSize={chartFontSize}
												// 	isFullWidth={true}
												// />
												<CLineChartStacked
												    dataResult={dataResult}
													width={ipadChartWidthTwo}
													height={fullChartHeight}
												/>
											)}
										</div>
										<div
											className={`chart-transition ${
												activeChart === 2 ? "active" : ""
											}`}
										>
											{isSuccess && activeChart === 2 && (
												// <StackedBarChart
												// 	width={ipadChartWidthTwo}
												// 	height={fullChartHeight}
												// 	fontSize={chartFontSize}
												// 	isFullWidth={true}
												// />
												<CStackedBarChart
												dataResult={dataResult}
												width={ipadChartWidthTwo}
												height={fullChartHeight}
												/>
											)}
										</div>
										{/* Right Navigate Button */}
										<button
											className="ml-[30px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
											onClick={() => setActiveChart((activeChart + 1) % 3)}
										>
											{/* &#8594; */}
											&gt;
										</button>
									</div>
									<div className="hidden">
										<button
											onClick={() => setActiveChart((activeChart - 1 + 3) % 3)}
											className="slide-nav-arrow left "
										>
											{/* &lt; */}
											<img src={L} className="w-[25px] h-[25px]" />
										</button>

										<button
											onClick={() => setActiveChart((activeChart + 1) % 3)}
											className="slide-nav-arrow right"
										>
											{/* &gt; */}
											<img src={R} className="w-[25px] h-[25px]" />
										</button>
									</div>
								</>
							)}
							<button
								className="absolute bottom-0  right-0 w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
								onClick={() => setIsFullWidth(!isFullWidth)}
							>
								{isFullWidth ? (
									<img src={Min} className="w-[25px] h-[25px]" />
								) : (
									<img src={Max} className="w-[25px] h-[25px]" />
								)}
							</button>
						</div>

						{/* Bottom Parent Container */}
						<div className=" w-full flex flex-col justify-center items-center">
							{/*Bottom Left Container */}

							{/* i-pads and tablet sizes */}
							{/* <div className="bg-[#161616] hidden md:block w-[716px] h-[520px]">
				<DataMap3 width={"716px"} height={"520px"} />
				</div> */}

							{/* i-phones and phones sizes */}
							{/* <div className="bg-[#161616] block max-[424px]:hidden md:hidden w-[410px] h-[640px]">
				<DataMap3 width={"410px"} height={"640px"} />
				</div> */}

							{/* <div className="bg-[#161616] block min-[424px]:hidden w-[350px] h-[640px]">
				<DataMap3 width={"350px"} height={"640px"} />
				</div> */}

							{/* Map */}
							<div className="mt-[10px] bg-white w-full h-[523px]">
								<DataMap3 width={"full"} height={"523px"} />
							</div>
							{/*Under Right Container  */}
							<div className="bg-white w-full h-[393px] flex items-center rounded-md px-[20px] py-[10px]">
								<div className="w-full h-[360px] bg-[#e6e6e6] rounded flex justify-between items-center py-[20px] ">
									{/* Inner Left Container */}
									<div className="w-2/5  flex flex-col gap-[16px]   pl-[20px]">
										<div className="flex items-center justify-between mr-1">
											<h2 className="text-black font-bold">Myanmar</h2>
											{/* <div className=" flex justify-end p-0">
							<button
							className={`p-1 rounded mr-2 ${
								isDefaultLayout
								? "bg-blue-500 text-white"
								: "bg-gray-300"
							}`}
							onClick={() => setIsDefaultLayout(true)}
							>
							L1
							</button>
							<button
							className={`p-1 rounded ${
								isDefaultLayout
								? "bg-gray-300"
								: "bg-blue-500 text-white"
							}`}
							onClick={() => setIsDefaultLayout(false)}
							>
							L2
							</button>
						</div> */}
										</div>
										<div className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
											<img src={Cicon} className="w-[15px] h-[15px] text-white" />
											<p className="text-black text-[12px] ml-[16px]">
												{ timeSpan }
											</p>
										</div>

										<div className="flex items-center mb-[7px]">
											<img src={M} className="w-[15px] h-[15px] text-black" />
											<p className="text-black text-[11px] ml-[10px]">
												{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
											</p>
										</div>

										{/* <div className="text-[#7EADE3] w-[274px] h-[183px] bg-[#303d4c] px-[20px] py-[7px]">
						<p className="font-[700] mb-[7px]">
							The massacre of the military group
						</p>
						<p className="text-[11px]">
							Between September and December 2023, the military group
							committed at least (37) mass killings in which five (5)
							or more people were killed, and a total of (283)
							civilians were killed.2021 From February 2023 As of
							December, the military group has committed at least
							(210){" "}
						</p>
						</div> */}
										<div>
											{isSuccess && data && <TextSectionCard data={news} />}
										</div>
									</div>

									{/* Vertical Dashed Line */}
									<div className="relative w-[1px] h-full bg-gray-300">
										<div className="absolute  h-full border-dashed border-gray-300"></div>
									</div>

									{/* Inner Right Container */}
									<div className="w-3/5 flex flex-col  gap-[16px]   px-[20px] ">
										{/* top */}
										{/* <div className="lg:w-[360px] xl:w-[444px] h-[58px] border-[1px] border-[#1e1835] bg-[#000000] rounded-md flex justify-around items-center">
											<div className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</div>
											<div className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</div>
											<div className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</div>
											<div className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</div>
											<div className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</div>
										</div> */}
										{
											isSuccess && <Detail layout={true} name={detailNameForMedium} number = {detailNumberForMedium} data={details} />
										}

										{/* Horizontal Dashed Line */}
										<div className="relative h-[1px] mt-[10px] bg-gray-300">
											<div className="absolute w-full h-[1px] border-dashed border-gray-300"></div>
										</div>

										{/* bottom  */}
										<div className="flex  items-center mt-[10px] gap-[10px]">
											<div className="w-[65%] h-[220px] border-[1px] border-[#e6e6e6] bg-white flex items-center  rounded-md">
												{isLoading && <h1>loading...</h1>}
												{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
											</div>
											<div className="w-[35%] h-[220px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
												<Dates2 />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Horizontal Tablet Sizes */}
				<div className="xl:hidden max-lg:hidden w-full h-full flex justify-center gap-[20px]">
					{isDefaultLayout ? (
						<>
							{/* Left Container */}
							<div className="w-[370px] ">
								<div className="bg-white  w-[370px] h-[640px] ">
									<DataMap3 width={"370px"} height={"640px"} />
								</div>
							</div>
							{/* Parent Right Container */}
							<div className=" w-[735px]">
								{/*Top Right Container */}
								<div
									className={`relative p-[5px] bg-white w-full h-[240px] rounded-md flex justify-center items-center  mb-[10px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<div
												className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center"
												onClick={() => handleChartClick(0)}
											>
												{/* <SimpleLineChart
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												<CLineChart 
												dataResult={dataResult}
												width={ipadChartWidth}
												height = {ipadChartHeight}
												/>
											</div>
											<div className="w-[1px] h-full bg-[#4d5eb2]">---</div>
											{/*2 container */}
											<div
												className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
												{/* <ScatterChartComponent
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												<CLineChartStacked
												    dataResult={dataResult}
													width ={ipadChartWidth}
													height = {ipadChartHeight}
												/>
											</div>
											<div className="w-[1px] h-full bg-[#4d5eb2]">---</div>
											{/* 3 container */}
											<div
												className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
												{/* <StackedBarChart
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												{isSuccess && <CStackedBarChart
												   dataResult={dataResult}
												width={ipadChartWidth}
												height = {ipadChartHeight}
												/>}
											</div>
										</>
									)}
									{isFullWidth && (
										<>
											<div className="w-[735px] h-full flex justify-center items-center px-[10px]">
												{/* Left Navigate button */}
												<button
													className="text-[25px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() =>
														setActiveChart((activeChart - 1 + 3) % 3)
													}
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
														// <SimpleLineChart
														// 	width={ipadChartWidthTwo}
														// 	height={mediumChartHeight}
														// 	fontSize={chartFontSize}
														// 	isFullWidth={true}
														// />
														<CLineChart 
															dataResult={dataResult}
															width={ipadChartWidthTwo}
															height = {mediumChartHeight}
															/>
													)}
												</div>
												<div
													className={`chart-transition ${
														activeChart === 1 ? "active" : ""
													}`}
												>
													{activeChart === 1 && (
														<CLineChartStacked
														    dataResult={dataResult}
															width={ipadChartWidthTwo}
															height={mediumChartHeight}
														/>
													)}
												</div>
												<div
													className={`chart-transition ${
														activeChart === 2 ? "active" : ""
													}`}
												>
													{isSuccess && activeChart === 2 && (
														<CStackedBarChart
															dataResult={dataResult}
															width={ipadChartWidthTwo}
															height = {mediumChartHeight}
														/>
													)}
												</div>
												{/* Right Navigate Button */}
												<button
													className="text-[25px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
													&gt;
												</button>
											</div>
										</>
									)}
									<button
										className="absolute bottom-0  right-[2px] w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
										onClick={() => setIsFullWidth(!isFullWidth)}
									>
										{isFullWidth ? (
											<img src={Min} className="w-[25px] h-[25px]" />
										) : (
											<img src={Max} className="w-[25px] h-[25px]" />
										)}
									</button>
								</div>

								{/*Under Right Container  */}
								<div className="bg-white w-full h-[393px] flex items-center rounded-md px-[20px] py-[10px]">
									<div className="w-full h-[360px] bg-[#e6e6e6] rounded flex justify-between items-center py-[20px] ">
										{/* Inner Left Container */}
										<div className="w-2/5  flex flex-col gap-[16px]   pl-[20px]">
											<div className="flex items-center justify-between mr-1">
												<h2 className="text-black font-bold">Myanmar</h2>
												<div className=" flex justify-end gap-[12px] p-0">
													<button
													
													>
															<img src={L1} 	className={`   ${
																isDefaultLayout
																	? "bg-blue-500 "
																	: "bg-white"
															} w-[25px] h-[25px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(true)}/>
													</button>
													<button
													
													>
													<img src={L2} className={` ${
																isDefaultLayout
																	? "bg-white"
																	: "bg-blue-500"
															} w-[25px] h-[25px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(false)}/>
													</button>
												</div>
											</div>
											<div className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
												<img
													src={Cicon}
													className="w-[15px] h-[15px] text-black"
												/>
												<p className="text-black text-[12px] ml-[16px]">
													{ timeSpan }
												</p>
											</div>

											<div className="flex items-center mb-[7px]">
												<img src={M} className="w-[15px] h-[15px] text-white" />
												<p className="text-black text-[11px] ml-[10px]">
													{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
												</p>
											</div>

											
											<div>
												{isSuccess && data && <TextSectionCard data={news} />}
											</div>
										</div>

										{/* Vertical Dashed Line */}
										<div className="relative w-[1px] h-full bg-gray-300">
											<div className="absolute  h-full border-dashed border-gray-300"></div>
										</div>

										{/* Inner Right Container */}
										<div className="w-3/5 flex flex-col  gap-[16px]   px-[20px] ">
											{/* top */}
											{/* <div className="lg:w-[360px] xl:w-[444px] h-[58px] border-[1px] border-[#1e1835] bg-[#000000] rounded-md flex justify-around items-center">
												<div className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</div>
												<div className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</div>
												<div className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</div>
												<div className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</div>
												<div className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</div>
											</div> */}
												{
													isSuccess && <Detail layout={true} name={detailNameForMedium} number = {detailNumberForMedium} data={details} />
												}

											{/* Horizontal Dashed Line */}
											<div className="relative h-[1px] mt-[10px] bg-gray-300">
												<div className="absolute w-full h-[1px] border-dashed border-gray-300"></div>
											</div>

											{/* bottom  */}
											<div className="flex  items-center mt-[10px] gap-[10px]">
												<div className="w-[264px] h-[220px] border-[1px] border-[#e6e6e6] bg-white flex items-center  rounded-md">
													{isLoading && <h1>loading...</h1>}
													{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
												</div>
												<div className="w-[170px] h-[220px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
													<Dates2 />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							{/* Parent Container */}
							<div className="max-w-[1133px] flex flex-col justify-center items-center">
								{/* Top Container */}

								<div
									className={`relative bg-white w-full h-[232px] rounded-md flex justify-center items-center gap-[5px] p-[5px] mb-[10px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<div
												className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center"
												onClick={() => handleChartClick(0)}
											>
												{/* <SimpleLineChart
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
													fontSize={chartFontSize}
													isFullWidth={false}
												/> */}
												<CLineChart 
												dataResult={dataResult}
												width={smallChartWidthTwo}
												height = {smallChartHeightTwo}
												/>
												
											</div>
											<div className="w-[1px] h-full bg-[#4d5eb2]"></div>
											{/*2 container */}
											<div
												className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
												{/* <ScatterChartComponent
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
													fontSize={chartFontSize}
													isFullWidth={false}
												/> */}
												<CLineChartStacked
												    dataResult={dataResult}
												width={smallChartWidthTwo}
												height= {smallChartHeightTwo}
												/>
											</div>
											<div className="w-[1px]  h-full bg-[#4d5eb2]"></div>
											{/* 3 container */}
											<div
												className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
												{/* <StackedBarChart
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
													fontSize={chartFontSize}
													isFullWidth={false}
												/> */}
												{isSuccess && <CStackedBarChart
												   dataResult={dataResult}
												width={smallChartWidthTwo}
												height={smallChartHeightTwo}
												/>}
											</div>
										</>
									)}
									{isFullWidth && (
										<>
											<div className="w-[868px] h-[230px] flex justify-center items-center p-[10px]">
												{/* Left Navigate button */}
												<button
													className="mr-[70px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() =>
														setActiveChart((activeChart - 1 + 3) % 3)
													}
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
														// <SimpleLineChart
														// 	width={fullChartWidth}
														// 	height={ipadChartHeight}
														// 	fontSize={chartFontSize}
														// 	isFullWidth={true}
														// />
														<CLineChart 
															width = {fullChartWidth}
															height = {ipadChartHeight}
														/>
													)}
												</div>
												<div
													className={`chart-transition ${
														activeChart === 1 ? "active" : ""
													}`}
												>
													{activeChart === 1 && (
														// <ScatterChartComponent
														// 	width={fullChartWidth}
														// 	height={ipadChartHeight}
														// 	fontSize={chartFontSize}
														// 	isFullWidth={true}
														// />
														<CLineChartStacked
														    dataResult={dataResult}
														width={fullChartWidth}
														height={ipadChartHeight}
														/>
													)}
												</div>
												<div
													className={`chart-transition ${
														activeChart === 2 ? "active" : ""
													}`}
												>
													{isSuccess && activeChart === 2 && (
														// <StackedBarChart
														// 	width={fullChartWidth}
														// 	height={ipadChartHeight}
														// 	fontSize={chartFontSize}
														// 	isFullWidth={true}
														// />
														 <CStackedBarChart
														 dataResult={dataResult}
														width={fullChartWidth}
														height={ipadChartHeight}
														/>
													)}
												</div>
												{/* Right Navigate Button */}
												<button
													className="ml-[70px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
													{/* &#8594; */}
													&gt;
												</button>
											</div>
											<div className="hidden">
												<button
													onClick={() =>
														setActiveChart((activeChart - 1 + 3) % 3)
													}
													className="slide-nav-arrow left "
												>
													{/* &lt; */}
													<img src={L} className="w-[25px] h-[25px]" />
												</button>

												<button
													onClick={() => setActiveChart((activeChart + 1) % 3)}
													className="slide-nav-arrow right"
												>
													{/* &gt; */}
													<img src={R} className="w-[25px] h-[25px]" />
												</button>
											</div>
										</>
									)}
									<button
										className="absolute bottom-0  right-4 w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
										onClick={() => setIsFullWidth(!isFullWidth)}
									>
										{isFullWidth ? (
											<img src={Min} className="w-[25px] h-[25px]" />
										) : (
											<img src={Max} className="w-[25px] h-[25px]" />
										)}
									</button>
								</div>

								{/* Bottom Parent Container */}
								<div className="w-full flex justify-between">
									{/*Bottom Left Container */}
									<div className="bg-white w-[375px] h-[456px] mr-[10px]">
										<DataMap3 width={"375px"} height={"456px"} />
									</div>

									{/*Bottom Right Container  */}
									<div className="bg-white w-[700px] h-[456px] flex justify-center items-center rounded-md  px-[10px]">
										<div className="w-[665px] h-[422px] bg-[#e6e6e6] rounded flex justify-between items-center p-[20px]">
											{/* Inner Left Container */}
											<div className="w-1/2 flex flex-col gap-[10px]    ">
												<div className="flex items-center justify-between mr-1">
													<h2 className="text-black font-bold">Myanmar</h2>
													<div className="flex justify-end gap-[12px] p-0">
														<button
														
														>
														<img src={L1} 	className={`   ${
																isDefaultLayout
																	? "bg-blue-500 "
																	: "bg-white"
															} w-[25px] h-[25px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(true)}/>
														</button>
														<button
														
														>
																<img src={L2} className={` ${
																isDefaultLayout
																	? "bg-white"
																	: "bg-blue-500"
															} w-[25px] h-[25px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(false)}/>
														</button>
													</div>
												</div>
												<div className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
													<img
														src={Cicon}
														className="w-[15px] h-[15px] text-black"
													/>
													<p className="text-black text-[12px] ml-[16px]">
														{ timeSpan }
													</p>
												</div>

												<div className="flex items-center mb-[7px]">
													<img src={M} className="w-[15px] h-[15px] text-black" />
													<p className="text-black text-[11px] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</div>

												

												<div>
													{isSuccess && data!= undefined && <TextSectionCard data={data.news} />}
												</div>
											</div>

											{/* Vertical Dashed Line */}
											<div className="relative w-[1px] h-full bg-gray-300">
												<div className="absolute  h-full border-dashed border-gray-300"></div>
											</div>

											{/* Inner Right Container */}
											<div className="w-1/2 flex flex-col justify-center   px-[10px] ">
												{/* top */}
												{/* <div className="w-[300px] h-[100px] border-[1px] border-[#1e1835] bg-[#000408] rounded-md grid grid-cols-3 justify-center items-center pl-[15px]">
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
												</div> */}
													<Detail layout={false} name={detailNameForMedium} number={detailNumberForMedium} data={details}/>


												{/* bottom  */}
												<div className="w-[300px] flex flex-col items-center mt-[10px] gap-[5px]">
													<div className="w-full h-[160px] border-[1px] border-[#e6e6e6] bg-white  rounded-md">
														{isSuccess && <Data2 details={details} />}
													</div>
													<div className="w-full h-[71px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
														<Dates fontSize={"11px"} fontSizeTwo={"14px"} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				{/* Laptop and Desktop Size */}
				<div className="max-xl:hidden w-full h-auto flex justify-center items-center gap-[20px] ">
					{isDefaultLayout ? (
						<>
							<div className="w-full xl:h-[640px] 2xl:h-[1200px] flex justify-center items-center gap-x-[14px]">
								{/* Left Container */}
								<div className="w-[30%] h-full">
									<div className="bg-white 2xl:hidden w-full h-[640px] mr-[16px]">
										<DataMap3 width={"full"} height={"640px"} />
									</div>

									<div className="bg-white max-2xl:hidden w-full h-[1200px] mr-[16px]">
										<DataMap3 width={"full"} height={"1200px"} />
									</div>
								</div>
								{/* Parent Right Container */}
								<div className=" w-[70%] xl:h-[640px] 2xl:h-[1200px] flex flex-col gap-y-[14px] ">
									{/*Top Right Container */}

									<div
										className={`relative p-[5px] bg-white w-full xl:h-[256px] 2xl:h-[480px] rounded-md flex justify-center items-center `}
									>
										{!isFullWidth && (
											<>
												{/*1 container */}
												<div
													className="w-1/3 h-full p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center items-center"
													onClick={() => handleChartClick(0)}
												>
													
													<CLineChart
														dataResult={dataResult}
														width={smallChartWidth}
														height={smallChartHeight}
													/>
												</div>
												<div className="w-[1px] h-full bg-[#4d5eb2]"></div>
												{/*2 container */}
												<div
													className="w-1/3  h-full p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center items-center"
													onClick={() => handleChartClick(1)}
												>
													
													<CLineChartStacked
													    dataResult={dataResult}
														width={smallChartWidth}
														height={smallChartHeight}
													/>
												</div>
												<div className="w-[1px] h-full bg-[#4d5eb2]"></div>
												{/* 3 container */}
												<div
													className="w-1/3 h-full p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center items-center"
													onClick={() => handleChartClick(2)}
												>
													{isSuccess && <CStackedBarChart
													   dataResult={dataResult}
														width={smallChartWidth}
														height={smallChartHeight}
													/>}
												</div>
											</>
										)}
										{isFullWidth && (
											<>
												<div className="w-full  xl:h-[256px] 2xl:h-[450px] flex justify-center items-center py-[15px]">
													{/* Left Navigate button */}
													<button
														className=" mr-[10px] text-[30px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
														onClick={() =>
															setActiveChart((activeChart - 1 + 3) % 3)
														}
													>
														&lt;
													</button>
													<div className="w-full xl:h-[256px] 2xl:h-[470px]  flex justify-center items-center">
														<div className=" ">
															{activeChart === 0 && (
																
																<CLineChart
																	dataResult={dataResult}
																	width={mediumChartWidth}
																	height={mediumChartHeight}
																/>
															)}
														</div>

														<div className=" ">
															{activeChart === 1 && (
															
																<CLineChartStacked
																    dataResult={dataResult}
																	width={mediumChartWidth}
																	height={mediumChartHeight}
																/>
															)}
														</div>

														<div className=" ">
															{isSuccess && activeChart === 2 && (
																
																<CStackedBarChart
																dataResult={dataResult}
																	width={mediumChartWidth}
																	height={mediumChartHeight}
																/>
															)}
														</div>
													</div>
													{/* Right Navigate Button */}
													<button
														className=" ml-[10px]  text-[30px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
														onClick={() => setActiveChart((activeChart + 1) % 3)}
													>
														&gt;
													</button>
												</div>
											</>
										)}
										<button
											className="absolute bottom-0  right-[2px] w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
											onClick={() => setIsFullWidth(!isFullWidth)}
										>
											{isFullWidth ? (
												<img src={Min} className="w-[25px] h-[25px]" />
											) : (
												<img src={Max} className="w-[25px] h-[25px]" />
											)}
										</button>
									</div>

									{/*Under Right Container  */}
									<div className="bg-white w-full xl:h-[384px] 2xl:h-[720px] flex items-center rounded-md px-[20px] py-[10px]">
										<div className="w-full h-full bg-[#e6e6e6] rounded flex justify-between items-center py-[20px] ">
											{/* Inner Left Container */}
											<div className="w-2/5  h-full flex flex-col justify-center  gap-[16px] xl:gap-[20px] 2xl:gap-[25px] p-[15px]">
												<div className="flex items-center justify-between mr-1">
													<h2 className="text-black font-bold 2xl:text-[24px]">Myanmar</h2>
													<div className=" flex justify-end gap-[12px] p-0">
														<button
														
														>
															<img src={L1} 	className={`   ${
																isDefaultLayout
																	? "bg-blue-500 "
																	: "bg-white"
															} w-[30px] h-[30px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(true)}/>
														</button>
														<button
															
														>
															<img src={L2} className={` ${
																isDefaultLayout
																	? "bg-white"
																	: "bg-blue-500"
															} w-[30px] h-[30px] p-1 rounded`}
															onClick={() => setIsDefaultLayout(false)}/>
														</button>
													</div>
												</div>
												<div className="mb-[7px] bg-[#ffff] w-[210px] h-[35px] 2xl:w-[300px] 2xl:h-[50px] border rounded-3xl px-3 flex items-center">
													<img
														src={Cicon}
														className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-white"
													/>
													<p className="text-black text-[12px] 2xl:text-[16px] ml-[16px]">
														{ timeSpan }
													</p>
												</div>

												<div className="flex items-center mb-[7px]">
													<img
														src={M}
														className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-black"
													/>
													<p className="text-black text-[11px] 2xl:text-[16px] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</div>

												<div className="2xl:hidden w-full h-[170px]  ">
													{isSuccess && data && <TextSectionCard data={news} height={"170px"} />}
												</div>
												<div className="max-2xl:hidden w-full h-[350px]">
													<TextSectionCard2 height={'350px'}/>
												</div>
											</div>

											{/* Vertical Dashed Line */}
											<div className="relative w-[1px] h-full bg-gray-300">
												<div className="absolute  h-full border-dashed border-gray-300"></div>
											</div>

											{/* Inner Right Container */}
											<div className="w-3/5  h-full 2xl:justify-center 2xl:items-center flex flex-col  py-[10px]  px-[20px] 3xl:py-[20px] 2xl:gap-y-[20px] 3xl:gap-y-[30px] 3xl:px-[30px]">
												{/* top */}
												
												{ isSuccess && <Detail layout={true} name={detailNameForLarge} number={detailNumberForLarge} data={details}/>}

												{/* Horizontal Dashed Line */}
												<div className="relative h-[1px] mt-[10px] bg-gray-300">
													<div className="absolute w-full h-[1px] border-dashed border-gray-300"></div>
												</div>

												{/* bottom  */}
												<div className=" w-full  flex justify-between  items-center mt-[10px] 3xl:mt-[15px] gap-[10px] xl:gap-[25px]">
													<div className="w-[264px] h-[220px] 3xl:w-[60%] 2xl:w-[350px] 2xl:h-[330px] border-[1px] border-[#e6e6e6] bg-white flex items-center  rounded-md">
														{isLoading && <h1>loading...</h1>}
														{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
													</div>
													<div className="w-[170px] h-[220px] 2xl:w-[200px] 3xl:w-[30%] 2xl:h-[330px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
														<Dates2 />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							{/* Parent Container */}
							<div className="w-full h-auto  flex flex-col justify-center items-center">
								{/* Top Container */}

								<div
									className={`relative bg-white w-full h-[250px] xl:h-[256px] 2xl:h-[380px]  rounded-md flex justify-center items-center gap-[10px] p-[5px] mb-[10px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<div
												className="w-1/3 h-full p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center"
												onClick={() => handleChartClick(0)}
											>
												<CLineChart
													dataResult={dataResult}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>
											</div>
											<div className="w-[1px] h-full bg-[#4d5eb2]"></div>
											{/*2 container */}
											<div
												className="w-1/3 h-full  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
												<CLineChartStacked
												    dataResult={dataResult}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>
											</div>
											<div className="w-[1px]  h-full bg-[#4d5eb2]"></div>
											{/* 3 container */}
											<div
												className="w-1/3 h-full p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
												{isSuccess && <CStackedBarChart
												  dataResult={dataResult}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>}
											</div>
										</>
									)}
									{isFullWidth && (
										<>
											<div className="w-full xl:h-[256px] 2xl:h-[380px]  flex justify-between items-center p-[10px]">
												{/* Left Navigate button */}
												<button
													className=" text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() =>
														setActiveChart((activeChart - 1 + 3) % 3)
													}
												>
													{/* &#8592; */}
													&lt;
												</button>

												<div className="w-full xl:h-[256px] 2xl:h-[380px]  flex justify-center items-center">
													<div
														className={`chart-transition ${
															activeChart === 0 ? "active" : ""
														}`}
													>
														{activeChart === 0 && (
															<CLineChart
																dataResult={dataResult}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
														)}
													</div>
													<div
														className={`chart-transition ${
															activeChart === 1 ? "active" : ""
														}`}
													>
														{activeChart === 1 && (
															<CLineChartStacked
															    dataResult={dataResult}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
														)}
													</div>
													<div
														className={`chart-transition ${
															activeChart === 2 ? "active" : ""
														}`}
													>
														{isSuccess && activeChart === 2 && (
															
															 <CStackedBarChart
															 dataResult={dataResult}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
														)}
													</div>
												</div>
												{/* Right Navigate Button */}
												<button
													className=" text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
													{/* &#8594; */}
													&gt;
												</button>
											</div>
											<div className="hidden">
												<button
													onClick={() =>
														setActiveChart((activeChart - 1 + 3) % 3)
													}
													className="slide-nav-arrow left "
												>
													{/* &lt; */}
													<img src={L} className="w-[25px] h-[25px]" />
												</button>

												<button
													onClick={() => setActiveChart((activeChart + 1) % 3)}
													className="slide-nav-arrow right"
												>
													{/* &gt; */}
													<img src={R} className="w-[25px] h-[25px]" />
												</button>
											</div>
										</>
									)}
									<button
										className="absolute bottom-0  right-4 w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
										onClick={() => setIsFullWidth(!isFullWidth)}
									>
										{isFullWidth ? (
											<img src={Min} className="w-[25px] h-[25px]" />
										) : (
											<img src={Max} className="w-[25px] h-[25px]" />
										)}
									</button>
								</div>

								{/* Bottom Parent Container */}
								<div className="w-full  h-auto flex justify-between">
									{/*Bottom Left Container */}
									{/* <div className="bg-[#161616] w-[30%] h-[720px] mr-[16px]">
										<DataMap3 width={"full"} height={"720px"} />
									</div> */}
									<div className="bg-white w-[30%] 2xl:hidden  h-[640px] mr-[16px]">
										<DataMap3 width={"full"} height={"640px"} />
									</div>

									<div className="bg-white w-[30%] max-2xl:hidden  h-[800px] mr-[16px]">
										<DataMap3 width={"full"} height={"800px"} />
									</div>

									{/*Bottom Right Container  */}
									<div className="bg-white w-[70%] h-[640px] 2xl:h-[800px] flex justify-center items-center rounded-md  p-[20px]">
										<div className="w-full h-full bg-[#e6e6e6] rounded flex justify-between items-center p-[10px]">
											{/* Inner Left Container */}
											<div className="w-1/2  h-full  justify-center  xl:gap-[30px]  mx-[10px] flex flex-col gap-[16px]    ">
												<div className="flex items-center justify-between mr-1 ">
													<h2 className="text-black font-bold xl:text-[20px] 2xl:text-[24px] 3xl:text-[26px] 4xl:text-[28px]">Myanmar</h2>
													<div className="flex justify-end gap-[12px] p-0">
														<button
															
														>
															<img src={L1} className={`p-1 rounded w-[30px] h-[30px]  ${
																isDefaultLayout
																	? "bg-blue-500 "
																	: "bg-white"
															}`}
															onClick={() => setIsDefaultLayout(true)}/>
														</button>
														<button
														
														>
															<img src={L2} className={`p-1 rounded w-[30px] h-[30px]  ${
																isDefaultLayout
																	? "bg-white "
																	: "bg-blue-500"
															}`}
															onClick={() => setIsDefaultLayout(false)}/>
														</button>
													</div>
												</div>
												<div className="mb-[7px] bg-white w-[210px] h-[35px] 2xl:w-[300px] 2xl:h-[50px] border rounded-3xl px-3 flex items-center">
													<img
														src={Cicon}
														className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px] 2xl:w-[25px] 2xl:h-[25px] text-black"
													/>
													<p className="text-black text-[12px] 2xl:text-[16px] ml-[16px]">
														{ timeSpan }
													</p>
												</div>

												<div className="flex items-center mb-[7px]">
													<img
														src={M}
														className="w-[15px] h-[15px] xl:w-[18px] xl:h-[18px] 2xl:w-[25px] 2xl:h-[25px] text-white"
													/>
													<p className="text-black text-[11px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</div>

												{/* <div className="text-[#7EADE3] w-[379px] h-[321px] bg-[#303d4c] px-[40px] py-[20px]">
													<p className="font-[700] mb-[7px] text-[20px]">
													The massacre of the military group
													</p>
													<p className="text-[14px]">
													Between September and December 2023, the military
													group committed at least (37) mass killings in which
													five (5) or more people were killed, and a total of
													(283) civilians were killed.2021 From February 2023 As
													of December, the military group has committed at least
													(210) Between September and December 2023, the
													military group committed at least (37) mass killings
													in which five (5) or more people were killed, and a
													total of (283){" "}
													</p>
												</div> */}

												{/* <div className="max-2xl:hidden w-full h-[350px]">
													<TextSectionCard2 height={'350px'}/>
												</div> */}

												

												<div className="w-full 3xl:hidden max-h-[350px] ">
													
													<TextSectionCard2 height={"350px"} />
													
												</div>
												<div className="w-full max-3xl:hidden h-[400px]">
													<TextSectionCard2  height={"400px"}/>
												</div>
											</div>

											{/* Vertical Dashed Line */}
											<div className="mx-[10px] relative w-[1px] h-full bg-gray-300">
												<div className="absolute  h-full border-dashed border-gray-300"></div>
											</div>

											{/* Inner Right Container */}
											<div className="w-1/2  h-full xl:justify-center xl:items-center flex flex-col justify-center 2xl:gap-y-[40px]  px-[20px] ">
												{/* top */}
												{/* <div className="w-[369px] h-[20%] 2xl:w-full border-[1px] border-[#1e1835] bg-[#000408] rounded-md grid grid-cols-3 justify-center items-center pl-[25px]">
													<div className="flex flex-col ">
														<p className="text-[12px] text-[#A6A1C0]">Price</p>
														<p className="text-[13px] text-white">$9,542.39</p>
													</div>
													<div className="flex flex-col ">
														<p className="text-[12px] text-[#A6A1C0]">Price</p>
														<p className="text-[13px] text-white">$9,542.39</p>
													</div>
													<div className="flex flex-col ">
														<p className="text-[12px] text-[#A6A1C0]">Price</p>
														<p className="text-[13px] text-white">$9,542.39</p>
													</div>
													<div className="flex flex-col ">
														<p className="text-[12px] text-[#A6A1C0]">Price</p>
														<p className="text-[13px] text-white">$9,542.39</p>
													</div>
													<div className="flex flex-col ">
														<p className="text-[12px] text-[#A6A1C0]">Price</p>
														<p className="text-[13px] text-white">$9,542.39</p>
													</div>
												</div> */}
												{isSuccess && <Detail layout={false} name={detailNameForLarge} number={detailNumberForLarge} data={details} />}

												{/* bottom  */}
												<div className="4xl:hidden w-full flex flex-col items-center mt-[10px] 2xl:mt-0 2xl:gap-[40px] gap-[10px]">
													<div className="w-full h-[227px] border-[1px] border-[#e6e6e6] bg-white   rounded-md">
														{isLoading && <h1>loading...</h1>}
														{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
													</div>
													
													<div className="w-full  h-[100px] border-[1px] border-[#e6e6e6] bg-white   rounded-md flex justify-center items-center">
														<Dates />
													</div>
												</div>

												{/* bottom  */}
												<div className="max-4xl:hidden w-full h-[55%]  flex justify-between  items-center mt-[10px] 3xl:mt-[15px] gap-[10px] xl:gap-[25px]">
													<div className="w-[264px] h-[220px] 3xl:w-[60%] 2xl:w-[350px] 2xl:h-full border-[1px] border-[#e6e6e6] bg-white  flex items-center  rounded-md">
														{isLoading && <h1>loading...</h1>}
														{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
													</div>
													<div className="w-[170px] h-[220px] 2xl:w-[200px] 3xl:w-[30%] 2xl:h-full border-[1px] border-[#e6e6e6] bg-white  rounded-md flex justify-center items-center">
															<Dates2 />

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</section>
	);
};

export default Dashboard;
