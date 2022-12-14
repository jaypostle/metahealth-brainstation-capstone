import React from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

function NutritionChart() {
  const [nutritionResponse, setNutritionResponse] = useState({});
  const [healthData, setHealthData] = useState({});
  const [nutritionData, setNutritionData] = useState();

  const mySQLdateToJS = (mySQLdateStamp) => {
    let t = mySQLdateStamp.split(/[- : T .]/);
    let date = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    // console.log(date);
    const createdDate = moment()
      .day("Monday")
      .year(moment(date).format("Y"))
      .week(moment(date).format("W"))
      .format("YYYY-MM-DD");
    return createdDate;
  };

  const mySQLdateToWeek = (mySQLdateStamp) => {
    let t = mySQLdateStamp.split(/[- : T .]/);
    let date = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    let momentDate = moment(date, "MMDDYYYY").isoWeek();
    console.log(momentDate);
    return momentDate;
  };


  

  // query nutrition schema for all points from a specific user
  const fetchNutritionData = async (userId, nutritionType) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/nutritiondata/${userId}/${nutritionType}` 
      );
      console.log(response.data);
      setNutritionResponse({
        ...nutritionResponse,
        [nutritionType]: response.data,
      });

      setNutritionData({
        labels: response.data.map((data) => {
          return `${mySQLdateToJS(data.created_at)} Week: ${mySQLdateToWeek(
            data.created_at
          )}`;
        }),
        datasets: [
          {
            label: "Iron Count",
            data: response.data.map((data) => data.nutrition_volume),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "blue",
            borderWidth: 3,
            tension: 0.4,
            yAxisID: "nutrition",
          },
          {
            label: "Mood",
            data: [3, 5, 7, 10],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "red",
            borderWidth: 3,
            tension: 0.4,
            yAxisID: "health",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNutritionData("2922c286-16cd-4d43-ab98-c79f698aeab0", "Iron");
    mySQLdateToJS("2022-12-09T23:49:52.000Z");
  }, []);

  useEffect(() => {
    console.log("nutrition: ", nutritionResponse);
    console.log("health data: ", healthData);
  }, [nutritionResponse, healthData]);

  return (
    <div>
      <h1>NutritionChart</h1>
      {nutritionData && (
        <div style={{ width: "700px" }}>
          <Line
            data={nutritionData}
            options={{
              scales: {
                nutrition: {
                  // beginAtZero: true,
                  type: "linear",
                  position: "left",
                },
                health: {
                  // beginAtZero: true,
                  type: "linear",
                  position: "right",
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Users Gained between 2016-2020",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default NutritionChart;
