import React from "react";
import { useEffect } from "react";
import Charts from "../Examples/Charts";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import BarChart from "../Examples/BarChart";

function NutritionChart() {
  const [nutritionResponse, setNutritionResponse] = useState([]);
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
        `http://localhost:8080/api/nutritiondata/${userId}/${nutritionType}` // sort by createdDate
      );
      console.log(response.data);
      setNutritionResponse(response.data);
      setNutritionData({
        labels: response.data.map((data) => {
          return `${mySQLdateToJS(data.created_at)} Week: ${mySQLdateToWeek(
            data.created_at
          )}`;
          // mySQLdateToJS(data.created_at)
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
            borderColor: "black",
            borderWidth: 2,
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

  // build the data json

  return (
    <div>
      NutritionChart
      {nutritionData && (
        <div style={{ width: "700px" }}>
          <BarChart chartData={nutritionData} />
        </div>
      )}
      {/* <Charts /> */}
    </div>
  );
}

export default NutritionChart;
