import React from "react";
// import Overlay from "./Overlay";
import GoogleFontLoader from "react-google-font-loader";

import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
import "adminbsb-materialdesign/css/themes/all-themes.css";
import "../style/design.css";

import Navbar from "./NavbarComponent";
import Sidebar from "./SidebarComponent";
import { withRouter } from "react-router";

class MainComponent extends React.Component {
  state = {
    bodyClass: "theme-indigo ls-closed",
    displayOverlay: "none",
    width: window.innerWidth,
  };

  onBarClick = () => {
    if (this.state.bodyClass === "theme-indigo ls-closed overlay-open") {
      this.setState({ bodyClass: "theme-indigo ls-closed" });
      this.setState({ displayOverlay: "none" });
    } else if (this.state.bodyClass === "theme-indigo ls-closed") {
      this.setState({ bodyClass: "theme-indigo ls-closed overlay-open" });
      this.setState({ displayOverlay: "block" });
    }
  };

  onscreenresize = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillMount() {
    window.addEventListener("resize", this.onscreenresize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onscreenresize);
  }

  componentDidMount(){
    if (window.innerWidth > 1150) {
      document.getElementById("root").className = "theme-indigo";
    } else {
      document.getElementById("root").className = this.state.bodyClass;
    }
  }

  render() {
   
    if (window.innerWidth > 1150) {
      document.getElementById("root").className = "theme-indigo";
    } else {
      document.getElementById("root").className = this.state.bodyClass;
    }

    var Page = this.props.page;
    // const only_page = this.props.location.search === "?only_page=on";
    
    return (
      <React.Fragment>
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400, 700],
            },
          ]}
          subsets={["latin", "cyrillic-ext"]}
        />
        <GoogleFontLoader
          fonts={[
            {
              font: "Material+Icons",
            },
          ]}
        />
      
            <Navbar onBarClick={this.onBarClick} />
            <Sidebar
              activepage={this.props.activepage}
              activepage2={this.props.activepage2}
              url={this.props.url}
            />
     


        <Page {...this.props} />
      </React.Fragment>
    );
  }
}

export default withRouter(MainComponent);
