import React, { useState } from "react";
import { Link } from "react-router-dom";

const PrimaryItem = ({ item, activepage, activepage2 }) => {
  const [showItem, setShowItem] = useState(activepage);
  const toggleItem = (e) => {
    e.preventDefault();
    setShowItem(!showItem);
  };
  const subItems = item.subItems;
  return (
    <li key={item.index} className={activepage ? "active" : ""}>
      <Link
        to={item.url}
        className={
          subItems.length === 0
            ? "waves-effect waves-block"
            : showItem
            ? "menu-toggle toggled waves-effect waves-block"
            : "menu-toggle waves-effect waves-block"
        }
        onClick={subItems.length === 0 ? null : toggleItem}
      >
        <i className="material-icons">{item.icon}</i>
        <span>{item.title}</span>
      </Link>

      {subItems.length > 0 ? (
        <ul
          className="ml-menu"
          style={{ display: showItem ? "block" : "none" }}
        >
          {subItems.map((item) => (
            <li
              key={item.index}
              className={
                activepage && activepage2 === item.index ? "active" : ""
              }
            >
              <Link
                to={item.url}
                className={
                  activepage && activepage2 === item.index
                    ? "toggled waves-effect waves-block"
                    : "waves-effect waves-block"
                }
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      {/* <Link
        to={ item.url}
        className={
          subItems.length === 0
            ? "waves-effect waves-block"
            : showItem
            ? "menu-toggle toggled waves-effect waves-block"
            : "menu-toggle waves-effect waves-block"
        }
        
        onClick={subItems.length === 0? null:toggleItem}
      >
        <i className="material-icons">{item.icon}</i>
        <span>{item.title}</span>
      </Link>

      {subItems.length > 0 ? (
        <ul className="ml-menu" 
        style={{ display: showItem ? "block" :"none"}}>
          {subItems.map((item) => (
            <li
              key={item.index}
              className={
                activepage && activepage2 === item.index ? "active" : ""
              }
            >
              <Link
                to={item.url}
                className={
                  activepage && activepage2 === item.index
                    ? "toggled waves-effect waves-block"
                    : "waves-effect waves-block"
                }
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )} */}
    </li>
  );
};

export default PrimaryItem;
