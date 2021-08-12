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

          <div className="menu"
           style={{
             position: "relative",
             height: "90% " ,
            }}  
          >
            <div
              className="slimScrollDiv"
              style={{
                position: "absolute",
                overflow: "scroll",  
                width: "100%",
                // height:"auto",
                height: "70% " ,
              }}
            >
              <ul
                className="list"
                style={{
                  
                  overflow: "hidden",
                  // overflow: "scroll",
                  width: "auto",
                  height:"auto",
                  // height: "20%",
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
