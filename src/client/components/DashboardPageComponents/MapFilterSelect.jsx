import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from 'react-router-dom';

import { states } from '../../../utils/sampleData'
import { capitalizeFirstLetter } from '../../../utils/utils';

const MapFilterSelect = () => {
    const [searchParams, setSearchparams] = useSearchParams()
    return (
        <div className="">
        <Select 
            radius="sm"
            placeholder="Myanmar"
            defaultSelectedKeys={[""]}
            withScrollArea={true}
            className="w-[200px] font-poppins_bold font-[700] placeholder:font-bold rounded-sm"
            classnames={{
              wrapper: 'font-bold rounded-md',
              input: 'rounded-md'
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
              <SelectItem key={state.key} onClick={()=>setSearchparams({state: state.name})} className="font-poppins"
              >
                {capitalizeFirstLetter(state.name)}
              </SelectItem>
            ))}
          </Select>
        </div>
    )
}

export default MapFilterSelect