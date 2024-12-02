import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';

import { capitalizeFirstLetter } from '../../../utils/utils';
// Import the JSON data
import stateAndTownshipData from '../DashboardPageComponents/assets2/st_and_ts.json';

const MapFilterSelect = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedTownship, setSelectedTownship] = useState("");
  const [townshipOptions, setTownshipOptions] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const state = stateAndTownshipData.find(s => s.state === selectedState.currentKey);
      setTownshipOptions(state ? state.townships : []);
      setSelectedTownship("");
    } else {
      setTownshipOptions([]);
      setSelectedTownship("");
    }
  }, [selectedState]);

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleTownshipChange = (value) => {
    console.log('handleTownshipChange', value);
    setSelectedTownship(value);
    // Here you can add logic to filter your GeoJSON data based on the selected township
    // For example:
    // const filteredData = myanmarGeoJson.features.filter(i => i.properties.TS === value);
    // setFilteredGeoJson(filteredData);
  };
  console.log('selectedState', selectedState.currentKey);
  console.log('townshipOption', townshipOptions);
  return (
    <div className="flex space-x-4">
      <Select 
        label="Select State"
        placeholder="Select a state"
        value={selectedState}
        onSelectionChange={handleStateChange}
        className="w-[200px]"
      >
        {stateAndTownshipData.map((state) => (
          <SelectItem key={state.state} value={state.state}>
            {capitalizeFirstLetter(state.state)}
          </SelectItem>
        ))}
      </Select>

      <Select 
        label="Select Township"
        placeholder="Select a township"
        value={selectedTownship}
        onSelectionChange={handleTownshipChange}
        className="w-[200px]"
        isDisabled={!selectedState}
      >
        {townshipOptions.map((township) => (
          <SelectItem key={township} value={township}>
            {capitalizeFirstLetter(township)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default MapFilterSelect;