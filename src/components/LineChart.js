import React from "react";
import { Bar } from "react-chartjs-2";
import styles from './Line.Module.css';
const Line_Chart = ({ data, country }) => {
  const barChart = data.data ? (
    <Bar
      data={{
          labels:['Infected','Recovered','Deaths'],
          datasets:[{
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            data: [data.data.cases,data.data.recovered,data.data.deaths],
          }]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return <div className={styles.container}>
    {barChart}
    </div>;
};

export default Line_Chart;
