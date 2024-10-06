import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';

import { states } from '../../../utils/sampleData'
import { capitalizeFirstLetter } from '../../../utils/utils';
import { useDashboardGeoJsonFilterContext } from "../../context/DashboardGeoJsonContext";
import myanmarGeoJson from '../DashboardPageComponents/assets2/myanmar_geo.json'

const MapFilterSelect = () => {
    const {setFilteredGeoJson} = useDashboardGeoJsonFilterContext();
    const [searchParams, setSearchparams] = useSearchParams()
    const [value, setValue] = useState(new Set([]));
    console.log('select value', value)
    function handleOnChange(event) {
      console.log(event.target.value)
      const filteredData = myanmarGeoJson.features.filter(i => i.properties.ST === event.target.value)
      // const mergedCoordinates = filteredData.map(item => {
      //   const result = []
      //   // Flatten the coordinates array and return the merged lat/lng array
      //   let flat = item.geometry.coordinates.flat(3); // Flatten nested arrays into a single array
      //   flat.forEach(i => result.append(i[0]))
      //   return result
      // });
      const mergedCoordinates = filteredData.map(item => {
        const result = [];
        // Flatten the coordinates array and return the merged lat/lng array
        let flat = item.geometry.coordinates.flat(3); // Flatten nested arrays into a single array
        // Push both lat and lng as a pair
        console.log('flat',flat)
        flat.forEach(i => result.push(i.toFixed(4)))
        console.log(result.sort());
        return [Number(result[0]),Number(result[result.length - 1])]
      });
      console.log('merged coordinates', mergedCoordinates)
    }
    return (
        <div className="">
        <Select 
            radius="sm"
            placeholder="Myanmar"
            defaultSelectedKeys={[""]}
            withScrollArea={true}
            selectedKeys={value}
            onSelectionChange={setValue}
            onChange={(event)=>{
              handleOnChange(event)
            }}
            className="w-[200px] font-poppins_bold font-[700] placeholder:font-bold rounded-sm"
            classnames={{
              wrapper: 'font-bold rounded-md',
              input: 'rounded-md text-[20px]',
              base: 'text-[16px]'
            }}
            listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md",
                    "text-black",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-white",
                    "dark:data-[hover=true]:bg-white",
                    "data-[selectable=true]:focus:bg-[#A2CBFE]",
                    "data-[pressed=true]:opacity-40",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                },
              }}
            popoverProps={{
                classNames: {
                  base: "before:bg-white rounded-md",
                  content: "p-0 border-small border-divider rounded-none",
                },
              }}
          >
            {states.map((state) => (
              <SelectItem key={state.name} className="font-poppins">
                {capitalizeFirstLetter(state.name)}
              </SelectItem>
            ))}
          </Select>
        </div>
    )
}

export default MapFilterSelect