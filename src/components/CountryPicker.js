import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import axios from "axios";
import styles from "./CounterPicker.Module.css";
const CountryPicker = ({ handleCountryChange }) => {
  const [country, setcountry] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://corona.lmao.ninja/v2/countries"
      );
      setcountry(response.data);
    }
    fetchData();
  }, [setcountry]);
  return (
    <FormControl
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginBottom: "30px",
        width: "100%",
        color:'red'
      }}
    >
      <NativeSelect style={{backgroundColor:'white',borderRadius:'5px',padding:"5px"}}
        defaultValue=""
        
        onChange={(e) => handleCountryChange(e.target.value)}
      >
      <option  value="global" >Live statistics</option>
        {country.map((country, i) => (
          <option key={i} value={country.country}>
            {country.country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
