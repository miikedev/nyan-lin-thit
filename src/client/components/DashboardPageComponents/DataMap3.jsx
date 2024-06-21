import "../DashboardPageComponents/DataMap.css";
import React, { useState, useEffect } from "react";
import L, { tooltip } from "leaflet";
import { GeoJSON, MapContainer, useMap, Marker, Popup } from "react-leaflet";
import myanmarGeoJSON from "../DashboardPageComponents/assets2/state_region.json";
import townshipGeoJSON from "../DashboardPageComponents/assets2/township2.json";
import cityGeoJSON from "../DashboardPageComponents/assets2/cities.json";
import "leaflet/dist/leaflet.css";
import markerData from "../DashboardPageComponents/assets2/markerData";

const SetBounds = () => {
  const [initialBounds, setInitialBounds] = useState(null);
  const map = useMap();
  const defaultStyle = {
    fillColor: "#3551a4",
    fillOpacity: "1",
    color: "#83b4d4",
    weight: "1",
  };
  const highlightedStyle = {
    color: "#ff0000",
    weight: "3",
  };

  const resetZoom = () => {
    map.fitBounds(initialBounds);
  };

  useEffect(() => {
    // Create layer groups for states and townships
    const stateLayerGroup = L.layerGroup().addTo(map); // Initially added to map
    const cityLayerGroup = L.layerGroup();
    const townshipLayerGroup = L.layerGroup(); // Not added to map initially

    // Define state layer with onEachFeature logic
    const stateLayer = new L.GeoJSON(myanmarGeoJSON, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.ST) {
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
          if (feature.properties.ST === "Tanintharyi") {
            L.tooltip({
              permanent: true,
              direction: "center",
              className: "map-label",
            })
              .setLatLng([12.0825, 98.6586])
              .setContent("Tanintharyi")
              .addTo(map);
          } else if (feature.properties.ST === "Yangon") {
            L.tooltip({
              permanent: true,
              direction: "center",
              className: "map-label",
            })
              .setLatLng([16.8661, 96.1951])
              .setContent("Yangon")
              .addTo(map);
          } else {
            layer.bindTooltip(feature.properties.ST, {
              permanent: true,
              direction: "center",
              className: "map-label",
            });
            // .openTooltip();
          }
          layer.addTo(stateLayerGroup); // Add each layer to the state layer group
        }
      },
    });

    // Define city layer with onEachFeature logic
    const cityLayer = new L.GeoJSON(cityGeoJSON, {
      onEachFeature: (feature, layer) => {
        // Attach tooltips or any interactions here
        layer.bindTooltip(feature.properties.NAME, {
          permanent: true,
          direction: "center",
          className: "my-custom-tooltip",
          
        });
       
        layer.addTo(cityLayerGroup); // Add each layer to the township layer group
      },
      pointToLayer: (feature, latlng) => {
        // Attach tooltips or any interactions here
        const layer = L.marker(latlng, {
          icon: L.divIcon({
            className: 'custom-city-marker', // Apply a custom CSS class
            iconSize: [0, 0], // Adjust the size as needed
          }),
        });
        return layer;
      }
      
     
    });

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
          layer.bindTooltip(feature.properties.ts_eng, {
            permanent: true,
            direction: "center",
            className: "my-custom-tooltip",
          });

         
          layer.addTo(townshipLayerGroup); // Add each layer to the township layer group
        }
      },
    });

    // Fit map bounds to state layer initially
    const bounds = stateLayer.getBounds();
    map.fitBounds(bounds);
    setInitialBounds(bounds);
    map.setMaxZoom(16);
    map.setMinZoom(4);
    stateLayer.setStyle(defaultStyle);
    cityLayer.setStyle(defaultStyle);
    townshipLayer.setStyle(defaultStyle);

    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      console.log('current Zoom:',currentZoom)
      if (currentZoom < 7) {
        if (!map.hasLayer(stateLayerGroup)) {
          map.addLayer(stateLayerGroup);
        }
        if (map.hasLayer(cityLayerGroup)) {
          map.removeLayer(cityLayerGroup);
        }
        if (map.hasLayer(townshipLayerGroup)) {
          map.removeLayer(townshipLayerGroup);
        }
      } else if (currentZoom >= 7 && currentZoom < 10) {
        if (map.hasLayer(stateLayerGroup)) {
          map.removeLayer(stateLayer);
        }
        if (!map.hasLayer(cityLayerGroup)) {
          map.addLayer(cityLayerGroup);
        }
        if (map.hasLayer(townshipLayerGroup)) {
          map.removeLayer(townshipLayerGroup);
        }
      } else {
        if (map.hasLayer(stateLayerGroup)) {
          map.removeLayer(stateLayer);
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
      map.removeLayer(stateLayerGroup);
      map.removeLayer(cityLayerGroup);
      map.removeLayer(townshipLayerGroup);
    };
  }, [map]);

  return (
    <div>
      <button
        className="reset-zoom-button"
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

const DataMap3 = ({ width, height }) => {
  // if (zoom === undefined) {
  //   zoom = true;
  // }
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
  

  return (
    <div className="">
      {console.log(`${width} ${height}`)}
      <MapContainer
        id="leaflet-container"
        {...zoomPropperties}
        className={` border-2 w-[${width}] h-[${height}] rounded-[4px]  flex justify-center items-center`}
      >
        <SetBounds />
        {markerData.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={marker.icon}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DataMap3;

