import React from "react";
import { Link } from "react-router-dom";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";
import "./RecipeCard.scss";

function RecipeCard({ recipe }) {
  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  return (
    <article className="recipe-card" key={recipe.id}>
      <img
        className="recipe-card__image"
        src={recipe.image}
        alt={recipe.title + "image"}
      />
      <div className="recipe-card__all-text">
        <div className="recipe-card__meta-data">
          <h3 className="recipe-card__title">{recipe.title}</h3>
          {/* time, photo */}
          <span className="recipe-card__time">{recipe.time}</span>
        </div>
        {/* labels */}
        <div className="recipe-card__diets">
          <h4>Diets</h4>
          {recipe.diets.map((diet, i) => (
            <span key={i}>{diet} </span>
          ))}
        </div>

        {/* show allergens */}
        <div className="recipe-card__allergens">
          <h4>Preferences</h4>
          <span>
            {recipe.vegetarian && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7925 5.31917C17.7958 4.49834 17.4783 3.72417 16.9 3.14167C16.3225 2.55917 15.5508 2.23667 14.73 2.23334C14.7258 2.23334 14.7225 2.23334 14.7183 2.23334C13.5775 2.23334 12.5367 2.87584 12.01 3.855C11.5517 3.5925 11.03 3.45084 10.4942 3.44917C9.69999 3.44667 8.89916 3.76334 8.31666 4.34167C7.73833 4.91584 7.41583 5.68 7.40833 6.49417C6.63499 6.5225 5.91083 6.83584 5.35833 7.38417C4.77583 7.9625 4.45333 8.73417 4.44999 9.55417C4.44749 10.0383 4.47833 14.0533 4.48499 14.8825L2.33333 17.035C2.16583 17.2025 2.16583 17.4733 2.33333 17.6417C2.41666 17.725 2.52583 17.7667 2.63583 17.7667C2.74583 17.7667 2.85583 17.725 2.93833 17.6417L5.09333 15.4867C5.84333 15.4775 9.25499 15.4367 9.97333 15.4367C9.99583 15.4367 10.015 15.4367 10.0333 15.4367C11.7142 15.4367 13.0867 14.0767 13.1058 12.3942C14.79 12.39 16.1642 11.02 16.1708 9.33C16.1717 8.91667 16.0908 8.51167 15.9333 8.135C17.0475 7.66167 17.7883 6.5725 17.7925 5.31917ZM15.1883 7.43334C15.0442 7.465 14.925 7.56584 14.8692 7.70334C14.8133 7.84084 14.8283 7.99667 14.9108 8.12C15.1475 8.48 15.2733 8.8975 15.2717 9.3275C15.2667 10.525 14.2925 11.4958 13.0975 11.4958C12.9858 11.4933 12.8308 11.4842 12.7033 11.4592C12.5542 11.43 12.4083 11.4758 12.3033 11.5783C12.1983 11.6808 12.1492 11.8292 12.1742 11.975C12.1958 12.1042 12.2075 12.2367 12.2075 12.3708C12.2025 13.5683 11.2283 14.5392 10.0342 14.5392C10.0317 14.5392 10.0283 14.5392 10.0258 14.5392C9.58749 14.545 7.36166 14.5642 6.00249 14.5783L7.88083 12.7L10.4875 13.0283C10.5058 13.0308 10.5258 13.0317 10.5442 13.0317C10.7675 13.0317 10.96 12.8658 10.9883 12.6383C11.02 12.3925 10.845 12.1675 10.5992 12.1367L8.68416 11.8958L11.0433 9.53667L13.65 9.865C13.6683 9.8675 13.6883 9.86834 13.7067 9.86834C13.93 9.86834 14.1225 9.7025 14.1508 9.475C14.1825 9.22917 14.0075 9.00417 13.7617 8.97334L11.8467 8.7325L14.7733 5.80584C14.9408 5.63834 14.9408 5.3675 14.7733 5.19917C14.6075 5.03167 14.3342 5.0325 14.1675 5.19917L11.255 8.11167L11.0175 6.23084C10.9867 5.985 10.7567 5.81167 10.5158 5.84167C10.27 5.8725 10.095 6.0975 10.1267 6.34334L10.4508 8.915L8.07833 11.2875L7.84083 9.40584C7.81249 9.16 7.58333 8.98584 7.34166 9.01667C7.09583 9.0475 6.92083 9.2725 6.95249 9.51834L7.27666 12.0908L5.37583 13.9917C5.36416 12.5117 5.34583 9.94 5.34833 9.55917C5.34999 8.9775 5.57833 8.43167 5.99083 8.0225C6.40083 7.615 6.94583 7.39084 7.52416 7.39084C7.61083 7.3825 7.72916 7.39584 7.82666 7.41084C7.97083 7.435 8.11499 7.38417 8.21499 7.28C8.31583 7.17584 8.36083 7.03 8.33583 6.8875C8.31416 6.76834 8.30583 6.6425 8.30666 6.51584C8.30833 5.93417 8.53666 5.38834 8.94916 4.97917C9.35916 4.57167 9.90416 4.3475 10.4825 4.3475C10.485 4.3475 10.4883 4.3475 10.4908 4.3475C11.015 4.34917 11.5192 4.53917 11.9125 4.88334C12.0275 4.98417 12.1833 5.01834 12.3325 4.97667C12.4792 4.93417 12.5942 4.82 12.6375 4.67417C12.9117 3.7625 13.77 3.13167 14.7267 3.1325C15.3075 3.13417 15.8542 3.3625 16.2633 3.775C16.6725 4.1875 16.8975 4.735 16.895 5.31667C16.8908 6.3425 16.1892 7.21334 15.1883 7.43334Z"
                  fill="#312826"
                />
              </svg>
            )}
          </span>
          <span>
            {recipe.vegan && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.805 7.26501C17.7608 7.24001 16.7317 6.66667 15.8025 7.01834L16.0733 6.36751C16.44 6.21501 17.2433 5.80251 17.55 5.00751C17.94 3.99751 17.3317 2.83834 17.3058 2.78917C17.2108 2.61167 17.0033 2.52667 16.8125 2.58834C16.7608 2.60501 15.54 3.00167 15.1458 4.02001C14.8417 4.80751 15.1417 5.67667 15.3017 6.04917L14.4267 8.14917C14.1533 7.40584 13.465 6.92167 13.4308 6.89751C13.2625 6.78251 13.0342 6.80667 12.8925 6.95417C12.8592 6.98917 12.0767 7.82584 12.1883 8.80167C12.2983 9.77417 13.2467 10.4333 13.2867 10.4608C13.3342 10.4933 13.3892 10.4983 13.4425 10.5092L11.5925 14.9483L6.80002 4.93084H7.31835C7.54835 4.93084 7.73502 4.74417 7.73502 4.51417C7.73502 4.28417 7.54835 4.09751 7.31835 4.09751H2.40168C2.17168 4.09751 1.98502 4.28417 1.98502 4.51417C1.98502 4.74417 2.17168 4.93084 2.40168 4.93084H3.22085L9.08835 17.1942C9.15752 17.3392 9.30418 17.4308 9.46418 17.4308H11.185C11.3533 17.4308 11.505 17.3292 11.5692 17.1742L13.3467 12.9092C13.58 13.0125 13.9758 13.1533 14.4117 13.1533C14.6175 13.1533 14.8308 13.1217 15.0392 13.04C15.9042 12.7 16.2592 11.6792 16.2967 11.5642C16.3575 11.3775 16.28 11.1733 16.11 11.075C16.0683 11.0508 15.0933 10.4958 14.2108 10.835L14.885 9.21834C15.1342 9.32417 15.5425 9.46167 15.9875 9.46167C16.2108 9.46167 16.4433 9.42667 16.6692 9.33584C17.6017 8.96001 17.9792 7.80251 17.995 7.75334C18.055 7.56584 17.9758 7.36167 17.805 7.26501ZM13.0175 8.70917C12.9833 8.40667 13.1183 8.08834 13.2617 7.85084C13.4592 8.05667 13.6675 8.34667 13.7033 8.65334C13.7375 8.95584 13.6025 9.27417 13.4592 9.51167C13.2608 9.30584 13.0525 9.01584 13.0175 8.70917ZM15.3483 11.6475C15.2133 11.8867 15.0042 12.1583 14.735 12.2642C14.4717 12.3683 14.1475 12.3125 13.8942 12.2292C14.0292 11.9917 14.2392 11.7183 14.5075 11.6125C14.7717 11.5092 15.0958 11.565 15.3483 11.6475ZM15.9242 4.32084C16.0708 3.94167 16.4383 3.68501 16.7167 3.53667C16.8225 3.85084 16.9233 4.31834 16.7733 4.70667C16.6267 5.08584 16.2592 5.34334 15.98 5.49167C15.8692 5.15751 15.7808 4.69167 15.9242 4.32084ZM9.72668 16.5975L4.14418 4.93084H5.87585L11.1633 15.9825L10.9067 16.5975H9.72668ZM16.3592 8.56251C16.3583 8.56251 16.3583 8.56251 16.3592 8.56251C16.0542 8.68667 15.6742 8.61501 15.3908 8.52084C15.5367 8.24917 15.7725 7.92501 16.0825 7.80001C16.3892 7.67667 16.7683 7.74751 17.0508 7.84167C16.905 8.11334 16.6692 8.43751 16.3592 8.56251Z"
                  fill="#312826"
                />
              </svg>
            )}{" "}
          </span>
          <span>
            {recipe.glutenFree && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4083 10.3633L15.9808 9.93833C16.1658 9.80167 16.2041 9.54 16.0675 9.35583C15.9308 9.17167 15.6683 9.13167 15.485 9.26917L14.915 9.69167C14.7458 9.66167 14.4783 9.62333 14.1483 9.60333C15.0833 8.71167 15.3433 7.40917 15.4091 6.915L15.9816 6.49C16.1666 6.35333 16.205 6.09167 16.0683 5.9075C15.9316 5.72333 15.6691 5.68333 15.4858 5.82083L14.915 6.24417C14.4058 6.155 12.985 5.98083 11.7791 6.515C11.965 6.12083 12.0941 5.68583 12.0941 5.21833C12.0941 3.74833 10.8633 2.56833 10.4175 2.1875V1.46083C10.4175 1.23083 10.2308 1.04417 10.0008 1.04417C9.77081 1.04417 9.58414 1.23083 9.58414 1.46083V2.1875C9.13831 2.56833 7.90748 3.74833 7.90748 5.21833C7.90748 5.68583 8.03664 6.12083 8.22248 6.515C7.01581 5.98167 5.59498 6.15583 5.08664 6.24417L4.51498 5.8225C4.33081 5.68583 4.06914 5.725 3.93248 5.90833C3.79498 6.09333 3.83414 6.35417 4.01831 6.49167L4.59081 6.91667C4.65664 7.41083 4.91664 8.71417 5.85164 9.60583C5.52164 9.62583 5.25331 9.66417 5.08414 9.69333L4.51331 9.27C4.32914 9.13333 4.06748 9.1725 3.93081 9.35667C3.79331 9.54167 3.83248 9.8025 4.01748 9.93917L4.58998 10.3642C4.65414 10.8467 4.90248 12.1042 5.78748 12.9933C5.48581 13.0142 5.24248 13.05 5.08414 13.0775L4.51331 12.6542C4.32914 12.5175 4.06748 12.5567 3.93081 12.7408C3.79331 12.9258 3.83248 13.1867 4.01748 13.3233L4.58998 13.7483C4.66414 14.3083 4.98498 15.92 6.26998 16.7783C7.02998 17.285 7.96331 17.415 8.71831 17.415C9.05248 17.415 9.34831 17.3892 9.58164 17.36V18.54C9.58164 18.77 9.76831 18.9567 9.99831 18.9567C10.2283 18.9567 10.415 18.77 10.415 18.54V17.3583C10.6483 17.3875 10.9433 17.4133 11.2783 17.4133C12.0333 17.4133 12.9675 17.2842 13.7266 16.7767C15.0116 15.9183 15.3316 14.3067 15.4066 13.7467L15.9791 13.3217C16.1641 13.185 16.2025 12.9233 16.0658 12.7392C15.9291 12.555 15.6666 12.515 15.4833 12.6525L14.9125 13.0758C14.7541 13.0483 14.51 13.0125 14.2091 12.9917C15.0966 12.1033 15.3441 10.8458 15.4083 10.3633ZM13.2658 12.6992C12.3758 13.2933 11.0975 13.2233 10.47 13.1408C10.5783 12.5717 10.8916 11.4925 11.7491 10.9208C12.6391 10.3267 13.9191 10.3975 14.5458 10.48C14.4391 11.0467 14.1283 12.1233 13.2658 12.6992ZM14.545 7.0325C14.4366 7.60167 14.1233 8.68083 13.2666 9.2525C12.375 9.8475 11.095 9.775 10.4691 9.69333C10.5758 9.12583 10.8866 8.04917 11.75 7.47417C12.6391 6.88 13.9175 6.95 14.545 7.0325ZM9.99998 2.93167C10.43 3.32917 11.26 4.22417 11.26 5.21917C11.26 6.21333 10.43 7.10917 9.99998 7.50583C9.56998 7.10833 8.73998 6.21333 8.73998 5.21917C8.73998 4.22417 9.56998 3.32917 9.99998 2.93167ZM5.45498 7.0325C6.08164 6.94917 7.35998 6.87917 8.25081 7.47417C9.10748 8.04667 9.42081 9.125 9.52998 9.69333C8.90248 9.77667 7.62414 9.8475 6.73414 9.2525C5.87664 8.68083 5.56414 7.60167 5.45498 7.0325ZM5.45498 10.48C6.08331 10.3967 7.36081 10.3275 8.25081 10.9208C9.10831 11.4933 9.42164 12.5725 9.52998 13.1417C8.90498 13.2242 7.62914 13.2967 6.73331 12.6992C5.87664 12.1267 5.56414 11.0483 5.45498 10.48ZM6.73414 16.0833C5.87748 15.5108 5.56414 14.4325 5.45581 13.8642C6.08331 13.7833 7.36164 13.7108 8.25164 14.305C9.10831 14.8775 9.42164 15.9558 9.53081 16.5242C8.90248 16.6075 7.62414 16.6783 6.73414 16.0833ZM13.2658 16.0833C12.3741 16.6783 11.0941 16.605 10.4683 16.5242C10.575 15.9567 10.8858 14.88 11.7491 14.305C12.6391 13.7092 13.9183 13.7817 14.5458 13.8642C14.4391 14.4317 14.1283 15.5083 13.2658 16.0833Z"
                  fill="#312826"
                />
              </svg>
            )}{" "}
          </span>
          <span>{recipe.dariyFree && " dairy free"}</span>
        </div>
      </div>

      <div className="recipe-card__button-wrapper">
        <button
          className={`${
            mealPlan.includes(recipe.id)
              ? "recipe-card__button primary-btn primary-btn--remove"
              : "recipe-card__button primary-btn"
          }`}
          onClick={function () {
            mealPlanUpdate(recipe.id);
          }}
        >
          {mealPlan.includes(recipe.id) ? "Remove" : "Add to Plan"}
        </button>
        <Link
          to={`/recipe/${recipe.id}`}
          className="recipe-card__view-recipe secondary-btn"
        >
          View Recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
