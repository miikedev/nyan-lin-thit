// import {icon1Object,icon2Object,icon3Object,icon4Object,icon5Object} from './../Components/DashboardPageComponents/DataMap';

// Marker Icon and Data
import icon1 from './airStrike.svg';
import icon2 from './armed.svg';
import icon3 from './massacre.svg';
import icon4 from './casualty.svg';
import icon5 from './arrest.svg';

// Create custom icon objects
const icon1Object = L.icon({
    iconUrl: icon1,
    iconSize: [13, 13],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
  const icon2Object = L.icon({
    iconUrl: icon2,
    iconSize: [13, 13],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
  const icon3Object = L.icon({
    iconUrl: icon3,
    iconSize: [13, 13],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
  const icon4Object = L.icon({
    iconUrl: icon4,
    iconSize: [13, 13],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
  const icon5Object = L.icon({
    iconUrl: icon5,
    iconSize: [13, 13],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
const markerData = [
	{ position: [22.28525,	95.450677], icon: icon1Object, popupText: "Airstrike" },
	{ position: [21.7957566	,94.1575177], icon: icon2Object, popupText: "Armed Clashes" },
	{ position: [22.6427551	,93.6096217], icon: icon3Object, popupText: "Massacre" },
	{ position: [25.3971106	,95.5957194], icon: icon4Object, popupText: "Casualty" },
	{ position: [24.8688705	,94.9168779], icon: icon5Object, popupText: "Arrest" },
	{ position: [25.6123483	,96.3125388], icon: icon1Object, popupText: "Airstrike" },
	{ position: [18.06496,	97.444878], icon: icon2Object, popupText: "Armed Clashes" },
	{ position: [19.4146408	,97.1295212], icon: icon3Object, popupText: "Massacre" },   
	{ position: [23.2589046,	98.136046], icon: icon4Object, popupText: "Casualty" },
	{ position: [24.2226633	,96.1411781], icon: icon5Object, popupText: "Arrest" },
	// Add more marker objects as needed
];
export default markerData;