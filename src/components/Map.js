import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import "../App.scss";
import "mapbox-gl/dist/mapbox-gl.css";
 import Header from "./apiCall/chart";
mapboxgl.accessToken =
  "pk.eyJ1IjoienphbGlyYXphIiwiYSI6ImNrYjk1MGQ0azBhc3MyeXBpa3BsMWkwdW8ifQ.AklichPv1-cvlz2m7wY1iQ";
function Map() {
  const mapboxElRef = useRef(null); // DOM element to render map

  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude,
            ],
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths,
          },
        }))
      );

  const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);

  // Initialize our map
  useEffect(() => {
    if (data) {
      console.log(data, "ffffffff");
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [16, 27],
        zoom: 1.5,
        attributionControl: false,
      });

      // Add navigation controls to the top right of the canvas
      map.addControl(new mapboxgl.NavigationControl());

      map.once("load", function () {
        // Add our SOURCE
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data,
          },
        });

        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points", // this should be the id of source
          type: "circle",
          paint: {
            "circle-color": [
              "match",
              ["get", "ethnicity"],
              "White",
              "#fbb03b",
              "Black",
              "#223b53",
              "Hispanic",
              "#e55e5e",
              "Asian",
              "#3bb2d0",
              /* other */ "#ccc",
            ],
          },
        });
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        let lastId;
        map.on("mousemove", "circles", (e) => {
          const id = e.features[0].properties.id;
          if (id !== lastId) {
            lastId = id;
            const {
              cases,
              deaths,
              country,
              province,
            } = e.features[0].properties;
            // Change the pointer type on mouseenter
            map.getCanvas().style.cursor = "pointer";
            const coordinates = e.features[0].geometry.coordinates.slice();
            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const provinceHTML =
              province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
            const mortalityRate = ((deaths / cases) * 100).toFixed(2);
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : "";
            const HTML = `<p>Country: <b>${country}</b></p>
                ${provinceHTML}
                <p>Cases: <b>${cases}</b></p>
                <p>Deaths: <b>${deaths}</b></p>
                <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                ${countryFlagHTML}`;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on("mouseleave", "circles", function () {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }, [data]);

  return (
    <div className="App">
     
      <div className="mapContainer">
       
        <div className="mapBox flex" ref={mapboxElRef} >

        </div>

       {/* <div className='flex'>
        <Header/>

       </div> */}
      </div>
      
    </div>
  );
}

export default Map;
