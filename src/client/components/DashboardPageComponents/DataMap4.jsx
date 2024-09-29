import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";

import { ToolTipForStates } from "../../../utils/tooltipForStates";
import { useDashboardMapData } from "../../apis/dashboardData";
import { useDashboardDateContext } from "../../context/DashboardDateContext";
import { useDashboardFilterContext } from "../../context/DashboardFilterContext";
import cityGeoJSON from "../DashboardPageComponents/assets2/cities.json";
import myanmarGeoJSONNew from "../DashboardPageComponents/assets2/myanmar_geo.json";
import stateGeoJson from '../DashboardPageComponents/assets2/state_region.json'
import townshipGeoJSON from "../DashboardPageComponents/assets2/township2.json";
import icon1 from './assets2/airStrike.svg';
import icon2 from './assets2/armed.svg';
import icon5 from './assets2/arrest.svg';
import icon4 from './assets2/casualty.svg';
import icon3 from './assets2/massacre.svg';

import "../DashboardPageComponents/DataMap.css";
import "leaflet/dist/leaflet.css";

// Define icon mapping outside the component
const iconMapping = {
  airstrikeIconObject: L.icon({
    iconUrl: icon1,
    iconSize: [9, 9],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  armed_clashesIconObject: L.icon({
    iconUrl: icon2,
    iconSize: [9, 9],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  massacreIconObject: L.icon({
    iconUrl: icon3,
    iconSize: [9, 9],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  casualtiesIconObject: L.icon({
    iconUrl: icon4,
    iconSize: [9, 9],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  arrestsIconObject: L.icon({
    iconUrl: icon5,
    iconSize: [9, 9],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};

const caseName = {
  1: "airstrikeIconObject",
  2: "armed_clashesIconObject",
  3: 'massacreIconObject',
  4: 'casualtiesIconObject',
  5: 'arrestsIconObject',
};

const SetBounds = () => {
  const [initialBounds, setInitialBounds] = useState(null);
  const [searchParams] = useSearchParams();
  const filter_map = searchParams.get('filter_map');  
  const map = useMap();
  
  const defaultStyle = {
    // fillColor: "#3551a4",
    fillColor: "#fcfdfd",
    fillOpacity: "1",
    color: "#767574",
    weight: ".75",
  };
  const highlightedStyle = {
    color: "#0000ff50",
    backgroundColor: "transparent",
    weight: "2",
  };
  const resetZoom = () => {
    map.fitBounds(initialBounds);
  };

  useEffect(() => {
    // Create layer groups for states and townships
    const districtLayerGroup = L.layerGroup().addTo(map); // Initially added to map
    const cityLayerGroup = L.layerGroup();
    const townshipLayerGroup = L.layerGroup(); // Not added to map initially
    // Define state layer with onEachFeature logic
    const districtLayer = new L.GeoJSON(myanmarGeoJSONNew, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.DT) {
        layer.addTo(districtLayerGroup);
          layer.on({
            mouseover: () => {
              layer.setStyle(highlightedStyle);
            },
            mouseout: () => {
              layer.setStyle(defaultStyle);
            },
            click: () => {
              map.fitBounds(layer.bindTooltip(feature.properties.DT,{
                className: "click-part"
              }).getBounds());
            },
          });
          
          layer.addEventListener('mouseenter', function() {
            layer.bindTooltip(feature.properties.DT_MMR, {
              permanent: true,
              direction: "center",
            });
          })
          // Attach tooltips or any interactions here
          ToolTipForStates(feature,map,L,layer)
          layer.addTo(map);
        }
    }});
    // const stateLayer = new L.GeoJSON(stateGeoJson, {
    //   onEachFeature: (feature, layer) => {
    //     if (feature.properties && feature.properties.ST) {
    //       layer.on({
    //         mouseover: () => {
    //           layer.setStyle(highlightedStyle);
    //         },
    //         mouseout: () => {
    //           layer.setStyle(defaultStyle);
    //         },
    //         click: () => {
              
    //           map.fitBounds(layer.getBounds());
    //         },
    //       });

    //       // Attach tooltips or any interactions here
    //       if (feature.properties.ST === "Tanintharyi") {
    //         L.tooltip({
    //           permanent: true,
    //           direction: "center",
    //           className: "map-label",
    //         })
    //           .setLatLng([12.0825, 98.6586])
    //           .setContent("Tanintharyi")
    //           .addTo(map);
    //       } else if (feature.properties.ST === "Yangon") {
    //         L.tooltip({
    //           permanent: true,
    //           direction: "center",
    //           className: "map-label",
    //         })
    //           .setLatLng([16.8661, 96.1951])
    //           .setContent("Yangon")
    //           .addTo(map);
    //       } else {
    //         layer.bindTooltip(feature.properties.ST, {
    //           permanent: true,
    //           direction: "center",
    //           className: "map-label",
    //         });
    //         // .openTooltip();
    //       }
    //       layer.addTo(stateLayerGroup); // Add each layer to the state layer group
    //     }
    //   },
    // });
    // Define township layer with onEachFeatureTownship logic
    const townshipLayer = new L.GeoJSON(townshipGeoJSON, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.ts_eng) {
          layer.on({
            mouseover: () => {
              layer.setStyle(highlightedStyle);
            },
            mouseout: () => {
              layer.setStyle(defaultStyle);
            },
            click: () => {
              
              map.fitBounds(layer.getBounds());
            },
          });
          // Attach tooltips or any interactions here
          layer.bindTooltip(feature.properties.ST, {
            permanent: true,
            direction: "center",
            className: "my-custom-tooltip",
          });
          layer.addTo(townshipLayerGroup); // Add each layer to the township layer group
        }
      },
    });
    // Fit map bounds to state layer initially
    const bounds = districtLayer.getBounds();
    map.fitBounds(bounds);
    setInitialBounds(bounds);
    map.setMaxZoom(16);
    map.setMinZoom(4);
    districtLayer.setStyle(defaultStyle);
    // cityLayer.setStyle(defaultStyle);
    townshipLayer.setStyle(defaultStyle);


    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < 7) {
        if (!map.hasLayer(districtLayerGroup)) {
          map.addLayer(districtLayerGroup);
        }
        if (map.hasLayer(cityLayerGroup)) {
          map.removeLayer(cityLayerGroup);
        }
        if (map.hasLayer(townshipLayerGroup)) {
          map.removeLayer(townshipLayerGroup);
        }
      } else if (currentZoom >= 7 && currentZoom < 10) {
        if (map.hasLayer(districtLayerGroup)) {
          map.removeLayer(districtLayer);
        }
        if (!map.hasLayer(cityLayerGroup)) {
          map.addLayer(cityLayerGroup);
        }
        if (map.hasLayer(townshipLayerGroup)) {
          map.removeLayer(townshipLayerGroup);
        }
      } else {
        if (map.hasLayer(districtLayerGroup)) {
          map.removeLayer(districtLayer);
        }
        if (map.hasLayer(cityLayerGroup)) {
          map.removeLayer(cityLayerGroup);
        }
        if (!map.hasLayer(townshipLayerGroup)) {
          map.addLayer(townshipLayerGroup);
        }
      }
    };

    map.on("zoomend", handleZoomEnd);
    // Clean up on component unmount
    return () => {
      map.off("zoomend", handleZoomEnd);
      map.removeLayer(districtLayerGroup);
      map.removeLayer(cityLayerGroup);
      map.removeLayer(townshipLayerGroup);
    };
  }, [map]);

  return (
    <div>
      <button
        className="reset-zoom-button z-20"
        onClick={resetZoom}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Reset Zoom
      </button>
    </div>
  );
};

const DataMap4 = ({ height }) => {
	const [searchParams] = useSearchParams();
  const selectedState = searchParams.get('filter_map');  

	const { startDate, setStartDate, endDate, setEndDate } = useDashboardDateContext();

  const { filterParams } = useDashboardFilterContext();
  const resultedParamId = useMemo(() => filterParams.map(param => param.id), [filterParams]);

  const resultedParamNames = useMemo(() => resultedParamId.map(id => caseName[id] || ""), [resultedParamId]);

  //fetching with react query
	const { data:mapData, isLoading:isMapLoading, isSuccess:isMapSuccess, isError:isMapError } = useDashboardMapData(
    new Date(startDate).toLocaleDateString('en-CA'), 
		new Date(endDate).toLocaleDateString('en-CA')
  )
  //filtering cases
  const filteredData = resultedParamNames.length > 0
    ? mapData.filter(region => resultedParamNames.includes(region.icon))
    : mapData;

  const zoomPropperties = {
    doubleClickZoom: true,
    closePopupOnClick: true,
    dragging: true,
    zoomSnap: true,
    zoomDelta: true,
    trackResize: false,
    touchZoom: false,
    zoomControl: true,
    scrollWheelZoom: false,
  };

  // Further filter by selected parameters (e.g., incident type)
  const displayedResult = filteredData?.map(data => ({
    ...data,
    icon: iconMapping[data?.icon]
  }));

  return (
      <MapContainer
        id="leaflet-container"
        {...zoomPropperties}
        // className={`border-none z-10`}
        className={`border-none shadow-sm rounded-md w-[100%] xl:h-[800px] flex justify-center items-center z-10 text-black`}
        // style={{width: width, height: height}}
      >
        <SetBounds />
        {
          displayedResult?.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={marker.icon}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))
        }
      </MapContainer>
  );
};

export default DataMap4;
