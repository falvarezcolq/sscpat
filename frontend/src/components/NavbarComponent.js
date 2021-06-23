import React from "react";
import Config from "../utils/Config";
import { Link } from "react-router-dom";
import NotificationIcon from "./atoms/NotificationIcon";
// import HeaderDropdown from "../components/atoms/HeaderDropdown";  

class Navbar extends React.Component {
  state = {
    open: false,
  };

  clickDropdown = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* <a href="#" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a> */}
            <div className="bars" onClick={this.props.onBarClick}></div>
            <Link className="navbar-brand" to={Config.HomeUrl}>
              SISTEMA DE SEGUIMIENTO Y CONTROL DE PROYECTOS ACADEMICOS DE
              TITULACION
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {/* <!-- Notifications -->  */}
              <li className="dropdown">
                <NotificationIcon/>
              </li>
              {/* <!-- #END# Notifications --> */}

             

              <li className={this.state.open ? "dropdown open" : "dropdown"}>
                <span
                  className="js-right-sidebar"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.clickDropdown}
                  style={{
                    color: "#fff",
                    lineHeight: "1px",
                    padding: "7px 7px 2px 7px",
                    marginTop: "17px",
                    marginLeft: "5px",
                    position: "relative",
                    display: "block",
                  }}
                >
                  <i className="material-icons">more_vert</i>
                </span>
                <ul
                  className="dropdown-menu pull-right"
                  style={{ marginRight: "35px" }}
                >
                  <li>
                    <Link to={Config.updateMyPasswordUrl}> Cambiar mi contraseña </Link>
                  </li>
                 
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}



export default Navbar;
