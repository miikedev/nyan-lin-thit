import { style } from "d3";

export function ToolTipForStates(feature, map, L,layer) {
    if (feature.properties.ST === "Tanintharyi") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([13.5167, 98.2167])
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
      } else if (feature.properties.ST === "Mon") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([16.3031, 97.7090])
          .setContent("Mon")
          .addTo(map);
      } else if (feature.properties.ST === "Kayin") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([16.8650, 97.6170])
          .setContent("Kayin")
          .addTo(map);
      } else if (feature.properties.ST === "Ayeyarwady") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([16.7985, 95.1239])
          .setContent("Ayeyarwady")
          .addTo(map);
      } else if (feature.properties.ST === "Bago") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([18.0750, 96.4404])
          .setContent("Bago")
          .addTo(map);
      } else if (feature.properties.ST === "Chin") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([22.0000, 93.5000])
          .setContent("Chin")
          .addTo(map);
      } else if (feature.properties.ST === "Kachin") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([25.5667, 97.1667])
          .setContent("Kachin")
          .addTo(map);
      } else if (feature.properties.ST === "Kayah") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([19.2983, 97.2983])
          .setContent("Kayah")
          .addTo(map);
      } else if (feature.properties.ST === "Magway") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([20.1544, 94.9321])
          .setContent("Magway")
          .addTo(map);
      } else if (feature.properties.ST === "Mandalay") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([21.9747, 96.0836])
          .setContent("Mandalay")
          .addTo(map);
      } else if (feature.properties.ST === "Rakhine") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([20.5000, 93.5000])
          .setContent("Rakhine")
          .addTo(map);
      } else if (feature.properties.ST === "Sagaing") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([23.9871, 95.9788])
          .setContent("Sagaing")
          .addTo(map);
      } else if (feature.properties.ST === "Shan (East)") {
        L.tooltip({
          permanent: true,
          direction: "center",
          className: "map-label",
        })
          .setLatLng([21.565285, 98.491369])
          .setContent("Shan")
          .addTo(map);
        // console.log(feature.properties.DT)
        // console.log(feature.geometry.coordinates[0][0][Math.floor((feature.geometry.coordinates[0][0]).length/2)])
        // L.setLatLng(feature.geometry.coordinates[0][0][Math.floor((feature.geometry.coordinates[0][0]).length/2)]).setContent(feature.properties.DT_MMR)
        // layer.bindTooltip(feature.properties.DT, {
        //   permanent: true,
        //   direction: "center",
        //   className: "map-label",
        // });
}
}