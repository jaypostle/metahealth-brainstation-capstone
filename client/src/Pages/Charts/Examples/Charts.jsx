import React from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState, useEffect } from "react";

import { UserData } from "./Data.js";

function Charts() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      Charts
      <div style={{ width: "700px" }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: "700px" }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: "700px" }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}

export default Charts;
