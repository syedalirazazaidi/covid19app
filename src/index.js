import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Map from "./components/Map";
import * as serviceWorker from "./serviceWorker";
import Header from "./components/apiCall/chart";
// import { All_Data } from "./Data";
import logo from './virus.png'; 
ReactDOM.render(
  <React.StrictMode>
    <img className="corona" src={logo} alt="Logo" />
    <h1 style={{textAlign:"center",margin:'1rem auto',color:'red'}}>COVID19 Tracker App</h1>
    <Map />
    <Header />
    {/* <All_Data/> */}
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
