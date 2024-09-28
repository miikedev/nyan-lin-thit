import { Box, Grid, Space, Stack } from "@mantine/core";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import calendar from '../../assets/ic_date.svg'
import TextSectionCard from "../components/DashboardPageComponents/TextSectionCard";

const DataMap3 = lazy(()=>import("../components/DashboardPageComponents/DataMap3"))
import { states } from "../../utils/sampleData";
import { motion } from 'framer-motion';
// Icons
import L1 from '../components/DashboardPageComponents/assets2/1st-layout.svg';
import L2 from '../components/DashboardPageComponents/assets2/2nd-layout.svg';
import Cicon from "../components/DashboardPageComponents/assets2/calendar.svg";
import L from "../components/DashboardPageComponents/assets2/left-arrow.svg";
import M from "../components/DashboardPageComponents/assets2/map.svg";
import Max from "../components/DashboardPageComponents/assets2/maximize.svg";
import Min from "../components/DashboardPageComponents/assets2/minimize.svg";
import R from "../components/DashboardPageComponents/assets2/right-arrow.svg";
import Data from "../components/DashboardPageComponents/Data";
import Data2 from "../components/DashboardPageComponents/Data2";

import Dates from "../components/DashboardPageComponents/Dates";
import Dates2 from "../components/DashboardPageComponents/Dates2";

import Detail from "../components/DashboardPageComponents/Detail";
import TextSectionCard2 from "../components/DashboardPageComponents/TextSectionCard2";
// Tab Section
import CLineChart from "../components/DashboardPageComponents/CLineChart";
import CLineChartStacked from "../components/DashboardPageComponents/CLineChartStacked";
import CStackedBarChart from "../components/DashboardPageComponents/CStackedBarChart";
import Tab from "../components/DashboardPageComponents/Tab";
import TabContent from "../components/DashboardPageComponents/TabContent";

import { useDashboardChartData, useDashboardData } from "../apis/dashboardData";
import { useDashboardDataContext } from "../context/DashboardDataContext";
import { useDashboardDateContext } from "../context/DashboardDateContext";
import { useDashboardFilterContext } from "../context/DashboardFilterContext";
import { useFetchData } from "../hooks/useFetchData";
import Loading from '../pages/Loading';

 const caseName = {
	1: 'airstrike',
	2: 'armed_clashes',
    3: 'massacre',
    4: 'casualties',
    5: 'arrests',
}

import { Menu, rem, Button } from '@mantine/core';
import { ChevronDown } from "../icons/ChevronDown";
import { capitalizeFirstLetter } from "../../utils/utils";
import MapFilterSelect from "../components/DashboardPageComponents/MapFilterSelect";
import FirstLayout from "../icons/FirstLayout";
import SecondLayout from "../icons/SecondLayout";
const Dashboard = () => {
	const { startDate, setStartDate, setEndDate, endDate } = useDashboardDateContext();
	const { filterParams } = useDashboardFilterContext();  
    const { dataResult, setDataResult } = useDashboardDataContext();  

    const resultedParamId = useMemo(() => filterParams.map(param => param.id), [filterParams]);  
    const resultedParamNames = useMemo(() => resultedParamId.map(id => caseName[id] || ""), [resultedParamId]);  

    const [labels, setLabels] = useState([]);   

    const { data, isLoading, isSuccess, isError } = useDashboardData();  
    const { data:newData, isLoading:newIsLoading, isSuccess:newIsSuccess, isError:newIsError } = useDashboardChartData(
		new Date(startDate).toLocaleDateString('en-CA'), 
		new Date(endDate).toLocaleDateString('en-CA')
	);  

    const [activeTab, setActiveTab] = useState("chart");  
    const [activeChart, setActiveChart] = useState(0); // 0, 1, or 2 for the three charts  
    const [isFullWidth, setIsFullWidth] = useState(false);  
    const [isDefaultLayout, setIsDefaultLayout] = useState(true);  
	const [isModalOpen, setIsModalOpen] = useState(false);  
	const [clineChartActive, setClineChartActive] = useState(false);
	const [cLineChartStackedActive, setClineChartStackedActive] = useState(false);
	const [CStackedBarChartActive, setCStackedBarChartActive] = useState(false);

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
	const {news, details} = useFetchData(isSuccess,data,resultedParamNames)
    
	useEffect(() => {  
        if(newIsSuccess && newData) {
			setDataResult(newData.datasets)
			setLabels(newData.labels)
		}
    }, [newIsSuccess, newData, resultedParamNames]);  

    const timeSpan = new Date(data?.earliestDate).toLocaleDateString('en-CA') + ' - ' + new Date(data?.latestDate).toLocaleDateString('en-CA');  
    
	const handleChartClick = (chartIndex) => {  
        setActiveChart(chartIndex);  
        setIsFullWidth(!isFullWidth);  
    };  

    const handleTabChange = (tab) => {  
        setActiveTab(tab);  
    };

	useEffect(() => {  
        if (newIsSuccess) {  
            filterDataWithParams(dataResult, resultedParamNames);  
        }  
    }, [resultedParamNames, newIsSuccess, dataResult]);  


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
            resultedParamNames.includes(item.label)  
        );  

        // Only set filtered data if it's different  
        if (JSON.stringify(filteredData) !== JSON.stringify(dataResult)) {  
            setDataResult(filteredData);  
        }  
    }; 
	// if(isLoading && newIsLoading) return <Loading />
	return (
			<Box className="bg-[#dedede] p-[20px] w-full h-auto">
				{/*Mobile Phone Size */}
				<Box className="md:hidden mt-[25px] bg-white">
					{/* Top Section */}
					<Box className=" md:hidden w-full h-[200px] flex flex-col justify-between items-center pt-[3px]">
						<Box className=" bg-[#e6e6e6] border-[#737373] rounded-[8px] gap-[5px] w-[80%] h-[30px]  px-4 py-[2px] flex  justify-center items-center">
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
						</Box>
						<Box className=" w-full h-full mt-[10px]">
							<TabContent active={activeTab} />
						</Box>
					</Box>
					{/* Bottom Section */}
					<Box className=" md:hidden bg-white  mt-[30px] px-[5px] mx-auto w-full  h-[420px] rounded-md">
						<Suspense fallback={<Loading width={"100%"} height={"800px"} />}>
							<DataMap3 width={"full"} height={"800px"} />
						</Suspense>
					</Box>
				</Box>
				{/*Vertical Tablet Sizes */}
				<Box className="lg:hidden">
					<Box className="max-md:hidden py-[10px]  w-full flex flex-col justify-center items-center">
						{/* Top Container */}
						<Box
							className={`bg-white w-full h-[260px] rounded-md flex justify-center items-center gap-[10px] py-[20px] mb-[10px]`}
						>
							{!isFullWidth && (
								<>
									{/*1 container */}
									<Box
										className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded transition-all duration-300 ease-in-out cursor-pointer  flex justify-center"
										onClick={() => handleChartClick(0)}
									>
										{/* <SimpleLineChart
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
									{
										newIsSuccess ?
										<Suspense fallback={<Loading />}>
										<CLineChart
										labels={labels}
										newDataResult={dataResult}
										width={ipadChartWidth}
										height={smallChartHeightTwo}
										/>
										</Suspense>
										 : 
										<Loading />
									}
									
									</Box>
									<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1">---</Box>
									{/*2 container */}
									<Box
										className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded cursor-pointer flex justify-center"
										onClick={() => handleChartClick(1)}
									>
										{/* <ScatterChartComponent
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
									<Suspense fallback={<Loading />}>
										<CLineChartStacked 
											paramResult={resultedParamNames}
										newDataResult={newData}
										width={ipadChartWidth}
										height={smallChartHeightTwo}
										/>
									</Suspense>
									</Box>
									<Box className="w-[1px]  h-full bg-[#4d5eb2]">---</Box>
									{/* 3 container */}
									<Box
										className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded cursor-pointer flex justify-center"
										onClick={() => handleChartClick(2)}
									>
										{/* <StackedBarChart
											width={ipadChartWidth}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
										/> */}
										{newIsSuccess ?
										<Suspense fallback={<Loading />}>
											<CStackedBarChart
												datasets={dataResult}
												labels={labels}
												width={ipadChartWidth}
												height={smallChartHeightTwo}
											/>
										</Suspense> : <Loading />
										}
									</Box>
								</>
							)}
							{isFullWidth && (
								<>
									<Box className="w-full h-[230px] flex justify-center items-center p-[10px]">
										{/* Left Navigate button */}
										<button
											className="mr-[30px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
											onClick={() => setActiveChart((activeChart - 1 + 3) % 3)}
										>
											{/* &#8592; */}
											&lt;
										</button>
										<Box
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
											<Suspense fallback={<Loading />}>
												<CLineChart
												newDataResult={dataResult}
												labels={labels}
												width={ipadChartWidthTwo}
												height={fullChartHeight}
												/>
											</Suspense>
											)}
										</Box>
										<Box
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
												<Suspense fallback={<Loading />}>
												<CLineChartStacked 
													paramResult={resultedParamNames}
													newDataResult={newData}
												    dataResult={dataResult}
													width={ipadChartWidthTwo}
													height={fullChartHeight}
												/>
												</Suspense>
											)}
										</Box>
										<Box
											className={`chart-transition ${
												activeChart === 2 ? "active" : ""
											}`}
										>


											{ 	newIsSuccess ?
												<Suspense fallback={<Loading />}>
													<CStackedBarChart
													datasets={dataResult}
													labels={labels}
													width={ipadChartWidthTwo}
													height={fullChartHeight}
													/>
												</Suspense> : <Loading />
											}
										</Box>
										{/* Right Navigate Button */}
										<button
											className="ml-[30px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
											onClick={() => setActiveChart((activeChart + 1) % 3)}
										>
											{/* &#8594; */}
											&gt;
										</button>
									</Box>
									<Box className="hidden">
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
									</Box>
								</>
							)}
							<button
								className="absolute bottom-0  right-0 w-[50px] h-[50px]  font-bold py-2 px-4 rounded"
								onClick={() => setIsFullWidth(!isFullWidth)}
							>
								{isFullWidth ? (
									<img src={Min} className="w-[25px] h-[25px] border-1 border-red-800" />
								) : (
									<img src={Max} className="w-[25px] h-[25px] border-1 border-red-800" />
								)}
							</button>
						</Box>
						{/* Bottom Parent Container */}
						<Box className=" w-full flex flex-col justify-center items-center">
							{/*Bottom Left Container */}
							{/* i-pads and tablet sizes */}
							{/* <Box className="bg-[#161616] hidden md:block w-[716px] h-[520px]">
							<DataMap3 width={"716px"} height={"520px"} />
							</Box> */}
							{/* i-phones and phones sizes */}
							{/* <Box className="bg-[#161616] block max-[424px]:hidden md:hidden w-[410px] h-[640px]">
							<DataMap3 width={"410px"} height={"640px"} />
							</Box> */}
							{/* <Box className="bg-[#161616] block min-[424px]:hidden w-[350px] h-[640px]">
							<DataMap3 width={"350px"} height={"640px"} />
							</Box> */}
							{/* Map */}
							<Box className="mt-[10px] bg-white w-full h-[523px] rounded-md">
								<Suspense fallback={<Loading width={"100%"}  height={"100%"} />}>
									<DataMap3 width={"full"} height={"523px"} />
								</Suspense>
							</Box>
							{/*Under Right Container  */}
							<Box className="bg-white w-full h-[393px] flex items-center rounded-md px-[20px] py-[10px]">
								<Box className="w-full h-[360px] bg-[#e6e6e6] rounded flex justify-between items-center py-[20px] ">
									{/* Inner Left Container */}
									<Stack className="w-2/5  h-full  gap-[16px] xl:gap-[14px] 2xl:gap-[25px] mt-[50px]">
													<Box className="flex items-center justify-between mr-1">
														{/* <Menu trigger="hover" position="bottom-left" width={165} isFullWidth={true}>
														<Menu.Target trigger="hover">
															<Button
																variant="transparent"
																radius="sm">
																<h2 className="text-black font-bold 2xl:text-[24px]">Myanmar</h2>
																<ChevronDown fill="black" strokeWidth="2"/>
															</Button>
														</Menu.Target>
														<Menu.Dropdown trigger="hover">
														{
															states.map(state=>{
																return <Menu.Item key={state.name} isFullWidth={true}>{capitalizeFirstLetter(state.name)}</Menu.Item>
															})
														}
														</Menu.Dropdown>
														</Menu> */}
														<MapFilterSelect />
														<Box className=" flex justify-end gap-[12px] p-0">
															{/* <button>
																<img src={L1} 	className={`${
																	isDefaultLayout
																		? "bg-[#1B59F8] "
																		: "bg-[#1B59F842]"
																} w-[30px] h-[30px] p-1 rounded`}
																onClick={() => setIsDefaultLayout(true)}/>
															</button>
															<button
																
															>
																<img src={L2} className={` ${
																	isDefaultLayout
																		? "bg-[#1B59F842]"
																		: "bg-[#1B59F8]"
																} w-[30px] h-[30px] p-1 rounded`}
																onClick={() => setIsDefaultLayout(false)}/>
															</button> */}
															<button onClick={()=>setIsDefaultLayout(true)}>
																<FirstLayout color={isDefaultLayout ? '#1B59F8' : '#1B59F842'}/>
															</button>
															<button onClick={()=>setIsDefaultLayout(false)}>
																<SecondLayout color={!isDefaultLayout? '#1B59F8' : '#1B59F842'}/>
															</button>
														</Box>
													</Box>
													<Box className="mb-[7px] bg-[#ffff] border w-auto py-3 lg:w-72 rounded-md px-3 flex items-center">
														<img
															src={calendar}
															className="w-[12px] h-[12px] 2xl:w-[20px] 2xl:h-[20px] text-white"
														/>
														<p className="text-black text-[12px] 2xl:text-[12px] ml-[16px] font-poppins-400">
															{ timeSpan }
														</p>
													</Box>

													<Box className="flex items-center mb-[7px] xl:pl-[5px]">
														<img
															src={M}
															className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-black"
														/>
														<p className="text-black text-[11px] 2xl:text-[12px] font-[500] ml-[10px]">
															{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
														</p>
													</Box>
													<Box className="2xl:hidden w-full h-[170px]  ">
														{isSuccess && data && <TextSectionCard data={news} height={"170px"} />}
													</Box>
													<Box className="max-2xl:hidden w-full h-[350px]">
														<TextSectionCard2 height={'350px'}/>
													</Box>
												</Stack>

									{/* Vertical Dashed Line */}
									<Box className="relative w-[1px] h-full bg-gray-300">
										<Box className="absolute  h-full border-dashed border-gray-300"></Box>
									</Box>

									{/* Inner Right Container */}
									<Box className="w-3/5 flex flex-col  gap-[16px]   px-[20px] ">
										{/* top */}
										{/* <Box className="lg:w-[360px] xl:w-[444px] h-[58px] border-[1px] border-[#1e1835] bg-[#000000] rounded-md flex justify-around items-center">
											<Box className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</Box>
											<Box className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</Box>
											<Box className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</Box>
											<Box className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</Box>
											<Box className="flex flex-col ">
												<p className="text-[12px] text-[#A6A1C0]">Price</p>
												<p className="text-[13px] text-white">$9,542.39</p>
											</Box>
										</Box> */}
										{
											isSuccess && <Detail layout={true} name={detailNameForMedium} number = {detailNumberForMedium} data={details} />
										}

										{/* Horizontal Dashed Line */}
										<Box className="relative h-[1px] mt-[10px] bg-gray-300">
											<Box className="absolute w-full h-[1px] border-dashed border-gray-300"></Box>
										</Box>

										{/* bottom  */}
										<Box className="relative flex  items-center mt-[10px] gap-[10px] rounded-md">
											<Box className="w-[65%] h-[220px] border-[1px] border-[#e6e6e6] bg-white flex items-center  rounded-lg">
												{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
											</Box>
											<Box className="w-[35%] h-[220px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
												<Dates2 startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				{/* Horizontal Tablet Sizes */}
				<Box className="xl:hidden max-lg:hidden w-full h-full flex justify-center gap-[20px]">
					{isDefaultLayout ? (
						<>
							{/* Left Container */}
							<Box className="rounded-md">
								{/* <Box className="bg-white w-[370px] h-[640px] rounded-md"> */}
									<Box className="rounded-md">
									<Suspense fallback={<Loading/>}>
										<DataMap3 />
									</Suspense>
								</Box>	
							</Box>
							{/* Parent Right Container */}
							<Box className="w-[735px]">
								{/*Top Right Container */}
								<Box
									className={` p-[5px] bg-white w-full h-[240px] rounded-md flex justify-center items-center  mb-[10px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<Box
												className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded cursor-pointer  flex justify-center"
												onClick={() => handleChartClick(0)}
											>
												{/* <SimpleLineChart
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												<Suspense fallback={<Loading />}>
													<CLineChart 
														newDataResult={dataResult}
														labels={labels}
														dataResult={dataResult}
														width={ipadChartWidth}
														height = {ipadChartHeight}
													/>
												</Suspense>
											</Box>
											<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1">---</Box>
											{/*2 container */}
											<Box
												className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
												{/* <ScatterChartComponent
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												<Suspense fallback={<Loading />}>
												<CLineChartStacked 
													paramResult={resultedParamNames}
													newDataResult={newData}
												    dataResult={dataResult}
													width ={ipadChartWidth}
													height = {ipadChartHeight}
												/>
												</Suspense>
											</Box>
											<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1">---</Box>
											{/* 3 container */}
											<Box
												className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
												{/* <StackedBarChart
													width={ipadChartWidth}
													height={ipadChartHeight}
													fontSize={chartFontSize2}
													isFullWidth={false}
												/> */}
												{isSuccess && 
												<Suspense fallback={<Loading />}>
												<CStackedBarChart
													datasets={dataResult}
													labels={labels}
													width={ipadChartWidth}
													height = {ipadChartHeight}
												/>
												</Suspense>
												}
											</Box>
										</>
									)}
									{isFullWidth && (
										<>
											<Box className="w-[735px] h-full flex justify-center items-center px-[10px]">
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
												<Box
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
														<Suspense fallback={<Loading />}>
                                                        <CLineChart 
                                                        newDataResult={dataResult}
                                                        labels={labels}
                                                        dataResult={dataResult}
                                                        width={ipadChartWidthTwo}
                                                        height = {mediumChartHeight}
                                                        />
                                                        </Suspense>
														)}
												</Box>
												<Box
													className={`chart-transition ${
														activeChart === 1 ? "active" : ""
													}`}
												>
													{activeChart === 1 && (
													<Suspense fallback={<Loading />}>
														<CLineChartStacked 
															paramResult={resultedParamNames}
															newDataResult={newData}
														    dataResult={dataResult}
															width={ipadChartWidthTwo}
															height={mediumChartHeight}
														/>
													</Suspense>
													)}
												</Box>
												<Box
													className={`chart-transition ${
														activeChart === 2 ? "active" : ""
													}`}
												>
													{isSuccess && activeChart === 2 && (
													<Suspense fallback={<Loading />}>
														<CStackedBarChart
															datasets={dataResult}
															labels={labels}
															width={ipadChartWidthTwo}
															height = {mediumChartHeight}
														/>
													</Suspense>
													)}
												</Box>
												{/* Right Navigate Button */}
												<button
													className="text-[25px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
													&gt;
												</button>
											</Box>
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
								</Box>
								{/*Under Right Container  */}
								<Box className="bg-white w-full h-[393px] flex items-center rounded-md px-[20px] py-[10px]">
									<Box className="w-full h-[360px] bg-[#e6e6e6] rounded flex justify-between items-center py-[20px] ">
										{/* Inner Left Container */}
										<Box className="w-2/5  flex flex-col gap-[16px]   pl-[20px]">
											<Box className="flex items-center justify-between mr-1">
												<Menu trigger="hover" position="bottom-left" width={165} isFullWidth={true}>
													<Menu.Target trigger="hover">
														<Button variant="transparent">
															<h2 className="text-black font-bold 2xl:text-[24px]">Myanmar</h2>
															<ChevronDown fill="black" strokeWidth="2"/>
														</Button>
													</Menu.Target>
													<Menu.Dropdown trigger="hover">
													{
														states.map(state=>{
															return <Menu.Item key={state.name}>{capitalizeFirstLetter(state.name)}</Menu.Item>
														})
													}
													</Menu.Dropdown>
												</Menu>
												<Box className=" flex justify-end gap-[12px] p-0">
													<button>
														<img src={L1} 	className={`${
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
												</Box>
											</Box>
											<Box className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
												<img
													src={Cicon}
													className="w-[15px] h-[15px] text-black"
												/>
												<p className="text-black text-[12px] ml-[16px]">
													{ timeSpan }
												</p>
											</Box>

											<Box className="flex items-center mb-[7px]">
												<img src={M} className="w-[15px] h-[15px] text-white" />
												<p className="text-black text-[11px] ml-[10px]">
													{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
												</p>
											</Box>

											
											<Box>
												{isSuccess && data && <TextSectionCard data={news} />}
											</Box>
										</Box>

										{/* Vertical Dashed Line */}
										<Box className=" w-[1px] h-full bg-gray-300">
											<Box className="absolute  h-full border-dashed border-gray-300"></Box>
										</Box>

										{/* Inner Right Container */}
										<Box className="w-3/5 flex flex-col  gap-[16px]   px-[20px] ">
											{/* top */}
											{/* <Box className="lg:w-[360px] xl:w-[444px] h-[58px] border-[1px] border-[#1e1835] bg-[#000000] rounded-md flex justify-around items-center">
												<Box className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</Box>
												<Box className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</Box>
												<Box className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</Box>
												<Box className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</Box>
												<Box className="flex flex-col ">
													<p className="text-[12px] text-[#A6A1C0]">Price</p>
													<p className="text-[13px] text-white">$9,542.39</p>
												</Box>
											</Box> */}
												{
													isSuccess && <Detail layout={true} name={detailNameForMedium} number = {detailNumberForMedium} data={details} />
												}

											{/* Horizontal Dashed Line */}
											<Box className=" h-[1px] mt-[10px] bg-gray-300">
												<Box className="absolute w-full h-[1px] border-dashed border-gray-300"></Box>
											</Box>

											{/* bottom  */}
											<Box className="flex  items-center mt-[10px] gap-[10px]">
												<Box className="w-[264px] relaative h-[220px] border-[1px] border-[#e6e6e6] bg-white flex items-center  rounded-md">
													{isLoading && <Loading  />}
													{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
												</Box>
												<Box className="w-[170px] h-[220px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
													<Dates2 startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						</>
					) : (
						<>
							{/* Parent Container */}
							<Box className="max-w-[1133px] flex flex-col justify-center items-center">
								{/* Top Container */}
								<Box
									className={` bg-white w-full h-[232px] rounded-md flex justify-center items-center gap-[5px] p-[5px] mb-[10px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<Box
												className="w-1/3  p-[5px] hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer  flex justify-center"
												onClick={() => handleChartClick(0)}>
											{/* <SimpleLineChart
												width={smallChartWidthTwo}
												height={smallChartHeightTwo}
												fontSize={chartFontSize}
												isFullWidth={false}
											/> */}
											<Suspense fallback={<Loading />}>
												<CLineChart 
													newDataResult={dataResult}
													labels={labels}
													dataResult={dataResult}
													width={smallChartWidthTwo}
													height = {smallChartHeightTwo}
												/>
											</Suspense>
											</Box>
											<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1"></Box>
											{/*2 container */}
											<Box
												className="w-1/3   p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
											{/* <ScatterChartComponent
												width={smallChartWidthTwo}
												height={smallChartHeightTwo}
												fontSize={chartFontSize}
												isFullWidth={false}
											/> */}
											<Suspense fallback={<Loading />}>
											<CLineChartStacked 
												paramResult={resultedParamNames}
												newDataResult={newData}
											    dataResult={dataResult}
												width={smallChartWidthTwo}
												height= {smallChartHeightTwo}
											/>
											</Suspense>
											</Box>
											<Box className="w-[1px]  h-full bg-[#4d5eb2]"></Box>
											{/* 3 container */}
											<Box
												className="w-1/3  p-[5px]  hover:bg-[#233141] hover:bg-opacity-50 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
											{/* <StackedBarChart
											width={smallChartWidthTwo}
											height={smallChartHeightTwo}
											fontSize={chartFontSize}
											isFullWidth={false}
											/> */}
											{isSuccess && 
											<Suspense fallback={<Loading />}>
											<CStackedBarChart
												datasets={dataResult}
												labels={labels}
												width={smallChartWidthTwo}
												height={smallChartHeightTwo}
											/>
											</Suspense>
											}
											</Box>
										</>
									)}
									{isFullWidth && (
										<>
											<Box className="w-[868px] h-[230px] flex justify-center items-center p-[10px]">
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
												<Box
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
													<Suspense fallback={<Loading />}>
														<CLineChart 
															newDataResult={dataResult}
															labels={labels}
															width = {fullChartWidth}
															height = {ipadChartHeight}
														/>
													</Suspense>
													)}
												</Box>
												<Box
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
														<Suspense fallback={<Loading />}>
                                                        <CLineChart 
                                                            newDataResult={dataResult}
                                                            labels={labels}
                                                            width={fullChartWidth}
                                                            height={ipadChartHeight}
                                                        />
														</Suspense>
													)}
												</Box>
												<Box
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
													<Suspense fallback={<Loading />}>
													 <CStackedBarChart
													 	datasets={dataResult}
													 	labels={labels}
														width={fullChartWidth}
														height={ipadChartHeight}
													/>
													</Suspense>
												)}
												</Box>
												{/* Right Navigate Button */}
												<button
													className="ml-[70px] text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
												{/* &#8594; */}
													&gt;
												</button>
											</Box>
											<Box className="hidden">
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
											</Box>
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
								</Box>
								{/* Bottom Parent Container */}
								<Box className="w-full flex justify-between">
									{/*Bottom Left Container */}
									<Box className="bg-white w-[375px] h-[456px] mr-[10px] rounded-md">
										<Suspense fallback={<Loading width={"375px"} height={"456px"} />}>
											<DataMap3 width={"375px"} height={"456px"} />
										</Suspense>
									</Box>
									{/*Bottom Right Container  */}
									<Box className="bg-white w-[700px] h-[456px] flex justify-center items-center rounded-md  px-[10px]">
										<Box className="w-[665px] h-[422px] bg-[#e6e6e6] rounded flex justify-between items-center p-[20px]">
											{/* Inner Left Container */}
											<Box className="w-1/2 flex flex-col gap-[10px]    ">
												<Box className="flex items-center justify-between mr-1">
												<Menu trigger="hover" position="bottom-left" width={165} isFullWidth={true}>
													<Menu.Target trigger="hover">
														<Button variant="transparent">
															<h2 className="text-black font-bold 2xl:text-[24px]">Myanmar</h2>
															<ChevronDown fill="black" strokeWidth="2"/>
														</Button>
													</Menu.Target>
													<Menu.Dropdown trigger="hover">
													{
														states.map(state=>{
															<Menu.Item key={state.name}>{capitalizeFirstLetter(state.name)}</Menu.Item>
														})
													}
													</Menu.Dropdown>
													</Menu>
													<Box className="flex justify-end gap-[12px] p-0">
														<button>
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
													</Box>
												</Box>
												<Box className="mb-[7px] bg-white w-[210px] h-[35px] border rounded-3xl px-3 flex items-center">
													<img
														src={Cicon}
														className="w-[15px] h-[15px] text-black"
													/>
													<p className="text-black text-[12px] ml-[16px]">
														{ timeSpan }
													</p>
												</Box>
												<Box className="flex items-center mb-[7px]">
													<img src={M} className="w-[15px] h-[15px] text-black" />
													<p className="text-black text-[11px] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</Box>
												<Box>
													{isSuccess && data!= undefined && <TextSectionCard data={data.news} />}
												</Box>
											</Box>

											{/* Vertical Dashed Line */}
											<Box className="relative w-[1px] h-full bg-gray-300">
												<Box className="absolute  h-full border-dashed border-gray-300"></Box>
											</Box>

											{/* Inner Right Container */}
											<Box className="w-1/2 flex flex-col justify-center   px-[10px] ">
												{/* top */}
												{/* <Box className="w-[300px] h-[100px] border-[1px] border-[#1e1835] bg-[#000408] rounded-md grid grid-cols-3 justify-center items-center pl-[15px]">
													<Box className="flex flex-col ">
														<p className="text-[11px] text-[#A6A1C0]">Price</p>
														<p className="text-[12px] text-white">$9,542.39</p>
													</Box>
													<Box className="flex flex-col ">
														<p className="text-[11px] text-[#A6A1C0]">Price</p>
														<p className="text-[12px] text-white">$9,542.39</p>
													</Box>
													<Box className="flex flex-col ">
														<p className="text-[11px] text-[#A6A1C0]">Price</p>
														<p className="text-[12px] text-white">$9,542.39</p>
													</Box>
													<Box className="flex flex-col ">
														<p className="text-[11px] text-[#A6A1C0]">Price</p>
														<p className="text-[12px] text-white">$9,542.39</p>
													</Box>
													<Box className="flex flex-col ">
														<p className="text-[11px] text-[#A6A1C0]">Price</p>
														<p className="text-[12px] text-white">$9,542.39</p>
													</Box>
												</Box> */}
													<Detail layout={false} name={detailNameForMedium} number={detailNumberForMedium} data={details}/>
												{/* bottom  */}
												<Box className="w-[300px] flex flex-col items-center mt-[10px] gap-[5px]">
													<Box className="w-full relative h-[160px] border-[1px] border-[#e6e6e6] bg-white  rounded-md">
														{isSuccess && <Data2 details={details} />}
													</Box>
													<Box className="w-full h-[71px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
														<Dates fontSize={"11px"} fontSizeTwo={"14px"} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
													</Box>
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						</>
					)}
				</Box>
				{/* Laptop and Desktop Size */}
				{/* <Box className="max-xl:hidden w-full h-auto flex justify-center items-center gap-[20px]"> */}
					{isDefaultLayout ? (
						<>
							{/* <Box className="w-full xl:h-[640px] 2xl:h-[1200px] flex justify-center items-center gap-x-[20px]"> */}
							<Grid>
								{/* Left Container */}
								<Grid.Col span={4}>
									<motion.div 
										initial={{ opacity: 0 }} 
										animate={{ opacity: 1 }} 
										transition={{ ease: "easeOut", duration: 1 }}
									>
										{/* <Box className="bg-white 2xl:hidden w-full h-[640px] rounded-md"> */}
										<Box bg={{base: '#A2CBFE'}} className="rounded-md">
											<Suspense fallback={<Loading width={"35vw"} />}>
												<DataMap3 height={"1140px"}/>
											</Suspense>					
										</Box>	
										{/* <Box className="bg-white rounded-md">
											<Suspense fallback={<Loading />}>
												<DataMap3 width={"640px"} height={"1200px"}/>
											</Suspense>
										</Box> */}
									</motion.div>
								</Grid.Col>
								{/* Parent Right Container */}
								<Grid.Col span={8}>
									{/* <Box className=" w-[70%] xl:h-[640px] 2xl:h-[1200px] flex flex-col gap-y-[14px] "> */}
									<Box>
										{/*Top Right Container */}
										<Box
											className={`p-[20px] bg-white w-full xl:h-[256px] 2xl:h-[480px] rounded-md flex justify-center items-center `}
										>
											{!isFullWidth && (
												<>
													{/*1 container */}
													<motion.Box
														initial={{ opacity: 0 }} 
														animate={{ opacity: 1 }} 
														transition={{ ease: "easeOut", duration: 1 }}
														// className="top-0 left-0 z-20 w-screen h-screen p-[5px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none fixed"
														className={
															// hoverClick === 0 ? 
															// "top-0 left-0 z-20 w-screen h-screen p-[5px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none fixed":
															"w-1/3 h-full p-[5px] hover:bg-[#dfdfdf] hover:bg-opacity-90 transition-all duration-300 ease-in-out rounded cursor-pointer  flex justify-center items-center"
														}
														// className="w-1/3 h-full p-[5px] hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer  flex justify-center items-center"
														onClick={() => {
															handleChartClick(0)
														}}
													>
														<Suspense fallback={<Loading />}>
														<CLineChart
															newDataResult={dataResult}
															labels={labels}
															dataResult={dataResult}
															width={smallChartWidth}
															height={smallChartHeight}
														/>
														</Suspense>
													</motion.Box>
													<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1"></Box>
													{/*2 container */}
													<motion.Box
														initial={{ opacity: 0 }} 
														animate={{ opacity: 1 }} 
														transition={{ ease: "easeOut", duration: 1 }}
														className="w-1/3  h-full p-[5px]  hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center"
														onClick={() => handleChartClick(1)}
													>
														<CLineChartStacked 
															paramResult={resultedParamNames}
															newDataResult={newData}
															dataResult={dataResult}
															width={smallChartWidth}
															height={smallChartHeight}
														/>
													</motion.Box>
													<Box className="w-[1px] h-4/5 bg-[#4d5eb2] border-dashed border-1"></Box>
													{/* 3 container */}
													<motion.Box
														initial={{ opacity: 0 }} 
														animate={{ opacity: 1 }} 
														transition={{ ease: "easeOut", duration: 1 }}
														className="w-1/3 h-full p-[5px] transition-all duration-300 ease-in-out  hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer flex justify-center items-center"
														onClick={() => handleChartClick(2)}
													>
														{isSuccess && 
															<Suspense fallback={<Loading />}>
																<CStackedBarChart
																	datasets={dataResult}
																	labels={labels}
																	width={smallChartWidth}
																	height={smallChartHeight}
																/>
															</Suspense>
														}
													</motion.Box>
												</>
											)}
											{isFullWidth && (
												<>
													<Box className="w-full  xl:h-[256px] 2xl:h-[450px] flex justify-center items-center py-[15px]">
														{/* Left Navigate button */}
														<button  
															className="fixed left-0 top-1/2 transform -translate-y-1/2 mr-[10px] text-[30px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none z-30"  
															onClick={() => setActiveChart((activeChart - 1 + 3) % 3)}  
														>  
															&lt;  
														</button> 
														<Box className="w-full xl:h-[256px] 2xl:h-[470px]  flex justify-center items-center">
															<Box>
																{activeChart === 0 && (
																<Box
																	// "top-0 left-0 z-20 w-screen h-screen p-[5px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none fixed":
																	className="transition-all duration-300 ease-in-out fixed top-0 left-0 z-20 w-screen h-screen p-[55px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none"
																>
																<Suspense fallback={<Loading />}>
																	<CLineChart
																		newDataResult={dataResult}
																		labels={labels}
																		dataResult={dataResult}
																		width={mediumChartWidth}
																		height={mediumChartHeight}
																	/>
																</Suspense>
																<button
																	className={`transition-all duration-300 ease-in-out fixed bottom-0 right-[2px] w-[50px] h-[50px] font-bold py-2 px-4 rounded`}
																	onClick={() => setIsFullWidth(!isFullWidth)}
																>
																		<img src={Min} className="w-[25px] h-[25px] z-50 text-black" />
																</button>
																</Box>
																)}
															</Box>
															<Box>
																{activeChart === 1 && (
																	<Box
																	// "top-0 left-0 z-20 w-screen h-screen p-[55px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none fixed":
																	className="transition-all duration-300 ease-in-out fixed top-0 left-0 z-20 w-screen h-screen p-[55px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none"
																	>
																		<Suspense fallback={<Loading />}>
																			<CLineChartStacked 
																				paramResult={resultedParamNames}
																				newDataResult={newData}
																				dataResult={dataResult}
																				width={mediumChartWidth}
																				height={mediumChartHeight}
																			/>
																		</Suspense>
																		<button
																			className={`fixed bottom-0 right-[2px] w-[50px] h-[50px] font-bold py-2 px-4 rounded`}
																			onClick={() => setIsFullWidth(!isFullWidth)}
																		>
																			<img src={Min} className="w-[25px] h-[25px] z-50 text-black" />
																		</button>
																	</Box>
																)}
															</Box>
															<Box>
																{isSuccess && activeChart === 2 && (
																<Box
																	// "top-0 left-0 z-20 w-screen h-screen p-[55px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none fixed":
																	className="transition-all duration-300 ease-in-out fixed top-0 left-0 z-20 w-screen h-screen p-[55px] bg-white rounded cursor-pointer flex justify-center items-center scroll-none"
																>
																	<Suspense fallback={<Loading />}>
																	<CStackedBarChart
																		datasets={dataResult}
																		labels={labels}
																		width={mediumChartWidth}
																		height={mediumChartHeight}
																	/>
																	</Suspense>
																	<button
																		className={`fixed bottom-0 right-[2px] w-[50px] h-[50px] font-bold py-2 px-4 rounded`}
																		onClick={() => setIsFullWidth(!isFullWidth)}
																	>
																		<img src={Min} className="w-[25px] h-[25px] z-50 text-black" />
																	</button>
																</Box>
																)}
															</Box>
														</Box>
														{/* Right Navigate Button */}
														<button
															className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-[10px] text-[30px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none z-30"  
															onClick={() => setActiveChart((activeChart + 1) % 3)}
														>
															&gt;
														</button>
													</Box>
												</>
											)}
											{/* <button
												className={`absolute bottom-0 right-[2px] w-[50px] h-[50px]  font-bold py-2 px-4 rounded`}
												onClick={() => setIsFullWidth(!isFullWidth)}
											>
												{!isFullWidth ? (
													<img src={Min} className="w-[25px] h-[25px] z-50 text-black" />
												) : (
													<img src={Max} className="w-[25px] h-[25px]" />
												)}
											</button> */}
										</Box>
										<Space h={"md"}/>
										{/*Under Right Container  */}
										<Box className="bg-white w-full xl:h-[384px] 2xl:h-[640px] flex items-center rounded-md p-[20px]">
											<Box className="w-full h-full bg-[#e6e6e6] flex justify-between items-center p-[20px]">
												{/* Inner Left Container */}
												<Stack className="w-2/5  h-full  gap-[16px] xl:gap-[14px] 2xl:gap-[25px] mt-[50px]">
													<Box className="flex items-center justify-between mr-1">
														{/* <Menu trigger="hover" position="bottom-left" width={165} isFullWidth={true}>
														<Menu.Target trigger="hover">
															<Button
																variant="transparent"
																radius="sm">
																<h2 className="text-black font-bold 2xl:text-[24px]">Myanmar</h2>
																<ChevronDown fill="black" strokeWidth="2"/>
															</Button>
														</Menu.Target>
														<Menu.Dropdown trigger="hover">
														{
															states.map(state=>{
																return <Menu.Item key={state.name} isFullWidth={true}>{capitalizeFirstLetter(state.name)}</Menu.Item>
															})
														}
														</Menu.Dropdown>
														</Menu> */}
														<MapFilterSelect />
														<Box className=" flex justify-end gap-[12px] p-0">
															{/* <button>
																<img src={L1} 	className={`${
																	isDefaultLayout
																		? "bg-[#1B59F8] "
																		: "bg-[#1B59F842]"
																} w-[30px] h-[30px] p-1 rounded`}
																onClick={() => setIsDefaultLayout(true)}/>
															</button>
															<button
																
															>
																<img src={L2} className={` ${
																	isDefaultLayout
																		? "bg-[#1B59F842]"
																		: "bg-[#1B59F8]"
																} w-[30px] h-[30px] p-1 rounded`}
																onClick={() => setIsDefaultLayout(false)}/>
															</button> */}
															<button onClick={()=>setIsDefaultLayout(true)}>
																<FirstLayout color={isDefaultLayout ? '#1B59F8' : '#1B59F842'}/>
															</button>
															<button onClick={()=>setIsDefaultLayout(false)}>
																<SecondLayout color={!isDefaultLayout? '#1B59F8' : '#1B59F842'}/>
															</button>
														</Box>
													</Box>
													<Box className="mb-[7px] bg-[#ffff] border w-auto py-3 lg:w-72 rounded-md px-3 flex items-center">
														<img
															src={calendar}
															className="w-[12px] h-[12px] 2xl:w-[20px] 2xl:h-[20px] text-white"
														/>
														<p className="text-black text-[12px] 2xl:text-[12px] ml-[16px] font-poppins-400">
															{ timeSpan }
														</p>
													</Box>

													<Box className="flex items-center mb-[7px] xl:pl-[5px]">
														<img
															src={M}
															className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-black"
														/>
														<p className="text-black text-[11px] 2xl:text-[12px] font-[500] ml-[10px]">
															{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
														</p>
													</Box>
													<Box className="2xl:hidden w-full h-[170px]  ">
														{isSuccess && data && <TextSectionCard data={news} height={"170px"} />}
													</Box>
													<Box className="max-2xl:hidden w-full h-[350px]">
														<TextSectionCard2 height={'350px'}/>
													</Box>
												</Stack>
												{/* Vertical Dashed Line */}
												<Box className="w-[1px] h-[90%] bg-[#4d5eb2] border-dashed border-1 mx-[20px]"></Box>
												{/* Inner Right Container */}
												<Box className="">
													{/* top */}
													{ isSuccess && <Detail layout={true} name={detailNameForLarge} number={detailNumberForLarge} data={details}/>}
													{/* bottom  */}
													<Box className="relative w-full flex justify-between items-center mt-[10px] 3xl:mt-[100px] gap-[60px] xl:gap-[10px]">
														<Box className="w-2/3 h-[220px] 3xl:w-[60%] 2xl:w-[350px] 2xl:h-[355px] border-[1px] border-[#e6e6e6] bg-white pt-5 relative flex items-start rounded-md">
															{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
														</Box>
														<Box className="w-1/3 h-[220px] 2xl:w-[40%] 3xl:w-[40%] 2xl:h-[355px] border-[1px] border-[#e6e6e6] bg-white rounded-md flex justify-center items-center">
															<Dates2 startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
														</Box>
													</Box>
												</Box>
											</Box>
										</Box>
									</Box>
								</Grid.Col>
							</Grid>
							{/* </Box> */}
						</>
					) : (
						<>
							{/* Parent Container */}
							<Box className="w-full h-auto flex flex-col justify-center items-center">
								{/* Top Container */}
								<Box
									className={`relative bg-white w-full h-[250px] xl:h-[256px] 2xl:h-[380px]  rounded-md flex justify-center items-center gap-[10px] p-[18px] mb-[20px]`}
								>
									{!isFullWidth && (
										<>
											{/*1 container */}
											<Box
												className="w-1/3 h-full hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer transition-all duration-300 ease-in-out flex justify-center"
												onClick={() => handleChartClick(0)}
											>
												<Suspense fallback={<Loading />}>
												<CLineChart
													newDataResult={dataResult}
													labels={labels}
													dataResult={dataResult}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>
												</Suspense>
											</Box>
											<Box className="w-[1px] h-[90%] bg-[#4d5eb2] border-dashed border-1"></Box>
											{/*2 container */}
											<Box
												className="w-1/3 h-full transition-all duration-300 ease-in-out  hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(1)}
											>
											<Suspense fallback={<Loading />}>
												<CLineChartStacked 
													paramResult={resultedParamNames}
													newDataResult={newData}
												    dataResult={dataResult}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>
											</Suspense>
											</Box>
											<Box className="w-[1px] h-[90%] bg-[#4d5eb2] border-1 border-dashed"></Box>
											{/* 3 container */}
											<Box
												className="w-1/3 h-full z-10 transition-all duration-300 ease-in-out hover:bg-[#dfdfdf] hover:bg-opacity-90 rounded cursor-pointer flex justify-center"
												onClick={() => handleChartClick(2)}
											>
												{isSuccess && 
												<Suspense fallback={<Loading />}>
												<CStackedBarChart
													datasets={dataResult}
													labels={labels}
													width={smallChartWidthTwo}
													height={smallChartHeightTwo}
												/>
												</Suspense>
												}
											</Box>
										</>
									)}
									{isFullWidth && (
										<>
											<Box className="w-full xl:h-[256px] 2xl:h-[380px]  flex justify-between items-center p-[10px]">
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
												<Box className="w-full xl:h-[256px] 2xl:h-[380px]  flex justify-center items-center">
													<Box
														className={`chart-transition ${
															activeChart === 0 ? "active" : ""
														}`}
													>
														{activeChart === 0 && (
															<Suspense fallback={<Loading />}>
															<CLineChart
																newDataResult={dataResult}
																labels={labels}
																dataResult={dataResult}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
															</Suspense>
														)}
													</Box>
													<Box
														className={`chart-transition ${
															activeChart === 1 ? "active" : ""
														}`}
													>
														{activeChart === 1 && (
														<Suspense fallback={<Loading />}>
															<CLineChartStacked 
																paramResult={resultedParamNames}
																newDataResult={newData}
															    dataResult={dataResult}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
														</Suspense>
														)}
													</Box>
													<Box
														className={`chart-transition ${
															activeChart === 2 ? "active" : ""
														}`}
													>
														{isSuccess && activeChart === 2 && (
															<Suspense fallback={<Loading />}>
															 <CStackedBarChart
															 	datasets={dataResult}
															 	labels={labels}
																width={fullChartWidth}
																height={fullChartHeight}
															/>
															</Suspense>
														)}
													</Box>
												</Box>
												{/* Right Navigate Button */}
												<button
													className=" text-[40px] text-blue-500 font-bold hover:text-[#32daff] focus:outline-none"
													onClick={() => setActiveChart((activeChart + 1) % 3)}
												>
													&gt;
												</button>
											</Box>
											<Box className="hidden">
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
											</Box>
										</>
									)}
									<button
										className="absolute bottom-0  right-0 w-[50px] h-[50px] z-20 bg-white font-bold py-2 px-4 rounded"
										onClick={() => setIsFullWidth(!isFullWidth)}
									>
										{isFullWidth ? (
											<img src={Min} className="w-[20px] h-[20px]" />
										) : (
											<img src={Max} className="w-[20px] h-[20px]" />
										)}
									</button>
								</Box>
								{/* Bottom Parent Container */}
								{/* <motion.Box 
									initial={{ opacity: 0 }} 
									animate={{ opacity: 1 }} 
									transition={{ ease: "easeOut", duration: 1 }}
									className="w-[30%] h-full rounded-md"
								>
									<Box className="bg-white 2xl:hidden w-full h-[640px] rounded-md">
										<Suspense fallback={<Loading width={"370px"} height={"640px"} />}>
											<DataMap3 width={"full"} height={"640px"} />
										</Suspense>						
									</Box>
									<Box className="bg-white max-2xl:hidden w-full h-[1200px] rounded-md">
										<Suspense fallback={<Loading width={"370px"} height={"1200px"} />}>
											<DataMap3 width={"full"} height={"1200px"} />
										</Suspense>
									</Box>
								</motion.Box> */}
								<Box className="w-full h-auto flex justify-between rounded-md">
									<motion.div 
										initial={{ opacity: 0 }} 
										animate={{ opacity: 1 }} 
										transition={{ ease: "easeOut", duration: 1 }}
										className="rounded-md mr-[20px] w-[30%]"
									>
										{/* <Box className="bg-white 2xl:hidden w-full h-[640px] rounded-md">
											<Suspense fallback={<Loading width={"370px"} height={"640px"} />}>
												<DataMap3 width={"full"} height={"640px"} />
											</Suspense>						
										</Box> */}
										<Box className="w-full h-[800px] rounded-md mr-[20px]" bg={{base: '#A2CBFE'}}>
											<Suspense fallback={<Loading />}>
												{!isFullWidth &&<DataMap3 height={"800px"} />}
											</Suspense>
										</Box>
									</motion.div>
									{/*Bottom Right Container  */}
									<Box className="bg-white w-[70%] h-[640px] 2xl:h-[800px] flex rounded-md p-[20px]">
										<Box className="w-full h-full bg-[#e6e6e6] rounded flex items-center p-[20px]">
											{/* Inner Left Container */}
											{/* <Box className="w-1/2 h-full justify-center xl:gap-[20px] flex flex-col gap-[25px]">
												<Box className="flex items-center justify-between mr-1 ">
													<MapFilterSelect />

													<Box className="flex justify-end gap-[12px] p-0">
														<button onClick={()=>setIsDefaultLayout(true)}>
															<FirstLayout color={isDefaultLayout ? '#1B59F8' : '#1B59F842'}/>
														</button>
														<button onClick={()=>setIsDefaultLayout(false)}>
															<SecondLayout color={!isDefaultLayout? '#1B59F8' : '#1B59F842'}/>
														</button>
													</Box>
												</Box>
												<Box className="mb-[7px] bg-[#ffff] border w-auto py-3 lg:w-72 rounded-md px-3 flex items-center">
													<img
														src={Cicon}
														className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-white"
													/>
													<p className="text-black text-[12px] 2xl:text-[16px] ml-[16px] font-poppins">
														{ timeSpan }
													</p>
												</Box>
												<Box className="flex items-center mb-[7px] xl:pl-[5px]">
													<img
														src={M}
														className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-black"
													/>
													<p className="text-black text-[11px] 2xl:text-[14px] font-[500] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</Box>
												<Box className="w-full 3xl:hidden max-h-[350px] ">
													<TextSectionCard2 height={"350px"} />
												</Box>
												<Box className="w-full max-3xl:hidden h-[400px]">
													<TextSectionCard2  height={"400px"}/>
												</Box>
											</Box> */}
											<Stack className="w-[50%] h-[80%]">
												<Box className="flex items-center justify-between mr-1">
													<MapFilterSelect />
													<Box className=" flex justify-end gap-[12px] p-0">
														<button onClick={()=>setIsDefaultLayout(true)}>
															<FirstLayout color={isDefaultLayout ? '#1B59F8' : '#1B59F842'}/>
														</button>
														<button onClick={()=>setIsDefaultLayout(false)}>
															<SecondLayout color={!isDefaultLayout? '#1B59F8' : '#1B59F842'}/>
														</button>
													</Box>
												</Box>
												<Box className="mb-[7px] bg-[#ffff] border w-auto py-3 lg:w-72 rounded-md px-3 flex items-center">
														<img
															src={calendar}
															className="w-[12px] h-[12px] 2xl:w-[20px] 2xl:h-[20px] text-white"
														/>
														<p className="text-black text-[12px] 2xl:text-[12px] ml-[16px] font-poppins-400">
															{ timeSpan }
														</p>
												</Box>
												<Box className="flex items-center mb-[7px] xl:pl-[5px]">
													<img
														src={M}
														className="w-[15px] h-[15px] 2xl:w-[25px] 2xl:h-[25px] text-black"
													/>
													<p className="text-black text-[11px] 2xl:text-[12px] font-[500] ml-[10px]">
														{isSuccess && data.myanmar_lat + ',' + data.myanmar_long}
													</p>
												</Box>
												<Box className="w-full h-[100px] border-[1px] border-[#e6e6e6] bg-white pt-2 rounded-md flex items-center">
													<Dates fontSize={"14px"} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
												</Box>
												<Box className="relative 4xl:hidden w-full flex flex-col items-center 2xl:mt-0 2xl:gap-[40px] gap-[10px]">
													<Box className="w-full border-[1px] border-[#e6e6e6] bg-white rounded-md relative top-2">
														{isSuccess && <Data details={details} dataAll={data} setDataResult={setDataResult} dataResult={dataResult}/>}
													</Box>
												</Box>
											</Stack>
											{/* Vertical Dashed Line */}
											<Box className="mx-[20px] h-[90%] relative w-[1px] bg-[#4d5eb2] border-1 border-dashed">
												<Box className="absolute  h-full border-dashed border-gray-300"></Box>
											</Box>
											{/* Inner Right Container */}
											<Stack className="w-[50%] h-[80%]">
												{/* top */}
												{isSuccess && <Detail layout={false} name={detailNameForLarge} number={detailNumberForLarge} data={details} />}
												{/* bottom  */}
												
												<Box className="max-2xl:hidden w-full">
													{isSuccess && data && <TextSectionCard2 data={news} height={"200px"} />}
												</Box>
											</Stack>
										</Box>
									</Box>

								</Box>
							</Box>
						</>
					)}
				{/* </Box> */}
			</Box>
	);
};

export default Dashboard;
