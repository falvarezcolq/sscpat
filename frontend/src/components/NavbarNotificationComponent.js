import React from 'react'

const NavbarNotificationComponent = () => {
    return (
        <ul className="dropdown-menu">
        <li className="header">NOTIFICATIONS</li>
        <li className="body">
          <div
            className="slimScrollDiv"
            style={{
              position: "relative",
              overflow: "hidden",
              width: "auto",
              height: "254px",
            }}
          >
            <ul
              className="menu"
              style={{
                overflow: "hidden",
                width: "auto",
                height: "254px",
              }}
            >
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-light-green">
                    <i className="material-icons">person_add</i>
                  </div>
                  <div className="menu-info">
                    <h4>12 new members joined</h4>
                    <p>
                      <i className="material-icons">access_time</i> 14
                      mins ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-cyan">
                    <i className="material-icons">
                      add_shopping_cart
                    </i>
                  </div>
                  <div className="menu-info">
                    <h4>4 sales made</h4>
                    <p>
                      <i className="material-icons">access_time</i> 22
                      mins ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-red">
                    <i className="material-icons">delete_forever</i>
                  </div>
                  <div className="menu-info">
                    <h4>
                      <b>Nancy Doe</b> deleted account
                    </h4>
                    <p>
                      <i className="material-icons">access_time</i> 3
                      hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-orange">
                    <i className="material-icons">mode_edit</i>
                  </div>
                  <div className="menu-info">
                    <h4>
                      <b>Nancy</b> changed name
                    </h4>
                    <p>
                      <i className="material-icons">access_time</i> 2
                      hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-blue-grey">
                    <i className="material-icons">comment</i>
                  </div>
                  <div className="menu-info">
                    <h4>
                      <b>John</b> commented your post
                    </h4>
                    <p>
                      <i className="material-icons">access_time</i> 4
                      hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-light-green">
                    <i className="material-icons">cached</i>
                  </div>
                  <div className="menu-info">
                    <h4>
                      <b>John</b> updated status
                    </h4>
                    <p>
                      <i className="material-icons">access_time</i> 3
                      hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#;"
                  className=" waves-effect waves-block"
                >
                  <div className="icon-circle bg-purple">
                    <i className="material-icons">settings</i>
                  </div>
                  <div className="menu-info">
                    <h4>Settings updated</h4>
                    <p>
                      <i className="material-icons">access_time</i>{" "}
                      Yesterday
                    </p>
                  </div>
                </a>
              </li>
            </ul>
            <div
              className="slimScrollBar"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                width: "4px",
                position: "absolute",
                top: "0px",
                opacity: "0.4",
                display: "block",
                "border-radius": "0px",
                "z-index": "99",
                right: "1px",
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
                "border-radius": "0px",
                background: "rgb(51, 51, 51)",
                opacity: "0.2",
                "z-index": "90",
                right: "1px",
              }}
            ></div>
          </div>
        </li>
        <li className="footer">
          <a href="#" className=" waves-effect waves-block">
            View All Notifications
          </a>
        </li>
      </ul>
    )
}

export default NavbarNotificationComponent
