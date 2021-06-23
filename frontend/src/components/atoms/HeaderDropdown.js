import React, { useState } from "react";
// import { Dropdown, Menu } from "react-bootstrap/";

export default function HeaderDropdown(props) {
    
  const [open,setOpen] = useState(false)
  const clickDropdown=()=>setOpen(!open)
  return (
   
    <ul className="header-dropdown m-r--5">
          <li className={ open ? "dropdown open":"dropdown"}>
            <span
            
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={clickDropdown}
            >
              <i className="material-icons">more_vert</i>
            </span>
            <ul className="dropdown-menu pull-right" style={{marginRight:"25px"}} >
                {props.children}
              
            </ul>
          </li>
        </ul>
  );
}
