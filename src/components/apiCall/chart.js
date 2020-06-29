import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import CountryPicker from "../CountryPicker";
import Line_Chart from "../LineChart";
import { Data_Table } from "../../Data";
const Header = () => {
  const [data, setData] = useState({});
  const [country, setcountry] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://corona.lmao.ninja/v2/countries"
      );
      setData(response.data);
    }
    fetchData();
  }, []);

  const handleCountryChange = async (country) => {
    const response = await axios.get(
      `https://corona.lmao.ninja/v2/countries/${country}`
    );

    setData(response);
    setcountry(country);
  };
  return (
    <div>
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Line_Chart data={data} country={country} />
      {/* <Data_Table data={data} country={country}/> */}
      {/* <Data_Table/> */}
    </div>
  );
};

export default Header;
