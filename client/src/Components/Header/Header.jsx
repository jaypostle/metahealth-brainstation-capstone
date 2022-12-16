import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

import { MdBubbleChart } from "react-icons/md";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/discover">
          <span>
            MetaHealth <MdBubbleChart />
          </span>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/discover">Discover</Link>
        </li>
        <li>
          <Link to="/mealplan">Meal Plan</Link>
        </li>
        <li>
          <Link to="/journal">Journal Entries</Link>
        </li>
        <li>
          <Link to="/nutritiondata">Nutrition Data</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
