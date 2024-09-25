import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from 'react-router-dom';

import { states } from '../../../utils/sampleData'
import { capitalizeFirstLetter } from '../../../utils/utils';

const MapFilterSelect = () => {
    const [searchParams, setSearchparams] = useSearchParams()
    return (
        <div className="">
        <Select 
            radius="none"
            placeholder="Myanmar"
            defaultSelectedKeys={[""]}
            className="w-[200px] bg-white"
            classNames={{
                base: 'bg-white',
                placeholder: 'font-semibold text-3xl',
                listbox: 'bg-white'
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
                    "data-[selectable=true]:focus:bg-white",
                    "data-[pressed=true]:opacity-40",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                },
              }}
            popoverProps={{
                classNames: {
                  base: "before:bg-white rounded-none",
                  content: "p-0 border-small border-divider rounded-none",
                },
              }}
          >
            {states.map((state) => (
              <SelectItem key={state.key} onClick={()=>setSearchparams({filter_map: state.name})}
              >
                {capitalizeFirstLetter(state.name)}
              </SelectItem>
            ))}
          </Select>
        </div>
    )
}

export default MapFilterSelect