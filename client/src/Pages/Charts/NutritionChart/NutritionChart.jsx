import React from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import "./NutritionChart.scss";

function NutritionChart() {
  // Initial response from Axios
  const [nutritionResponse, setNutritionResponse] = useState();
  const [healthResponse, setHealthResponse] = useState({});

  // Data for charts
  const [healthData, setHealthData] = useState();

  const [toggleNutrition, setToggleNutrition] = useState("Iron");
  const [toggleHealth, setToggleHealth] = useState("energy");

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
    // console.log(momentDate);
    return momentDate;
  };

  // query nutrition schema for all points from a specific user
  const fetchData = async (userId) => {
    try {
      const { data: nutrition } = await axios.get(
        `http://localhost:8080/api/nutritiondata/${userId}`
      );

      const { data: health } = await axios.get(
        `http://localhost:8080/api/journalentries/${userId}`
      );

      const { data: mealPlans } = await axios.get(
        `http://localhost:8080/api/mealplans/${userId}`
      );

      setNutritionResponse(nutrition);

      setHealthResponse(health);

      // setNutritionData({
      //   labels: response.data.map((data) => {
      //     return `${mySQLdateToJS(data.created_at)} Week: ${mySQLdateToWeek(
      //       data.created_at
      //     )}`;
      //   }),
      //   datasets: [
      //     {
      //       label: "Iron Count",
      //       data: response.data.map((data) => data.nutrition_volume),
      //       backgroundColor: [
      //         "rgba(75,192,192,1)",
      //         "#ecf0f1",
      //         "#50AF95",
      //         "#f3ba2f",
      //         "#2a71d0",
      //       ],
      //       borderColor: "blue",
      //       borderWidth: 3,
      //       tension: 0.4,
      //       yAxisID: "nutrition",
      //     },
      //     {
      //       label: "Mood",
      //       data: [3, 5, 7, 10],
      //       backgroundColor: [
      //         "rgba(75,192,192,1)",
      //         "#ecf0f1",
      //         "#50AF95",
      //         "#f3ba2f",
      //         "#2a71d0",
      //       ],
      //       borderColor: "red",
      //       borderWidth: 3,
      //       tension: 0.4,
      //       yAxisID: "health",
      //     },
      //   ],
      // });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("2922c286-16cd-4d43-ab98-c79f698aeab0");
  }, []);

  const handleHealthToggle = (health) => {
    setToggleHealth(health);
  };

  const handleNutritionToggle = (nutrition) => {
    setToggleNutrition(nutrition);
  };

  //get all mealplans from user
  // each mealplan has an array of recipe ids
  // use this to get bulk data, or can I just grab one at a time
  // print week, and just 3 cards: title

  return (
    <section className="chart">
      <h1>Total Health & Nutrition Chart</h1>
      {nutritionResponse && (
        <div style={{ width: "700px" }}>
          <Line
            data={{
              labels: nutritionResponse
                .filter((record) => record.nutrition_type === toggleNutrition)
                .map((data) => {
                  return `Week: ${mySQLdateToWeek(data.created_at)}`; //Week: ${mySQLdateToWeek(data.created_at)} ${mySQLdateToJS(data.created_at)
                }),
              datasets: [
                {
                  label: `${toggleNutrition} Count`,
                  data: nutritionResponse
                    .filter(
                      (record) => record.nutrition_type === toggleNutrition
                    )
                    .map((data) => data.nutrition_volume),
                  borderColor: "#28406fc8",
                  borderWidth: 3,
                  tension: 0.4,
                  yAxisID: "nutrition",
                },
                {
                  label: `${toggleHealth} Total`,
                  data: healthResponse.map((data) => data[toggleHealth]),
                  borderColor: "#e98d58cd",
                  borderWidth: 3,
                  tension: 0.4,
                  yAxisID: "health",
                },
              ],
            }}
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
                  text: "Nutrition x Health Data",
                },
              },
            }}
          />
        </div>
      )}
      <h2>Nutrients</h2>
      <div className="chart__nutrients-btn-wrapper">
        <button
          className={
            toggleNutrition === "Iron" ? "primary-btn" : "secondary-btn"
          }
          onClick={(e) => {
            handleNutritionToggle("Iron");
          }}
        >
          Iron
        </button>
        <button
          className={
            toggleNutrition === "Zinc" ? "primary-btn" : "secondary-btn"
          }
          onClick={(e) => {
            handleNutritionToggle("Zinc");
          }}
        >
          Zinc
        </button>
        <button
          className={
            toggleNutrition === "Magnesium" ? "primary-btn" : "secondary-btn"
          }
          onClick={(e) => {
            handleNutritionToggle("Magnesium");
          }}
        >
          Magnesium
        </button>
        <button
          className={
            toggleNutrition === "Calcium" ? "primary-btn" : "secondary-btn"
          }
          onClick={(e) => {
            handleNutritionToggle("Calcium");
          }}
        >
          Calcium
        </button>
      </div>
      <h2>Health Fields</h2>
      <div className="chart__health-btn-wrapper">
        <button
          className={
            toggleHealth === "energy" ? "primary-btn" : "secondary-btn"
          }
          onClick={(e) => {
            handleHealthToggle("energy");
          }}
        >
          Energy
        </button>
        <button
          className={toggleHealth === "sleep" ? "primary-btn" : "secondary-btn"}
          onClick={(e) => {
            handleHealthToggle("sleep");
          }}
        >
          Sleep
        </button>
        <button
          className={toggleHealth === "mood" ? "primary-btn" : "secondary-btn"}
          onClick={(e) => {
            handleHealthToggle("mood");
          }}
        >
          Mood
        </button>
      </div>
    </section>
  );
}

export default NutritionChart;
