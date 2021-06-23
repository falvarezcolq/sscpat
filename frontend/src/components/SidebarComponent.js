import React from "react";
import usericon from "adminbsb-materialdesign/images/user.png";
import Config from "../utils/Config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import PropTypes  from 'prop-types';
import { getNameType } from "../actions/helper";
import { ADMIN, TUTOR, EXTERNAL_TUTOR, STUDENT } from "../actions/types";
import PrimaryItem from "./atoms/PrimaryItem";

class Sidebar extends React.Component {
  state = {
    defaultClass: "btn-group user-helper-dropdown",
    defaultClassItemDropdown: "",
    listItem: [],
  };

  constructor(props) {
    super(props);
    this.divref = React.createRef();
    this.divref2 = React.createRef();
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleMouseClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMouseClick, false);
  }

  handleMouseClick = (event) => {
    if (
      !(
        event.target === this.divref.current ||
        event.target === this.divref2.current
      ) &&
      this.defaultClass !== "btn-group user-helper-dropdown"
    ) {
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  showLogoutMenu = () => {
    if (this.state.defaultClass === "btn-group user-helper-dropdown") {
      this.setState({ defaultClass: "btn-group user-helper-dropdown open" });
    } else {
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  onClickItemDropdown = () => {
    if (this.state.defaultClass === "btn-group user-helper-dropdown") {
      this.setState({ defaultClass: "btn-group user-helper-dropdown open" });
    } else {
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  render() {
    
    let sidebarItem = [];
    if (this.props.type === ADMIN) {
      sidebarItem = Config.sidebarAdminItem;
    } else if (
      this.props.type === TUTOR ||
      this.props.type === EXTERNAL_TUTOR
    ) {
      sidebarItem = Config.sidebarTutorItem;
    } else if (this.props.type === STUDENT) {
      sidebarItem = Config.sidebarStudentItem;
    }

    return (
      <section>
        <aside id="leftsidebar" className="sidebar">
          <div className="user-info">
            <div className="image">
              <img src={usericon} alt="User" width="48" height="48" />
            </div>
            <div className="info-container">
              <div
                className="name"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.fullName}
              </div>
              <div className="email">
                {getNameType(this.props.type).toUpperCase()}
              </div>
              <div className={this.state.defaultClass}>
                <i
                  className="material-icons"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={this.showLogoutMenu}
                  ref={this.divref}
                >
                  keyboard_arrow_down
                </i>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <Link
                      to={Config.logoutPageUrl}
                      className=" waves-effect waves-block"
                      ref={this.divref2}
                    >
                      <i className="material-icons">input</i>Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="menu">
            <div
              className="slimScrollDiv"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
              }}
            >
              <ul
                className="list"
                style={{
                  overflow: "hidden",
                  width: "auto",
                }}
              >
                <li className="header">Navegación principal</li>

                {sidebarItem.map((item) => (
                  <PrimaryItem
                    item={item}
                    activepage={item.index === this.props.activepage}
                    activepage2={this.props.activepage2}
                    key={item.index}
                  />
                ))}
              </ul>

              <div
                className="slimScrollBar"
                style={{
                  background: "rgba(0, 0, 0, 0.5) none repeat scroll 0% 0%",
                  width: "4px",
                  position: "absolute",
                  top: "0px",
                  opacity: "0.4",
                  display: "none",
                  borderRadius: "0px",
                  zIndex: "99",
                  right: "1px",
                  height: "68.753px",
                }}
              ></div>
              <div
                className="slimScrollRail"
                style={{
                  width: "4px",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  display: "none",
                  borderRadius: "0px",
                  background: "rgb(51, 51, 51) none repeat scroll 0% 0%",
                  opacity: "0.2",
                  zIndex: "90",
                  right: "1px",
                }}
              ></div>
            </div>
          </div>

          <div className="legal">
            <div className="copyright">
              © 2021{" "}
              <Link to={Config.HomeUrl}>
                SSCPAT. ADMINISTRACIÓN DE EMPRESAS
              </Link>
              .
            </div>
            <div className="version">
              <b>Version: </b> 1.0.0
            </div>
          </div>
        </aside>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  fullName: state.auth.fullName,
  type: state.auth.type,
});

export default connect(mapStateToProps)(Sidebar);
